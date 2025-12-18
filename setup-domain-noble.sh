#!/bin/bash

# Script para configurar dominio y SSL para Noble Architecture Studio
# Dominio: noble.com
# Ejecutar como: sudo bash setup-domain-noble.sh

set -e

DOMAIN="noble.com"
WWW_DOMAIN="www.noble.com"

echo "🌐 Configurando dominio y SSL para $DOMAIN..."

# Verificar que Nginx está instalado
if ! command -v nginx &> /dev/null; then
    echo "❌ Nginx no está instalado. Ejecuta primero ec2-setup-noble.sh"
    exit 1
fi

# Obtener IP pública
PUBLIC_IP=$(curl -s ifconfig.me)
echo "📍 IP pública de esta instancia: $PUBLIC_IP"
echo ""
echo "⚠️  IMPORTANTE: Asegúrate de que los siguientes registros DNS estén configurados:"
echo "   - A record: $DOMAIN -> $PUBLIC_IP"
echo "   - A record: $WWW_DOMAIN -> $PUBLIC_IP"
echo ""
read -p "¿Los registros DNS están configurados? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Configura los registros DNS primero y luego ejecuta este script nuevamente."
    exit 1
fi

# Copiar configuración de Nginx
echo "📋 Configurando Nginx..."
if [ -f "nginx-noble.conf" ]; then
    sudo cp nginx-noble.conf /etc/nginx/sites-available/noble
else
    echo "⚠️  Archivo nginx-noble.conf no encontrado. Creando configuración básica..."
    sudo tee /etc/nginx/sites-available/noble > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN $WWW_DOMAIN;
    root /var/www/noble;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF
fi

# Crear symlink si no existe
if [ ! -L /etc/nginx/sites-enabled/noble ]; then
    sudo ln -s /etc/nginx/sites-available/noble /etc/nginx/sites-enabled/
fi

# Remover configuración por defecto si existe
if [ -L /etc/nginx/sites-enabled/default ]; then
    sudo rm /etc/nginx/sites-enabled/default
fi

# Probar configuración
echo "🔍 Verificando configuración de Nginx..."
if sudo nginx -t; then
    echo "✅ Configuración válida"
else
    echo "❌ Error en la configuración de Nginx"
    exit 1
fi

# Reiniciar Nginx
sudo systemctl restart nginx

# Esperar a que DNS se propague
echo "⏳ Esperando propagación de DNS (esto puede tomar unos minutos)..."
echo "   Verificando resolución DNS..."

MAX_ATTEMPTS=30
ATTEMPT=0
DNS_READY=false

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    RESOLVED_IP=$(dig +short $DOMAIN | tail -n1)
    if [ "$RESOLVED_IP" = "$PUBLIC_IP" ]; then
        DNS_READY=true
        break
    fi
    ATTEMPT=$((ATTEMPT + 1))
    echo "   Intento $ATTEMPT/$MAX_ATTEMPTS: DNS aún no resuelve correctamente..."
    sleep 10
done

if [ "$DNS_READY" = false ]; then
    echo "⚠️  DNS aún no está completamente propagado, pero continuando..."
fi

# Obtener certificado SSL
echo "🔒 Obteniendo certificado SSL con Let's Encrypt..."
if sudo certbot --nginx -d $DOMAIN -d $WWW_DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN --redirect; then
    echo "✅ Certificado SSL instalado exitosamente"
else
    echo "⚠️  Error al obtener certificado SSL. Verifica:"
    echo "   1. Los registros DNS están configurados correctamente"
    echo "   2. Los puertos 80 y 443 están abiertos en el Security Group"
    echo "   3. El dominio apunta a la IP correcta"
    exit 1
fi

# Configurar renovación automática
echo "🔄 Configurando renovación automática de certificados..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Verificar estado final
echo ""
echo "✅ Configuración completada!"
echo ""
echo "🌐 Tu sitio está disponible en:"
echo "   - https://$DOMAIN"
echo "   - https://$WWW_DOMAIN"
echo ""
echo "📝 Verificar certificado SSL:"
echo "   sudo certbot certificates"
echo ""
echo "🔄 Renovar certificado manualmente:"
echo "   sudo certbot renew"
echo ""

