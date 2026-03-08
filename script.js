// =========================================================
// Prasanth Muntha — Portfolio
// Black & White • Circuit Line • Data Pulse
// =========================================================

// =========================================================
// LOADING SCREEN
// =========================================================

const loader = document.getElementById('loader');
const loaderLines = [
  { id: 'load-1', text: '> Initializing portfolio...', delay: 200 },
  { id: 'load-2', text: '> Loading components...', delay: 600 },
  { id: 'load-3', text: '> Compiling awesomeness...', delay: 1000 },
  { id: 'load-4', text: '> Ready.', delay: 1400 }
];

async function runLoader() {
  const progressBar = document.querySelector('.loader-progress');
  
  for (let i = 0; i < loaderLines.length; i++) {
    const { id, text, delay } = loaderLines[i];
    await new Promise(r => setTimeout(r, i === 0 ? delay : delay - loaderLines[i-1].delay));
    
    const el = document.getElementById(id);
    if (el) {
      el.textContent = text;
      el.classList.add('show');
      if (i < loaderLines.length - 1) el.classList.add('dim');
    }
    
    // Update progress bar
    const progress = ((i + 1) / loaderLines.length) * 100;
    if (progressBar) progressBar.style.width = progress + '%';
  }
  
  // Wait a bit then hide loader
  await new Promise(r => setTimeout(r, 500));
  loader?.classList.add('hidden');
  
  // Remove from DOM after animation
  setTimeout(() => {
    loader?.remove();
    tryShowGlacixPopup();
  }, 500);
}

// Start loader
if (loader) {
  runLoader();
}

// =========================================================
// GLACIX POPUP (show again after 24h if they clicked "Maybe later")
// =========================================================

const GLACIX_POPUP_KEY = 'pm_glacix_popup_dismissed_at';
const GLACIX_POPUP_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

function tryShowGlacixPopup() {
  const dismissedAt = localStorage.getItem(GLACIX_POPUP_KEY);
  if (dismissedAt) {
    const elapsed = Date.now() - parseInt(dismissedAt, 10);
    if (elapsed < GLACIX_POPUP_COOLDOWN_MS) return;
  }

  const popup = document.getElementById('glacix-popup');
  const closeBtn = document.getElementById('glacix-popup-close');
  const dismissBtn = document.querySelector('.glacix-popup-dismiss');
  const backdrop = document.querySelector('.glacix-popup-backdrop');

  if (!popup) return;

  setTimeout(() => {
    popup.classList.add('active');
    popup.setAttribute('aria-hidden', 'false');
  }, 400);

  function closePopup() {
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');
    localStorage.setItem(GLACIX_POPUP_KEY, String(Date.now()));
  }

  closeBtn?.addEventListener('click', closePopup);
  dismissBtn?.addEventListener('click', closePopup);
  backdrop?.addEventListener('click', closePopup);

  document.addEventListener('keydown', function escClose(e) {
    if (e.key === 'Escape') {
      closePopup();
      document.removeEventListener('keydown', escClose);
    }
  });
}

// =========================================================
// TOP GLACIX BAR (dismissible for this visit only, shows every time you open the site)
// =========================================================

const glacixBar = document.getElementById('glacix-bar');
const glacixBarClose = document.getElementById('glacix-bar-close');

glacixBarClose?.addEventListener('click', () => {
  glacixBar?.classList.add('hidden');
  setTimeout(() => {
    document.body.classList.add('glacix-bar-dismissed');
  }, 300);
}); 


// =========================================================
// SCROLL PROGRESS INDICATOR
// =========================================================

const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
  if (!scrollProgress) return;
  
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  
  scrollProgress.style.width = Math.min(100, Math.max(0, progress)) + '%';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();


// =========================================================
// BACK TO TOP
// =========================================================

const backToTop = document.getElementById('back-to-top');
const BACK_TO_TOP_THRESHOLD = 400;

function updateBackToTop() {
  if (!backToTop) return;
  if (window.scrollY > BACK_TO_TOP_THRESHOLD) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

backToTop?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});


// =========================================================
// CUSTOM CURSOR
// =========================================================

const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');

let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

function updateCursor(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
}

function animateTrail() {
  // Smooth follow for trail
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  
  if (cursorTrail) {
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
  }
  
  requestAnimationFrame(animateTrail);
}

// Check if device has fine pointer (mouse)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener('mousemove', updateCursor);
  animateTrail();
  
  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, input, .project-card, .stack-items span, .btn');
  
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor?.classList.add('hover');
      cursorTrail?.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor?.classList.remove('hover');
      cursorTrail?.classList.remove('hover');
    });
  });
  
  // Click effect
  document.addEventListener('mousedown', () => {
    cursor?.classList.add('clicking');
  });
  document.addEventListener('mouseup', () => {
    cursor?.classList.remove('clicking');
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor?.classList.add('hidden');
    cursorTrail?.classList.add('hidden');
  });
  document.addEventListener('mouseenter', () => {
    cursor?.classList.remove('hidden');
    cursorTrail?.classList.remove('hidden');
  });
}


