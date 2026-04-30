/* ═══════════════════════════════════════════════════════════
   CONFIGURATION
═══════════════════════════════════════════════════════════ */
const USE_PNG_ICONS      = true;    // true → load /icons/puma_[color].png
const USE_NOMINATIM      = true;    // true → fallback to Nominatim for unknown cities
const NOMINATIM_DELAY_MS = 1100;    // delay between Nominatim calls (ms)

/* ═══════════════════════════════════════════════════════════
   I18N  —  browser language detection + translations
   Supported: es, en, fr, de, pt  (default: es)
   Title "Todos Nuestros Pumas" always stays in Spanish.
═══════════════════════════════════════════════════════════ */
const I18N = {
  es: {
    title:       'Todos Nuestros Pumas',
    loading:     'Cargando',
    filters:     'Filtros',
    legend:      'Leyenda',
    colors:      'Colores',
    motor:       'Motor',
    all:         'Todos',
    none:        'Ninguno',
    noData:      'No hay datos',
    allPumas:    'Todos los Pumas',
    total:       'Total',
    ttMotor:     'Motor',
    ttColor:     'Color',
    ttCity:      'Ciudad',
    ttCityTotal: c => `En ${c} / total:`,
    errorLoad:   'Error al cargar los datos:',
    register:    'Añade tu Puma',
    subheading:  'Mapa interactivo · Ford Puma 1997-2002',
    description: 'Mapa interactivo de Ford Pumas (1997-2002). Localiza Ford Pumas por ciudad, color y motor. Registra el tuyo.',
    infoTitle1:  'Sobre este mapa',
    infoBody1:   'Este mapa colaborativo recoge la ubicación de Ford Pumas (1997-2002) registrados por sus propietarios en todo el mundo. Cada icono representa un coche real. Su color corresponde al color del vehículo. Usa los paneles de filtros y leyenda para explorar los datos.',
    infoTitle2:  '¿Qué es un Ford Puma?',
    infoBody2:   'El Ford Puma es un coupé deportivo compacto fabricado por Ford Europa entre 1997 y 2002. Basado en la plataforma del Ford Fiesta, se ofreció con tres motores: el 1.4, el 1.6 y el 1.7 de 125 CV — este último especialmente valorado por su respuesta y sonido. Ligero, ágil y con un diseño que ha envejecido muy bien, el Puma se ganó una legión de seguidores que hoy lo consideran uno de los deportivos asequibles más divertidos de conducir de su época.',
    infoTitle3:  '¿Tienes un Ford Puma (1997-2002)?',
    infoBody3:   'Pulsa «Añade tu Puma» para registrar el tuyo. Solo se registra la ciudad — nunca se publican datos personales ni la dirección exacta.',
    colorNames:  { rojo:'Rojo', blanco:'Blanco', gris:'Gris', plata:'Plata', azul:'Azul', verde:'Verde', negro:'Negro', amarillo:'Amarillo', naranja:'Naranja', 'marrón':'Marrón', 'azul imperial':'Azul Imperial', plateado:'Plateado' },
  },
  en: {
    title:       'All Our Pumas',
    loading:     'Loading',
    filters:     'Filters',
    legend:      'Legend',
    colors:      'Colours',
    motor:       'Engine',
    all:         'All',
    none:        'None',
    noData:      'No data',
    allPumas:    'All Pumas',
    total:       'Total',
    ttMotor:     'Engine',
    ttColor:     'Colour',
    ttCity:      'City',
    ttCityTotal: c => `In ${c} / total:`,
    errorLoad:   'Error loading data:',
    register:    'Register your Puma',
    subheading:  'Interactive map · Ford Puma 1997–2002',
    description: 'Interactive map of Ford Pumas (1997–2002). Find Ford Pumas by city, colour and engine. Register yours.',
    infoTitle1:  'About this map',
    infoBody1:   'A collaborative map collecting the location of Ford Pumas (1997-2002) registered by their owners around the world. Each icon represents a real car. Its colour matches the vehicle\'s colour. Use the filter and legend panels to explore the data.',
    infoTitle2:  'What is a Ford Puma?',
    infoBody2:   'The Ford Puma is a compact sports coupé manufactured by Ford Europe between 1997 and 2002. Based on the Ford Fiesta platform, it was offered with three engines: the 1.4, the 1.6, and the 1.7 with 125 bhp — the latter particularly valued for its response and sound. Light, agile and with a design that has aged very well, the Puma won a legion of fans who today consider it one of the most enjoyable affordable sports cars of its era.',
    infoTitle3:  'Do you own a Ford Puma (1997–2002)?',
    infoBody3:   'Tap «Register your Puma» to add yours to the map. Only the city is recorded — no personal data or exact address is ever published.',
    colorNames:  { rojo:'Red', blanco:'White', gris:'Grey', plata:'Silver', azul:'Blue', verde:'Green', negro:'Black', amarillo:'Yellow', naranja:'Orange', 'marrón':'Brown', 'azul imperial':'Imperial Blue', plateado:'Silver' },
  },
  fr: {
    title:       'Tous nos Pumas',
    loading:     'Chargement',
    filters:     'Filtres',
    legend:      'Légende',
    colors:      'Couleurs',
    motor:       'Moteur',
    all:         'Tous',
    none:        'Aucun',
    noData:      'Aucune donnée',
    allPumas:    'Tous les Pumas',
    total:       'Total',
    ttMotor:     'Moteur',
    ttColor:     'Couleur',
    ttCity:      'Ville',
    ttCityTotal: c => `À ${c}\u00a0/ total\u00a0:`,
    errorLoad:   'Erreur lors du chargement\u00a0:',
    register:    'Enregistrer votre Puma',
    subheading:  'Carte interactive · Ford Puma 1997-2002',
    description: 'Carte interactive des Ford Puma (1997-2002). Trouvez des Ford Pumas par ville, couleur et moteur. Enregistrez le vôtre.',
    infoTitle1:  'À propos de cette carte',
    infoBody1:   'Une carte collaborative qui recense la localisation des Ford Puma (1997-2002) enregistrées par leurs propriétaires dans le monde entier. Chaque icône représente une vraie voiture. Sa couleur correspond à celle du véhicule. Utilisez les panneaux de filtres et de légende pour explorer les données.',
    infoTitle2:  'Qu\'est-ce qu\'une Ford Puma ?',
    infoBody2:   'La Ford Puma est un coupé sportif compact fabriqué par Ford Europe entre 1997 et 2002. Basée sur la plateforme de la Ford Fiesta, elle était proposée avec trois motorisations : le 1.4, le 1.6 et le 1.7 de 125 ch — ce dernier particulièrement apprécié pour ses réponses et son sonorité. Légère, agile et avec un design qui a très bien vieilli, la Puma s\'est fait une légion de fans qui la considèrent aujourd\'hui comme l\'une des sportives abordables les plus amusantes à conduire de son époque.',
    infoTitle3:  'Vous avez une Ford Puma (1997-2002) ?',
    infoBody3:   'Appuyez sur « Enregistrer votre Puma » pour l\'ajouter à la carte. Seule la ville est enregistrée — aucune donnée personnelle ni adresse exacte n\'est jamais publiée.',
    colorNames:  { rojo:'Rouge', blanco:'Blanc', gris:'Gris', plata:'Argent', azul:'Bleu', verde:'Vert', negro:'Noir', amarillo:'Jaune', naranja:'Orange', 'marrón':'Marron', 'azul imperial':'Bleu impérial', plateado:'Argenté' },
  },
  de: {
    title:       'Alle unsere Pumas',
    loading:     'Laden',
    filters:     'Filter',
    legend:      'Legende',
    colors:      'Farben',
    motor:       'Motor',
    all:         'Alle',
    none:        'Keine',
    noData:      'Keine Daten',
    allPumas:    'Alle Pumas',
    total:       'Gesamt',
    ttMotor:     'Motor',
    ttColor:     'Farbe',
    ttCity:      'Stadt',
    ttCityTotal: c => `In ${c} / gesamt:`,
    errorLoad:   'Fehler beim Laden:',
    register:    'Deinen Puma registrieren',
    subheading:  'Interaktive Karte · Ford Puma 1997–2002',
    description: 'Interaktive Karte der Ford Pumas (1997–2002). Finde Ford Pumas nach Stadt, Farbe und Motor. Registriere deinen.',
    infoTitle1:  'Über diese Karte',
    infoBody1:   'Eine kollaborative Karte, die den Standort von Ford Pumas (1997-2002) sammelt, die von ihren Besitzern weltweit registriert wurden. Jedes Symbol steht für ein echtes Auto. Seine Farbe entspricht der Fahrzeugfarbe. Nutze die Filter- und Legendenpanels, um die Daten zu erkunden.',
    infoTitle2:  'Was ist ein Ford Puma?',
    infoBody2:   'Der Ford Puma ist ein kompaktes Sportcoupé, das von Ford Europa zwischen 1997 und 2002 hergestellt wurde. Basierend auf der Ford Fiesta-Plattform wurde er mit drei Motoren angeboten: dem 1.4, dem 1.6 und dem 1.7 mit 125 PS — letzterer besonders wegen seiner Reaktionsfähigkeit und seines Klangs geschätzt. Leicht, agil und mit einem Design, das sehr gut gealtert ist, gewann der Puma eine Fangemeinde, die ihn heute als einen der spaßigsten erschwinglichen Sportwagen seiner Ära betrachtet.',
    infoTitle3:  'Hast du einen Ford Puma (1997–2002)?',
    infoBody3:   'Tippe auf «Deinen Puma registrieren», um ihn zur Karte hinzuzufügen. Nur die Stadt wird erfasst — persönliche Daten oder genaue Adressen werden nie veröffentlicht.',
    colorNames:  { rojo:'Rot', blanco:'Weiß', gris:'Grau', plata:'Silber', azul:'Blau', verde:'Grün', negro:'Schwarz', amarillo:'Gelb', naranja:'Orange', 'marrón':'Braun', 'azul imperial':'Kaiserblau', plateado:'Silber' },
  },
  pt: {
    title:       'Todos os nossos Pumas',
    loading:     'A carregar',
    filters:     'Filtros',
    legend:      'Legenda',
    colors:      'Cores',
    motor:       'Motor',
    all:         'Todos',
    none:        'Nenhum',
    noData:      'Sem dados',
    allPumas:    'Todos os Pumas',
    total:       'Total',
    ttMotor:     'Motor',
    ttColor:     'Cor',
    ttCity:      'Cidade',
    ttCityTotal: c => `Em ${c} / total:`,
    errorLoad:   'Erro ao carregar os dados:',
    register:    'Registar o teu Puma',
    subheading:  'Mapa interativo · Ford Puma 1997-2002',
    description: 'Mapa interativo de Ford Pumas (1997-2002). Encontre Ford Pumas por cidade, cor e motor. Registe o seu.',
    infoTitle1:  'Sobre este mapa',
    infoBody1:   'Um mapa colaborativo que reúne a localização de Ford Pumas (1997-2002) registados pelos seus proprietários em todo o mundo. Cada ícone representa um carro real. A sua cor corresponde à cor do veículo. Use os painéis de filtros e legenda para explorar os dados.',
    infoTitle2:  'O que é um Ford Puma?',
    infoBody2:   'O Ford Puma é um coupé desportivo compacto fabricado pela Ford Europa entre 1997 e 2002. Baseado na plataforma do Ford Fiesta, foi oferecido com três motores: o 1.4, o 1.6 e o 1.7 de 125 CV — este último especialmente valorizado pela sua resposta e som. Leve, ágil e com um design que envelheceu muito bem, o Puma conquistou uma legião de fãs que hoje o consideram um dos desportivos acessíveis mais divertidos de conduzir da sua época.',
    infoTitle3:  'Tens um Ford Puma (1997-2002)?',
    infoBody3:   'Prime «Registar o teu Puma» para adicionar o teu ao mapa. Apenas a cidade é registada — nunca são publicados dados pessoais nem a morada exacta.',
    colorNames:  { rojo:'Vermelho', blanco:'Branco', gris:'Cinzento', plata:'Prata', azul:'Azul', verde:'Verde', negro:'Preto', amarillo:'Amarelo', naranja:'Laranja', 'marrón':'Castanho', 'azul imperial':'Azul Imperial', plateado:'Prateado' },
  },
};

