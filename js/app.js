// === DATOS ===
const docs = [
  { file: 'docs/documento1.html',    title: 'CÓDIGO PENAL',                        icon: 'fa-solid fa-gavel' },
  { file: 'docs/documento2.html',    title: 'CÓDIGO PROCESAL PENAL',               icon: 'fa-solid fa-scale-balanced' },
  { file: 'docs/documento3.html',    title: 'LEY DE DROGAS',                       icon: 'fa-solid fa-pills' },
  { file: 'docs/documento4.html',    title: 'LEY DE CONTROL DE ARMAS',             icon: 'fa-solid fa-gun' },
  { file: 'docs/documento5.html',    title: 'LEY DE PENAS SUSTITUTIVAS',           icon: 'fa-solid fa-person-walking-arrow-right' },
  { file: 'docs/documento6.html',    title: 'LEY DE VIOLENCIA INTRAFAMILIAR',      icon: 'fa-solid fa-house-user' },
  { file: 'docs/documento7.html',    title: 'LEY RPA',                             icon: 'fa-solid fa-child' },
  { file: 'docs/documento8.html',    title: 'LEY RPA (Diferida)',                  icon: 'fa-solid fa-child-reaching' },
  { file: 'docs/documento9.html',    title: 'LEY DE VIOLENCIA EN LOS ESTADIOS',    icon: 'fa-solid fa-futbol' },
  { file: 'docs/documento10.html',   title: 'LEY DE TRÁNSITO',                     icon: 'fa-solid fa-car' },
  { file: 'docs/documento11.html',   title: 'LEY ORGÁNICA DEL MINISTERIO PÚBLICO', icon: 'fa-solid fa-building-columns' },
  { file: 'docs/calculadora_abonos.html', title: 'Calculadora Abonos por Arresto',    icon: 'fa-solid fa-calculator' },
  { file: 'minutas',                 title: 'Minutas Jurisprudencia',              icon: 'fa-solid fa-book-bookmark' }
];

