# Copyright (C) 2026  Nedemin
# SPDX-License-Identifier: GPL-3.0-or-later
# This file is part of Todos Nuestros Pumas.
# See the LICENSE file in the project root for the full license text.

"""
Servidor local para Todos Nuestros Pumas.

Uso:
    poetry run serve [puerto]        # por defecto: 8080, solo localhost
    poetry run serve [puerto] --lan  # accesible en la red local (móvil, tablet)

Abre automáticamente el navegador en http://localhost:<puerto>
Cuando se usa --lan, también imprime la URL accesible desde otros
dispositivos en la misma red WiFi.
"""

import http.server
import os
import socket
import sys
import threading
import webbrowser
from pathlib import Path

# Directorio raíz del proyecto (un nivel por encima de este archivo)
ROOT = Path(__file__).resolve().parent.parent


def lan_ip() -> str | None:
    """Devuelve la IP de la interfaz de red local (None si no hay)."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        return s.getsockname()[0]
    except OSError:
        return None
    finally:
        s.close()


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}

    port = int(args[0]) if args else 8080
    lan_mode = "--lan" in flags
    bind = "" if lan_mode else "127.0.0.1"

    # Servir desde la raíz del proyecto
    os.chdir(ROOT)

    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, format, *args):  # noqa: D102
            print(f"  {self.address_string()} → {format % args}")

    url = f"http://localhost:{port}"

    with http.server.HTTPServer((bind, port), QuietHandler) as httpd:
        print(f"Todos Nuestros Pumas · {url}")
        if lan_mode:
            ip = lan_ip()
            if ip:
                print(f"Red local · http://{ip}:{port}")
        print("Pulsa Ctrl+C para detener.\n")
        # Abrir el navegador en un hilo separado para no bloquear el servidor
        threading.Timer(0.5, webbrowser.open, args=[url]).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")


if __name__ == "__main__":
    main()
