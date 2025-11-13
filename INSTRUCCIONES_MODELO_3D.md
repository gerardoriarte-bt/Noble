# Instrucciones para Implementar el Modelo 3D de la Roca

## 📁 **Paso 1: Subir Archivos**

Coloca tus archivos en la siguiente ubicación:

```
public/models/
├── rock-model.obj          # Tu archivo OBJ
├── rock-model.mtl          # Tu archivo MTL
└── [texturas si las hay]   # Archivos JPG/PNG de texturas
```

## 🔧 **Paso 2: Actualizar el Componente Hero**

Una vez que hayas subido los archivos, necesitarás actualizar el componente Hero para usar el nuevo modelo.

### Opción A: Solo OBJ (sin materiales MTL)
```tsx
// En components/Hero.tsx, línea 45, cambiar:
<RockModel />
// Por:
<CustomRockModel />
```

### Opción B: OBJ + MTL (con materiales)
```tsx
// En components/Hero.tsx, línea 45, cambiar:
<RockModel />
// Por:
<RockModelWithMTL />
```

## 📋 **Paso 3: Verificar Archivos**

Asegúrate de que:
- ✅ Los archivos estén en `public/models/`
- ✅ Los nombres coincidan exactamente: `rock-model.obj` y `rock-model.mtl`
- ✅ Las texturas (si las hay) estén en la misma carpeta
- ✅ Los archivos MTL referencien correctamente las texturas

## 🎨 **Paso 4: Personalizar (Opcional)**

Si quieres ajustar el modelo, puedes modificar:

### Escala del Modelo
```tsx
// En el componente, cambiar:
scale={1.2}
// Por el valor que prefieras
```

### Velocidad de Rotación
```tsx
// Cambiar estos valores:
meshRef.current.rotation.y += delta * 0.1;  // Rotación Y
meshRef.current.rotation.x += delta * 0.05; // Rotación X
```

### Sensibilidad del Mouse
```tsx
// Cambiar estos valores:
const targetX = mouse.x * 0.2;  // Sensibilidad horizontal
const targetY = mouse.y * 0.2;  // Sensibilidad vertical
```

## 🚀 **Paso 5: Probar**

1. Sube los archivos a `public/models/`
2. Actualiza el componente Hero
3. Reinicia el servidor si es necesario
4. Verifica que el modelo se cargue correctamente

## ⚠️ **Notas Importantes**

- **Nombres de archivos**: Deben coincidir exactamente con los del código
- **Rutas**: Los archivos deben estar en `public/models/`
- **Texturas**: Si usas texturas, asegúrate de que el archivo MTL las referencie correctamente
- **Tamaño**: Para mejor rendimiento, el modelo no debería superar los 5MB

## 🔍 **Solución de Problemas**

### El modelo no se carga:
- Verifica que los archivos estén en la ubicación correcta
- Revisa la consola del navegador para errores
- Asegúrate de que los nombres de archivo coincidan

### El modelo se ve muy grande/pequeño:
- Ajusta el valor `scale` en el componente
- Valores recomendados: 0.5 a 3.0

### El modelo no tiene texturas:
- Verifica que el archivo MTL esté correctamente configurado
- Asegúrate de que las texturas estén en la misma carpeta
- Revisa las rutas en el archivo MTL

---

**¿Necesitas ayuda?** Una vez que subas los archivos, puedo ayudarte a implementar el modelo y ajustar cualquier configuración necesaria.