const docsMinutas = [
  { path: 'minutas/2_CONTROL_DE_IDENTIDAD-LEY_DE_TRANSITO_C.md',      title: 'N° 2 CONTROL DE IDENTIDAD - LEY DE TRÁNSITO',               category: 'Control de Identidad' },
  { path: 'minutas/3_ACCESO_A_INFORMACION_EN_FACEBOOK.md',            title: 'N° 3 ACCESO A INFORMACIÓN EN FACEBOOK',                    category: 'Diligencias e Investigación' },
  { path: 'minutas/4_PRUEBA_POSTERIOR_AL_CIERRE.md',                 title: 'N° 4 PRUEBA POSTERIOR AL CIERRE',                          category: 'Procedimiento y Garantías' },
  { path: 'minutas/5_ARTICULO_195_LEY_18290.md',                     title: 'N° 5 ARTÍCULO 195 LEY 18290',                             category: 'Delitos y Tipicidad' },
  { path: 'minutas/6_REVISIÓN_DE_CELULARES.md',                      title: 'N° 6 REVISIÓN DE CELULARES',                              category: 'Diligencias e Investigación' },
  { path: 'minutas/7_PRIMERAS_DILIGENCIAS_Y_GPS.md',                 title: 'N° 7 PRIMERAS DILIGENCIAS Y GPS',                         category: 'Diligencias e Investigación' },
  { path: 'minutas/8_EFECTO_DE_LA_APELACIÓN_DE_LA_REVOCACIÓN_DE_PENA_SUSTITUTIVA.md', title: 'N° 8 EFECTO DE LA APELACIÓN DE LA REVOCACIÓN DE PENA SUSTITUTIVA', category: 'Procedimiento y Garantías' },
  { path: 'minutas/9_CONTROL_DE_IDENTIDAD_EN_INVESTIGACION_EN_CURSO.md', title: 'N° 9 CONTROL DE IDENTIDAD EN INVESTIGACIÓN EN CURSO',      category: 'Control de Identidad' },
  { path: 'minutas/10_COAUTORIA_EN_PORTE_O_TENENCIA_DE_ARMAS.md',     title: 'N° 10 COAUTORÍA EN PORTE O TENENCIA DE ARMAS',             category: 'Delitos y Tipicidad' },
  { path: 'minutas/11_INTERNACION_PROVISIONAL_PREVIA_AL_INFORME_SIQUIATRICO.md', title: 'N° 11 INTERNACIÓN PROVISIONAL PREVIA AL INFORME SÍQUIATRICO', category: 'Procedimiento y Garantías' },
  { path: 'minutas/12_TESTIGOS_NECESIDAD_DE_UNA_DECLARACIÓN_PREVIA.md', title: 'N° 12 TESTIGOS NECESIDAD DE UNA DECLARACIÓN PREVIA',       category: 'Procedimiento y Garantías' },
  { path: 'minutas/13_CONTROL_DE_IDENTIDAD_(ARROJAR_OBJETO).md',       title: 'N° 13 CONTROL DE IDENTIDAD (ARROJAR OBJETO)',             category: 'Control de Identidad' },
  { path: 'minutas/14_JUICIOS_POR_VIDEOCONFERENCIA_(RECLAMOS_CONCRETOS).md', title: 'N° 14 JUICIOS POR VIDEOCONFERENCIA (RECLAMOS CONCRETOS)', category: 'Procedimiento y Garantías' },
  { path: 'minutas/15_CONTROL_DE_IDENTIDAD_Y_DENUNCIA_ANÓNIMA.md',    title: 'N° 15 CONTROL DE IDENTIDAD Y DENUNCIA ANÓNIMA',           category: 'Control de Identidad' },
  { path: 'minutas/16_DETENCION_POR_GUARDIAS_DE_SEGURIDAD_O_MUNICIPALES.md', title: 'N° 16 DETENCIÓN POR GUARDIAS DE SEGURIDAD O MUNICIPALES', category: 'Detención y Aprehensión' },
  { path: 'minutas/17_DOLO_EVENTUAL_Y_DELITOS_TENTADOS_O_FRUSTRADOS.md', title: 'N° 17 DOLO EVENTUAL Y DELITOS TENTADOS O FRUSTRADOS',     category: 'Delitos y Tipicidad' },
  { path: 'minutas/18_DETENCION_POR_PARTICULARES.md',                  title: 'N° 18 DETENCIÓN POR PARTICULARES',                        category: 'Detención y Aprehensión' },
  { path: 'minutas/19_CONTROL_DE_IDENTIDAD_PREVENTIVO_QUE_MUTA_A_INVESTIGATIVO.md', title: 'N° 19 CONTROL DE IDENTIDAD PREVENTIVO QUE MUTA A INVESTIGATIVO', category: 'Control de Identidad' },
  { path: 'minutas/20_CADENA_DE_CUSTODIA_Y_DEBIDO_PROCESO.md',         title: 'N° 20 CADENA DE CUSTODIA Y DEBIDO PROCESO',              category: 'Evidencia y Cadena de Custodia' },
  { path: 'minutas/21_CONTROL_IDENTIDAD_OLOR_MARIHUANA.md',           title: 'N° 21 CONTROL IDENTIDAD OLOR MARIHUANA',                 category: 'Control de Identidad' },
  { path: 'minutas/22_CONTROL_IDENTIDAD_Y_HUIDA.md',                  title: 'N° 22 CONTROL IDENTIDAD Y HUIDA',                        category: 'Control de Identidad' },
  { path: 'minutas/23_CONTROL_IDENTIDAD_Y_CAN_DETECTOR_DE_DROGAS.md', title: 'N° 23 CONTROL IDENTIDAD Y CAN DETECTOR DE DROGAS',       category: 'Control de Identidad' },
  { path: 'minutas/24_Reclamos_por_infracción_de_garantías_de_terceros.md', title: 'N° 24 RECLAMOS POR INFRACCIÓN DE GARANTÍAS DE TERCEROS', category: 'Procedimiento y Garantías' },
  { path: 'minutas/25_Porte_o_tenencia_de_una_munición.md',           title: 'N° 25 PORTE O TENENCIA DE UNA MUNICIÓN',                 category: 'Delitos y Tipicidad' },
  { path: 'minutas/26_Delito_continuado_-_reiterado.md',              title: 'N° 26 DELITO CONTINUADO - REITERADO',                   category: 'Delitos y Tipicidad' },
  { path: 'minutas/26-Delito-continuado-reiterado_.md',               title: 'N° 26-DELITO CONTINUADO - REITERADO',                   category: 'Delitos y Tipicidad' },
  { path: 'minutas/27_Control_viapublica.md',                         title: 'N° 27 CONTROL DE IDENTIDAD - TRANSACCIÓN EN LA VÍA PÚBLICA', category: 'Control de Identidad' },
  { path: 'minutas/28_Obligatoriedad_del_artículo_302_del_CPP_durante_la_etapa_investigativa.md', title: 'N° 28 OBLIGATORIEDAD DEL ARTÍCULO 302 DEL CPP DURANTE LA ETAPA INVESTIGATIVA', category: 'Procedimiento y Garantías' },
  { path: 'minutas/29_Abuso_sexual_-_Introducción_de_dedos.md',       title: 'N° 29 ABUSO SEXUAL - INTRODUCCIÓN DE DEDOS',            category: 'Delitos y Tipicidad' },
  { path: 'minutas/30_Actuaciones_autónomas_de_Carabineros_en_marchas_y_manifestaciones.md', title: 'N° 30 ACTUACIONES AUTÓNOMAS DE CARABINEROS EN MARCHAS Y MANIFESTACIONES', category: 'Diligencias e Investigación' },
  { path: 'minutas/31_Retractación_Víctima_331_letra_f)_CPP.md',      title: 'N° 31 RETRACTACIÓN VÍCTIMA 331 LETRA F) CPP',           category: 'Procedimiento y Garantías' },
  { path: 'minutas/32_INSTRUCCION_SOBRE_PRIMERAS_DILIGENCIAS.md',      title: 'N° 32 INSTRUCCIÓN SOBRE PRIMERAS DILIGENCIAS',          category: 'Diligencias e Investigación' }
];