(function detectAndSetLang() {
  const supported = ['es', 'en', 'fr', 'de', 'pt'];
  const langs = navigator.languages || [navigator.language || 'es'];
  const lang  = langs.map(l => l.split('-')[0].toLowerCase()).find(l => supported.includes(l)) || 'es';
  document.documentElement.lang = lang;
})();

/* Active translation — resolved once at startup */
const T = I18N[document.documentElement.lang] || I18N.es;

/* ── Color map (Spanish color names → CSS colors) ───────── */
const COLOR_MAP = {
  rojo:    '#e74c3c',
  azul:    '#2980b9',
  verde:   '#27ae60',
  negro:   '#2c3e50',
  blanco:  '#ecf0f1',
  amarillo:'#f1c40f',
  naranja: '#e67e22',
  gris:    '#95a5a6',
  plata:   '#bdc3c7',
  marrón:  '#8d6e63',
};
function colorCSS(c) { return COLOR_MAP[c.toLowerCase()] || '#888'; }
function escapeHTML(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/'/g,'&#x27;');
}

/* Contrast-aware text color */
function textColor(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return (0.299*r + 0.587*g + 0.114*b) > 160 ? '#222' : '#fff';
}

/* ═══════════════════════════════════════════════════════════
   MAP INIT
═══════════════════════════════════════════════════════════ */
const headerEl = document.getElementById('header');
document.documentElement.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
let _prevPortrait = window.innerHeight > window.innerWidth;
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
  const isPortrait = window.innerHeight > window.innerWidth;
  if (isPortrait !== _prevPortrait) {
    _prevPortrait = isPortrait;
    ['filters', 'legend'].forEach(id => {
      const p = document.getElementById(id);
      if (p && !p.dataset.userDragged) {
        p.style.left = '';
        p.style.top  = '';
        p.style.right = '';
        p.style.transform = '';
      }
    });
  }
});

