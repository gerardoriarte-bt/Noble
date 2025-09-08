#!/bin/bash

# Script de despliegue para Noble Architecture Studio
# Ejecutar desde el servidor EC2

echo "🚀 Iniciando despliegue de Noble Architecture Studio..."

# Variables
APP_DIR="/var/www/noble"
REPO_URL="git@github.com:gerardoriarte-bt/Noble.git"
TEMP_DIR="/tmp/noble-deploy"

# Crear directorio temporal
echo "📁 Creando directorio temporal..."
rm -rf $TEMP_DIR
mkdir -p $TEMP_DIR
cd $TEMP_DIR

# Clonar repositorio
echo "📥 Clonando repositorio..."
git clone $REPO_URL .

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Construir aplicación
echo "🔨 Construyendo aplicación..."
npm run build

# Crear backup del directorio actual
echo "💾 Creando backup..."
if [ -d "$APP_DIR" ]; then
    sudo mv $APP_DIR $APP_DIR.backup.$(date +%Y%m%d_%H%M%S)
fi

# Mover archivos construidos
echo "📋 Moviendo archivos..."
sudo mkdir -p $APP_DIR
sudo cp -r dist/* $APP_DIR/
sudo chown -R www-data:www-data $APP_DIR
sudo chmod -R 755 $APP_DIR

# Reiniciar Nginx
echo "🔄 Reiniciando Nginx..."
sudo systemctl reload nginx

# Limpiar archivos temporales
echo "🧹 Limpiando archivos temporales..."
rm -rf $TEMP_DIR

echo "✅ Despliegue completado exitosamente!"
echo "🌐 Tu aplicación está disponible en: http://$(curl -s ifconfig.me)"
