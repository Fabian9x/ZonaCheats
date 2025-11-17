# Cómo eliminar node_modules del repositorio Git

Si ya subiste `node_modules` por error, sigue estos pasos:

1. Eliminar `node_modules` del índice de Git (pero mantenerlo localmente):
```bash
git rm -r --cached node_modules
```

2. Hacer commit del cambio:
```bash
git commit -m "Remove node_modules from repository"
```

3. Subir los cambios:
```bash
git push
```

**Importante:** El archivo `.gitignore` ya está configurado para que `node_modules` no se suba en el futuro.