const map = L.map('map', { zoomControl: false }).setView([46, 10], 4);
L.control.zoom({ position: window.innerWidth < 768 ? 'bottomright' : 'topleft' }).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

/* ═══════════════════════════════════════════════════════════
   GLOBALS
═══════════════════════════════════════════════════════════ */
let allVehicles   = [];   // parsed CSV rows + coords
let activeColors  = new Set();
let activeMotors  = new Set();
let clusterGroup  = null;

/* ═══════════════════════════════════════════════════════════
   CSV PARSER
═══════════════════════════════════════════════════════════ */
function parseCSVLine(line) {
  const vals = [];
  let cur = '', inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { cur += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { vals.push(cur.trim()); cur = ''; }
      else { cur += ch; }
    }
  }
  vals.push(cur.trim());
  return vals;
}

const BLOCKED_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).filter(l => l.trim()).map(line => {
    const vals = parseCSVLine(line);
    const obj = Object.create(null);
    headers.forEach((h, i) => { if (h && !BLOCKED_KEYS.has(h)) obj[h] = vals[i] || ''; });
    return obj;
  });
}

/* ═══════════════════════════════════════════════════════════
   GEOLOCATION (gazetteer + Nominatim fallback)
═══════════════════════════════════════════════════════════ */
async function resolveCoords(city, country, gazetteer) {
  if (gazetteer[city]) return gazetteer[city];

  if (!USE_NOMINATIM) return null;

  await sleep(NOMINATIM_DELAY_MS);
  try {
    const q = encodeURIComponent(`${city}, ${country}`);
    const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&accept-language=es`;
    const res  = await fetch(url, { signal: AbortSignal.timeout(5000), headers: { 'User-Agent': 'TodosNuestrosPumas/1.0' } });
    const data = await res.json();
    if (data.length > 0) {
      const lat = parseFloat(data[0].lat), lon = parseFloat(data[0].lon);
      if (isFinite(lat) && isFinite(lon)) {
        const coords = { lat, lon };
        gazetteer[city] = coords;
        return coords;
      }
    }
  } catch(e) { console.warn('Nominatim unavailable'); }
  return null;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ═══════════════════════════════════════════════════════════
   JITTER  (land-biased random offset)
   Simple approach: random offset within ~0.12° radius,
   but retry up to 5 times avoiding coords that deviate
   too far from the city center (stays on land statistically
   for continental cities; truly coastal ones get minimal jitter).
═══════════════════════════════════════════════════════════ */
const JITTER_R = 0.03; // degrees ~3 km
function jitter(lat, lon, index) {
  if (index === 0) return { lat, lon };
  const angle  = (index * 137.508) * (Math.PI / 180); // golden angle spread
  const radius = JITTER_R * Math.sqrt(index / 10 + 0.3);
  return {
    lat: lat + radius * Math.cos(angle),
    lon: lon + radius * Math.sin(angle),
  };
}

/* ═══════════════════════════════════════════════════════════
   ICON FACTORY
═══════════════════════════════════════════════════════════ */
function makePumaIcon(color) {
  const css  = colorCSS(color);
  const txt  = textColor(css);

  if (USE_PNG_ICONS) {
    const safeColor = COLOR_MAP[color.toLowerCase()]
      ? color.toLowerCase().replace(/\s+/g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      : 'rojo';
    return L.icon({
      iconUrl:    `/icons/puma_${safeColor}.png`,
      iconSize:   [60, 24],
      iconAnchor: [30, 24],
      popupAnchor:[0, -26],
    });
  }

  // SVG icon — side silhouette of a generic compact car (Ford Puma-ish)
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="22" viewBox="0 0 36 22">
  <!-- Body -->
  <rect x="2" y="11" width="32" height="8" rx="2" fill="${css}" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
  <!-- Roof -->
  <path d="M8,11 Q10,4 16,3 Q22,2 27,11 Z" fill="${css}" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
  <!-- Windshield -->
  <path d="M13,11 Q14,6 17,5 Q21,4.5 25,11 Z" fill="rgba(180,220,255,0.7)" stroke="rgba(0,0,0,0.25)" stroke-width="0.6"/>
  <!-- Rear window -->
  <path d="M9,11 Q10,7 13,6 Q11,8 11.5,11 Z" fill="rgba(180,220,255,0.6)" stroke="rgba(0,0,0,0.25)" stroke-width="0.6"/>
  <!-- Wheels -->
  <circle cx="9"  cy="19" r="4" fill="#333" stroke="#666" stroke-width="0.8"/>
  <circle cx="9"  cy="19" r="2" fill="#aaa"/>
  <circle cx="27" cy="19" r="4" fill="#333" stroke="#666" stroke-width="0.8"/>
  <circle cx="27" cy="19" r="2" fill="#aaa"/>
  <!-- Headlight -->
  <rect x="33" y="13" width="2" height="3" rx="0.5" fill="#ffe066" stroke="rgba(0,0,0,0.3)" stroke-width="0.5"/>
  <!-- Tail light -->
  <rect x="1"  y="13" width="2" height="3" rx="0.5" fill="#e74c3c" stroke="rgba(0,0,0,0.3)" stroke-width="0.5"/>
</svg>`.trim();

  const encoded = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
  return L.icon({
    iconUrl:    encoded,
    iconSize:   [36, 22],
    iconAnchor: [18, 19],
    popupAnchor:[0, -22],
  });
}

/* ═══════════════════════════════════════════════════════════
   CLUSTER ICON FACTORY
═══════════════════════════════════════════════════════════ */
function makeClusterIcon(cluster) {
  const markers = cluster.getAllChildMarkers();
  // Count colors
  const counts = {};
  markers.forEach(m => {
    const c = m.options.vehicleData.color;
    counts[c] = (counts[c] || 0) + 1;
  });
  // Dominant color
  const dominant = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0];
  const css   = colorCSS(dominant);
  const txt   = textColor(css);
  const total = markers.length;
  const size  = total < 10 ? 34 : total < 100 ? 40 : 48;

  return L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${css};
      border:3px solid rgba(0,0,0,0.3);
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:${size < 40 ? 12 : 14}px;
      font-weight:bold;
      color:${txt};
      text-shadow:0 1px 2px rgba(0,0,0,0.4);
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    ">${total}</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
  });
}