// =========================================================
// PARALLAX EFFECTS
// =========================================================

const parallaxElements = [
  { selector: '.hero-left', speed: 0.03 },
  { selector: '.status-panel', speed: 0.05 },
  { selector: '.section-node', speed: 0.02 },
  { selector: '.project-card', speed: 0.015 }
];

let scrollY = 0;
let ticking = false;

function updateParallax() {
  parallaxElements.forEach(({ selector, speed }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (centerY - viewportCenter) * speed;
      
      el.style.transform = `translateY(${offset}px)`;
    });
  });
  
  ticking = false;
}

function onScroll() {
  scrollY = window.scrollY;
  
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

// Only enable parallax on devices that can handle it well
if (window.matchMedia('(min-width: 768px)').matches) {
  window.addEventListener('scroll', onScroll, { passive: true });
  updateParallax();
}


// ===== Circuit Line Canvas =====
const canvas = document.getElementById('circuit-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let nodes = [];
let pulses = [];
let lineProgress = 0;
let targetProgress = 0;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = document.documentElement.scrollHeight;
}

function collectNodes() {
  nodes = [];
  const sectionNodes = document.querySelectorAll('.section-node, .footer-node');
  
  sectionNodes.forEach((node, i) => {
    const rect = node.getBoundingClientRect();
    const x = rect.left + rect.width / 2 + window.scrollX;
    const y = rect.top + rect.height / 2 + window.scrollY;
    nodes.push({ x, y, el: node, index: i });
  });
}

function getSpineX() {
  const firstNode = nodes[0];
  return firstNode ? firstNode.x : window.innerWidth * 0.08;
}

function getScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return Math.min(1, Math.max(0, scrollTop / docHeight));
}

function spawnPulse() {
  if (nodes.length < 2) return;
  pulses.push({
    progress: 0,
    speed: 0.003 + Math.random() * 0.002,
    size: 4 + Math.random() * 3,
    opacity: 0.8 + Math.random() * 0.2
  });
}

function updatePulses() {
  pulses = pulses.filter(p => {
    p.progress += p.speed;
    return p.progress < 1;
  });
  if (Math.random() < 0.02 && pulses.length < 8) {
    spawnPulse();
  }
}

function drawCircuit() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (nodes.length < 2) return;

  const spineX = getSpineX();
  const startY = Math.max(0, nodes[0].y - 300);
  const endY = nodes[nodes.length - 1].y + 100;
  const totalHeight = endY - startY;
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  targetProgress = getScrollProgress();
  lineProgress += (targetProgress - lineProgress) * 0.1;
  const drawEndY = startY + totalHeight * Math.min(1, lineProgress + 0.3);

  // Main spine
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 3;
  ctx.moveTo(spineX, startY);
  ctx.lineTo(spineX, drawEndY);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1;
  ctx.moveTo(spineX, startY);
  ctx.lineTo(spineX, drawEndY);
  ctx.stroke();

  // Branches
  nodes.forEach((node) => {
    if (node.y > drawEndY) return;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.moveTo(spineX, node.y);
    ctx.lineTo(node.x - 15, node.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.moveTo(spineX, node.y);
    ctx.lineTo(node.x - 15, node.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.arc(spineX, node.y, 4, 0, Math.PI * 2);
    ctx.fill();

    const nodeTop = node.y - scrollY;
    if (nodeTop < viewportHeight * 0.6 && nodeTop > -100) {
      node.el.classList.add('active');
    }
  });

  // Data pulses
  pulses.forEach(pulse => {
    const y = startY + totalHeight * pulse.progress;
    if (y > drawEndY) return;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${pulse.opacity})`;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 15;
    ctx.arc(spineX, y, pulse.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    for (const node of nodes) {
      const dist = Math.abs(y - node.y);
      if (dist < 50) {
        const branchProgress = 1 - dist / 50;
        const pulseX = spineX + (node.x - spineX - 15) * branchProgress;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${pulse.opacity * branchProgress})`;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 10;
        ctx.arc(pulseX, node.y, pulse.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  });

  drawFloatingShapes();
}

// Floating shapes
const shapes = [];
const SHAPE_COUNT = 25;
let shapesHyperMode = false;

function initShapes() {
  shapes.length = 0;
  for (let i = 0; i < SHAPE_COUNT; i++) {
    shapes.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * document.documentElement.scrollHeight,
      size: 40 + Math.random() * 80,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.005,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      type: ['triangle', 'square', 'diamond', 'circle', 'cross'][Math.floor(Math.random() * 5)],
      opacity: 0.06 + Math.random() * 0.08
    });
  }
}

