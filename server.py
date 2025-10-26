#!/usr/bin/env python3
"""
Servidor HTTP simple para desarrollo local
Soluciona problemas de CORS al abrir archivos HTML directamente
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuración del servidor
PORT = 8000
HOST = "localhost"

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler que añade headers CORS para permitir fetch desde archivos locales"""
    
    def end_headers(self):
        # Headers CORS para permitir fetch
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        # Manejar preflight requests
        self.send_response(200)
        self.end_headers()

def main():
    """Función principal del servidor"""
    
    # Cambiar al directorio del proyecto
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    print("🚀 Iniciando servidor local...")
    print(f"📁 Directorio: {script_dir}")
    print(f"🌐 URL: http://{HOST}:{PORT}")
    print("=" * 50)
    
    try:
        # Crear el servidor
        with socketserver.TCPServer((HOST, PORT), CORSHTTPRequestHandler) as httpd:
            print(f"✅ Servidor iniciado en http://{HOST}:{PORT}")
            print("📖 Abriendo navegador automáticamente...")
            print("⏹️  Presiona Ctrl+C para detener el servidor")
            print("=" * 50)
            
            # Abrir navegador automáticamente
            webbrowser.open(f"http://{HOST}:{PORT}")
            
            # Iniciar servidor
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido por el usuario")
    except OSError as e:
        if e.errno == 48:  # Puerto en uso
            print(f"❌ Error: Puerto {PORT} ya está en uso")
            print("💡 Intenta con otro puerto o cierra la aplicación que lo usa")
        else:
            print(f"❌ Error del servidor: {e}")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")

if __name__ == "__main__":
    main()
