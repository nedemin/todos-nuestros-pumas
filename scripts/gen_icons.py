"""
Genera los iconos PNG de colores para la carpeta /icons.

Toma puma_plateado.png como silueta base (escala de grises neutra) y
recoloriza cada píxel visible aplicando el color destino sobre la
luminancia original con corrección gamma (γ = 0.85) y realce de
brillos especulares, tal como describe SPECS.md.

El resultado se guarda a 120×48 px (2× retina); Leaflet lo renderiza
a 60×24 px CSS.

Uso:
    python scripts/gen_icons.py          # genera solo los que faltan
    python scripts/gen_icons.py --all    # regenera todos
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image

ICONS_DIR = Path(__file__).resolve().parent.parent / "icons"
BASE_ICON  = ICONS_DIR / "puma_plateado.png"
GAMMA      = 0.85

# Color destino por nombre (RGB 0-255) — debe coincidir con COLOR_MAP de index.html
# Colores con icono propio generado por colorización
COLORS: dict[str, tuple[int, int, int]] = {
    "rojo":          (231,  76,  60),
    "verde":         ( 39, 174,  96),
    "negro":         ( 44,  62,  80),
    "blanco":        (236, 240, 241),
    "amarillo":      (241, 196,  15),
    "azul_imperial": ( 52, 107, 172),
    "plateado":      (189, 195, 199),
}

# Aliases: usan el mismo PNG que otro color
ALIASES: dict[str, str] = {
    "gris":  "plateado",   # gris ≈ plateado
    "plata": "plateado",   # plata ≈ plateado
    "azul":  "azul_imperial",
}


def colorize(base: np.ndarray, target_rgb: tuple[int, int, int]) -> np.ndarray:
    """Recoloriza una imagen RGBA usando la luminancia de la base."""
    r, g, b = (base[:, :, c].astype(np.float32) / 255.0 for c in range(3))
    alpha = base[:, :, 3]

    # Luminancia perceptual
    lum = 0.299 * r + 0.587 * g + 0.114 * b

    # Corrección gamma
    lum_g = np.power(np.clip(lum, 0, 1), GAMMA)

    tr, tg, tb = (c / 255.0 for c in target_rgb)

    # Multiplicación de luminancia con el color destino
    out_r = np.clip(lum_g * tr, 0, 1)
    out_g = np.clip(lum_g * tg, 0, 1)
    out_b = np.clip(lum_g * tb, 0, 1)

    # Realce de brillos especulares: píxeles muy claros (lum > 0.85) se acercan al blanco
    specular = np.clip((lum - 0.85) / 0.15, 0, 1)
    out_r = out_r + (1.0 - out_r) * specular
    out_g = out_g + (1.0 - out_g) * specular
    out_b = out_b + (1.0 - out_b) * specular

    result = np.stack([
        (out_r * 255).astype(np.uint8),
        (out_g * 255).astype(np.uint8),
        (out_b * 255).astype(np.uint8),
        alpha,
    ], axis=2)
    return result


def main() -> None:
    regenerate_all = "--all" in sys.argv

    base_arr = np.array(Image.open(BASE_ICON).convert("RGBA"))

    for color_name, rgb in COLORS.items():
        out_path = ICONS_DIR / f"puma_{color_name}.png"
        if out_path.exists() and not regenerate_all:
            print(f"  skip  {out_path.name} (ya existe)")
            continue
        colored = colorize(base_arr, rgb)
        Image.fromarray(colored).save(out_path)
        print(f"  gen   {out_path.name}")

    for alias, source in ALIASES.items():
        out_path = ICONS_DIR / f"puma_{alias}.png"
        src_path = ICONS_DIR / f"puma_{source}.png"
        if out_path.exists() and not regenerate_all:
            print(f"  skip  {out_path.name} (ya existe)")
            continue
        import shutil
        shutil.copy2(src_path, out_path)
        print(f"  alias {out_path.name} → {src_path.name}")


if __name__ == "__main__":
    main()