function drawFloatingShapes() {
  const speedMultiplier = shapesHyperMode ? 5 : 1;
  
  shapes.forEach(shape => {
    // Move shapes
    shape.x += shape.vx * speedMultiplier;
    shape.y += shape.vy * speedMultiplier;
    shape.rotation += shape.rotationSpeed * speedMultiplier;
    
    // Wrap around screen
    const docHeight = document.documentElement.scrollHeight;
    if (shape.x < -100) shape.x = window.innerWidth + 100;
    if (shape.x > window.innerWidth + 100) shape.x = -100;
    if (shape.y < -100) shape.y = docHeight + 100;
    if (shape.y > docHeight + 100) shape.y = -100;
    
    ctx.save();
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.rotation);
    
    const opacity = shapesHyperMode ? shape.opacity * 2 : shape.opacity;
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = 1.5;
    const s = shape.size / 2;

    switch (shape.type) {
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.866, s * 0.5);
        ctx.lineTo(-s * 0.866, s * 0.5);
        ctx.closePath();
        ctx.stroke();
        break;
      case 'square':
        ctx.strokeRect(-s / 2, -s / 2, s, s);
        break;
      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s, 0);
        ctx.closePath();
        ctx.stroke();
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.6, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case 'cross':
        ctx.beginPath();
        ctx.moveTo(-s * 0.5, 0);
        ctx.lineTo(s * 0.5, 0);
        ctx.moveTo(0, -s * 0.5);
        ctx.lineTo(0, s * 0.5);
        ctx.stroke();
        break;
    }
    ctx.restore();
  });
}

function animate() {
  updatePulses();
  drawCircuit();
  requestAnimationFrame(animate);
}

setTimeout(() => {
  resizeCanvas();
  collectNodes();
  initShapes();
  animate();
}, 100);

window.addEventListener('resize', () => {
  resizeCanvas();
  collectNodes();
});

window.addEventListener('scroll', () => {
  if (Math.random() < 0.1) spawnPulse();
}, { passive: true });


// ===== "In the Works" Typing =====
const buildingMessages = [
  '> building Glacix v2',
  '> building agentic systems',
  '> local-first, privacy-first',
  '> RAG + multi-model pipelines',
  '> open for Summer 2026'
];

const typingLines = [
  { el: document.getElementById('typing-1'), text: '> building Glacix v2' },
  { el: document.getElementById('typing-2'), text: '> local-first, privacy-first' },
  { el: document.getElementById('typing-3'), text: '> open for Summer 2026' }
];

let buildingIndex = 0;

async function typeText(element, text, speed = 40) {
  if (!element) return;
  element.classList.add('typing');
  element.textContent = '';
  for (let i = 0; i < text.length; i++) {
    element.textContent += text[i];
    await new Promise(r => setTimeout(r, speed + Math.random() * 25));
  }
  element.classList.remove('typing');
}

async function runTypingAnimation() {
  await new Promise(r => setTimeout(r, 600));
  for (const line of typingLines) {
    await typeText(line.el, line.text);
    await new Promise(r => setTimeout(r, 300));
  }
  await new Promise(r => setTimeout(r, 6000));
  for (const line of typingLines) {
    if (line.el) line.el.textContent = '';
  }
  buildingIndex = (buildingIndex + 1) % buildingMessages.length;
  typingLines[0].text = buildingMessages[buildingIndex];
  runTypingAnimation();
}

runTypingAnimation();


// ===== Resume Modal =====
const modal = document.getElementById('resume-modal');
const openResumeBtn = document.getElementById('open-resume');
const closeModalBtn = document.getElementById('close-modal');
const compileOverlay = document.getElementById('compile-overlay');
const pdfViewer = document.getElementById('pdf-viewer');

const terminalLines = [
  { id: 'term-1', text: '$ pdflatex resume.tex', delay: 0 },
  { id: 'term-2', text: '<span class="info">This is pdfTeX, Version 3.14159265</span>', delay: 400 },
  { id: 'term-3', text: '<span class="info">entering extended mode...</span>', delay: 700 },
  { id: 'term-4', text: '<span class="file">Output written on resumee.pdf (1 page)</span>', delay: 1100 },
  { id: 'term-5', text: '<span class="success">✓ Compilation successful</span>', delay: 1500 }
];

let compileAnimationRan = false;

