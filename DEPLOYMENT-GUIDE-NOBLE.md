# 🚀 Guía de Despliegue en Producción - Noble Architecture Studio

## 📋 Información del Proyecto

- **Dominio:** noble.com
- **Plataforma:** AWS EC2
- **Tipo de Instancia:** t3.micro (o superior)
- **Sistema Operativo:** Ubuntu 22.04 LTS
- **Servidor Web:** Nginx
- **SSL:** Let's Encrypt (Certbot)

---

## 🎯 Requisitos Previos

1. **Cuenta de AWS** con acceso a EC2
2. **Dominio noble.com** configurado y apuntando a la IP de EC2
3. **Clave SSH** para acceder a la instancia EC2
4. **Repositorio Git** con el código del proyecto

---

## 📦 Paso 1: Crear Instancia EC2

### Configuración Recomendada:

- **AMI:** Ubuntu Server 22.04 LTS
- **Instance Type:** t3.micro (mínimo) o t3.small (recomendado)
- **Storage:** 20GB mínimo (gp3)
- **Security Group:** 
  - HTTP (80) - TCP - 0.0.0.0/0
  - HTTPS (443) - TCP - 0.0.0.0/0
  - SSH (22) - TCP - Tu IP / 0.0.0.0/0 (restringir si es posible)

### Crear Instancia:

1. Ve a AWS Console → EC2 → Launch Instance
2. Selecciona Ubuntu Server 22.04 LTS
3. Elige t3.micro o t3.small
4. Configura Security Group con los puertos mencionados
5. Crea o selecciona un Key Pair
6. Lanza la instancia

---

## 🔧 Paso 2: Configuración Inicial del Servidor

### 2.1 Conectar a la Instancia

```bash
ssh -i "tu-key.pem" ubuntu@tu-ip-publica
```

### 2.2 Subir Scripts de Configuración

Desde tu máquina local:

```bash
# Subir script de configuración inicial
scp -i "tu-key.pem" ec2-setup-noble.sh ubuntu@tu-ip-publica:~/

# Subir configuración de Nginx
scp -i "tu-key.pem" nginx-noble.conf ubuntu@tu-ip-publica:~/

# Subir script de despliegue
scp -i "tu-key.pem" deploy-noble.sh ubuntu@tu-ip-publica:~/

# Subir script de dominio
scp -i "tu-key.pem" setup-domain-noble.sh ubuntu@tu-ip-publica:~/
```

### 2.3 Ejecutar Configuración Inicial

En el servidor:

```bash
# Dar permisos de ejecución
chmod +x ec2-setup-noble.sh
chmod +x deploy-noble.sh
chmod +x setup-domain-noble.sh

# Ejecutar configuración inicial
sudo bash ec2-setup-noble.sh
```

Esto instalará:
- Node.js 20.x
- Nginx
- Certbot (para SSL)
- Configura el firewall
- Crea directorios necesarios

---

## 🌐 Paso 3: Configurar Dominio y SSL

### 3.1 Configurar DNS

En tu proveedor de DNS (Route 53, Cloudflare, etc.), crea los siguientes registros:

```
Tipo: A
Nombre: @ (o noble.com)
Valor: [IP pública de tu instancia EC2]
TTL: 300

Tipo: A
Nombre: www
Valor: [IP pública de tu instancia EC2]
TTL: 300
```

### 3.2 Ejecutar Script de Dominio

En el servidor:

```bash
sudo bash setup-domain-noble.sh
```

Este script:
- Configura Nginx para noble.com
- Verifica que DNS esté propagado
- Obtiene certificado SSL de Let's Encrypt
- Configura renovación automática

**Nota:** Asegúrate de que los registros DNS estén configurados antes de ejecutar este script.

---

## 🚀 Paso 4: Desplegar la Aplicación

### 4.1 Configurar Acceso Git (Opcional)

Si tu repositorio es privado, configura SSH keys:

```bash
# Generar SSH key
ssh-keygen -t ed25519 -C "deploy@noble.com"

# Agregar clave pública a GitHub/GitLab
cat ~/.ssh/id_ed25519.pub

# Probar conexión
ssh -T git@github.com
```

### 4.2 Desplegar

```bash
# Si es la primera vez, clonar el repositorio
git clone git@github.com:gerardoriarte-bt/Noble.git
cd Noble

# Ejecutar script de despliegue
bash deploy-noble.sh
```

El script:
- Actualiza el código desde Git
- Instala dependencias
- Construye la aplicación para producción
- Crea backup del despliegue anterior
- Despliega archivos en `/var/www/noble`
- Recarga Nginx

---

## 🔄 Actualizaciones Futuras

Para actualizar la aplicación después del despliegue inicial:

```bash
cd ~/Noble  # o donde esté tu repositorio
git pull origin main  # o master
bash deploy-noble.sh
```

