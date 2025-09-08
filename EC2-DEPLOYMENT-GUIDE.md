# 🚀 Guía de Despliegue en AWS EC2 - Noble Architecture Studio

## 📋 Pasos para Desplegar

### 1. **Crear Instancia EC2**
- **AMI:** Ubuntu Server 22.04 LTS
- **Instance Type:** t3.medium (2 vCPU, 4GB RAM)
- **Security Group:** HTTP (80), HTTPS (443), SSH (22)
- **Storage:** 20GB mínimo

### 2. **Conectar a la Instancia**
```bash
ssh -i "tu-key.pem" ubuntu@tu-ip-publica
```

### 3. **Configuración Inicial del Servidor**
```bash
# Subir el script de configuración
scp -i "tu-key.pem" ec2-setup.sh ubuntu@tu-ip-publica:~/

# Conectar y ejecutar
ssh -i "tu-key.pem" ubuntu@tu-ip-publica
bash ec2-setup.sh
```

### 4. **Desplegar la Aplicación**
```bash
# Subir el script de despliegue
scp -i "tu-key.pem" deploy.sh ubuntu@tu-ip-publica:~/

# Ejecutar despliegue
bash deploy.sh
```

### 5. **Configurar Dominio y SSL (Opcional)**
```bash
# Subir el script de dominio
scp -i "tu-key.pem" setup-domain.sh ubuntu@tu-ip-publica:~/

# Ejecutar configuración de dominio
bash setup-domain.sh
```

## 🔧 Comandos Útiles

### **Reiniciar Nginx**
```bash
sudo systemctl restart nginx
```

### **Ver logs de Nginx**
```bash
sudo tail -f /var/log/nginx/error.log
```

### **Verificar estado de servicios**
```bash
sudo systemctl status nginx
```

### **Actualizar aplicación**
```bash
bash deploy.sh
```

## 🌐 URLs de Acceso

- **Sin dominio:** `http://tu-ip-publica`
- **Con dominio:** `https://tu-dominio.com`

## 📁 Estructura de Archivos en el Servidor

```
/var/www/noble/
├── dist/                 # Archivos construidos
├── index.html           # Página principal
└── assets/              # CSS, JS, imágenes
```

## 🔒 Seguridad

- SSL automático con Let's Encrypt
- Renovación automática de certificados
- Headers de seguridad configurados
- Compresión gzip habilitada

## 🚨 Solución de Problemas

### **Error 502 Bad Gateway**
```bash
sudo systemctl restart nginx
```

### **Error de permisos**
```bash
sudo chown -R www-data:www-data /var/www/noble
sudo chmod -R 755 /var/www/noble
```

### **Verificar configuración de Nginx**
```bash
sudo nginx -t
```

## 💰 Costos Estimados

- **t3.medium:** ~$30/mes
- **Storage (20GB):** ~$2/mes
- **Data Transfer:** Variable
- **Total estimado:** ~$35/mes

## 📞 Soporte

Si encuentras problemas, verifica:
1. Security Groups están configurados correctamente
2. DNS apunta a la IP correcta
3. Nginx está ejecutándose
4. Archivos están en `/var/www/noble/dist/`