async function runCompileAnimation() {
  // Reset
  compileOverlay.classList.remove('hidden');
  pdfViewer.classList.remove('visible');
  
  terminalLines.forEach(line => {
    const el = document.getElementById(line.id);
    if (el) {
      el.classList.remove('show');
      el.innerHTML = '';
    }
  });

  // Animate each line
  for (const line of terminalLines) {
    await sleep(line.delay === 0 ? 200 : line.delay - (terminalLines[terminalLines.indexOf(line) - 1]?.delay || 0));
    const el = document.getElementById(line.id);
    if (el) {
      el.innerHTML = line.text;
      el.classList.add('show');
      if (line.id === 'term-5') {
        el.classList.remove('active');
      }
    }
  }

  // Wait then reveal PDF
  await sleep(600);
  compileOverlay.classList.add('hidden');
  await sleep(200);
  pdfViewer.classList.add('visible');
  
  compileAnimationRan = true;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function openModal() {
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  // Run animation if first time, otherwise show directly
  if (!compileAnimationRan) {
    runCompileAnimation();
  } else {
    compileOverlay.classList.add('hidden');
    pdfViewer.classList.add('visible');
  }
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Event listeners
if (openResumeBtn) openResumeBtn.addEventListener('click', openModal);
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

// Close on backdrop click
modal?.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('active')) {
    closeModal();
  }
});


// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// ===== Reveal on Scroll =====
const revealElements = document.querySelectorAll('section, .project-card, .stack-category');
revealElements.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('in'));
}


// ===== Nav Scroll Effect =====
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });


// ===== Console =====
console.log('%cPrasanth Muntha', 'font-size: 20px; font-weight: bold;');
console.log('%c→ AI/ML • 3D Vision • Data Pipelines', 'font-size: 12px; color: gray;');
console.log('%c→ github.com/prsanthx', 'font-size: 12px; color: gray;');
console.log('%c→ Try the Konami code ;)', 'font-size: 10px; color: #4ade80;');


// =========================================================
// EASTER EGGS
// =========================================================

