# Todos nuestros Pumas

Mapa interactivo de Ford Pumas (1997-2001) registrados en el Club Ford Puma España.

🌍 **[www.todosnuestrospumas.es](https://www.todosnuestrospumas.es)**

---

## ¿Qué es esto?

Página estática que lee una lista de vehículos desde un CSV y los ubica en un mapa con iconos coloreados según el color de cada coche. Incluye filtros por color y motor, leyenda dinámica y agrupación por clusters. Compatible con escritorio, tablet y móvil.

## Tecnologías

- [Leaflet](https://leafletjs.com/) — mapa interactivo
- [Leaflet.markercluster](https://github.com/Libs/Leaflet.markercluster) — clusters
- [OpenStreetMap](https://www.openstreetmap.org/) — tiles del mapa
- [Nominatim](https://nominatim.org/) — geolocalización de ciudades no incluidas en el gazetteer offline

## Estructura

```
/
├── index.html          # Aplicación completa (HTML + CSS + JS)
├── CNAME               # Dominio personalizado para GitHub Pages
├── data/
│   ├── pumas.csv       # Lista de vehículos (ciudad, país, motor, color)
│   └── gazetteer.json  # Base de datos offline de coordenadas por ciudad
├── icons/
│   └── puma_[color].png
└── scripts/
    ├── convert_csv.py  # Convierte el CSV fuente al formato público
    └── gen_icons.py    # Genera los iconos PNG por color
```

## Desarrollo local

Requiere [Poetry](https://python-poetry.org/).

```bash
poetry install
poetry run serve        # abre http://localhost:8080
poetry run serve 9000   # puerto alternativo
```
