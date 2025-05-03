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
const searchResults = document.getElementById('search-results');
const prevResult = document.getElementById('prev-result');
const nextResult = document.getElementById('next-result');
const resultCounter = document.getElementById('result-counter');
const closeSearch = document.getElementById('close-search');

const toggleSearchBtn = document.getElementById('toggle-search');
const searchBar = document.getElementById('search-bar');
const clearSearchBtn = document.getElementById('clear-search');

let matches = [];
let currentIndex = -1;
let currentActiveContainer = null;

// === ZOOM ===
const zoomLevels = ['small', 'medium', 'large', 'xlarge'];
const zoomSteps = ['0.9rem', '1rem', '1.1rem', '1.2rem'];
let currentZoom = 1;
btnZoomIn.addEventListener('click', () => { if (currentZoom < zoomLevels.length-1) currentZoom++; applyZoom(); });
btnZoomOut.addEventListener('click', () => { if (currentZoom > 0) currentZoom--; applyZoom(); });
function applyZoom() {
  if (currentActiveContainer) {
    currentActiveContainer.style.fontSize = zoomSteps[currentZoom];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadDocs();
  applyZoom();
  minutasCatFilter.addEventListener('change', loadMinutas);
});

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

function loadMinutas() {
  minutasDocList.innerHTML = '';
  const category = minutasCatFilter.value;
  docsMinutas.filter(doc => category === 'all' || doc.category === category).forEach(doc => {
    const card = document.createElement('div');
    card.className = 'doc-item';
    card.innerHTML = `<div class="doc-title">${doc.title}</div><div class="doc-category">${doc.category}</div>`;
    card.addEventListener('click', () => openDoc(doc.path, doc.title));
    minutasDocList.appendChild(card);
  });
}

function showHome() {
  homeView.style.display = 'flex';
  docToolbar.classList.add('hidden');
  minutasView.style.display = 'none';
  viewer.style.display = 'none';
  clearView();
  loadDocs();
  currentActiveContainer = null;
}

function showMinutas() {
  homeView.style.display = 'none';
  viewer.style.display = 'none';
  docToolbar.classList.add('hidden');
  minutasView.style.display = 'flex';
  clearView();
  loadMinutas();
  currentActiveContainer = null;
}

function openDoc(path, title) {
  clearView();
  searchBar.classList.add('hidden');
  if (path.startsWith('minutas/')) {
    homeView.style.display = 'none';
    viewer.style.display = 'none';
    docToolbar.classList.remove('hidden');
    minutasView.style.display = 'flex';
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
      if (window.hljs) document.querySelectorAll('pre code').forEach(block => hljs.highlightBlock(block));
    });
}

function clearView() {
  viewer.innerHTML = '';
  minutasViewer.innerHTML = '';
  clearHighlights();
  matches = [];
  currentIndex = -1;
  searchResults.style.display = 'none';
}

function clearHighlights() {
  if (!currentActiveContainer) return;
  currentActiveContainer.querySelectorAll('mark').forEach(mark => mark.replaceWith(document.createTextNode(mark.textContent)));
}

// === BUSQUEDA ===
toggleSearchBtn.addEventListener('click', () => {
  searchBar.classList.toggle('hidden');
  if (!searchBar.classList.contains('hidden')) searchInput.focus();
});

searchInput.addEventListener('input', e => {
  const term = e.target.value.trim();
  clearSearchBtn.classList.toggle('hidden', !term);
  clearTimeout(searchInput._timeout);
  searchInput._timeout = setTimeout(() => performSearch(term), 300);
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearSearchBtn.classList.add('hidden');
  clearHighlights();
  searchResults.style.display = 'none';
});

function performSearch(term) {
  clearHighlights();
  matches = [];
  currentIndex = -1;
  if (!term || !currentActiveContainer) return;

  const walker = document.createTreeWalker(currentActiveContainer, NodeFilter.SHOW_TEXT, null, false);
  let node;
  const textNodes = [];
  while (node = walker.nextNode()) {
    textNodes.push(node);
  }

  const regex = new RegExp(term, 'gi');
  textNodes.forEach(textNode => {
    let match;
    regex.lastIndex = 0;
    while ((match = regex.exec(textNode.nodeValue))) {
      matches.push({ node: textNode, startOffset: match.index, endOffset: match.index + match[0].length });
    }
  });

  matches.reverse().forEach(match => {
    const range = document.createRange();
    range.setStart(match.node, match.startOffset);
    range.setEnd(match.node, match.endOffset);
    const mark = document.createElement('mark');
    range.surroundContents(mark);
  });

  currentIndex = 0;
  scrollToMatch();
  updateResultsUI();
}

function scrollToMatch() {
  if (!matches.length || currentIndex < 0) return;
  const highlights = currentActiveContainer.querySelectorAll('mark');
  highlights.forEach(h => h.classList.remove('current-match'));
  const target = highlights[currentIndex];
  if (target) {
    target.classList.add('current-match');
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function updateResultsUI() {
  if (matches.length) {
    resultCounter.textContent = `${currentIndex + 1} de ${matches.length}`;
    searchResults.style.display = 'flex';
  } else {
    resultCounter.textContent = 'No hay resultados';
    searchResults.style.display = searchInput.value.trim() ? 'flex' : 'none';
  }
}

prevResult.addEventListener('click', () => {
  if (!matches.length) return;
  currentIndex = (currentIndex - 1 + matches.length) % matches.length;
  scrollToMatch();
  updateResultsUI();
});
