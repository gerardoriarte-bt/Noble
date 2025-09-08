#!/bin/bash

# Script para configurar dominio y SSL
# Ejecutar después de configurar el DNS

echo "🌐 Configurando dominio y SSL para Noble Architecture Studio..."

# Solicitar dominio
read -p "Ingresa tu dominio (ej: noble-architecture.com): " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo "❌ Error: Debes proporcionar un dominio"
    exit 1
fi

# Actualizar configuración de Nginx
echo "⚙️ Actualizando configuración de Nginx..."
sudo tee /etc/nginx/sites-available/noble > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;
    root /var/www/noble/dist;
    index index.html;

    # SSL Configuration (será actualizado por Certbot)
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Configuración para archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compresión gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Headers de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

# Reiniciar Nginx
sudo systemctl reload nginx

# Obtener certificado SSL
echo "🔒 Obteniendo certificado SSL..."
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Configurar renovación automática
echo "⏰ Configurando renovación automática de SSL..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

echo "✅ Configuración de dominio completada!"
echo "🌐 Tu sitio está disponible en: https://$DOMAIN"
echo "📧 Certificado SSL configurado y renovación automática activada"
