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

// Variables para el estado de la aplicación
let currentView = 'home'; // 'home', 'doc', 'minutas', 'minutasDoc'
let highlights = [], currentHit = -1, lastTerm = '';
let lastDocPath = null; // Para recordar el último documento abierto
let lastMinutasCategory = null; // Para recordar la última categoría de minutas

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
  switch (currentView) {
    case 'doc':
      showHome();
      break;
    case 'minutasDoc':
      showMinutas();
      // Restaurar la última categoría seleccionada
      if (lastMinutasCategory) {
        minutasCatFilter.value = lastMinutasCategory;
        renderMinutasList();
      }
      break;
    default:
      showHome();
  }
}

// === DOCUMENTOS PRINCIPALES ===
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

function buildHomeList() {
  docList.innerHTML = '';
  docs.forEach(doc => {
    const card = document.createElement('div');
    card.className = 'doc-item';
    card.innerHTML = `<div class="doc-icon"><i class="${doc.icon}"></i></div><div class="doc-title">${doc.title}</div>`;
    card.onclick = () => {
      if (doc.file === 'minutas') showMinutas();
      else openDoc(doc.file, doc.title);
    };
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
  // Guardamos el path para posible uso en búsqueda
  lastDocPath = path;
  
  // Determinar si es un documento Markdown
  const isMD = isMinuta || path.endsWith('.md');
  
  // Configurar la vista según el tipo de documento
  homeView.style.display = 'none';
  minutasView.style.display = 'none';
  viewToolbar.style.display = 'none';
  docToolbar.classList.remove('hidden');
  
  // Mostrar el viewer correcto según tipo de documento
  if (isMinuta) {
    viewer.style.display = 'block';
    minutasViewer.style.display = 'none';
    currentView = 'minutasDoc';
  } else {
    viewer.style.display = 'block';
    minutasViewer.style.display = 'none';
    currentView = 'doc';
  }

  // Mostrar indicador de carga
  viewer.innerHTML = '<div class="loading">Cargando documento...</div>';
  document.title = title + ' – ANF';

  try {
    // Establecer un timeout para la carga del documento
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Tiempo de carga excedido')), 10000)
    );
    
    // Cargar el documento
    const fetchPromise = fetch(path);
    const res = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }
    
    const txt = await res.text();
    const html = isMD ? marked.parse(txt) : txt;

    viewer.innerHTML = `<h1>${title}</h1>${html}`;

    // No aplicar estilo específico a cada elemento hijo, usar CSS para controlar el tamaño
    hljs.highlightAll();
    
    // Restaurar búsqueda si hay un término activo
    if (lastTerm) {
      performSearch(lastTerm);
    }
    
    // Scroll al inicio
    viewer.scrollTop = 0;
  } catch (err) {
    console.error('Error al cargar el documento:', err);
    viewer.innerHTML = `
      <div class="error-container">
        <h2>Error al cargar el documento</h2>
        <p>${err.message || 'No se pudo acceder al documento solicitado.'}</p>
        <button class="btn retry-btn" onclick="openDoc('${path}', '${title}', ${isMinuta})">
          <i class="fa-solid fa-rotate-right"></i> Reintentar
        </button>
      </div>
    `;
  }
}

// === GESTIÓN DE FUENTE Y ZOOM ===
function changeFont(delta) {
  // Variables para el tamaño de fuente
  const fontSizes = ['small', 'medium', 'large', 'xlarge'];
  
  // Obtener el índice actual de tamaño de fuente
  let currentFontIndex = 1; // Por defecto medium
  
  // Determinar el índice actual basado en las clases del body
  for (let i = 0; i < fontSizes.length; i++) {
    if (document.body.classList.contains('font-size-' + fontSizes[i])) {
      currentFontIndex = i;
      break;
    }
  }
  
  // Calcular el nuevo índice
  const newIndex = Math.min(Math.max(currentFontIndex + delta, 0), fontSizes.length - 1);
  
  // Eliminar todas las clases de tamaño actuales
  fontSizes.forEach(size => document.body.classList.remove('font-size-' + size));
  
  // Aplicar la nueva clase de tamaño
  document.body.classList.add('font-size-' + fontSizes[newIndex]);
  
  // Guardar la preferencia en localStorage para persistencia
  localStorage.setItem('preferredFontSize', fontSizes[newIndex]);
}

// === BÚSQUEDA ===
function clearSearch() {
  highlights = [];
  currentHit = -1;
  lastTerm = '';
  searchPanel.style.display = 'none';
  
  // Eliminar cualquier highlight previo
  if (viewer.querySelectorAll('.search-highlight').length > 0) {
    const oldHighlights = viewer.querySelectorAll('.search-highlight');
    oldHighlights.forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
  }
}