---

## 📊 Verificación

### Verificar que el sitio funciona:

```bash
# Desde el servidor
curl -I https://noble.com

# Desde tu máquina local
curl -I https://noble.com
```

### Verificar certificado SSL:

```bash
sudo certbot certificates
```

### Ver logs de Nginx:

```bash
# Logs de acceso
sudo tail -f /var/log/nginx/noble-access.log

# Logs de errores
sudo tail -f /var/log/nginx/noble-error.log
```

---

## 🛠️ Comandos Útiles

### Nginx

```bash
# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx

# Recargar configuración (sin downtime)
sudo systemctl reload nginx

# Ver estado
sudo systemctl status nginx
```

### Certbot (SSL)

```bash
# Renovar certificado manualmente
sudo certbot renew

# Ver certificados instalados
sudo certbot certificates

# Forzar renovación
sudo certbot renew --force-renewal
```

### Aplicación

```bash
# Ver tamaño del despliegue
du -sh /var/www/noble

# Ver archivos desplegados
ls -lah /var/www/noble

# Ver backups
ls -lah /var/www/noble.backup.*
```

### Sistema

```bash
# Ver uso de disco
df -h

# Ver uso de memoria
free -h

# Ver procesos de Node
ps aux | grep node
```

---

## 🔒 Seguridad

### Firewall (UFW)

```bash
# Ver reglas activas
sudo ufw status

# Permitir puertos específicos
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Actualizar Sistema

```bash
sudo apt update
sudo apt upgrade -y
```

### Limpiar Backups Antiguos

Los backups se limpian automáticamente después de 30 días, pero puedes hacerlo manualmente:

```bash
sudo find /var/www -maxdepth 1 -type d -name "noble.backup.*" -mtime +30 -exec rm -rf {} \;
```

---

## 🚨 Solución de Problemas

### Error 502 Bad Gateway

```bash
# Verificar que Nginx está corriendo
sudo systemctl status nginx

# Verificar permisos
sudo chown -R www-data:www-data /var/www/noble
sudo chmod -R 755 /var/www/noble

# Reiniciar Nginx
sudo systemctl restart nginx
```

### Error de Permisos

```bash
sudo chown -R www-data:www-data /var/www/noble
sudo chmod -R 755 /var/www/noble
```

### Certificado SSL no funciona

```bash
# Verificar que DNS está configurado
dig noble.com

# Verificar que puertos están abiertos
sudo ufw status

# Reinstalar certificado
sudo certbot --nginx -d noble.com -d www.noble.com --force-renewal
```

### El sitio no carga después del despliegue

```bash
# Verificar que los archivos están en el lugar correcto
ls -lah /var/www/noble

# Verificar logs de Nginx
sudo tail -50 /var/log/nginx/noble-error.log

# Verificar configuración de Nginx
sudo nginx -t
```

---

## 📈 Monitoreo y Mantenimiento

### Renovación Automática de SSL

Certbot configura automáticamente la renovación. Verificar:

```bash
sudo systemctl status certbot.timer
```

### Backups

Los backups se crean automáticamente en cada despliegue en:
```
/var/www/noble.backup.YYYYMMDD_HHMMSS
```

### Logs

Los logs se guardan en:
- Acceso: `/var/log/nginx/noble-access.log`
- Errores: `/var/log/nginx/noble-error.log`

---

## 💰 Costos Estimados

- **t3.micro:** ~$7-10/mes (Free Tier: 750 horas/mes gratis el primer año)
- **t3.small:** ~$15-20/mes
- **Storage (20GB):** ~$2/mes
- **Data Transfer:** Variable (primeros 100GB gratis)
- **Total estimado (t3.micro):** ~$10-15/mes
- **Total estimado (t3.small):** ~$20-25/mes

---

## 📞 Soporte

Si encuentras problemas:

1. Verifica los logs de Nginx
2. Verifica que los Security Groups están configurados
3. Verifica que DNS apunta correctamente
4. Verifica que Nginx está ejecutándose
5. Verifica permisos de archivos

---

## ✅ Checklist de Despliegue

- [ ] Instancia EC2 creada y configurada
- [ ] Security Groups configurados (80, 443, 22)
- [ ] Conectado a la instancia vía SSH
- [ ] Scripts de configuración subidos
- [ ] Configuración inicial ejecutada
- [ ] DNS configurado (A records para noble.com y www.noble.com)
- [ ] Script de dominio ejecutado
- [ ] Certificado SSL obtenido
- [ ] Repositorio clonado en el servidor
- [ ] Script de despliegue ejecutado
- [ ] Sitio accesible en https://noble.com
- [ ] Renovación automática de SSL configurada

---

**Última actualización:** Diciembre 2024