// === REFERENCIAS A DOM ===
const homeView     = document.getElementById('home-view');
const docToolbar   = document.getElementById('doc-toolbar');
const viewer       = document.getElementById('viewer');
const minutasView  = document.getElementById('minutas-view');
const searchInput  = document.getElementById('search');
const searchPanel  = document.getElementById('search-results');
const resultCounter= document.getElementById('result-counter');

let highlights = [], currentHit = -1, lastTerm = '';

// === NAVEGACIÓN SPA ===
function showHome() {
  homeView.style.display    = 'block';
  docToolbar.classList.add('hidden');
  viewer.style.display      = 'none';
  minutasView.style.display = 'none';
  searchPanel.style.display = 'none';
  buildHomeList();
  document.title = 'Biblioteca Jurídica – ANF';
}

function showMinutas() {
  homeView.style.display    = 'none';
  docToolbar.classList.add('hidden');
  viewer.style.display      = 'none';
  minutasView.style.display = 'block';
  renderMinutasList();
  document.title = 'Minutas Jurisprudencia';
}

// === BUILD HOME LIST ===
function buildHomeList() {
  const list = document.getElementById('docList');
  list.innerHTML = '';
  docs.forEach(d => {
    const card = document.createElement('div');
    card.className = 'doc-item';
    card.innerHTML = `
      <div class="doc-icon"><i class="${d.icon}"></i></div>
      <div class="doc-title">${d.title}</div>`;
    card.onclick = d.file === 'minutas'
      ? showMinutas
      : () => openDoc(d.file, d.title);
    list.appendChild(card);
  });
}

// === RENDER MINUTAS LIST ===
function renderMinutasList() {
  const list   = document.getElementById('minutas-docList');
  const filter = document.getElementById('minutas-catFilter').value;
  list.innerHTML = '';
  docsMinutas
    .filter(m => filter === 'all' || m.category === filter)
    .forEach(m => {
      const card = document.createElement('div');
      card.className = 'doc-item';
      card.innerHTML = `
        <div class="doc-title">${m.title}</div>
        <div class="doc-category">${m.category}</div>`;
      card.onclick = () => openDoc(m.path, m.title, true);
      list.appendChild(card);
    });
}

