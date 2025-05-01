// === ELEMENTOS DEL DOM ===
const homeView = document.getElementById('home-view');
const viewToolbar = document.getElementById('view-toolbar');
const gridBtn = document.getElementById('grid-view-btn');
const listBtn = document.getElementById('list-view-btn');
const docList = document.getElementById('docList');

const docToolbar = document.getElementById('doc-toolbar');
const btnBack = document.getElementById('btn-back');
const btnZoomIn = document.getElementById('btn-font-increase');
const btnZoomOut = document.getElementById('btn-font-decrease');
const viewer = document.getElementById('viewer');

const minutasView = document.getElementById('minutas-view');
const homeBtn = document.getElementById('home-btn');
const minutasCatFilter = document.getElementById('minutas-catFilter');
const minutasDocList = document.getElementById('minutas-docList');
const minutasViewer = document.getElementById('minutas-viewer');

// === BÚSQUEDA ===
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search-results');
const prevResult = document.getElementById('prev-result');
const nextResult = document.getElementById('next-result');
const resultCounter = document.getElementById('result-counter');
const closeSearch = document.getElementById('close-search');

let matches = [];
let currentIndex = -1;

// === ZOOM ESTADO ===
const zoomLevels = ['small', 'medium', 'large', 'xlarge'];
let currentZoom = 1; // start at 'medium'
function applyZoom() {
  document.body.classList.remove(
    ...zoomLevels.map(l => `font-size-${l}`)
  );
  document.body.classList.add(`font-size-${zoomLevels[currentZoom]}`);
}
btnZoomIn.addEventListener('click', () => {
  if (currentZoom < zoomLevels.length-1) currentZoom++;
  applyZoom();
});
btnZoomOut.addEventListener('click', () => {
  if (currentZoom > 0) currentZoom--;
  applyZoom();
});

// === DATOS DE DOCUMENTOS ===
const docs = [
  { file: 'docs/documento2.html', title: 'CÓDIGO PROCESAL PENAL', icon: 'fa-solid fa-scale-balanced' },
  { file: 'docs/documento3.html', title: 'LEY DE DROGAS', icon: 'fa-solid fa-pills' },
  { file: 'docs/documento4.html', title: 'LEY DE CONTROL DE ARMAS', icon: 'fa-solid fa-gun' },
  { file: 'docs/documento5.html', title: 'LEY DE PENAS SUSTITUTIVAS', icon: 'fa-solid fa-person-walking-arrow-right' },
  { file: 'docs/documento6.html', title: 'LEY DE VIOLENCIA INTRAFAMILIAR', icon: 'fa-solid fa-house-user' },
  { file: 'docs/documento7.html', title: 'LEY RPA', icon: 'fa-solid fa-child' },
  { file: 'docs/documento8.html', title: 'LEY RPA (Diferida)', icon: 'fa-solid fa-child-reaching' },
  { file: 'docs/documento9.html', title: 'LEY DE VIOLENCIA EN LOS ESTADIOS', icon: 'fa-solid fa-futbol' },
  { file: 'docs/documento10.html', title: 'LEY DE TRANSITO', icon: 'fa-solid fa-car' },
  { file: 'docs/documento11.html', title: 'LEY ORGANICA DEL MINISTERIO PUBLICO', icon: 'fa-solid fa-building-columns' },
  { file: 'docs/calculadora_abonos.html', title: 'Calculadora Abonos por Arresto', icon: 'fa-solid fa-calculator' },
  { file: 'minutas', title: 'Minutas Jurisprudencia', icon: 'fa-solid fa-book-bookmark' }
];

