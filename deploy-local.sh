#!/bin/bash

# Script de despliegue local para Noble Architecture Studio
# Ejecutar desde tu máquina local

echo "🚀 Iniciando despliegue local de Noble Architecture Studio..."

# Variables
SERVER_IP="3.16.123.25"
PEM_FILE="/Users/buentipo/Downloads/noble.pem"
APP_DIR="/var/www/noble"

# Construir aplicación localmente
echo "🔨 Construyendo aplicación localmente..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Error: No se encontró el directorio dist. Ejecuta 'npm run build' primero."
    exit 1
fi

# Crear backup en el servidor
echo "💾 Creando backup en el servidor..."
ssh -i "$PEM_FILE" ubuntu@$SERVER_IP "sudo mv $APP_DIR $APP_DIR.backup.\$(date +%Y%m%d_%H%M%S) 2>/dev/null || true"

# Crear directorio de aplicación
echo "📁 Creando directorio de aplicación..."
ssh -i "$PEM_FILE" ubuntu@$SERVER_IP "sudo mkdir -p $APP_DIR"

# Subir archivos construidos
echo "📤 Subiendo archivos construidos..."
scp -i "$PEM_FILE" -r dist/* ubuntu@$SERVER_IP:/tmp/noble-files/

# Mover archivos al directorio de aplicación
echo "📋 Moviendo archivos al directorio de aplicación..."
ssh -i "$PEM_FILE" ubuntu@$SERVER_IP "sudo cp -r /tmp/noble-files/* $APP_DIR/ && sudo chown -R www-data:www-data $APP_DIR && sudo chmod -R 755 $APP_DIR"

# Limpiar archivos temporales
echo "🧹 Limpiando archivos temporales..."
ssh -i "$PEM_FILE" ubuntu@$SERVER_IP "rm -rf /tmp/noble-files"

# Reiniciar Nginx
echo "🔄 Reiniciando Nginx..."
ssh -i "$PEM_FILE" ubuntu@$SERVER_IP "sudo systemctl reload nginx"

echo "✅ Despliegue completado exitosamente!"
echo "🌐 Tu aplicación está disponible en: http://$SERVER_IP"


