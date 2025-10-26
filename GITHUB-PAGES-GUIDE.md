# 🚀 Guía de Despliegue en GitHub Pages

## 📋 Pasos para Subir tu Página a GitHub Pages

### 1. Preparar el Repositorio

#### Opción A: Crear Nuevo Repositorio
1. Ve a [GitHub.com](https://github.com) y haz clic en **"New repository"**
2. Nombre del repositorio: `tu-pagina-web` (o el nombre que prefieras)
3. Descripción: `Página web de Zona Cheats - Gaming Tools & Cheats`
4. Marca como **Público** (requerido para GitHub Pages gratuito)
5. **NO** marques "Add a README file" (ya tenemos uno)
6. Haz clic en **"Create repository"**

#### Opción B: Usar Repositorio Existente
1. Ve a tu repositorio existente
2. Asegúrate de que sea **público**

### 2. Subir los Archivos

#### Usando GitHub Desktop (Recomendado para principiantes)
1. Descarga [GitHub Desktop](https://desktop.github.com/)
2. Instala y configura con tu cuenta de GitHub
3. Clona tu repositorio
4. Copia todos los archivos de `mi-pagina-web/` al repositorio
5. Haz commit y push

#### Usando Git por Terminal
```bash
# Navegar a la carpeta del proyecto
cd mi-pagina-web

# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit: Zona Cheats website"

# Agregar el repositorio remoto (cambia por tu usuario y repositorio)
git remote add origin https://github.com/tu-usuario/tu-repositorio.git

# Subir al repositorio
git push -u origin main
```

#### Usando la Interfaz Web de GitHub
1. Ve a tu repositorio en GitHub
2. Haz clic en **"uploading an existing file"**
3. Arrastra todos los archivos de `mi-pagina-web/`
4. Escribe un mensaje de commit: `Initial commit: Zona Cheats website`
5. Haz clic en **"Commit changes"**

### 3. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **"Settings"**
3. Desplázate hacia abajo hasta **"Pages"** en el menú lateral
4. En **"Source"**, selecciona **"Deploy from a branch"**
5. En **"Branch"**, selecciona **"main"** (o **"master"**)
6. En **"Folder"**, selecciona **"/ (root)"**
7. Haz clic en **"Save"**

### 4. Acceder a tu Página

- **URL de tu página**: `https://tu-usuario.github.io/tu-repositorio`
- **Tiempo de activación**: 5-10 minutos
- **Estado**: Aparecerá un checkmark verde cuando esté listo

### 5. Personalizar la URL (Opcional)

#### Dominio Personalizado
1. Compra un dominio (ej: `zonacheats.com`)
2. En la configuración de Pages, agrega tu dominio
3. Configura los DNS de tu dominio para apuntar a GitHub Pages

#### Subdominio Personalizado
1. Usa un subdominio de un servicio gratuito
2. Configura redirección a tu página de GitHub Pages

## 🔧 Configuración Adicional

### Actualizar URLs en los Archivos

Después de subir, actualiza estos archivos con tu URL real:

#### `_config.yml`
```yaml
url: "https://tu-usuario.github.io/tu-repositorio"
```

#### `robots.txt`
```
Sitemap: https://tu-usuario.github.io/tu-repositorio/sitemap.xml
```

#### `sitemap.xml`
```xml
<loc>https://tu-usuario.github.io/tu-repositorio/</loc>
```

### Configurar Dominio Personalizado

1. En tu repositorio, ve a **Settings > Pages**
2. En **Custom domain**, escribe tu dominio
3. Marca **"Enforce HTTPS"**
4. Configura los DNS de tu dominio:
   ```
   CNAME: tu-dominio.com -> tu-usuario.github.io
   ```

## 📊 Monitoreo y Estadísticas

### GitHub Insights
- Ve a **Insights > Traffic** en tu repositorio
- Ve estadísticas de visitas y clonaciones

### Google Analytics (Opcional)
1. Crea una cuenta en [Google Analytics](https://analytics.google.com/)
2. Obtén tu código de seguimiento
3. Agrega el código a `index.html` y `productos.html`

### Google Search Console
1. Ve a [Google Search Console](https://search.google.com/search-console/)
2. Agrega tu sitio web
3. Verifica la propiedad
4. Envía tu sitemap

## 🚨 Solución de Problemas

### La página no carga
- ✅ Verifica que el repositorio sea **público**
- ✅ Espera 10-15 minutos para la activación
- ✅ Revisa que `index.html` esté en la raíz
- ✅ Verifica que no haya errores en el código

### Errores 404
- ✅ Asegúrate de que `404.html` esté en la raíz
- ✅ Verifica las rutas de los archivos
- ✅ Usa rutas relativas (sin `/` al inicio)

### Imágenes no cargan
- ✅ Verifica que las imágenes estén en el repositorio
- ✅ Usa rutas relativas: `images/imagen.jpg`
- ✅ Verifica que los nombres de archivo sean correctos

### CSS/JS no funciona
- ✅ Verifica que los archivos estén en el repositorio
- ✅ Usa rutas relativas: `css/style.css`
- ✅ Revisa la consola del navegador para errores

## 🔄 Actualizaciones

### Para actualizar tu página:
1. Modifica los archivos localmente
2. Haz commit y push a GitHub
3. Los cambios se reflejan automáticamente en 1-2 minutos

### Comandos útiles:
```bash
# Ver estado
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción del cambio"

# Subir cambios
git push origin main
```

## 📱 Optimizaciones Adicionales

### Performance
- ✅ Comprime las imágenes
- ✅ Minifica CSS y JS
- ✅ Usa CDN para recursos externos

### SEO
- ✅ Agrega meta tags únicos a cada página
- ✅ Usa títulos descriptivos
- ✅ Optimiza las imágenes con alt text

### Accesibilidad
- ✅ Usa alt text en imágenes
- ✅ Mantén buen contraste de colores
- ✅ Usa etiquetas semánticas

---

## 🎉 ¡Listo!

Tu página estará disponible en:
**https://tu-usuario.github.io/tu-repositorio**

¡Disfruta de tu página web gratuita en GitHub Pages! 🚀