/* ═══════════════════════════════════════════════════════════
   TOOLTIP CONTENT
═══════════════════════════════════════════════════════════ */
function makeTooltipContent(vehicle, allVehicles) {
  // Stats for the same city
  const cityVehicles = allVehicles.filter(v => v.ciudad === vehicle.ciudad);
  const cityByColor  = {};
  cityVehicles.forEach(v => { cityByColor[v.color] = (cityByColor[v.color]||0)+1; });

  // Total per color across all
  const totalByColor = {};
  allVehicles.forEach(v => { totalByColor[v.color] = (totalByColor[v.color]||0)+1; });

  const cc  = colorCSS(vehicle.color);
  const tc  = textColor(cc);

  let countsHtml = '';
  Object.keys(cityByColor).sort().forEach(col => {
    const colCSS = colorCSS(col);
    countsHtml += `<div class="tt-row">
      <span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${colCSS};border:1px solid rgba(0,0,0,0.2);vertical-align:middle;margin-right:3px"></span>${escapeHTML(translateColor(col))}:</span>
      <span>(${cityByColor[col]||0} / ${totalByColor[col]||0})</span>
    </div>`;
  });

  return `
    <div>
      <div class="tt-row"><b>${T.ttMotor}:</b><span>${escapeHTML(vehicle.motor)}</span></div>
      <div class="tt-row"><b>${T.ttColor}:</b>
        <span style="display:inline-flex;align-items:center;gap:4px">
          <span style="width:12px;height:12px;border-radius:50%;background:${cc};border:1px solid rgba(0,0,0,0.2);display:inline-block"></span>
          ${escapeHTML(translateColor(vehicle.color))}
        </span>
      </div>
      <div class="tt-row"><b>${T.ttCity}:</b><span>${escapeHTML(vehicle.ciudad)}</span></div>
      <div class="tt-counts">
        <div style="font-size:11px;color:#888;margin-bottom:3px">${T.ttCityTotal(escapeHTML(vehicle.ciudad))}</div>
        ${countsHtml}
      </div>
    </div>`.trim();
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function translateColor(c) { return T.colorNames[c.toLowerCase()] || capitalize(c); }

/* ═══════════════════════════════════════════════════════════
   RENDER MARKERS
═══════════════════════════════════════════════════════════ */
function renderMarkers() {
  if (clusterGroup) map.removeLayer(clusterGroup);

  clusterGroup = L.markerClusterGroup({
    iconCreateFunction: makeClusterIcon,
    maxClusterRadius: 60,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
  });

  // Filter
  const visible = allVehicles.filter(v =>
    activeColors.has(v.color) && activeMotors.has(v.motor)
  );

  // Group by city for jitter
  const cityIndex = {};
  visible.forEach(v => {
    if (!cityIndex[v.ciudad]) cityIndex[v.ciudad] = 0;
    const idx = cityIndex[v.ciudad]++;
    const { lat, lon } = jitter(v.lat, v.lon, idx);

    const icon   = makePumaIcon(v.color);
    const marker = L.marker([lat, lon], { icon, vehicleData: v });

    marker.bindTooltip(makeTooltipContent(v, allVehicles), {
      className:   'puma-tooltip',
      direction:   'top',
      offset:      [0, -10],
      opacity:     1,
      permanent:   false,
    });

    clusterGroup.addLayer(marker);
  });

  map.addLayer(clusterGroup);
  renderLegend();
}

/* ═══════════════════════════════════════════════════════════
   LEGEND
═══════════════════════════════════════════════════════════ */
function renderLegend() {
  const body = document.getElementById('legend-body');
  // Group by color, only counting vehicles matching active filters
  const byColor = {};
  allVehicles
    .filter(v => activeColors.has(v.color) && activeMotors.has(v.motor))
    .forEach(v => {
      if (!byColor[v.color]) byColor[v.color] = {};
      byColor[v.color][v.motor] = (byColor[v.color][v.motor]||0)+1;
    });

  if (Object.keys(byColor).length === 0) {
    body.innerHTML = `<div style="color:#888;font-style:italic;padding:4px 2px">${T.noData}</div>`;
    return;
  }

  const grandTotal = Object.values(byColor).reduce((sum, motors) =>
    sum + Object.values(motors).reduce((a, b) => a + b, 0), 0);

  let html = `<div style="font-weight:bold;margin-bottom:6px;padding-bottom:5px;border-bottom:1px solid #ddd">${T.allPumas}: ${grandTotal}</div>`;
  Object.keys(byColor).sort().forEach(color => {
    const css = colorCSS(color);
    const total = Object.values(byColor[color]).reduce((a, b) => a + b, 0);
    html += `<div class="legend-color-group">
      <div class="legend-color-title">
        <span class="legend-color-name">
          <span class="legend-color-swatch" style="background:${css}"></span>
          <span>${escapeHTML(translateColor(color))}</span>
        </span>
        <span>${T.total}: <b>${total}</b></span>
      </div>`;
    Object.entries(byColor[color]).sort().forEach(([motor, count]) => {
      html += `<div class="legend-motor-row">
        <span>${escapeHTML(motor)}</span><span><b>${count}</b></span>
      </div>`;
    });
    html += '</div>';
  });
  body.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════
   FILTER PANEL
═══════════════════════════════════════════════════════════ */
function renderFilters() {
  const colors  = [...new Set(allVehicles.map(v => v.color))].sort();
  const motors  = [...new Set(allVehicles.map(v => v.motor))].sort();

  activeColors = new Set(colors);
  activeMotors = new Set(motors);

  const colorBubblesEl = document.getElementById('color-bubbles');
  const motorBubblesEl = document.getElementById('motor-bubbles');

  colorBubblesEl.innerHTML = '';
  motorBubblesEl.innerHTML = '';

  colors.forEach(color => {
    const css = colorCSS(color);
    const tc  = textColor(css);
    const el  = document.createElement('span');
    el.className     = 'bubble';
    el.textContent   = translateColor(color);
    el.style.background   = css;
    el.style.borderColor  = css;
    el.style.color        = tc;
    el.dataset.value      = color;
    el.addEventListener('click', () => toggleFilter(activeColors, color, el, renderMarkers));
    colorBubblesEl.appendChild(el);
  });

  motors.forEach(motor => {
    const el  = document.createElement('span');
    el.className   = 'bubble';
    el.textContent = motor;
    el.style.background  = '#2c3e50';
    el.style.borderColor = '#2c3e50';
    el.style.color       = '#fff';
    el.dataset.value     = motor;
    el.addEventListener('click', () => toggleFilter(activeMotors, motor, el, renderMarkers));
    motorBubblesEl.appendChild(el);
  });

  // All / None buttons — colors
  document.getElementById('color-all').onclick  = () => setAll(activeColors, colors, colorBubblesEl, true);
  document.getElementById('color-none').onclick = () => setAll(activeColors, colors, colorBubblesEl, false);
  document.getElementById('motor-all').onclick  = () => setAll(activeMotors, motors, motorBubblesEl, true);
  document.getElementById('motor-none').onclick = () => setAll(activeMotors, motors, motorBubblesEl, false);
}

function toggleFilter(set, value, el, callback) {
  if (set.has(value)) {
    set.delete(value);
    el.classList.add('inactive');
  } else {
    set.add(value);
    el.classList.remove('inactive');
  }
  renderMarkers();
}

function setAll(set, values, container, active) {
  values.forEach(v => {
    if (active) set.add(v); else set.delete(v);
  });
  container.querySelectorAll('.bubble').forEach(el => {
    if (active) el.classList.remove('inactive');
    else        el.classList.add('inactive');
  });
  renderMarkers();
}

/* ═══════════════════════════════════════════════════════════
   DRAG PANELS  (mouse + touch)
═══════════════════════════════════════════════════════════ */
function makeDraggable(panel, handle) {
  let startX, startY, startLeft, startTop;

  function beginDrag(clientX, clientY) {
    panel.dataset.userDragged = 'true';
    const rect = panel.getBoundingClientRect();
    startX    = clientX;
    startY    = clientY;
    startLeft = rect.left;
    startTop  = rect.top;
    panel.style.left      = startLeft + 'px';
    panel.style.top       = startTop  + 'px';
    panel.style.right     = 'auto';
    panel.style.transform = 'none';
  }

  // ── Mouse ──────────────────────────────────────────────
  handle.addEventListener('mousedown', e => {
    if (e.target.classList.contains('panel-toggle')) return;
    e.preventDefault();
    beginDrag(e.clientX, e.clientY);
    function onMove(e) {
      panel.style.left = (startLeft + e.clientX - startX) + 'px';
      panel.style.top  = (startTop  + e.clientY - startY) + 'px';
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
  });

  // ── Touch ──────────────────────────────────────────────
  handle.addEventListener('touchstart', e => {
    if (e.target.classList.contains('panel-toggle')) return;
    if (e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    beginDrag(t.clientX, t.clientY);
    function onMove(e) {
      const t = e.touches[0];
      panel.style.left = (startLeft + t.clientX - startX) + 'px';
      panel.style.top  = (startTop  + t.clientY - startY) + 'px';
    }
    function onEnd() {
      handle.removeEventListener('touchmove', onMove);
      handle.removeEventListener('touchend',  onEnd);
    }
    handle.addEventListener('touchmove', onMove, { passive: false });
    handle.addEventListener('touchend',  onEnd);
  }, { passive: false });
}

/* ═══════════════════════════════════════════════════════════
   COLLAPSIBLE PANELS
═══════════════════════════════════════════════════════════ */
function makeCollapsible(panel, header, startCollapsed) {
  const btn = document.createElement('span');
  btn.className   = 'panel-toggle';
  btn.textContent = '▾';
  header.appendChild(btn);

  function setCollapsed(val) {
    panel.classList.toggle('collapsed', val);
  }

  setCollapsed(startCollapsed);

  btn.addEventListener('click',      () => setCollapsed(!panel.classList.contains('collapsed')));
  btn.addEventListener('touchend', e => { e.preventDefault(); setCollapsed(!panel.classList.contains('collapsed')); });
}

/* Convierte la posición CSS del panel a px explícitos para evitar
   saltos cuando el drag toma el control en móvil/tablet. */
function snapPosition(panel) {
  const rect = panel.getBoundingClientRect();
  panel.style.left      = rect.left + 'px';
  panel.style.top       = rect.top  + 'px';
  panel.style.right     = 'auto';
  panel.style.transform = 'none';
}

/* ═══════════════════════════════════════════════════════════
   APPLY TRANSLATIONS  (static DOM elements)
═══════════════════════════════════════════════════════════ */
function applyTranslations() {
  document.getElementById('header-h1').textContent               = T.title;
  document.querySelector('#loading .loading-box p').textContent = T.loading;
  document.getElementById('filters-header').textContent         = T.filters;
  document.getElementById('legend-header').textContent          = T.legend;
  // Filter sections
  const sections = document.querySelectorAll('#filters .filter-section-title');
  if (sections[0]) sections[0].textContent = T.colors;
  if (sections[1]) sections[1].textContent = T.motor;
  // Filter buttons
  document.getElementById('color-all').textContent  = T.all;
  document.getElementById('color-none').textContent = T.none;
  document.getElementById('motor-all').textContent  = T.all;
  document.getElementById('motor-none').textContent = T.none;
  document.getElementById('register-link').textContent = T.register;
  document.getElementById('header-sub').textContent    = T.subheading;
  // Modal info
  document.getElementById('info-title-1').textContent = T.infoTitle1;
  document.getElementById('info-body-1').textContent  = T.infoBody1;
  document.getElementById('info-title-2').textContent = T.infoTitle2;
  document.getElementById('info-body-2').textContent  = T.infoBody2;
  document.getElementById('info-title-3').textContent = T.infoTitle3;
  document.getElementById('info-body-3').textContent  = T.infoBody3;
  document.getElementById('info-btn').setAttribute('aria-label', T.infoTitle1);
  // Descripción dinámica según idioma (el título se mantiene estático en español para SEO)
  document.querySelector('meta[name="description"]')?.setAttribute('content', T.description);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', T.description);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', T.description);
  // Recalcular altura del header ahora que tiene texto
  const h = document.getElementById('header').offsetHeight;
  document.documentElement.style.setProperty('--header-h', h + 'px');
}

/* ═══════════════════════════════════════════════════════════
   INFO MODAL
═══════════════════════════════════════════════════════════ */
(function initInfoModal() {
  const overlay = document.getElementById('info-overlay');
  const btn     = document.getElementById('info-btn');
  const close   = document.getElementById('info-close');

  function open()  { overlay.classList.add('open');    document.body.style.overflow = 'hidden'; }
  function shut()  { overlay.classList.remove('open'); document.body.style.overflow = ''; }

  btn.addEventListener('click', open);
  close.addEventListener('click', shut);
  overlay.addEventListener('click', e => { if (e.target === overlay) shut(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') shut(); });
})();

/* ═══════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════ */
async function main() {
  applyTranslations();

  // Show loading
  document.getElementById('loading').classList.remove('hidden');

  // Fetch CSV
  const csvText  = await fetch('data/pumas.csv').then(r => r.text());
  const vehicles = parseCSV(csvText);

  // Fetch gazetteer
  const gazetteer = await fetch('data/gazetteer.json').then(r => r.json());

  // Resolve coords (sequential to respect Nominatim rate-limit)
  // Find unique cities needing Nominatim
  const citySet = {};
  for (const v of vehicles) {
    const key = `${v.ciudad}|${v.país}`;
    if (!citySet[key]) citySet[key] = { city: v.ciudad, country: v.país };
  }

  const MAX_NOMINATIM_CALLS = 5;
  let nominatimCalls = 0;
  for (const { city, country } of Object.values(citySet)) {
    if (!gazetteer[city]) {
      if (nominatimCalls >= MAX_NOMINATIM_CALLS) continue;
      nominatimCalls++;
      const coords = await resolveCoords(city, country, gazetteer);
      if (coords) gazetteer[city] = coords;
    }
  }

  // Attach coords to vehicles
  allVehicles = vehicles.map(v => {
    const coords = gazetteer[v.ciudad] || null;
    return coords ? { ...v, lat: coords.lat, lon: coords.lon } : null;
  }).filter(Boolean);

  // Build UI (renderLegend is called inside renderMarkers)
  renderFilters();
  renderMarkers();

  const isMobile = window.innerWidth < 768;

  // En móvil y tablet: fijar posición explícita antes de activar el drag
  // para evitar saltos en el primer toque
  if (window.innerWidth < 1025) {
    snapPosition(document.getElementById('filters'));
    snapPosition(document.getElementById('legend'));
  }

  // Collapsible panels (colapsados por defecto en móvil)
  makeCollapsible(
    document.getElementById('filters'),
    document.getElementById('filters-header'),
    isMobile
  );
  makeCollapsible(
    document.getElementById('legend'),
    document.getElementById('legend-header'),
    isMobile
  );

  // Draggable panels
  makeDraggable(
    document.getElementById('filters'),
    document.getElementById('filters-header')
  );
  makeDraggable(
    document.getElementById('legend'),
    document.getElementById('legend-header')
  );

  // Fit map to markers
  if (allVehicles.length > 0) {
    const lats = allVehicles.map(v => v.lat);
    const lons = allVehicles.map(v => v.lon);
    map.fitBounds([
      [Math.min(...lats)-1, Math.min(...lons)-1],
      [Math.max(...lats)+1, Math.max(...lons)+1]
    ]);
  }

  // Hide loading
  document.getElementById('loading').classList.add('hidden');
}

main().catch(err => {
  console.error(err);
  document.getElementById('loading').classList.add('hidden');
  alert(T.errorLoad);
});
