# 🚀 Servidor Local para Desarrollo

## ❌ Problema
Al abrir archivos HTML directamente desde el sistema de archivos (`file://`), el navegador bloquea las peticiones `fetch` por políticas de CORS, causando errores como:

```
Access to fetch at 'file:///...' from origin 'null' has been blocked by CORS policy
```

## ✅ Solución
Usar un servidor HTTP local que permite las peticiones `fetch` sin restricciones de CORS.

## 🛠️ Instalación y Uso

### Opción 1: Archivo Batch (Windows) - RECOMENDADO
1. **Doble clic** en `start-server.bat`
2. El servidor se iniciará automáticamente
3. Se abrirá el navegador en `http://localhost:8000`

### Opción 2: Python Manual
1. **Abrir terminal** en la carpeta del proyecto
2. **Ejecutar comando**:
   ```bash
   python server.py
   ```
3. **Abrir navegador** en `http://localhost:8000`

### Opción 3: Python con puerto personalizado
```bash
python -m http.server 3000
```

## 📁 Estructura del Proyecto
```
mi-pagina-web/
├── index.html          # Página principal
├── productos.html      # Página de productos
├── components/
│   ├── nav.html        # Componente navegación
│   └── footer.html     # Componente footer
├── js/
│   ├── simple-loader.js # Cargador de componentes
│   ├── app.js          # JavaScript principal
│   └── products.js     # JavaScript productos
├── css/
│   ├── style.css       # Estilos principales
│   └── products.css    # Estilos productos
├── server.py           # Servidor Python
└── start-server.bat    # Script Windows
```

## 🌐 URLs Disponibles
- **Página principal**: `http://localhost:8000/index.html`
- **Productos**: `http://localhost:8000/productos.html`
- **Componentes**: `http://localhost:8000/components/nav.html`

## 🔧 Características del Servidor
- ✅ **Headers CORS** - Permite fetch desde archivos locales
- ✅ **Auto-apertura** - Abre navegador automáticamente
- ✅ **Puerto 8000** - Puerto estándar para desarrollo
- ✅ **Manejo de errores** - Mensajes claros de error
- ✅ **Cross-platform** - Funciona en Windows, Mac, Linux

## 🛑 Detener el Servidor
- **Presionar** `Ctrl + C` en la terminal
- **Cerrar** la ventana de comandos

## 🐛 Solución de Problemas

### Puerto en uso
```
❌ Error: Puerto 8000 ya está en uso
```
**Solución**: Cambiar puerto o cerrar aplicación que lo usa

### Python no encontrado
```
❌ Error: Python no está instalado
```
**Solución**: Instalar Python desde https://python.org

### Archivos no cargan
**Verificar**:
- ✅ Servidor está ejecutándose
- ✅ URL correcta (`http://localhost:8000`)
- ✅ Archivos existen en la carpeta

## 📝 Notas Importantes
- **Siempre usar** el servidor local para desarrollo
- **No abrir** archivos HTML directamente desde el explorador
- **El servidor** debe estar ejecutándose para que los componentes funcionen
- **Cambios en archivos** se reflejan inmediatamente (no necesita reiniciar servidor)