// Toast notification system
function showToast(message, duration = 3000) {
  // Remove existing toast
  const existing = document.querySelector('.easter-toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'easter-toast';
  toast.innerHTML = `<span class="toast-icon">🥚</span> ${message}`;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// 1. KONAMI CODE (↑↑↓↓←→←→BA)
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;
let hyperModeActive = false;

document.addEventListener('keydown', (e) => {
  if (e.code === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateHyperMode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateHyperMode() {
  if (hyperModeActive) return;
  hyperModeActive = true;
  shapesHyperMode = true;
  
  showToast('🚀 HYPER MODE ACTIVATED!', 4000);
  document.body.classList.add('hyper-mode');
  
  // Spawn lots of pulses
  for (let i = 0; i < 20; i++) {
    setTimeout(() => spawnPulse(), i * 100);
  }
  
  // Deactivate after 10 seconds
  setTimeout(() => {
    hyperModeActive = false;
    shapesHyperMode = false;
    document.body.classList.remove('hyper-mode');
    showToast('Hyper mode deactivated');
  }, 10000);
}

// 2. LOGO CLICK (5 times)
const logo = document.querySelector('.logo');
let logoClicks = 0;
let logoClickTimer;

if (logo) {
  logo.addEventListener('click', (e) => {
    if (e.target.closest('a')?.getAttribute('href') === '#home') {
      logoClicks++;
      clearTimeout(logoClickTimer);
      
      if (logoClicks >= 5) {
        logoClicks = 0;
        activateGlitchMode();
      } else {
        logoClickTimer = setTimeout(() => {
          logoClicks = 0;
        }, 800);
      }
    }
  });
}

function activateGlitchMode() {
  showToast('You found an easter egg! 🎉');
  document.body.classList.add('glitch-mode');
  
  setTimeout(() => {
    document.body.classList.remove('glitch-mode');
  }, 3000);
}

// 3. TYPE "MATRIX" anywhere
let typedBuffer = '';
const secretWords = {
  'matrix': activateMatrixMode,
  'hello': () => showToast('Hello! 👋 Nice to meet you!'),
  'hire': () => showToast('Thanks! I\'m available for Summer 2026 internships 🙌'),
  'ai': () => showToast('AI is the future... and the present! 🤖')
};

document.addEventListener('keypress', (e) => {
  // Don't track if typing in input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  
  typedBuffer += e.key.toLowerCase();
  typedBuffer = typedBuffer.slice(-10); // Keep last 10 chars
  
  for (const [word, action] of Object.entries(secretWords)) {
    if (typedBuffer.includes(word)) {
      action();
      typedBuffer = '';
      break;
    }
  }
});

function activateMatrixMode() {
  showToast('Welcome to the Matrix 💊', 4000);
  document.body.classList.add('matrix-mode');
  
  // Create falling characters
  const matrixContainer = document.createElement('div');
  matrixContainer.className = 'matrix-rain';
  document.body.appendChild(matrixContainer);
  
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
  
  for (let i = 0; i < 50; i++) {
    const drop = document.createElement('div');
    drop.className = 'matrix-drop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = (2 + Math.random() * 3) + 's';
    drop.style.animationDelay = Math.random() * 2 + 's';
    drop.textContent = chars[Math.floor(Math.random() * chars.length)];
    matrixContainer.appendChild(drop);
  }
  
  setTimeout(() => {
    document.body.classList.remove('matrix-mode');
    matrixContainer.remove();
  }, 6000);
}

// 4. SHIFT + CLICK on status panel
const statusPanel = document.querySelector('.status-panel');
if (statusPanel) {
  statusPanel.addEventListener('click', (e) => {
    if (e.shiftKey) {
      showToast('Access granted. Welcome, developer. 🔓');
      
      // Add secret message to panel temporarily
      const panelContent = statusPanel.querySelector('.panel-content');
      const originalContent = panelContent.innerHTML;
      
      panelContent.innerHTML = `
        <div class="typing-line show">> sudo cat /etc/secrets</div>
        <div class="typing-line show" style="color: #4ade80;">> prasanth.isHiring = true</div>
        <div class="typing-line show" style="color: #4ade80;">> prasanth.loves = "building cool stuff"</div>
      `;
      
      setTimeout(() => {
        panelContent.innerHTML = originalContent;
        runTypingAnimation();
      }, 4000);
    }
  });
}

// 5. DOUBLE CLICK on name
const heroName = document.querySelector('h1');
if (heroName) {
  heroName.addEventListener('dblclick', () => {
    showToast('That\'s my name, don\'t wear it out! 😄');
    heroName.classList.add('name-bounce');
    setTimeout(() => heroName.classList.remove('name-bounce'), 600);
  });
}


// =========================================================
// FLOATING EASTER EGG HINTS
// =========================================================

const easterEggHints = [
  '↑↑↓↓←→←→BA',
  'type "matrix"',
  'type "hello"',
  'type "hire"',
  'type "ai"',
  'click logo ×5',
  'shift+click panel',
  'double-click name',
  'konami code',
  '🥚 hidden',
  'secrets await',
  'try something',
  '???',
  'press ` for terminal',
  'sudo hire prasanth',
  'try neofetch'
];

let hintContainer = null;

function createHintContainer() {
  hintContainer = document.createElement('div');
  hintContainer.className = 'hint-container';
  hintContainer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(hintContainer);
}

function spawnHint() {
  if (!hintContainer) createHintContainer();
  
  // Don't spawn if modal is open or too many hints
  if (modal?.classList.contains('active')) return;
  if (hintContainer.children.length > 3) return;
  
  const hint = document.createElement('div');
  hint.className = 'floating-hint';
  
  // Random hint text
  const text = easterEggHints[Math.floor(Math.random() * easterEggHints.length)];
  hint.textContent = text;
  
  // Random position (avoid edges)
  const x = 10 + Math.random() * 80; // 10% to 90% of viewport width
  const y = 10 + Math.random() * 80; // 10% to 90% of viewport height
  
  hint.style.left = x + 'vw';
  hint.style.top = y + 'vh';
  
  // Random rotation
  const rotation = (Math.random() - 0.5) * 20;
  hint.style.setProperty('--rotation', rotation + 'deg');
  
  // Random drift direction
  const driftX = (Math.random() - 0.5) * 50;
  const driftY = (Math.random() - 0.5) * 30;
  hint.style.setProperty('--drift-x', driftX + 'px');
  hint.style.setProperty('--drift-y', driftY + 'px');
  
  hintContainer.appendChild(hint);
  
  // Trigger animation
  requestAnimationFrame(() => {
    hint.classList.add('animate');
  });
  
  // Remove after animation
  setTimeout(() => {
    hint.remove();
  }, 6000);
}

// Spawn hints randomly
function scheduleNextHint() {
  // Random interval between 4-10 seconds
  const delay = 4000 + Math.random() * 6000;
  
  setTimeout(() => {
    spawnHint();
    scheduleNextHint();
  }, delay);
}

// Start spawning hints after a delay
setTimeout(() => {
  spawnHint(); // First hint after 2 seconds
  scheduleNextHint();
}, 2000);


// =========================================================
// TERMINAL MODE
// =========================================================

const terminalOverlay = document.getElementById('terminal-overlay');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');

let commandHistory = [];
let historyIndex = -1;
let terminalOpen = false;

// All command names for autocomplete
const commandList = [
  'help', 'about', 'projects', 'stack', 'contact', 'resume',
  'github', 'linkedin', 'email', 'whoami', 'neofetch', 'ls',
  'matrix', 'hyper', 'clear', 'secret', 'date', 'pwd', 'cat',
  'echo', 'exit', 'quit', 'hello', 'hi',
  'sudo hire prasanth'
];

// Interactive mode state
let interactiveMode = null;
let interactiveData = {};

// Terminal commands
const commands = {
  help: () => {
    return `<span class="info">Available commands:</span>

  <span class="highlight">Navigation</span>
  about       - Learn about me
  projects    - View my projects
  stack       - See my tech stack
  contact     - Get in touch
  resume      - Open my resume

  <span class="highlight">Links</span>
  github      - Open GitHub profile
  linkedin    - Open LinkedIn
  email       - Send me an email

  <span class="highlight">Fun</span>
  whoami      - Who am I?
  neofetch    - System info
  ls          - List sections
  matrix      - Enter the matrix
  hyper       - Activate hyper mode
  clear       - Clear terminal

  <span class="highlight">Secret</span>
  sudo hire prasanth - Try it! 😉`;
  },

  about: () => {
    closeTerminal();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    return '<span class="success">Navigating to About...</span>';
  },

  projects: () => {
    closeTerminal();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    return '<span class="success">Navigating to Projects...</span>';
  },

  stack: () => {
    closeTerminal();
    document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' });
    return '<span class="success">Navigating to Stack...</span>';
  },

  contact: () => {
    closeTerminal();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    return '<span class="success">Navigating to Contact...</span>';
  },

  resume: () => {
    closeTerminal();
    setTimeout(() => openModal(), 300);
    return '<span class="success">Opening resume...</span>';
  },

  github: () => {
    window.open('https://github.com/prsanthx', '_blank');
    return '<span class="success">Opening GitHub...</span>';
  },

  linkedin: () => {
    window.open('https://linkedin.com/in/prasanth-muntha-30b96623b/', '_blank');
    return '<span class="success">Opening LinkedIn...</span>';
  },

  email: () => {
    window.open('mailto:pmuntha@mail.yu.edu', '_blank');
    return '<span class="success">Opening email client...</span>';
  },

  whoami: () => {
    return `<span class="info">
┌─────────────────────────────────────────┐
│  <span class="highlight">Prasanth Muntha</span>                        │
│  MS in Artificial Intelligence          │
│  Yeshiva University, NYC                │
│                                         │
│  <span class="success">Building:</span>                             │
│  → Agentic AI Systems                   │
│  → 3D Computer Vision                   │
│  → Data Pipelines                       │
│                                         │
│  <span class="info">Status:</span> Open for Summer 2026         │
└─────────────────────────────────────────┘</span>`;
  },

  neofetch: () => {
    return `<span class="ascii">
        ██████╗ ███╗   ███╗
        ██╔══██╗████╗ ████║
        ██████╔╝██╔████╔██║
        ██╔═══╝ ██║╚██╔╝██║
        ██║     ██║ ╚═╝ ██║
        ╚═╝     ╚═╝     ╚═╝</span>
        
  <span class="highlight">prasanth</span>@<span class="highlight">portfolio</span>
  ──────────────────────
  <span class="info">OS:</span>      Web 1.0
  <span class="info">Host:</span>    GitHub Pages
  <span class="info">Kernel:</span>  JavaScript ES6+
  <span class="info">Shell:</span>   terminal.js
  <span class="info">Theme:</span>   Black & White
  <span class="info">Icons:</span>   Font Awesome 6
  <span class="info">Font:</span>    Space Mono
  
  <span class="info">CPU:</span>     Your Browser
  <span class="info">Memory:</span>  Unlimited Ideas
  <span class="info">Uptime:</span>  Since Jan 2026`;
  },

  ls: () => {
    return `<span class="info">drwxr-xr-x</span>  sections/
  
  <span class="success">01</span>  about/
  <span class="success">02</span>  stack/
  <span class="success">03</span>  projects/
      ├── glacix
      ├── githubx
      ├── local-first-rag
      ├── 3d-scoliosis
      └── fake-news-detection
  <span class="success">04</span>  contact/`;
  },

  matrix: () => {
    closeTerminal();
    setTimeout(() => activateMatrixMode(), 300);
    return '<span class="success">Entering the Matrix...</span>';
  },

  hyper: () => {
    closeTerminal();
    setTimeout(() => activateHyperMode(), 300);
    return '<span class="success">Activating hyper mode...</span>';
  },

  clear: () => {
    terminalOutput.innerHTML = '';
    return null;
  },

  'sudo hire prasanth': () => {
    interactiveMode = 'hire_name';
    interactiveData = {};
    return `<span class="response">[sudo] password for recruiter: ********</span>
<span class="success">✓ Verifying credentials...</span>
<span class="success">✓ Access granted</span>

<span class="highlight">📝 Let's get you connected!</span>
<span class="info">What's your name?</span>`;
  },

  hello: () => {
    return `<span class="success">Hello! 👋</span>
    
Nice to meet you! Type <span class="highlight">help</span> to see what I can do.`;
  },

  hi: () => commands.hello(),

  secret: () => {
    return `<span class="info">🥚 Easter eggs you might have missed:</span>
    
  • Konami code: ↑↑↓↓←→←→BA
  • Type "matrix" anywhere
  • Click logo 5 times
  • Shift+click status panel
  • Double-click my name
  • Watch the floating hints...`;
  },

  date: () => {
    return `<span class="info">${new Date().toString()}</span>`;
  },

  pwd: () => {
    return '<span class="info">/home/visitor/prasanth.dev</span>';
  },

  cat: (args) => {
    if (args === 'readme.md' || args === 'README.md') {
      return `<span class="info"># Prasanth Muntha

AI/ML Engineer building the future.

## Quick Links
- GitHub: github.com/prsanthx
- Email: pmuntha@mail.yu.edu

## Status
Open for Summer 2026 internships!</span>`;
    }
    return `<span class="error">cat: ${args || 'file'}: No such file</span>`;
  },

  echo: (args) => {
    return args || '';
  },

  exit: () => {
    closeTerminal();
    return '<span class="response">Goodbye!</span>';
  },

  quit: () => commands.exit(),
};

function processCommand(input) {
  const trimmed = input.trim();
  const trimmedLower = trimmed.toLowerCase();
  
  // Handle interactive mode
  if (interactiveMode) {
    return handleInteractiveInput(trimmed);
  }
  
  const [cmd, ...args] = trimmedLower.split(' ');
  const argString = args.join(' ');

  // Check for exact match first (for multi-word commands)
  if (commands[trimmedLower]) {
    return commands[trimmedLower]();
  }

  // Check for single command with args
  if (commands[cmd]) {
    const result = commands[cmd](argString);
    return result;
  }

  // Unknown command
  if (trimmed === '') {
    return null;
  }

  return `<span class="error">Command not found: ${cmd}</span>
<span class="response">Type <span class="highlight">help</span> for available commands.</span>`;
}

function handleInteractiveInput(input) {
  if (interactiveMode === 'hire_name') {
    if (!input.trim()) {
      return `<span class="error">Please enter your name:</span>`;
    }
    interactiveData.name = input.trim();
    interactiveMode = 'hire_email';
    return `<span class="success">Nice to meet you, ${interactiveData.name}!</span>
<span class="info">What's your email?</span>`;
  }
  
  if (interactiveMode === 'hire_email') {
    if (!input.trim() || !input.includes('@')) {
      return `<span class="error">Please enter a valid email:</span>`;
    }
    interactiveData.email = input.trim();
    interactiveMode = 'hire_company';
    return `<span class="success">Got it!</span>
<span class="info">Company/Organization? (or press Enter to skip)</span>`;
  }
  
  if (interactiveMode === 'hire_company') {
    interactiveData.company = input.trim() || 'Not specified';
    interactiveMode = null;
    
    // Save to localStorage
    saveHireSubmission(interactiveData);
    
    return `<span class="success">✓ Generating offer letter...</span>

<span class="highlight">🎉 Submission recorded!</span>

┌─────────────────────────────────────────┐
│  <span class="info">Name:</span>    ${interactiveData.name.padEnd(27)}│
│  <span class="info">Email:</span>   ${interactiveData.email.substring(0, 27).padEnd(27)}│
│  <span class="info">Company:</span> ${interactiveData.company.substring(0, 27).padEnd(27)}│
└─────────────────────────────────────────┘

<span class="success">I'll get back to you soon!</span>
<span class="response">Meanwhile, feel free to explore: <span class="highlight">projects</span>, <span class="highlight">github</span></span>`;
  }
  
  return null;
}

// ⚠️ IMPORTANT: Replace this with your Formspree endpoint!
// 1. Go to https://formspree.io and sign up (free)
// 2. Create a new form
// 3. Copy your endpoint URL and paste it below
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqroobk';

async function saveHireSubmission(data) {
  // Save to localStorage as backup
  const submissions = JSON.parse(localStorage.getItem('pm_hire_submissions') || '[]');
  submissions.push({
    ...data,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('pm_hire_submissions', JSON.stringify(submissions));
  
  // Log to console
  console.log('%c📧 New hire submission!', 'font-size: 14px; color: #4ade80;');
  console.log(data);
  
  // Send to Formspree (if configured)
  if (FORMSPREE_ENDPOINT && !FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          source: 'Terminal - sudo hire prasanth',
          timestamp: new Date().toISOString()
        })
      });
      console.log('%c✓ Sent to Formspree!', 'color: #4ade80;');
    } catch (err) {
      console.log('%c✗ Formspree error (check endpoint)', 'color: #ef4444;', err);
    }
  } else {
    console.log('%c⚠️ Formspree not configured - submission saved locally only', 'color: #fbbf24;');
    console.log('To receive emails, set up Formspree: https://formspree.io');
  }
}

function addToOutput(content, isCommand = false, commandText = '') {
  if (content === null) return;

  const line = document.createElement('div');
  line.className = 'line';

  if (isCommand) {
    line.innerHTML = `<span class="prompt">visitor@prasanth.dev ~ $</span> <span class="command">${commandText}</span>`;
  } else {
    line.innerHTML = content;
  }

  terminalOutput.appendChild(line);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function handleTerminalInput(e) {
  if (e.key === 'Enter') {
    const input = terminalInput.value;
    
    if (input.trim()) {
      commandHistory.push(input);
      historyIndex = commandHistory.length;
    }

    addToOutput(null, true, input);
    const result = processCommand(input);
    if (result) {
      addToOutput(result);
    }

    terminalInput.value = '';
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      terminalInput.value = commandHistory[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      terminalInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      terminalInput.value = '';
    }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    // Smart autocomplete
    const input = terminalInput.value.toLowerCase();
    
    if (!input) return;
    
    // Find all commands that start with the input
    const matches = commandList.filter(cmd => cmd.startsWith(input));
    
    if (matches.length === 1) {
      // Exact match - complete it
      terminalInput.value = matches[0];
    } else if (matches.length > 1) {
      // Multiple matches - find common prefix
      let commonPrefix = matches[0];
      for (const match of matches) {
        while (!match.startsWith(commonPrefix)) {
          commonPrefix = commonPrefix.slice(0, -1);
        }
      }
      if (commonPrefix.length > input.length) {
        terminalInput.value = commonPrefix;
      } else {
        // Show available options
        addToOutput(`<span class="response">${matches.join('  ')}</span>`);
      }
    }
  }
}

function openTerminal() {
  if (terminalOpen) return;
  terminalOpen = true;
  terminalOverlay.classList.add('active');
  terminalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  // Show welcome message on first open
  if (terminalOutput.children.length === 0) {
    addToOutput(`<span class="info">Welcome to Prasanth's Portfolio Terminal v1.0</span>

<span class="response">Type <span class="highlight">help</span> to see all commands</span>
<span class="response">Use <span class="highlight">Tab</span> for autocomplete, <span class="highlight">↑↓</span> for history</span>
`);
  }
  
  setTimeout(() => terminalInput.focus(), 100);
}

function closeTerminal() {
  terminalOpen = false;
  terminalOverlay.classList.remove('active');
  terminalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Event listeners
terminalInput?.addEventListener('keydown', handleTerminalInput);

// Click close button
document.querySelector('.term-btn.close')?.addEventListener('click', closeTerminal);

// Click backdrop to close
terminalOverlay?.addEventListener('click', (e) => {
  if (e.target === terminalOverlay) {
    closeTerminal();
  }
});

// Global keyboard shortcut
document.addEventListener('keydown', (e) => {
  // Backtick or Ctrl+K to open terminal
  if ((e.key === '`' && !e.ctrlKey && !e.metaKey) || 
      ((e.ctrlKey || e.metaKey) && e.key === 'k')) {
    // Don't trigger if typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      if (e.target !== terminalInput) return;
    }
    e.preventDefault();
    if (terminalOpen) {
      closeTerminal();
    } else {
      openTerminal();
    }
  }
  
  // Escape to close
  if (e.key === 'Escape' && terminalOpen) {
    closeTerminal();
  }
});

// Add terminal button to page
const terminalBtn = document.createElement('button');
terminalBtn.className = 'terminal-btn';
terminalBtn.innerHTML = '<i class="fas fa-terminal"></i> Terminal <kbd>`</kbd>';
terminalBtn.addEventListener('click', openTerminal);
document.body.appendChild(terminalBtn);

// Also add a command to view submissions (secret)
commands.submissions = () => {
  const submissions = JSON.parse(localStorage.getItem('pm_hire_submissions') || '[]');
  if (submissions.length === 0) {
    return '<span class="response">No submissions yet.</span>';
  }
  let output = `<span class="info">📧 Hire submissions (${submissions.length}):</span>\n`;
  submissions.forEach((sub, i) => {
    output += `
<span class="highlight">${i + 1}. ${sub.name}</span>
   Email: ${sub.email}
   Company: ${sub.company}
   Date: ${new Date(sub.timestamp).toLocaleString()}
`;
  });
  return output;
};

commands.clearsubmissions = () => {
  localStorage.removeItem('pm_hire_submissions');
  return '<span class="success">Submissions cleared.</span>';
};
