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

const toggleSearchBtn = document.getElementById('toggle-search');
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search-results');
const resultCounter = document.getElementById('result-counter');
const prevResult = document.getElementById('prev-result');
const nextResult = document.getElementById('next-result');
const closeSearch = document.getElementById('close-search');

let matches = [];
let currentIndex = -1;
let currentActiveContainer = null;
let markInstance = null;  // instance of Mark.js

const zoomSteps = ['0.9rem', '1rem', '1.1rem', '1.2rem'];
let currentZoom = 1;

// Definición de documentos
const docs = [
  { file: 'docs/documento1.html', title: 'CÓDIGO PENAL', icon: 'fa-solid fa-gavel' },
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

// Definición de minutas
const docsMinutas = [
  { path: 'minutas/2_CONTROL_DE_IDENTIDAD-LEY_DE_TRANSITO_C.md', title: 'N° 2 CONTROL DE IDENTIDAD - LEY DE TRÁNSITO', category: 'Control de Identidad' },
  { path: 'minutas/3_ACCESO_A_INFORMACION_EN_FACEBOOK.md', title: 'N° 3 ACCESO A INFORMACIÓN EN FACEBOOK', category: 'Diligencias e Investigación' },
  { path: 'minutas/4_PRUEBA_POSTERIOR_AL_CIERRE.md', title: 'N° 4 PRUEBA POSTERIOR AL CIERRE', category: 'Procedimiento y Garantías' },
  { path: 'minutas/5_ARTICULO_195_LEY_18290.md', title: 'N° 5 ARTÍCULO 195 LEY 18290', category: 'Delitos y Tipicidad' },
  { path: 'minutas/6_REVISIÓN_DE_CELULARES.md', title: 'N° 6 REVISIÓN DE CELULARES', category: 'Diligencias e Investigación' },
  { path: 'minutas/7_PRIMERAS_DILIGENCIAS_Y_GPS.md', title: 'N° 7 PRIMERAS DILIGENCIAS Y GPS', category: 'Diligencias e Investigación' },
  { path: 'minutas/8_EFECTO_DE_LA_APELACIÓN_DE_LA_REVOCACIÓN_DE_LA_PENA_SUSTITUTIVA.md', title: 'N° 8 EFECTO DE LA APELACIÓN DE LA REVOCACIÓN DE PENA SUSTITUTIVA', category: 'Procedimiento y Garantías' },
  { path: 'minutas/9_CONTROL_DE_IDENTIDAD_EN_INVESTIGACION_EN_CURSO.md', title: 'N° 9 CONTROL DE IDENTIDAD EN INVESTIGACIÓN EN CURSO', category: 'Control de Identidad' },
  { path: 'minutas/10_COAUTORIA_EN_PORTE_O_TENENCIA_DE_ARMAS.md', title: 'N° 10 COAUTORÍA EN PORTE O TENENCIA DE ARMAS', category: 'Delitos y Tipicidad' },
  { path: 'minutas/11_INTERNACION_PROVISIONAL_PREVIA_AL_INFORME_SIQUIATRICO.md', title: 'N° 11 INTERNACIÓN PROVISIONAL PREVIA AL INFORME SÍQUIATRICO', category: 'Procedimiento y Garantías' },
  { path: 'minutas/12_TESTIGOS_NECESIDAD_DE_UNA_DECLARACIÓN_PREVIA.md', title: 'N° 12 TESTIGOS: NECESIDAD DE UNA DECLARACIÓN PREVIA', category: 'Procedimiento y Garantías' },
  { path: 'minutas/13_CONTROL_DE_IDENTIDAD_(ARROJAR_OBJETO).md', title: 'N° 13 CONTROL DE IDENTIDAD (ARROJAR OBJETO)', category: 'Control de Identidad' },
  { path: 'minutas/14_JUICIOS_POR_VIDEOCONFERENCIA_(RECLAMOS_CONCRETOS).md', title: 'N° 14 JUICIOS POR VIDEOCONFERENCIA (RECLAMOS CONCRETOS)', category: 'Procedimiento y Garantías' },
  { path: 'minutas/15_CONTROL_DE_IDENTIDAD_Y_DENUNCIA_ANÓNIMA.md', title: 'N° 15 CONTROL DE IDENTIDAD Y DENUNCIA ANÓNIMA', category: 'Control de Identidad' },
  { path: 'minutas/16_DETENCION_POR_GUARDIAS_DE_SEGURIDAD_O_MUNICIPALES.md', title: 'N° 16 DETENCIÓN POR GUARDIAS DE SEGURIDAD O MUNICIPALES', category: 'Detención y Aprehensión' },
  { path: 'minutas/17_OTRO_DOCUMENTO.md', title: 'N° 17 OTRO DOCUMENTO', category: 'Categoría Ejemplo' },
  { path: 'minutas/18_OTRA_CATEGORIA.md', title: 'N° 18 OTRA CATEGORÍA', category: 'Categoría Ejemplo' },
  { path: 'minutas/19_CADENA_DE_CUSTODIA_Y_DEBIDO_PROCESO.md', title: 'N° 19 CADENA DE CUSTODIA Y DEBIDO PROCESO', category: 'Evidencia y Cadena de Custodia' },
  { path: 'minutas/20_CONTROL_IDENTIDAD_OLOR_MARIHUANA.md', title: 'N° 20 CONTROL DE IDENTIDAD: OLOR A MARIHUANA', category: 'Control de Identidad' },
  { path: 'minutas/21_CONTROL_IDENTIDAD_Y_HUIDA.md', title: 'N° 21 CONTROL DE IDENTIDAD Y HUIDA', category: 'Control de Identidad' },
  { path: 'minutas/22_CONTROL_IDENTIDAD_Y_CAN_DETECTOR_DE_DROGAS.md', title: 'N° 22 CONTROL DE IDENTIDAD Y CAN DETECTOR DE DROGAS', category: 'Control de Identidad' },
  { path: 'minutas/23_RECLAMOS_POR_INFRACCIÓN_DE_GARANTÍAS_DE_TERCEROS.md', title: 'N° 23 RECLAMOS POR INFRACCIÓN DE GARANTÍAS DE TERCEROS', category: 'Procedimiento y Garantías' },
  { path: 'minutas/24_PORTE_O_TENENCIA_DE_UNA_MUNICIÓN.md', title: 'N° 24 PORTE O TENENCIA DE UNA MUNICIÓN', category: 'Delitos y Tipicidad' },
  { path: 'minutas/25_DELITO_CONTINUADO_-_REITERADO.md', title: 'N° 25 DELITO CONTINUADO REITERADO', category: 'Delitos y Tipicidad' },
  { path: 'minutas/26_CONTROL_VIA_PUBLICA.md', title: 'N° 26 CONTROL VÍA PÚBLICA', category: 'Control de Identidad' },
  { path: 'minutas/27_OBLIGATORIEDAD_ART_302_CPP.md', title: 'N° 27 OBLIGATORIEDAD ART. 302 CPP DURANTE ETAPA INVESTIGATIVA', category: 'Procedimiento y Garantías' },
  { path: 'minutas/28_ABUSO_SEXUAL_INTRODUCCION_DE_DEDOS.md', title: 'N° 28 ABUSO SEXUAL: INTRODUCCIÓN DE DEDos', category: 'Delitos y Tipicidad' },
  { path: 'minutas/29_ACTUACIONES_AUTONOMAS_CARABINEROS.md', title: 'N° 29 ACTUACIONES AUTÓNOMAS DE CARABINEROS EN MANIFESTACIONES', category: 'Diligencias e Investigación' },
  { path: 'minutas/30_RETRACTACION_VICTIMA_331_LETRA_F_CPP.md', title: 'N° 30 RETRACTACIÓN VÍCTIMA ART. 331 LETRA F) CPP', category: 'Procedimiento y Garantías' },
  { path: 'minutas/31_INSTRUCCION_PRIMERAS_DILIGENCIAS.md', title: 'N° 31 INSTRUCCIÓN SOBRE PRIMERAS DILIGENCIAS', category: 'Diligencias e Investigación' },
  { path: 'minutas/32_OTRA_MINUTA.md', title: 'N° 32 OTRA MINUTA Ejemplo', category: 'Categoría Ejemplo' }
];

// Event Listeners
gridBtn.addEventListener('click', () => changeView(true));
listBtn.addEventListener('click', () => changeView(false));
btnBack.addEventListener('click', showHome);
homeBtn.addEventListener('click', showHome);

btnZoomIn.addEventListener('click', () => changeZoom(1));
btnZoomOut.addEventListener('click', () => changeZoom(-1));

toggleSearchBtn.addEventListener('click', () => searchBar.classList.toggle('hidden'));
closeSearch.addEventListener('click', () => {
  searchInput.value = '';
  clearHighlights();
  searchResults.style.display = 'none';
});

prevResult.addEventListener('click', () => {
  if (!matches.length) return;
  currentIndex = (currentIndex - 1 + matches.length) % matches.length;
  scrollToMatch();
  updateResultsUI();
});

nextResult.addEventListener('click', () => {
  if (!matches.length) return;
  currentIndex = (currentIndex + 1) % matches.length;
  scrollToMatch();
  updateResultsUI();
});

searchInput.addEventListener('input', e => {
  clearTimeout(searchInput._timeout);
  searchInput._timeout = setTimeout(() => performSearch(e.target.value.trim()), 300);
});

document.addEventListener('DOMContentLoaded', () => {
  loadDocs();
  changeView(true);
  applyZoom();
  minutasCatFilter.addEventListener('change', loadMinutas);
});

function changeView(isGrid) {
  docList.classList.toggle('grid-view', isGrid);
  docList.classList.toggle('list-view', !isGrid);
}

function loadDocs() {
  docList.innerHTML = '';
  docs.forEach(doc => {
    const card = document.createElement('div');
    card.className = 'doc-item';
    card.innerHTML = `<div class="doc-icon"><i class="${doc.icon}"></i></div><div class="doc-title">${doc.title}</div>`;
    card.addEventListener('click', () => doc.file === 'minutas' ? showMinutas() : openDoc(doc.file, doc.title));
    docList.appendChild(card);
  });
}

function showHome() {
  minutasView.style.display = 'none';
  viewer.style.display = 'none';
  docToolbar.classList.add('hidden');
  homeView.style.display = 'flex';
  clearView();
  loadDocs();
  currentActiveContainer = null;
}

function clearView() {
  viewer.innerHTML = '';
  minutasViewer.innerHTML = '';
  if (markInstance) clearHighlights();
}

function openDoc(path, title) {
  clearView();
  if (!searchBar.classList.contains('hidden')) searchBar.classList.add('hidden');

  if (path.startsWith('minutas/')) {
    homeView.style.display = 'none';
    viewer.style.display = 'none';
    docToolbar.classList.remove('hidden');
    minutasView.style.display = 'flex';
    minutasDocList.style.display = 'none';
    minutasViewer.style.display = 'block';
    currentActiveContainer = minutasViewer;
  } else {
    homeView.style.display = 'none';
    minutasView.style.display = 'none';
    docToolbar.classList.remove('hidden');
    viewer.style.display = 'block';
    currentActiveContainer = viewer;
  }

  fetch(path)
    .then(res => res.text())
    .then(content => {
      currentActiveContainer.innerHTML = path.endsWith('.html') ? content : marked.parse(content);
      document.title = `${title} – Biblioteca Jurídica`;
    })
    .catch(err => {
      currentActiveContainer.innerHTML = `<div class="error-container"><p>Error al cargar: ${err.message}</p></div>`;
    });
}

function applyZoom() {
  if (currentActiveContainer) {
    currentActiveContainer.style.fontSize = zoomSteps[currentZoom];
  }
}

function changeZoom(delta) {
  currentZoom = Math.min(Math.max(currentZoom + delta, 0), zoomSteps.length - 1);
  applyZoom();
}

function clearHighlights() {
  if (markInstance) markInstance.unmark();
}

function performSearch(term) {
  clearHighlights();
  matches = [];
  currentIndex = -1;
  if (!term || !currentActiveContainer) return;
  markInstance = new Mark(currentActiveContainer);
  markInstance.mark(term, {
    separateWordSearch: false,
    done: () => {
      matches = Array.from(currentActiveContainer.querySelectorAll('mark'));
      if (matches.length) {
        currentIndex = 0;
        scrollToMatch();
      }
      updateResultsUI();
    }
  });
}

function scrollToMatch() {
  if (!matches.length) return;
  matches[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function updateResultsUI() {
  searchResults.style.display = matches.length ? 'flex' : 'none';
  resultCounter.textContent = matches.length ? `${currentIndex + 1} de ${matches.length}` : 'No hay resultados';
}

function showMinutas() {
  homeView.style.display = 'none';
  viewer.style.display = 'none';
  docToolbar.classList.add('hidden');
  minutasView.style.display = 'flex';
  minutasDocList.style.display = 'grid';
  minutasViewer.style.display = 'none';
  clearView();
  currentActiveContainer = null;
  loadMinutas(); // <<< CORRECCIÓN INCLUIDA
}

function loadMinutas() {
  const category = minutasCatFilter.value;
  minutasDocList.innerHTML = '';
  docsMinutas
    .filter(doc => category === 'all' || doc.category === category)
    .forEach(doc => {
      const card = document.createElement('div');
      card.className = 'doc-item';
      card.innerHTML = `<div class="doc-title">${doc.title}</div><div class="doc-category">${doc.category}</div>`;
      card.addEventListener('click', () => openDoc(doc.path, doc.title));
      minutasDocList.appendChild(card);
    });
}
