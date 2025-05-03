
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

const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search-results');
const prevResult = document.getElementById('prev-result');
const nextResult = document.getElementById('next-result');
const resultCounter = document.getElementById('result-counter');
const closeSearch = document.getElementById('close-search');

const toggleSearchBtn = document.getElementById('toggle-search');
const searchBar = document.getElementById('search-bar');
const clearSearchBtn = document.getElementById('clear-search');

let currentZoom = 1;
const zoomLevels = ['0.9rem', '1rem', '1.1rem', '1.2rem'];

let currentMatches = [];
let currentIndex = -1;

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

function applyZoom() {
  viewer.style.fontSize = zoomLevels[currentZoom];
}

btnZoomIn.addEventListener('click', () => {
  if (currentZoom < zoomLevels.length - 1) currentZoom++;
  applyZoom();
});

btnZoomOut.addEventListener('click', () => {
  if (currentZoom > 0) currentZoom--;
  applyZoom();
});

gridBtn.addEventListener('click', () => {
  docList.classList.remove('doc-list');
  docList.classList.add('doc-grid');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  docList.classList.remove('doc-grid');
  docList.classList.add('doc-list');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});

function loadDocs() {
  docList.innerHTML = '';
  docs.forEach(doc => {
    const card = document.createElement('div');
    card.className = 'doc-item';
    card.innerHTML = `<div class="doc-icon"><i class="${doc.icon}"></i></div><div class="doc-title">${doc.title}</div>`;
    card.addEventListener('click', () => openDoc(doc.file, doc.title));
    docList.appendChild(card);
  });
}

function openDoc(path, title) {
  viewer.innerHTML = '';
  document.title = title + " - Biblioteca Jurídica";

  fetch(path)
    .then(res => res.text())
    .then(content => {
      viewer.innerHTML = content;
      applyZoom();
      if (searchInput.value.trim()) {
        performSearch(searchInput.value.trim());
      }
    })
    .catch(err => {
      viewer.innerHTML = "<p>Error al cargar el documento.</p>";
    });
}

function performSearch(term) {
  clearHighlights();
  if (!term) {
    searchResults.style.display = 'none';
    return;
  }

  const regex = new RegExp(`(${term})`, "gi");
  viewer.innerHTML = viewer.innerHTML.replace(regex, '<span class="search-highlight">$1</span>');
  currentMatches = Array.from(viewer.querySelectorAll('.search-highlight'));
  currentIndex = currentMatches.length ? 0 : -1;

  updateResultsUI();
  scrollToMatch();
}

function clearHighlights() {
  const highlights = viewer.querySelectorAll('.search-highlight');
  highlights.forEach(h => {
    h.outerHTML = h.innerHTML;
  });
  currentMatches = [];
  currentIndex = -1;
}

function updateResultsUI() {
  if (searchInput.value.trim()) {
    searchResults.style.display = 'flex';
    resultCounter.textContent = currentMatches.length ? `${currentIndex + 1} de ${currentMatches.length}` : 'Sin coincidencias';
  } else {
    searchResults.style.display = 'none';
  }
}

function scrollToMatch() {
  currentMatches.forEach(el => el.classList.remove('current-hit'));
  if (currentIndex >= 0 && currentMatches[currentIndex]) {
    currentMatches[currentIndex].classList.add('current-hit');
    currentMatches[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadDocs();

  btnBack.addEventListener('click', () => location.reload());

  toggleSearchBtn.addEventListener('click', () => {
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) searchInput.focus();
  });

  searchInput.addEventListener('input', e => {
    const term = e.target.value.trim();
    clearSearchBtn.classList.toggle('hidden', !term);
    performSearch(term);
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    clearHighlights();
    updateResultsUI();
  });

  prevResult.addEventListener('click', () => {
    if (!currentMatches.length) return;
    currentIndex = (currentIndex - 1 + currentMatches.length) % currentMatches.length;
    scrollToMatch();
    updateResultsUI();
  });

  nextResult.addEventListener('click', () => {
    if (!currentMatches.length) return;
    currentIndex = (currentIndex + 1) % currentMatches.length;
    scrollToMatch();
    updateResultsUI();
  });

  closeSearch.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    clearHighlights();
    updateResultsUI();
  });
});