function performSearch(term) {
  if (!term || term.length < 2) {
    clearSearch();
    return;
  }
  
  if (term === lastTerm && highlights.length > 0) {
    // Simplemente navegar al siguiente resultado
    navigateSearch(1);
    return;
  }
  
  // Nuevo término de búsqueda
  lastTerm = term;
  clearSearch();
  
  // Buscar en el documento actual
  const content = viewer.innerHTML;
  const regex = new RegExp(`(${term})`, 'gi');
  
  // Resaltar coincidencias
  viewer.innerHTML = content.replace(regex, '<span class="search-highlight">$1</span>');
  
  // Recoger todos los elementos resaltados
  highlights = Array.from(viewer.querySelectorAll('.search-highlight'));
  
  if (highlights.length > 0) {
    searchPanel.style.display = 'flex';
    navigateSearch(1); // Ir al primer resultado
  } else {
    searchPanel.style.display = 'flex';
    resultCounter.textContent = 'No hay resultados';
  }
}

function navigateSearch(direction) {
  if (highlights.length === 0) return;
  
  // Quitar selección anterior si existe
  if (currentHit >= 0 && currentHit < highlights.length) {
    highlights[currentHit].classList.remove('current-hit');
  }
  
  // Actualizar posición
  currentHit = (currentHit + direction + highlights.length) % highlights.length;
  
  // Aplicar nueva selección
  highlights[currentHit].classList.add('current-hit');
  highlights[currentHit].scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Actualizar contador
  resultCounter.textContent = `${currentHit + 1} de ${highlights.length}`;
}

// === EVENTOS ===
window.addEventListener('DOMContentLoaded', () => {
  buildHomeList();
  showHome();

  // Eventos de vista principal
  gridBtn.onclick = () => docList.className = 'doc-grid';
  listBtn.onclick = () => docList.className = 'doc-list';

  // Eventos de zoom
  btnZoomIn.onclick = () => changeFont(1);
  btnZoomOut.onclick = () => changeFont(-1);

  // Eventos de navegación
  btnBack.onclick = goBack;
  homeBtn.onclick = showHome;

  // Eventos de filtrado de minutas
  minutasCatFilter.onchange = () => {
    lastMinutasCategory = minutasCatFilter.value;
    renderMinutasList();
  };
  
  // Eventos de búsqueda
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.trim();
    // Retrasar la búsqueda para evitar búsquedas constantes mientras se escribe
    clearTimeout(searchInput.timeout);
    searchInput.timeout = setTimeout(() => performSearch(term), 300);
  });
  
  // Navegación entre resultados de búsqueda
  prevResultBtn.addEventListener('click', () => navigateSearch(-1));
  nextResultBtn.addEventListener('click', () => navigateSearch(1));
  closeSearchBtn.addEventListener('click', () => {
    clearSearch();
    searchInput.value = '';
  });
  
  // Manejar teclas de acceso rápido
  document.addEventListener('keydown', (e) => {
    // Ctrl+F para búsqueda
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      searchInput.focus();
    }
    
    // Escape para cerrar búsqueda
    if (e.key === 'Escape' && searchPanel.style.display === 'flex') {
      clearSearch();
      searchInput.value = '';
    }
    
    // F3 para siguiente resultado
    if (e.key === 'F3' || (e.ctrlKey && e.key === 'g')) {
      e.preventDefault();
      if (highlights.length > 0) {
        navigateSearch(e.shiftKey ? -1 : 1);
      }
    }
  });
  
  // Restaurar tamaño de fuente preferido
  const savedSize = localStorage.getItem('preferredFontSize');
  if (savedSize) {
    // Eliminar cualquier clase de tamaño existente
    ['small', 'medium', 'large', 'xlarge'].forEach(size => {
      document.body.classList.remove('font-size-' + size);
    });
    // Aplicar el tamaño guardado
    document.body.classList.add('font-size-' + savedSize);
  } else {
    // Si no hay preferencia, usar medium por defecto
    document.body.classList.add('font-size-medium');
  }
  
  // Detectar si hay soporte para Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Service Worker registrado'))
        .catch(err => console.error('Error al registrar Service Worker:', err));
    });
  }
});

// Agregar estilos CSS para la búsqueda y el zoom al cargar la página
(function() {
  const style = document.createElement('style');
  style.textContent = `
    .search-highlight {
      background-color: #ffeb3b;
      border-radius: 2px;
    }
    .current-hit {
      background-color: #ff9800;
      color: #fff;
    }
    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      color: #666;
    }
    .error-container {
      text-align: center;
      padding: 2rem;
      color: #d32f2f;
    }
    .retry-btn {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius);
      cursor: pointer;
    }
    
    /* Estilos mejorados para el zoom */
    .font-size-small #viewer, .font-size-small #minutas-viewer { font-size: 0.9rem; }
    .font-size-medium #viewer, .font-size-medium #minutas-viewer { font-size: 1rem; }
    .font-size-large #viewer, .font-size-large #minutas-viewer { font-size: 1.1rem; }
    .font-size-xlarge #viewer, .font-size-xlarge #minutas-viewer { font-size: 1.2rem; }
    
    /* Asegurarse que el contenido interno también recibe los cambios */
    .font-size-small #viewer *, .font-size-small #minutas-viewer * { font-size: inherit; }
    .font-size-medium #viewer *, .font-size-medium #minutas-viewer * { font-size: inherit; }
    .font-size-large #viewer *, .font-size-large #minutas-viewer * { font-size: inherit; }
    .font-size-xlarge #viewer *, .font-size-xlarge #minutas-viewer * { font-size: inherit; }
  `;
  document.head.appendChild(style);
})();
