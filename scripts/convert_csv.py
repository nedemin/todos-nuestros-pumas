"""
Convierte car_list.csv (privado) al formato pumas.csv (público).

Transformaciones:
  - Elimina la columna Nombre (datos privados)
  - Poblacion  → ciudad
  - Motor      → motor  (quita el prefijo "Puma ")
  - Color      → color
  - Añade la columna país según la ciudad

Uso:
    python scripts/convert_csv.py [ruta_entrada] [ruta_salida]

Valores por defecto:
    entrada : ~/puma-locations/car_list.csv
    salida  : data/pumas.csv
"""

import csv
import sys
from pathlib import Path

# ── Rutas por defecto ──────────────────────────────────────────────────────────
DEFAULT_INPUT  = Path("~/puma-locations/car_list.csv")
DEFAULT_OUTPUT = Path(__file__).resolve().parent.parent / "data" / "pumas.csv"

# ── Ciudad → país (todo España salvo excepciones) ──────────────────────────────
PAIS_EXCEPTIONS = {
    "Helsinki": "Finlandia",
}
DEFAULT_PAIS = "España"


def ciudad_to_pais(ciudad: str) -> str:
    return PAIS_EXCEPTIONS.get(ciudad, DEFAULT_PAIS)


def convert(input_path: Path, output_path: Path) -> None:
    with input_path.open(encoding="utf-8") as fin:
        reader = csv.DictReader(fin)
        rows = list(reader)

    skipped = 0
    output_rows = []
    for row in rows:
        ciudad = row["Poblacion"].strip()
        motor  = row["Motor"].strip().removeprefix("Puma ").strip()
        color  = row["Color"].strip() or "Rojo"

        if not ciudad or not motor:
            skipped += 1
            continue

        output_rows.append({
            "ciudad": ciudad,
            "país":   ciudad_to_pais(ciudad),
            "motor":  motor,
            "color":  color,
        })

    with output_path.open("w", encoding="utf-8", newline="") as fout:
        writer = csv.DictWriter(fout, fieldnames=["ciudad", "país", "motor", "color"])
        writer.writeheader()
        writer.writerows(output_rows)

    print(f"✓ {len(output_rows)} filas escritas en {output_path}")
    if skipped:
        print(f"  {skipped} fila(s) omitida(s) por campos vacíos")


if __name__ == "__main__":
    input_path  = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_INPUT
    output_path = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_OUTPUT
    convert(input_path, output_path)
