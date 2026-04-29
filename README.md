# Todos nuestros Pumas

🌍 **Sitio web oficial: [www.todosnuestrospumas.es](https://www.todosnuestrospumas.es)**

Mapa interactivo de Ford Pumas (1997-2002).

---

## ¿Qué es esto?

Página estática que ubica Ford Pumas en un mapa con iconos coloreados según el color de cada coche. Incluye filtros por color y motor, leyenda dinámica y agrupación por clusters. Compatible con escritorio, tablet y móvil. La interfaz se adapta automáticamente al idioma del navegador (español, inglés, francés, alemán y portugués).

## Tecnologías

- [Leaflet](https://leafletjs.com/) — mapa interactivo
- [Leaflet.markercluster](https://github.com/Libs/Leaflet.markercluster) — clusters
- [OpenStreetMap](https://www.openstreetmap.org/) — tiles del mapa
- [Nominatim](https://nominatim.org/) — geolocalización de ciudades no incluidas en el gazetteer offline
- [Google Sheets API](https://developers.google.com/sheets/api) — descarga de respuestas del formulario de registro

## Estructura

```
/
├── index.html                     # Aplicación completa (HTML + CSS + JS)
├── CNAME                          # Dominio personalizado para GitHub Pages
├── site.webmanifest               # Manifiesto PWA
├── favicon.ico / favicon-*.png    # Favicons
├── apple-touch-icon.png
├── android-chrome-*.png
├── data/
│   ├── pumas.csv                  # Lista pública de vehículos (ciudad, país, motor, color)
│   └── gazetteer.json             # Base de datos offline de coordenadas por ciudad
├── icons/
│   └── puma_[color].png           # Iconos del coche por color
└── scripts/
    ├── update_from_sheets.py      # Actualiza pumas.csv desde Google Sheets (formulario)
    ├── convert_csv.py             # Alternativa: convierte CSV local privado al formato público
    └── gen_icons.py               # Genera iconos PNG por color a partir de la silueta base
```

## Desarrollo local

Requiere [Poetry](https://python-poetry.org/).

```bash
poetry install
poetry run serve        # abre http://localhost:8080
poetry run serve 9000   # puerto alternativo
```

## Actualizar los datos del mapa

Los datos se recogen a través de un formulario de Google Forms (enlace visible en el mapa). Las respuestas se almacenan en una hoja de cálculo privada de Google Sheets accesible solo para el administrador.

### Configuración inicial (solo la primera vez)

1. Copia `.env.example` a `.env` y rellena el valor:
   ```bash
   cp .env.example .env
   # edita .env y añade el SHEET_ID de tu hoja de Google Sheets
   ```
2. Entra en [console.cloud.google.com](https://console.cloud.google.com)
3. Activa la **Google Sheets API** en tu proyecto
4. Crea credenciales: **OAuth client ID → Desktop app**
5. Descarga el JSON y guárdalo en `~/.config/tpumas/credentials.json`

> ⚠️ Nunca subas `.env`, `credentials.json` ni ningún token al repositorio.
> El `.gitignore` ya los excluye como medida de seguridad adicional.

### Ejecución

```bash
# Descarga respuestas y regenera data/pumas.csv
poetry run python scripts/update_from_sheets.py

# Vista previa sin escribir nada
poetry run python scripts/update_from_sheets.py --dry-run
```

La primera vez se abrirá el navegador para autenticarse con Google. El token se guarda en `~/.config/tpumas/authorized_user.json` y no hace falta volver a autenticarse.

Si hay ciudades nuevas en los datos, el script las geocodifica automáticamente via Nominatim y actualiza `data/gazetteer.json`.

Después de actualizar, publicar los cambios:

```bash
git add data/pumas.csv data/gazetteer.json
git commit -m "Actualiza datos del mapa"
git push
```

## Notificaciones por email

Las respuestas del formulario se pueden notificar por email mediante un script de Google Apps Script asociado a la hoja de respuestas (**Extensiones → Apps Script**):

```javascript
function onFormSubmit(e) {
  const row = e.values;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  let body = "Nueva respuesta en el formulario de Todos nuestros Pumas:\n\n";
  headers.forEach((header, i) => {
    body += `${header}: ${row[i] || "-"}\n`;
  });

  MailApp.sendEmail({
    to: SpreadsheetApp.getActiveSpreadsheet().getOwner().getEmail(),
    subject: "🐾 Nuevo Puma registrado",
    body: body
  });
}
```

Actívalo en **Activadores → Al enviar el formulario**.

## Licencia

Copyright (C) 2026 Nedemin

Este proyecto se distribuye bajo la licencia **GNU General Public License v3.0 o posterior**.
Puedes copiarlo, modificarlo y distribuirlo siempre que mantengas la misma licencia en los trabajos derivados.

Ver el archivo [LICENSE](LICENSE) para el texto completo.