// === DOCUMENTOS MINUTAS ===
const docsMinutas = [ 
  { path: 'minutas/2_CONTROL_DE_IDENTIDAD-LEY_DE_TRANSITO_C.md', title: 'N° 2 CONTROL DE IDENTIDAD - LEY DE TRÁNSITO', category: 'Control de Identidad' },
  { path: 'minutas/3_ACCESO_A_INFORMACION_EN_FACEBOOK.md', title: 'N° 3 ACCESO A INFORMACIÓN EN FACEBOOK', category: 'Diligencias e Investigación' },
  { path: 'minutas/4_PRUEBA_POSTERIOR_AL_CIERRE.md', title: 'N° 4 PRUEBA POSTERIOR AL CIERRE', category: 'Procedimiento y Garantías' },
  { path: 'minutas/5_ARTICULO_195_LEY_18290.md', title: 'N° 5 ARTÍCULO 195 LEY 18290', category: 'Delitos y Tipicidad' },
  { path: 'minutas/6_REVISIÓN_DE_CELULARES.md', title: 'N° 6 REVISIÓN DE CELULARES', category: 'Diligencias e Investigación' },
  { path: 'minutas/7_PRIMERAS_DILIGENCIAS_Y_GPS.md', title: 'N° 7 PRIMERAS DILIGENCIAS Y GPS', category: 'Diligencias e Investigación' },
  { path: 'minutas/8_EFECTO_DE_LA_APELACIÓN_DE_LA_REVOCACIÓN_DE_PENA_SUSTITUTIVA.md', title: 'N° 8 EFECTO DE LA APELACIÓN DE LA REVOCACIÓN DE PENA SUSTITUTIVA', category: 'Procedimiento y Garantías' },
  { path: 'minutas/9_CONTROL_DE_IDENTIDAD_EN_INVESTIGACION_EN_CURSO.md', title: 'N° 9 CONTROL DE IDENTIDAD EN INVESTIGACIÓN EN CURSO', category: 'Control de Identidad' },
  { path: 'minutas/10_COAUTORIA_EN_PORTE_O_TENENCIA_DE_ARMAS.md', title: 'N° 10 COAUTORÍA EN PORTE O TENENCIA DE ARMAS', category: 'Delitos y Tipicidad' },
  { path: 'minutas/11_INTERNACION_PROVISIONAL_PREVIA_AL_INFORME_SIQUIATRICO.md', title: 'N° 11 INTERNACIÓN PROVISIONAL PREVIA AL INFORME SÍQUIATRICO', category: 'Procedimiento y Garantías' },
  { path: 'minutas/12_TESTIGOS_NECESIDAD_DE_UNA_DECLARACIÓN_PREVIA.md', title: 'N° 12 TESTIGOS NECESIDAD DE UNA DECLARACIÓN PREVIA', category: 'Procedimiento y Garantías' },
  { path: 'minutas/13_CONTROL_DE_IDENTIDAD_(ARROJAR_OBJETO).md', title: 'N° 13 CONTROL DE IDENTIDAD (ARROJAR OBJETO)', category: 'Control de Identidad' },
  { path: 'minutas/14_JUICIOS_POR_VIDEOCONFERENCIA_(RECLAMOS_CONCRETOS).md', title: 'N° 14 JUICIOS POR VIDEOCONFERENCIA (RECLAMOS CONCRETOS)', category: 'Procedimiento y Garantías' },
  { path: 'minutas/15_CONTROL_DE_IDENTIDAD_Y_DENUNCIA_ANÓNIMA.md', title: 'N° 15 CONTROL DE IDENTIDAD Y DENUNCIA ANÓNIMA', category: 'Control de Identidad' },
  { path: 'minutas/16_DETENCION_POR_GUARDIAS_DE_SEGURIDAD_O_MUNICIPALES.md', title: 'N° 16 DETENCIÓN POR GUARDIAS DE SEGURIDAD O MUNICIPALES', category: 'Detención y Aprehensión' },
  { path: 'minutas/17_DOLO_EVENTUAL_Y_DELITOS_TENTADOS_O_FRUSTRADOS.md', title: 'N° 17 DOLO EVENTUAL Y DELITOS TENTADOS O FRUSTRADOS', category: 'Delitos y Tipicidad' },
  { path: 'minutas/18_DETENCION_POR_PARTICULARES.md', title: 'N° 18 DETENCIÓN POR PARTICULARES', category: 'Detención y Aprehensión' },
  { path: 'minutas/19_CONTROL_DE_IDENTIDAD_PREVENTIVO_QUE_MUTA_A_INVESTIGATIVO.md', title: 'N° 19 CONTROL DE IDENTIDAD PREVENTIVO QUE MUTA A INVESTIGATIVO', category: 'Control de Identidad' },
  { path: 'minutas/20_CADENA_DE_CUSTODIA_Y_DEBIDO_PROCESO.md', title: 'N° 20 CADENA DE CUSTODIA Y DEBIDO PROCESO', category: 'Evidencia y Cadena de Custodia' },
  { path: 'minutas/21_CONTROL_IDENTIDAD_OLOR_MARIHUANA.md', title: 'N° 21 CONTROL IDENTIDAD OLOR MARIHUANA', category: 'Control de Identidad' },
  { path: 'minutas/22_CONTROL_IDENTIDAD_Y_HUIDA.md', title: 'N° 22 CONTROL IDENTIDAD Y HUIDA', category: 'Control de Identidad' },
  { path: 'minutas/23_CONTROL_IDENTIDAD_Y_CAN_DETECTOR_DE_DROGAS.md', title: 'N° 23 CONTROL IDENTIDAD Y CAN DETECTOR DE DROGAS', category: 'Control de Identidad' },
  { path: 'minutas/24_Reclamos_por_infracción_de_garantías_de_terceros.md', title: 'N° 24 RECLAMOS POR INFRACCIÓN DE GARANTÍAS DE TERCEROS', category: 'Procedimiento y Garantías' },
  { path: 'minutas/25_Porte_o_tenencia_de_una_munición.md', title: 'N° 25 PORTE O TENENCIA DE UNA MUNICIÓN', category: 'Delitos y Tipicidad' },
  { path: 'minutas/26_Delito_continuado_-_reiterado.md', title: 'N° 26 DELITO CONTINUADO - REITERADO', category: 'Delitos y Tipicidad' },
  // Eliminado el documento duplicado: N° 26-DELITO CONTINUADO - REITERADO
  { path: 'minutas/27_Control_viapublica.md', title: 'N° 27 CONTROL DE IDENTIDAD - TRANSACCIÓN EN LA VÍA PÚBLICA', category: 'Control de Identidad' },
  { path: 'minutas/28_Obligatoriedad_del_artículo_302_del_CPP_durante_la_etapa_investigativa.md', title: 'N° 28 OBLIGATORIEDAD DEL ARTÍCULO 302 DEL CPP DURANTE LA ETAPA INVESTIGATIVA', category: 'Procedimiento y Garantías' },
  { path: 'minutas/29_Abuso_sexual_-_Introducción_de_dedos.md', title: 'N° 29 ABUSO SEXUAL - INTRODUCCIÓN DE DEDOS', category: 'Delitos y Tipicidad' },
  { path: 'minutas/30_Actuaciones_autónomas_de_Carabineros_en_marchas_y_manifestaciones.md', title: 'N° 30 ACTUACIONES AUTÓNOMAS DE CARABINEROS EN MARCHAS Y MANIFESTACIONES', category: 'Diligencias e Investigación' },
  { path: 'minutas/31_Retractación_Víctima_331_letra_f)_CPP.md', title: 'N° 31 RETRACTACIÓN VÍCTIMA 331 LETRA F) CPP', category: 'Procedimiento y Garantías' },
  { path: 'minutas/32_INSTRUCCION_SOBRE_PRIMERAS_DILIGENCIAS.md', title: 'N° 32 INSTRUCCIÓN SOBRE PRIMERAS DILIGENCIAS', category: 'Diligencias e Investigación' }
];

