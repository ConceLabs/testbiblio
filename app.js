// === DATOS ===
const docs = [
  { file: 'docs/documento1.html',   title: 'CÓDIGO PENAL',                         icon: 'fa-solid fa-gavel' },
  { file: 'docs/documento2.html',   title: 'CÓDIGO PROCESAL PENAL',                icon: 'fa-solid fa-scale-balanced' },
  { file: 'docs/documento3.html',   title: 'LEY DE DROGAS',                        icon: 'fa-solid fa-pills' },
  { file: 'docs/documento4.html',   title: 'LEY DE CONTROL DE ARMAS',              icon: 'fa-solid fa-gun' },
  { file: 'docs/documento5.html',   title: 'LEY DE PENAS SUSTITUTIVAS',            icon: 'fa-solid fa-person-walking-arrow-right' },
  { file: 'docs/documento6.html',   title: 'LEY DE VIOLENCIA INTRAFAMILIAR',       icon: 'fa-solid fa-house-user' },
  { file: 'docs/documento7.html',   title: 'LEY RPA',                              icon: 'fa-solid fa-child' },
  { file: 'docs/documento8.html',   title: 'LEY RPA (Diferida)',                   icon: 'fa-solid fa-child-reaching' },
  { file: 'docs/documento9.html',   title: 'LEY DE VIOLENCIA EN LOS ESTADIOS',     icon: 'fa-solid fa-futbol' },
  { file: 'docs/documento10.html',  title: 'LEY DE TRÁNSITO',                      icon: 'fa-solid fa-car' },
  { file: 'docs/documento11.html',  title: 'LEY ORGÁNICA DEL MINISTERIO PÚBLICO',  icon: 'fa-solid fa-building-columns' },
  { file: 'calculadora_abonos.html', title: 'Calculadora Abonos por Arresto',      icon: 'fa-solid fa-calculator' },
  { file: 'minutas',                title: 'Minutas Jurisprudencia',               icon: 'fa-solid fa-book-bookmark' }
];

// === REFERENCIAS A DOM ===
const homeView    = document.getElementById('home-view');
const minutasView = document.getElementById('minutas-view');
const viewer      = document.getElementById('viewer');

// === NAVEGACIÓN SPA ===
function showHome() {
  // Oculta Minutas y Viewer
  minutasView.style.display = 'none';
  viewer.style.display      = 'none';
  // Muestra Home
  homeView.style.display    = 'block';
  // Reconstruye las tarjetas
  buildHomeList();
  // Título
  document.title = 'Biblioteca Jurídica – ANF';
}

function showMinutas() {
  // Oculta Home y Viewer
  homeView.style.display    = 'none';
  viewer.style.display      = 'none';
  // Muestra Minutas
  minutasView.style.display = 'block';
  // Lista de Minutas
  renderMinutasList();
  // Título
  document.title = 'Minutas de Jurisprudencia';
}

// === CONSTRUCCIÓN DE TARJETAS EN HOME ===
function buildHomeList() {
  const list = document.getElementById('docList');
  list.innerHTML = '';
  docs.forEach(d => {
    const card = document.createElement('div');
    card.className = 'doc-item';
    card.innerHTML = `
      <div class="doc-icon"><i class="${d.icon}"></i></div>
      <div class="doc-title">${d.title}</div>`;
    if (d.file === 'minutas') {
      // botón especial para Minutas
      card.addEventListener('click', showMinutas);
    } else {
      card.addEventListener('click', () => openDoc(d.file, d.title));
    }
    list.appendChild(card);
  });
}

// === CONSTRUCCIÓN DE TARJETAS EN MINUTAS ===
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
      card.addEventListener('click', () => openDoc(m.path, m.title, true));
      list.appendChild(card);
    });
}

// === ABRIR DOCUMENTO (HTML o Markdown) ===
async function openDoc(path, title, isMD = false) {
  // Oculta vistas
  homeView.style.display    = 'none';
  minutasView.style.display = 'none';
  viewer.style.display      = 'block';

  document.title = title;
  let content;
  try {
    const res = await fetch(isMD ? path : path);
    if (!res.ok) throw new Error(res.status);
    const txt = await res.text();
    if (isMD || path.endsWith('.md')) {
      content = marked.parse(txt);
    } else {
      // Para HTML, parsea el body
      content = new DOMParser()
                  .parseFromString(txt, 'text/html')
                  .body.innerHTML;
    }
  } catch (err) {
    content = `<div class="error-message">
                 <p>Error al cargar <strong>${title}</strong></p>
               </div>`;
  }
  viewer.innerHTML = `<h1>${title}</h1>${content}`;
  hljs.highlightAll();
}

// === ARRANQUE ===
window.addEventListener('DOMContentLoaded', () => {
  buildHomeList();
  showHome();

  // Botón “Inicio” en Minutas
  document.getElementById('home-btn')?.addEventListener('click', showHome);
  // Filtros y vista de Minutas
  document.getElementById('minutas-catFilter')?.addEventListener('change', renderMinutasList);
  document.getElementById('minutas-grid-btn')?.addEventListener('click', renderMinutasList);
  document.getElementById('minutas-list-btn')?.addEventListener('click', renderMinutasList);

  // Registra Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .catch(console.error);
  }
});
