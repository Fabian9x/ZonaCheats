# Instrucciones para Desplegar en GitHub Pages

## Opción 1: Usando el comando de deploy (Recomendado)

1. **Asegúrate de tener `gh-pages` instalado:**
   ```bash
   npm install
   ```

2. **Ejecuta el comando de deploy:**
   ```bash
   npm run deploy
   ```

   Este comando:
   - Hace build del proyecto (genera la carpeta `dist`)
   - Sube la carpeta `dist` a la rama `gh-pages` de tu repositorio

3. **Configura GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Click en **Settings** (Configuración)
   - En el menú lateral, busca **Pages**
   - En **Source** (Fuente), selecciona **Deploy from a branch**
   - Selecciona la rama `gh-pages` y la carpeta `/ (root)`
   - Click en **Save**

4. **Espera unos minutos** y tu página estará disponible en:
   `https://TU_USUARIO.github.io/ZonaCheats/`

## Opción 2: Usando GitHub Actions (Automático)

Si quieres que se despliegue automáticamente cada vez que hagas push, puedes configurar GitHub Actions.

## Notas Importantes:

- El nombre del repositorio debe ser exactamente `ZonaCheats` (con mayúscula)
- Si tu repositorio tiene otro nombre, actualiza `vite.config.js` con el nombre correcto
- Después del primer deploy, puede tardar 5-10 minutos en estar disponible
- Los cambios posteriores se actualizan automáticamente cuando ejecutes `npm run deploy`

