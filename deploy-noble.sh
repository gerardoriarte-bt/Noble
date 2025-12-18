#!/bin/bash

# Script de despliegue para Noble Architecture Studio
# Dominio: noble.com
# Ejecutar desde el servidor EC2 como usuario con permisos

set -e

echo "🚀 Iniciando despliegue de Noble Architecture Studio..."

# Variables
APP_DIR="/var/www/noble"
REPO_URL="git@github.com:gerardoriarte-bt/Noble.git"
TEMP_DIR="/tmp/noble-deploy-$(date +%s)"
BUILD_DIR="$TEMP_DIR/dist"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Verificar que estamos en el directorio correcto o crear uno temporal
if [ ! -d ".git" ]; then
    print_warning "No se encontró repositorio git. Clonando..."
    rm -rf $TEMP_DIR
    mkdir -p $TEMP_DIR
    cd $TEMP_DIR
    git clone $REPO_URL .
else
    print_status "Actualizando repositorio existente..."
    git pull origin main || git pull origin master
    TEMP_DIR=$(pwd)
fi

# Instalar dependencias
print_status "Instalando dependencias..."
npm ci --production=false

# Construir aplicación
print_status "Construyendo aplicación para producción..."
npm run build

# Verificar que el build fue exitoso
if [ ! -d "dist" ]; then
    print_error "El directorio dist no fue creado. El build falló."
    exit 1
fi

# Crear backup del directorio actual
if [ -d "$APP_DIR" ] && [ "$(ls -A $APP_DIR)" ]; then
    print_status "Creando backup del despliegue anterior..."
    BACKUP_DIR="$APP_DIR.backup.$(date +%Y%m%d_%H%M%S)"
    sudo cp -r $APP_DIR $BACKUP_DIR
    print_status "Backup creado en: $BACKUP_DIR"
fi

# Mover archivos construidos
print_status "Desplegando archivos..."
sudo rm -rf $APP_DIR/*
sudo cp -r dist/* $APP_DIR/
sudo chown -R www-data:www-data $APP_DIR
sudo chmod -R 755 $APP_DIR

# Verificar configuración de Nginx
print_status "Verificando configuración de Nginx..."
if sudo nginx -t; then
    print_status "Configuración de Nginx válida"
else
    print_error "Error en la configuración de Nginx"
    exit 1
fi

# Reiniciar Nginx
print_status "Recargando Nginx..."
sudo systemctl reload nginx

# Limpiar backups antiguos (mantener solo los últimos 5)
print_status "Limpiando backups antiguos..."
sudo find /var/www -maxdepth 1 -type d -name "noble.backup.*" -mtime +30 -exec rm -rf {} \; 2>/dev/null || true

# Limpiar archivos temporales si se creó un directorio temporal
if [ "$TEMP_DIR" != "$(pwd)" ] && [ -d "$TEMP_DIR" ]; then
    print_status "Limpiando archivos temporales..."
    rm -rf $TEMP_DIR
fi

# Verificar que el sitio está funcionando
print_status "Verificando que el sitio está funcionando..."
sleep 2
if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200\|301\|302"; then
    print_status "Sitio respondiendo correctamente"
else
    print_warning "El sitio podría no estar respondiendo. Verifica los logs de Nginx."
fi

echo ""
echo -e "${GREEN}✅ Despliegue completado exitosamente!${NC}"
echo ""
echo "🌐 Tu aplicación está disponible en:"
echo "   - https://noble.com"
echo "   - https://www.noble.com"
echo ""
echo "📊 Información del despliegue:"
echo "   - Directorio: $APP_DIR"
echo "   - Tamaño: $(du -sh $APP_DIR | cut -f1)"
echo "   - Archivos: $(find $APP_DIR -type f | wc -l)"
echo ""
echo "📝 Comandos útiles:"
echo "   - Ver logs de Nginx: sudo tail -f /var/log/nginx/noble-error.log"
echo "   - Reiniciar Nginx: sudo systemctl restart nginx"
echo "   - Verificar estado: sudo systemctl status nginx"
echo ""

