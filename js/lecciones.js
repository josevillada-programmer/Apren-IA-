const LEVELS = 50;
const PLANE_WIDTH_PER_LEVEL = 320;
const viewport = document.getElementById('viewport');
const plane = document.getElementById('plane');
const mapPath = document.getElementById('mapPath');
const mapSvg = document.getElementById('mapPathSvg');
const progressBar = document.getElementById('progressBar');

let planeWidth = PLANE_WIDTH_PER_LEVEL * LEVELS + 400;
plane.style.width = planeWidth + 'px';
mapSvg.setAttribute('width', planeWidth);
mapSvg.setAttribute('height', '100%');
mapSvg.style.width = planeWidth + 'px';

function generatePathPoints(levels, width, height){
  const padding = 120;
  const usable = width - 2*padding;
  const band = height*0.5;
  let pts = [];
  for(let i=0;i<levels;i++){
    const t = i / (levels - 1); // 0..1
    const x = padding + t * usable;
    const y = (height*0.5) + Math.sin(t * Math.PI * 2.2) * band * 0.24 + Math.sin(t * Math.PI * 6.3) * band * 0.06;
    pts.push({x, y});
  }
  return pts;
}

function pointsToSvgPath(pts){
  if(pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y} `;
  for(let i=0;i<pts.length-1;i++){
    const p0 = pts[i-1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i+1];
    const p3 = pts[i+2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y} `;
  }
  return d;
}

function createNodes(pts){
  pts.forEach((pt, idx) => {
    const i = idx + 1;
    const node = document.createElement('div');
    node.classList.add('node');
    const grp = Math.floor((idx)/10) + 1;
    node.classList.add(`grp-${grp}`);

    node.innerHTML = "
      <div class=\"node-plate\" data-level=\"${i}\" aria-label=\"Nivel ${i}\">
        <div class=\"img-slot\" data-img=\"\"><!-- INSERT IMAGE HERE: set data-img=\"url\" or place <img src='..."/> --></div>
        ${i}
      </div>
      <div class=\"label\">Nivel ${i}</div>
      <div class=\"sub\">Puntos: <span class=\"pts\">—</span></div>
      <div class=\"badge\">G ${grp}</div>
    ";

    node.style.position = 'absolute';
    node.style.left = (pt.x - 56) + 'px';
    node.style.top = (pt.y - 56) + 'px';

    const imgSlot = node.querySelector('.img-slot');

    node.querySelector('.node-plate').addEventListener('click', (e) => {
      const level = e.currentTarget.getAttribute('data-level');
      openLevel(level);
    });

    plane.appendChild(node);
  });
}

function stylePathByGroup(pts){
  
  const segments = [];
  for(let g = 0; g < 5; g++){
    const start = g * 10;
    const end = Math.min(start + 9, pts.length - 1);
    if(start <= end){
      const segPts = pts.slice(start, end + 1);
      segments.push({pts: segPts, group: g+1});
    }
  }

  
  plane.querySelectorAll('.map-seg').forEach(n=>n.remove());
  segments.forEach((seg, idx) => {
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg','path');
    pathEl.setAttribute('d', pointsToSvgPath(seg.pts));
    pathEl.setAttribute('fill','none');
    pathEl.setAttribute('stroke-width','18');
    pathEl.setAttribute('stroke-linecap','round');
    pathEl.setAttribute('stroke-linejoin','round');
    pathEl.classList.add('map-seg');
    const styleClass = `path-style-${seg.group}`;
    pathEl.classList.add(styleClass);
    pathEl.setAttribute('opacity','0.85');
    mapSvg.appendChild(pathEl);

    const highlight = document.createElementNS('http://www.w3.org/2000/svg','path');
    highlight.setAttribute('d', pointsToSvgPath(seg.pts));
    highlight.setAttribute('fill','none');
    highlight.setAttribute('stroke-width','4');
    highlight.setAttribute('stroke-linecap','round');
    highlight.setAttribute('stroke-linejoin','round');
    highlight.setAttribute('opacity','0.7');
    highlight.setAttribute('stroke','#ffffff');
    highlight.style.mixBlendMode = 'overlay';
    highlight.classList.add('map-seg');
    mapSvg.appendChild(highlight);
  });
}

function initMap(){
  const h = viewport.clientHeight;
  const pts = generatePathPoints(LEVELS, planeWidth, h);
  mapSvg.setAttribute('viewBox', `0 0 ${planeWidth} ${h}`);
  mapSvg.setAttribute('preserveAspectRatio','none');

  
  createNodes(pts);

  stylePathByGroup(pts);

  addDecorations();

  centerOnPosition(0);
}

function openLevel(level) {
    const levelNum = parseInt(level, 10); 

    if (levelNum >= 41 && levelNum <= 50) {
        
        window.location.href = "resultados.html";

    } else {
        
        alert(`Abrir prueba / contenido del Nivel ${level} 
Esta es (por ejemplo) una prueba normal.`);
    }
}

