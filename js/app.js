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
function applyZoom() {
  if (currentActiveContainer) currentActiveContainer.style.fontSize = zoomSteps[currentZoom];
}
btnZoomIn.addEventListener('click', () => { if (currentZoom < zoomLevels.length-1) currentZoom++; applyZoom(); });
btnZoomOut.addEventListener('click', () => { if (currentZoom > 0) currentZoom--; applyZoom(); });

document.addEventListener('DOMContentLoaded', () => {
  loadDocs();
  applyZoom();
  minutasCatFilter.addEventListener('change', loadMinutas);
});

// === DOCUMENTOS ===
const docs = [ /* ... mismas rutas ... */ ];
const docsMinutas = [ /* ... mismas rutas de minutas ... */ ];

// === EVENTOS HOME/MINUTAS ===
btnBack.addEventListener('click', showHome);
homeBtn.addEventListener('click', showHome);

// === MOSTRAR VISTAS ===
function showHome() {
  homeView.style.display = 'flex';
  docToolbar.classList.add('hidden');
  minutasView.style.display = 'none';
  clearView();
  loadDocs();
  currentActiveContainer = null;
}
function showMinutas() {
  homeView.style.display = 'none';
  docToolbar.classList.add('hidden');
  minutasView.style.display = 'flex';
  clearView();
  loadMinutas();
  currentActiveContainer = null;
}

// === CARGAR TARJETAS ===
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
  const cat = minutasCatFilter.value;
  docsMinutas.filter(d => cat==='all'||d.category===cat).forEach(doc => {
    const card = document.createElement('div');
    card.className = 'doc-item';
    card.innerHTML = `<div class="doc-title">${doc.title}</div><div class="doc-category">${doc.category}</div>`;
    card.addEventListener('click', () => openDoc(doc.path, doc.title));
    minutasDocList.appendChild(card);
  });
}

// === FUNCIONES AUXILIARES ===
function clearView() {
  viewer.innerHTML = '';
  minutasViewer.innerHTML = '';
  clearHighlights();
  matches=[]; currentIndex=-1;
  searchResults.style.display='none';
}

function clearHighlights() {
  if (!currentActiveContainer) return;
  currentActiveContainer.querySelectorAll('mark').forEach(m => m.replaceWith(document.createTextNode(m.textContent)));
}

// === ABRIR DOCUMENTO ===
function openDoc(path, title) {
  clearView();
  if (!searchBar.classList.contains('hidden')) searchBar.classList.add('hidden');
  const isMin = path.startsWith('minutas/');
  homeView.style.display = isMin ? 'none' : 'none';
  docToolbar.classList.toggle('hidden', false);
  minutasView.style.display = isMin ? 'flex' : 'none';
  viewer.style.display = isMin ? 'none' : 'block';
  currentActiveContainer = isMin ? minutasViewer : viewer;
  fetch(path).then(r=>r.text()).then(html=>{
    currentActiveContainer.innerHTML = path.endsWith('.html') ? html : marked.parse(html);
    if (window.hljs) document.querySelectorAll('pre code').forEach(b=>hljs.highlightBlock(b));
  });
}

// === BUSQUEDA ===
toggleSearchBtn.addEventListener('click', () => { searchBar.classList.toggle('hidden'); if(!searchBar.classList.contains('hidden')) searchInput.focus(); });
searchInput.addEventListener('input', e => {
  const term = e.target.value.trim();
  clearSearchBtn.classList.toggle('hidden', !term);
  clearTimeout(searchInput._timeout);
  searchInput._timeout = setTimeout(()=>performSearch(term), 300);
});
clearSearchBtn.addEventListener('click', ()=>{ searchInput.value=''; clearSearchBtn.classList.add('hidden'); clearHighlights(); searchResults.style.display='none'; });

function performSearch(term) {
  clearHighlights(); matches=[]; currentIndex=-1;
  if(!term||!currentActiveContainer) return;
  const walker = document.createTreeWalker(currentActiveContainer, NodeFilter.SHOW_TEXT, null, false);
  let node; const textNodes=[];
  while(node=walker.nextNode()) textNodes.push(node);
  const re=new RegExp(term,'gi');
  textNodes.forEach(textNode=>{ let m; re.lastIndex=0; while(m=re.exec(textNode.nodeValue)) matches.push({node:textNode,startOffset:m.index,endOffset:m.index+m[0].length}); });
  matches.reverse().forEach(m=>{ const r=document.createRange(); r.setStart(m.node,m.startOffset); r.setEnd(m.node,m.endOffset); const mk=document.createElement('mark'); r.surroundContents(mk); });
  currentIndex=0; scrollToMatch(); updateResultsUI();
}
function scrollToMatch(){ if(matches.length<1||currentIndex<0) return; const marks=currentActiveContainer.querySelectorAll('mark'); marks.forEach(m=>m.classList.remove('current-match')); const tgt=marks[currentIndex]; tgt?.classList.add('current-match'); tgt?.scrollIntoView({behavior:'smooth',block:'center'}); }
function updateResultsUI(){ if(matches.length){ resultCounter.textContent=`${currentIndex+1} de ${matches.length}`; searchResults.style.display='flex'; } else { resultCounter.textContent='No hay resultados'; searchResults.style.display = searchInput.value.trim()?'flex':'none'; }}
prevResult.addEventListener('click',()=>{ if(!matches.length)return; currentIndex=(currentIndex-1+matches.length)%matches.length; scrollToMatch(); updateResultsUI(); });
nextResult.addEventListener('click',()=>{ if(!matches.length)return; currentIndex=(currentIndex+1)%matches.length; scrollToMatch(); updateResultsUI(); });
