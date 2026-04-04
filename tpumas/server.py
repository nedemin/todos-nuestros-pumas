"""
Servidor local para Todos nuestros Pumas.

Uso:
    poetry run serve [puerto]        # por defecto: 8080

Abre automáticamente el navegador en http://localhost:<puerto>
"""

import http.server
import os
import sys
import threading
import webbrowser
from pathlib import Path

# Directorio raíz del proyecto (un nivel por encima de este archivo)
ROOT = Path(__file__).resolve().parent.parent


def main() -> None:
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

    # Servir desde la raíz del proyecto
    os.chdir(ROOT)

    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, format, *args):  # noqa: D102
            print(f"  {self.address_string()} → {format % args}")

    url = f"http://localhost:{port}"

    with http.server.HTTPServer(("", port), QuietHandler) as httpd:
        print(f"Todos nuestros Pumas · {url}")
        print("Pulsa Ctrl+C para detener.\n")
        # Abrir el navegador en un hilo separado para no bloquear el servidor
        threading.Timer(0.5, webbrowser.open, args=[url]).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")


if __name__ == "__main__":
    main()
