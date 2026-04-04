"""
Descarga las respuestas del formulario desde Google Sheets y
regenera data/pumas.csv (sin la columna Nombre).

════════════════════════════════════════════════════════════
 CONFIGURACIÓN INICIAL (solo la primera vez)
════════════════════════════════════════════════════════════

 1. Ve a https://console.cloud.google.com
 2. Crea un proyecto (o usa uno existente)
 3. Activa la API: "APIs & Services" → "Enable APIs" → busca
    "Google Sheets API" → Habilitar
 4. Crea credenciales OAuth2:
    "APIs & Services" → "Credentials" → "Create Credentials"
    → "OAuth client ID" → tipo: "Desktop app"
 5. Descarga el JSON y guárdalo como:
       ~/.config/tpumas/credentials.json
 6. La primera vez que ejecutes el script se abrirá el navegador
    para autenticarte con tu cuenta Google. El token se guarda en
       ~/.config/tpumas/token.json
    y no habrá que volver a autenticarse.

════════════════════════════════════════════════════════════

Uso:
    poetry run python scripts/update_from_sheets.py

    # Vista previa sin escribir el CSV:
    poetry run python scripts/update_from_sheets.py --dry-run
"""

import csv
import sys
from pathlib import Path

SHEET_ID     = "1Cyk091Je0RS_IUg34C7bfhZkyXS0q5DohinJeO_ve7s"
OUTPUT       = Path(__file__).resolve().parent.parent / "data" / "pumas.csv"
CONFIG_DIR   = Path.home() / ".config" / "tpumas"
CREDENTIALS  = CONFIG_DIR / "credentials.json"
TOKEN_PATH   = CONFIG_DIR / "authorized_user.json"

DEFAULT_COLOR = "Rojo"

PAIS_EXCEPTIONS = {
    "Helsinki": "Finlandia",
}

# Nombres de columna que puede usar el formulario
COL_CIUDAD = ("Ciudad", "ciudad")
COL_PAIS   = ("País", "Pais", "País", "pais", "país")
COL_MOTOR  = ("Motor", "motor")
COL_COLOR  = ("Color", "color")
# Columnas a ignorar
COL_SKIP   = {"Marca de tiempo", "Timestamp", "Nombre", "nombre"}


def get_col(row: dict, candidates: tuple) -> str:
    for key in candidates:
        if key in row:
            val = str(row[key]).strip() if row[key] is not None else ""
            if val and val.lower() != "nan":
                return val
    return ""


def ciudad_to_pais(ciudad: str) -> str:
    return PAIS_EXCEPTIONS.get(ciudad, "España")


def process_rows(records: list[dict]) -> list[dict]:
    output, skipped = [], 0
    for row in records:
        ciudad = get_col(row, COL_CIUDAD)
        pais   = get_col(row, COL_PAIS) or ciudad_to_pais(ciudad)
        motor  = get_col(row, COL_MOTOR).removeprefix("Puma ").strip()
        color  = get_col(row, COL_COLOR) or DEFAULT_COLOR

        if not ciudad or not motor:
            skipped += 1
            continue

        output.append({"ciudad": ciudad, "país": pais, "motor": motor, "color": color})

    if skipped:
        print(f"  {skipped} fila(s) omitida(s) por campos vacíos")
    return output


def main() -> None:
    dry_run = "--dry-run" in sys.argv

    try:
        import gspread
        from google.oauth2.credentials import Credentials
        from google_auth_oauthlib.flow import InstalledAppFlow
        from google.auth.transport.requests import Request
    except ImportError:
        print("Faltan dependencias. Ejecuta: poetry install", file=sys.stderr)
        sys.exit(1)

    if not CREDENTIALS.exists():
        print(
            f"No se encontró el archivo de credenciales.\n"
            f"Descárgalo de Google Cloud Console y guárdalo en:\n"
            f"  {CREDENTIALS}",
            file=sys.stderr,
        )
        sys.exit(1)

    # ── Auth ──────────────────────────────────────────────
    SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    creds = None
    if TOKEN_PATH.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(str(CREDENTIALS), SCOPES)
            creds = flow.run_local_server(port=0)
        CONFIG_DIR.mkdir(parents=True, exist_ok=True)
        TOKEN_PATH.write_text(creds.to_json())

    # ── Fetch ──────────────────────────────────────────────
    print("Conectando con Google Sheets...")
    gc     = gspread.authorize(creds)
    sheet  = gc.open_by_key(SHEET_ID).sheet1
    records = sheet.get_all_records()
    print(f"  {len(records)} filas descargadas")

    # ── Process ────────────────────────────────────────────
    rows = process_rows(records)

    if dry_run:
        print("\n── Vista previa (--dry-run, no se escribe nada) ──")
        for r in rows:
            print(f"  {r}")
        return

    # ── Write ──────────────────────────────────────────────
    with OUTPUT.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["ciudad", "país", "motor", "color"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"✓ {len(rows)} filas escritas en {OUTPUT}")


if __name__ == "__main__":
    main()