// === FUNCIÓN DE LIMPIEZA ===
function clearView() {
  viewer.innerHTML = '';
  clearHighlights();
  matches = [];
  currentIndex = -1;
  // ocultar navegación resultados
  searchResults.style.display = 'none';
}

// === MOSTRAR VISTAS ===
function showHome() {
  minutasView.style.display = 'none';
  viewer.style.display = 'none';
  docToolbar.classList.add('hidden');
  homeView.style.display = 'flex';
  loadDocs();
}

function showMinutas() {
  homeView.style.display = 'none';
  viewer.style.display = 'none';
  docToolbar.classList.add('hidden');
  minutasView.style.display = 'flex';
  loadMinutas();
}

// === ABRIR DOCUMENTO ===
function openDoc(path, title) {
  homeView.style.display = 'none';
  minutasView.style.display = 'none';
  docToolbar.classList.remove('hidden');
  viewer.style.display = 'block';
  clearView();

  console.log('Fetching document:', path);
  fetch(path)
    .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.text(); })
    .then(content => {
      if (path.endsWith('.html')) {
        viewer.innerHTML = content;
      } else {
        // marcado con marked.parse para compatibilidad
        viewer.innerHTML = marked.parse(content);
      }
      document.title = `${title} – Biblioteca Jurídica`;
    })
    .catch(err => {
      console.error('Error loading document:', err);
      viewer.innerHTML = `<div class="error-container">
        <p>Error al cargar el documento (${err.message}).</p>
        <button class="retry-btn" onclick="openDoc('${path}', '${title}')">Reintentar</button>
      </div>`;
    });
}

// === CARGAR TARJETAS ===
function loadDocs() { /* same logic */ }
function loadMinutas() { /* same logic */ }

// === CAMBIO DE VISTA ===
function changeView(isGrid) {
  docList.className = isGrid ? 'doc-grid' : 'doc-list';
  gridBtn.classList.toggle('active', isGrid);
  listBtn.classList.toggle('active', !isGrid);
}

gridBtn.addEventListener('click', () => changeView(true));
listBtn.addEventListener('click', () => changeView(false));
btnBack.addEventListener('click', showHome);
homeBtn.addEventListener('click', showHome);
minutasCatFilter.addEventListener('change', loadMinutas);

document.addEventListener('DOMContentLoaded', () => {
  loadDocs();
  changeView(true);
  applyZoom(); // inicial zoom
});

// === BÚSQUEDA EN DOCUMENTO ===
function clearHighlights() { /* same logic */ }
function performSearch(term) {
  clearHighlights(); matches = []; currentIndex = -1;
  if (!term) return;
  const text = viewer.innerText;
  const regex = new RegExp(term, 'gi');
  matches = [...text.matchAll(regex)];
  if (!matches.length) return;
  viewer.innerHTML = viewer.innerHTML.replace(regex, '<mark>$&</mark>');
  currentIndex = 0;
  scrollToMatch(); updateResultsUI();
}
function scrollToMatch() { /* same */ }
function updateResultsUI() {
  resultCounter.textContent = `${currentIndex + 1} de ${matches.length}`;
  // solo en vista de documento
  if (viewer.style.display === 'block') searchResults.style.display = 'flex';
}
prevResult.addEventListener('click', () => { /* same */});
nextResult.addEventListener('click', () => { /* same */});
closeSearch.addEventListener('click', () => { searchInput.value=''; clearHighlights(); searchResults.style.display='none'; });
searchInput.addEventListener('input', e => { clearTimeout(searchInput._timeout); searchInput._timeout = setTimeout(() => { if (viewer.style.display==='block') performSearch(e.target.value.trim()); },300); });
