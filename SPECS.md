# Todos Nuestros Pumas — Especificaciones

## Descripción general

Página web estática que lee una lista de vehículos desde un archivo CSV y los ubica en un mapa interactivo. No requiere ejecución de código en el servidor; está pensada para desplegarse en **GitHub Pages**.

---

## Datos de entrada

- **Archivo:** `data/pumas.csv` (fijo, no seleccionable por el usuario)
- **Columnas del CSV:** `ciudad`, `país`, `motor`, `color`

---

## Mapa e iconos

- Pintar un punto por vehículo en el centro de la ciudad correspondiente, representado por un **icono de un Ford Puma de 1998** coloreado según el campo `color` del CSV.
- Cuando varios vehículos coincidan en la misma ciudad, aplicar **jitter** para desplazar los iconos y evitar solapamientos.
  - El jitter debe garantizar que los puntos desplazados no caigan en el mar, lagos, ríos ni ningún lugar donde no pueda haber un coche.
  - El radio de jitter es de ~3 km (0.03 grados). Para ciudades costeras, las coordenadas de referencia en el gazetteer se desplazan tierra adentro para que ningún offset alcance el mar.
- Cuando el nivel de zoom sea bajo, agrupar los resultados en **clusters** representados con un globo del color predominante del cluster, mostrando el número de elementos en su interior.
- Por configuración (`USE_PNG_ICONS`), se podrá sustituir el icono generado por un **PNG externo**. El patrón de nombre es `puma_[color].png`, cargado desde la carpeta `/icons`. El color se normaliza a minúsculas con espacios reemplazados por guiones bajos (ej. `azul_imperial`).
  - `USE_PNG_ICONS = true` por defecto, ya que se incluyen los PNGs generados para todos los colores del CSV.
  - La carpeta `/icons` contiene un PNG por cada color presente en el CSV, generados colorizando fotográficamente la imagen base `puma_silueta.png` (802×311 px, RGBA) mediante el script `gen_icons.py`. El proceso convierte la luminancia original de la silueta y aplica el color destino mediante multiplicación de luminancia con corrección gamma (γ = 0.85) y realce de brillos especulares. Los PNGs resultantes se guardan a **120×48 px** (resolución 2× para pantallas retina) y Leaflet los renderiza a 60×24 px CSS mediante `iconSize: [60, 24]`.

---

## Geolocalización

- Mantener una **base de datos offline** de ciudades en `data/gazetteer.json`.
- Si una ciudad del CSV no está en el gazetteer offline, conectarse a **Nominatim** para obtener latitud y longitud.
  - Los nombres de ciudades y países en el CSV están en **español**.
  - Añadir un **retardo de 1 100 ms** entre llamadas a Nominatim para no saturar el servicio.
  - Esta funcionalidad es configurable mediante un **flag a nivel de código** (no visible en la UI):
    - `true` → usar Nominatim como fallback online.
    - `false` → trabajar solo con datos offline.
  - Dejar Nominatim **activado por defecto**.
- Mientras se consulta Nominatim, mostrar una **ventana de carga** con animación y el texto "Cargando"; desaparece cuando los datos están listos.

---

## Interfaz de usuario

### Título

- Texto **"Todos nuestros Pumas"** centrado en la parte superior de la página.
- El mismo texto en el `<title>` del HTML.

### Leyenda (panel derecho)

- Situada a la **derecha**, a 15 px por debajo del borde inferior de la cabecera.
- Muestra los colores presentes y, para cada color, el agregado por tipo de motor. La fila de cabecera de cada color muestra el nombre del color alineado a la izquierda (con su swatch) y el total alineado a la derecha con el formato "Total: XX", con separación entre ambos elementos, en la misma columna que los conteos por motor.
- Debajo del encabezado y antes de la primera fila de colores, muestra una etiqueta con el total global de vehículos visibles con el formato "Todos los Pumas: XX".
- Los conteos de la leyenda se actualizan dinámicamente para reflejar únicamente los vehículos que coinciden con los filtros activos en ese momento.
- Si la combinación de filtros activos no produce ningún vehículo visible, la leyenda muestra el texto "No hay datos".
- Incluir **barra de scroll** si el contenido supera el espacio visible.
- Incluye el título "Leyenda" en la parte superior izquierda.

### Ventana de filtros (panel izquierdo)

- Situada a la **izquierda**, centrada verticalmente, sin superponerse con los botones de zoom del mapa.
- Contiene **dos secciones**: **Colores** y **Motor**.
- Cada sección incluye:
  - Globos para activar / desactivar filtros individuales.
  - Botones **"Todos"** (activa todos) y **"Ninguno"** (desactiva todos).
  - Separación de **10 px** entre los globos y los botones de la sección.
- Ambos paneles (filtros y leyenda) son **movibles** por el usuario para evitar solapamientos.
  - Los globos pueden ocupar varias líneas con el objetivo de que la ventana de filtros no se haga demasiado ancha (ancho máximo: 200 px).

### Popover al pasar el ratón

Al pasar el cursor sobre un punto se muestra un popover con:

- Motor
- Color
- Ciudad
- Conteo por color en esa ciudad y total, con el formato:
  > `Rojo: (nº rojos en la ciudad / nº total de vehículos rojos)`

---

## Entrega
Hay que generar 2 versiones:
- Generar un **ZIP** con todos los archivos necesarios para que la aplicación funcione directamente al descomprimir.
- Generar un poetry que permita servir localmente la aplicación y así poder probarla localmente.

---

## Resumen de archivos y estructura esperada

```
/
├── index.html
├── data/
│   ├── pumas.csv
│   └── gazetteer.json
└── icons/
    └── puma_[color].png   ← recursos opcionales (USE_PNG_ICONS = false por defecto)
```
