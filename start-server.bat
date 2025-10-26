@echo off
echo ========================================
echo    SERVIDOR LOCAL PARA DESARROLLO
echo ========================================
echo.
echo Iniciando servidor HTTP local...
echo Esto solucionara los problemas de CORS
echo.

REM Verificar si Python esta instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Python no esta instalado
    echo 💡 Instala Python desde: https://python.org
    echo.
    pause
    exit /b 1
)

REM Ejecutar el servidor
echo ✅ Python encontrado, iniciando servidor...
echo.
python server.py

REM Si hay error, mostrar mensaje
if %errorlevel% neq 0 (
    echo.
    echo ❌ Error al iniciar el servidor
    echo 💡 Verifica que el puerto 8000 este libre
    echo.
)

pause
