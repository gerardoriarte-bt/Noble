#!/bin/bash

# Script de configuración para EC2 - Noble Architecture Studio
# Ejecutar como: bash ec2-setup.sh

echo "🚀 Configurando servidor EC2 para Noble Architecture Studio..."

# Actualizar sistema
echo "📦 Actualizando sistema..."
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
echo "🔧 Instalando Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Nginx
echo "🌐 Instalando Nginx..."
sudo apt install nginx -y

# Instalar PM2 para gestión de procesos
echo "⚡ Instalando PM2..."
sudo npm install -g pm2

# Instalar Certbot para SSL
echo "🔒 Instalando Certbot para SSL..."
sudo apt install certbot python3-certbot-nginx -y

# Crear directorio de la aplicación
echo "📁 Creando directorio de aplicación..."
sudo mkdir -p /var/www/noble
sudo chown -R ubuntu:ubuntu /var/www/noble

# Configurar Nginx
echo "⚙️ Configurando Nginx..."
sudo tee /etc/nginx/sites-available/noble > /dev/null <<EOF
server {
    listen 80;
    server_name _;
    root /var/www/noble/dist;
    index index.html;

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
}
EOF

# Habilitar el sitio
sudo ln -sf /etc/nginx/sites-available/noble /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Reiniciar Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "✅ Configuración básica completada!"
echo "📋 Próximos pasos:"
echo "1. Subir tu código al servidor"
echo "2. Ejecutar: npm install && npm run build"
echo "3. Configurar dominio y SSL"