function addDecorations(){
  const decos = [
    {x: 400, y: 40, w: 220, h:220, hint:'Mundo pastel — colocar imagen circular o sprite Posibles diseños Cesar'},
    {x: 1200, y: 20, w: 260, h:260, hint:'Portal neón — gif animado Posibles diseños Cesar'},
    {x: 2100, y: 80, w: 200, h:200, hint:'Árbol loco — colocar PNG con transparencia Posibles diseños Cesar'},
    {x: 3000, y: 30, w: 300, h:300, hint:'Mural cosmic — espacio para arte Posibles diseños Cesar'}
  ];
  decos.forEach(d => {
    const el = document.createElement('div');
    el.style.position='absolute';
    el.style.left = d.x + 'px';
    el.style.top = d.y + 'px';
    el.style.width = d.w + 'px';
    el.style.height = d.h + 'px';
    el.style.borderRadius = '18px';
    el.style.overflow = 'hidden';
    el.style.pointerEvents = 'none';
    el.style.zIndex = 4;
    // placeholder visual
    el.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;
       background:linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
       border:2px dashed rgba(255,255,255,0.04);color:rgba(255,255,255,0.6);font-weight:700;font-size:13px;text-align:center;padding:12px">
       ${d.hint}
    </div>`;
    plane.appendChild(el);
  });
}


let state = {x:0, isDown:false, startX:0, currentX:0, maxX:0};
function refreshBounds(){
  const viewportW = viewport.clientWidth;
  const planeW = plane.offsetWidth;
  state.maxX = Math.max(0, planeW - viewportW);
}
refreshBounds();
window.addEventListener('resize', ()=>{ refreshBounds(); });

function setPlaneX(x){
  x = Math.max(0, Math.min(state.maxX, x));
  plane.style.transform = `translateX(${-x}px)`;
  state.x = x;
  const pct = Math.round((x / state.maxX) * 100) || 0;
  progressBar.style.width = pct + '%';
}

vport.addEventListener('mousedown', (e) => {
  state.isDown = true; state.startX = e.clientX + state.x;
  viewport.style.cursor = 'grabbing';
});
window.addEventListener('mouseup', () => { state.isDown = false; viewport.style.cursor = 'default'; });
window.addEventListener('mousemove', (e) => {
  if(!state.isDown) return;
  const newX = state.startX - e.clientX;
  setPlaneX(newX);
});
vport.addEventListener('wheel', (e) => {
  e.preventDefault();
  setPlaneX(state.x + e.deltaY * 1.6);
},{passive:false});

document.getElementById('btnLeft').addEventListener('click', ()=> {
  setPlaneX(state.x - 450);
});
document.getElementById('btnRight').addEventListener('click', ()=> {
  setPlaneX(state.x + 450);
});
document.getElementById('btnCenter').addEventListener('click', ()=> {
  setPlaneX(0);
});

plane.addEventListener('click', (e) => {
  const nodePlate = e.target.closest('.node-plate');
  if(!nodePlate) return;
  const node = nodePlate.closest('.node');
  if(!node) return;
 
  const rect = node.getBoundingClientRect();
  const viewRect = viewport.getBoundingClientRect();
  const nodeCenterX = rect.left + rect.width/2;
  const offsetFromViewLeft = nodeCenterX - viewRect.left;
  const targetX = Math.round(state.x + offsetFromViewLeft - (viewRect.width/2));
  setPlaneX(targetX);
});


window.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowLeft') setPlaneX(state.x - 300);
  if(e.key === 'ArrowRight') setPlaneX(state.x + 300);
  if(e.key === 'Home') setPlaneX(0);
  if(e.key === 'End') setPlaneX(state.maxX);
});


function makeParticles(){
  const container = document.getElementById('particles');
  for(let i=0;i<28;i++){
    const s = document.createElement('span');
    s.style.left = Math.random()*100 + '%';
    s.style.top = Math.random()*100 + '%';
    s.style.width = (6 + Math.random()*12) + 'px';
    s.style.height = s.style.width;
    s.style.opacity = (0.05 + Math.random()*0.2);
    s.style.animationDuration = (8 + Math.random()*20) + 's';
    s.style.animationDelay = (Math.random()*-20) + 's';
    container.appendChild(s);
  }
}
makeParticles();


initMap();
refreshBounds();
setPlaneX(0); // start at zero


window.setNodeImage = function(level, url){
  const slot = plane.querySelector(`.node .node-plate[data-level="${level}"]`)?.querySelector('.img-slot');
  if(slot){
    slot.innerHTML = `<img src="${url}" alt="Nivel ${level}">`;
  } else {
    console.warn('No se encontró slot para nivel', level);
  }
};
