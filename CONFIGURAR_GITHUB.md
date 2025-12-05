# Configurar GitHub para Deploy

## Paso 1: Inicializar Git (si no lo has hecho)

Ya se inicializó el repositorio Git. Ahora necesitas:

## Paso 2: Conectar con tu repositorio de GitHub

Necesitas la URL de tu repositorio. Debe ser algo como:
`https://github.com/TU_USUARIO/ZonaCheats.git`

**Ejecuta este comando reemplazando TU_USUARIO con tu usuario de GitHub:**

```bash
git remote add origin https://github.com/TU_USUARIO/ZonaCheats.git
```

## Paso 3: Agregar y hacer commit de los archivos

```bash
git add .
git commit -m "Initial commit"
```

## Paso 4: Subir a GitHub

```bash
git branch -M main
git push -u origin main
```

## Paso 5: Ejecutar el deploy

Una vez que todo esté subido, ejecuta:

```bash
npm run deploy
```

Este comando:
1. Compilará tu proyecto
2. Subirá la carpeta `dist` a la rama `gh-pages`
3. GitHub Pages se activará automáticamente

## Paso 6: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: `gh-pages` branch
4. Folder: `/ (root)`
5. Save

¡Listo! Tu página estará en: `https://TU_USUARIO.github.io/ZonaCheats/`