// === OPEN DOCUMENT (HTML o MD) ===
async function openDoc(path, title, isMD = false) {
  homeView.style.display    = 'none';
  minutasView.style.display = 'none';
  docToolbar.classList.remove('hidden');
  viewer.style.display      = 'block';
  document.title = title;

  // reset búsqueda y zoom
  highlights = [];
  currentHit = -1;
  lastTerm = '';
  searchPanel.style.display = 'none';
  viewer.style.fontSize = '16px';

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(res.status);
    const txt  = await res.text();
    const html = isMD || path.endsWith('.md')
      ? marked.parse(txt)
      : new DOMParser().parseFromString(txt, 'text/html').body.innerHTML;

    viewer.innerHTML = `<h1>${title}</h1>${html}`;

    // 🔧 CORRECCIÓN: ajustar rutas de imágenes internas
    viewer.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (src && !/^(https?:|\/)/.test(src)) {
        img.src = `docs/${src}`;
      }
    });

    hljs.highlightAll();
  } catch {
    viewer.innerHTML = `<div class="error-message"><p>Error cargando <strong>${title}</strong></p></div>`;
  }
}

// === BÚSQUEDA ===
function escapeRx(s){ return s.replace(/[-/\\^$*+?.()|[\]{}]/g,'\\$&'); }

function scrollToHit(idx){
  if (!highlights.length) return;
  currentHit = (idx + highlights.length) % highlights.length;
  highlights[currentHit].scrollIntoView({ behavior:'smooth', block:'center' });
  resultCounter.textContent = `${currentHit+1} de ${highlights.length}`;
}

function doSearch(){
  const term = searchInput.value.trim();
  if (!term) {
    highlights = []; currentHit = -1; lastTerm = '';
    searchPanel.style.display = 'none';
    return;
  }
  if (term === lastTerm && highlights.length) {
    scrollToHit(currentHit+1);
    return;
  }
  lastTerm = term;
  viewer.innerHTML = viewer.innerHTML; // reset innerHTML
  const walker = document.createTreeWalker(viewer, NodeFilter.SHOW_TEXT);
  let node;
  while(node = walker.nextNode()){
    const rx = new RegExp(`(${escapeRx(term)})`,'gi');
    if (rx.test(node.nodeValue)){
      const frag = document.createDocumentFragment();
      let last = 0;
      node.nodeValue.replace(rx,(match,p,offset)=>{
        if (offset > last) frag.appendChild(document.createTextNode(node.nodeValue.slice(last, offset)));
        const span = document.createElement('span');
        span.className = 'highlight';
        span.textContent = match;
        frag.appendChild(span);
        last = offset + match.length;
      });
      if (last < node.nodeValue.length) frag.appendChild(document.createTextNode(node.nodeValue.slice(last)));
      node.parentNode.replaceChild(frag, node);
    }
  }
  highlights = [...viewer.querySelectorAll('.highlight')];
  if (highlights.length) {
    searchPanel.style.display = 'flex';
    scrollToHit(0);
  } else {
    searchPanel.style.display = 'none';
  }
}

// === ZOOM ===
function changeFont(delta){
  const cur = parseFloat(getComputedStyle(viewer).fontSize);
  const next = Math.min(24, Math.max(12, cur + delta));
  viewer.style.fontSize = next + 'px';
}

// === EVENTOS & ARRANQUE ===
window.addEventListener('DOMContentLoaded', ()=>{
  buildHomeList();
  showHome();

  // grid/list toggle
  document.getElementById('grid-view-btn').onclick = ()=>{
    const dl = document.getElementById('docList');
    dl.classList.replace('doc-list','doc-grid');
  };
  document.getElementById('list-view-btn').onclick = ()=>{
    const dl = document.getElementById('docList');
    dl.classList.replace('doc-grid','doc-list');
  };

  // zoom botones
  document.getElementById('btn-font-increase').onclick = ()=>changeFont(1);
  document.getElementById('btn-font-decrease').onclick = ()=>changeFont(-1);

  // volver a Home
  document.getElementById('btn-back').onclick = showHome;
  document.getElementById('home-btn').onclick = showHome;

  // búsqueda
  searchInput.addEventListener('input', ()=>{
    clearTimeout(searchInput._t);
    searchInput._t = setTimeout(doSearch, 300);
  });
  searchInput.addEventListener('keydown', e=>{
    if (e.key === 'Enter') {
      clearTimeout(searchInput._t);
      doSearch();
    }
  });
  document.getElementById('prev-result').onclick = ()=>scrollToHit(currentHit-1);
  document.getElementById('next-result').onclick = ()=>scrollToHit(currentHit+1);
  document.getElementById('close-search').onclick = ()=>{
    searchInput.value = '';
    highlights = []; currentHit = -1; lastTerm = '';
    searchPanel.style.display = 'none';
    viewer.innerHTML = viewer.innerHTML;
  };
});
