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

const searchInput = document.getElementById('search');
const searchPanel = document.getElementById('search-results');
const resultCounter = document.getElementById('result-counter');
const prevResultBtn = document.getElementById('prev-result');
const nextResultBtn = document.getElementById('next-result');
const closeSearchBtn = document.getElementById('close-search');

// Estado de la aplicación
targetView = 'home';
let highlights = [], currentHit = -1, lastTerm = '';
let lastDocPath = null, lastMinutasCategory = null;

// === NAVEGACIÓN SPA ===
function showHome() {
  homeView.style.display = 'block';
  docToolbar.classList.add('hidden');
  viewer.style.display = 'none';
  minutasView.style.display = 'none';
  viewToolbar.style.display = 'flex';
  minutasViewer.style.display = 'none';
  currentView = 'home';
  document.title = 'Biblioteca Jurídica – ANF';
  clearSearch();
}

function showMinutas() {
  homeView.style.display = 'none';
  docToolbar.classList.add('hidden');
  viewer.style.display = 'none';
  minutasView.style.display = 'flex';
  viewToolbar.style.display = 'none';
  minutasViewer.style.display = 'none';
  currentView = 'minutas';
  document.title = 'Minutas Jurisprudencia – ANF';
  renderMinutasList();
  lastMinutasCategory = minutasCatFilter.value;
  clearSearch();
}

function goBack() {
  if (currentView === 'doc') showHome();
  else if (currentView === 'minutasDoc') {
    showMinutas();
    if (lastMinutasCategory) {
      minutasCatFilter.value = lastMinutasCategory;
      renderMinutasList();
    }
  } else showHome();
}

// === DOCUMENTOS PRINCIPALES ===
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
  { file: 'docs/documento11.html', title: 'LEY ORGÁNICA MP', icon: 'fa-solid fa-building-columns' },
  { file: 'docs/calculadora_abonos.html', title: 'Calculadora Abonos', icon: 'fa-solid fa-calculator' },
  { file: 'minutas', title: 'Minutas Jurisprudencia', icon: 'fa-solid fa-book-bookmark' }
];

function buildHomeList() {
  docList.innerHTML = '';
  docs.forEach(doc => {
    const card = document.createElement('div');
    card.className = 'doc-item';
    card.innerHTML = `<div class="doc-icon"><i class="${doc.icon}"></i></div><div class="doc-title">${doc.title}</div>`;
    card.onclick = () => doc.file === 'minutas' ? showMinutas() : openDoc(doc.file, doc.title);
    docList.appendChild(card);
  });
}

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

function renderMinutasList() {
  minutasDocList.innerHTML = '';
  const filter = minutasCatFilter.value;
  docsMinutas
    .filter(m => filter === 'all' || m.category === filter)
    .forEach(m => {
      const card = document.createElement('div');
      card.className = 'doc-item';
      card.innerHTML = `<div class="doc-title">${m.title}</div><div class="doc-category">${m.category}</div>`;
      card.onclick = () => openDoc(m.path, m.title, true);
      minutasDocList.appendChild(card);
    });
}

// === ABRIR DOCUMENTOS ===
async function openDoc(path, title, isMinuta = false) {
  lastDocPath = path;
  const isMD = isMinuta || path.endsWith('.md');
  homeView.style.display = 'none';
  minutasView.style.display = 'none';
  viewToolbar.style.display = 'none';
  docToolbar.classList.remove('hidden');
  viewer.style.display = 'block';
  currentView = isMinuta ? 'minutasDoc' : 'doc';
  viewer.innerHTML = '<div class="loading">Cargando documento...</div>';
  document.title = title + ' – ANF';
  try {
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Tiempo de carga excedido')), 10000));
    const res = await Promise.race([fetch(path), timeout]);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    const txt = await res.text();
    const html = isMD ? marked.parse(txt) : new DOMParser().parseFromString(txt, 'text/html').body.innerHTML;
    viewer.innerHTML = `<h1>${title}</h1><div class="doc-content">${html}</div>`;
    hljs.highlightAll();
    if (lastTerm) performSearch(lastTerm);
    viewer.scrollTop = 0;
  } catch (err) {
    viewer.innerHTML = `<div class="error-container"><h2>Error al cargar</h2><p>${err.message}</p><button class="retry-btn" onclick="openDoc('${path}','${title}',${isMinuta})"><i class="fa-solid fa-rotate-right"></i> Reintentar</button></div>`;
  }
}

// === GESTIÓN DE FUENTE Y ZOOM ===
function changeFont(delta) {
  const fontSizes = ['small','medium','large','xlarge','xxlarge','xxxlarge','xxxxlarge'];
  let idx = fontSizes.findIndex(sz => document.body.classList.contains('font-size-' + sz));
  if (idx < 0) idx = 1; // medium por defecto
  const newIndex = Math.min(Math.max(idx + delta, 0), fontSizes.length - 1);
  fontSizes.forEach(sz => document.body.classList.remove('font-size-' + sz));
  document.body.classList.add('font-size-' + fontSizes[newIndex]);
  localStorage.setItem('preferredFontSize', fontSizes[newIndex]);
}

// === BÚSQUEDA ===
function clearSearch() { /* ...igual que antes...*/ }
function performSearch(term) { /* ...igual que antes...*/ }
function navigateSearch(dir) { /* ...igual que antes...*/ }

// === EVENTOS ===
window.addEventListener('DOMContentLoaded', () => {
  buildHomeList();
  showHome();
  gridBtn.onclick = () => docList.className = 'doc-grid';
  listBtn.onclick = () => docList.className = 'doc-list';
  btnZoomIn.onclick = () => changeFont(1);
  btnZoomOut.onclick = () => changeFont(-1);
  btnBack.onclick = goBack;
  homeBtn.onclick = showHome;
  minutasCatFilter.onchange = () => { lastMinutasCategory = minutasCatFilter.value; renderMinutasList(); };
  searchInput.addEventListener('input', e => { clearTimeout(searchInput.timeout); searchInput.timeout = setTimeout(() => performSearch(e.target.value.trim()), 300); });
  prevResultBtn.onclick = () => navigateSearch(-1);
  nextResultBtn.onclick = () => navigateSearch(1);
  closeSearchBtn.onclick = () => { clearSearch(); searchInput.value = ''; };

  // Restaurar preferencia de zoom
  const savedSize = localStorage.getItem('preferredFontSize');
  const allSizes = ['small','medium','large','xlarge','xxlarge','xxxlarge','xxxxlarge'];
  if (savedSize && allSizes.includes(savedSize)) {
    allSizes.forEach(sz => document.body.classList.remove('font-size-' + sz));
    document.body.classList.add('font-size-' + savedSize);
  } else {
    document.body.classList.add('font-size-medium');
  }

  // Registrar Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => console.log('SW registrado'))
      .catch(err => console.error('Error SW:', err));
  }
});
