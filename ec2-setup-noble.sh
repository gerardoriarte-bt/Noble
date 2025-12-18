#!/bin/bash

# Script de configuración inicial para AWS EC2
# Dominio: noble.com
# Ejecutar como: sudo bash ec2-setup-noble.sh

set -e

echo "🚀 Configurando servidor EC2 para Noble Architecture Studio..."

# Actualizar sistema
echo "📦 Actualizando sistema..."
apt-get update
apt-get upgrade -y

# Instalar Node.js 20.x
echo "📦 Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verificar instalación
node --version
npm --version

# Instalar Nginx
echo "🌐 Instalando Nginx..."
apt-get install -y nginx

# Instalar Certbot para SSL
echo "🔒 Instalando Certbot..."
apt-get install -y certbot python3-certbot-nginx

# Crear directorio de la aplicación
echo "📁 Creando directorio de aplicación..."
mkdir -p /var/www/noble
chown -R www-data:www-data /var/www/noble
chmod -R 755 /var/www/noble

# Configurar firewall
echo "🔥 Configurando firewall..."
ufw allow 'Nginx Full'
ufw allow 'OpenSSH'
ufw --force enable

# Habilitar Nginx
systemctl enable nginx
systemctl start nginx

echo "✅ Configuración inicial completada!"
echo ""
echo "📝 Próximos pasos:"
echo "1. Configurar DNS: Apuntar noble.com y www.noble.com a la IP pública de esta instancia"
echo "2. Ejecutar: sudo certbot --nginx -d noble.com -d www.noble.com"
echo "3. Copiar nginx-noble.conf a /etc/nginx/sites-available/noble"
echo "4. Crear symlink: sudo ln -s /etc/nginx/sites-available/noble /etc/nginx/sites-enabled/"
echo "5. Probar configuración: sudo nginx -t"
echo "6. Reiniciar Nginx: sudo systemctl restart nginx"
echo ""
echo "🌐 IP pública de esta instancia:"
curl -s ifconfig.me
echo ""

