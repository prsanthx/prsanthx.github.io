// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 1. DEFAULT GRID COLOR: Dark Blue (0x0056b3) for Light Mode
const geometry = new THREE.PlaneGeometry(100, 100, 40, 40);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x0056b3, 
    wireframe: true,
    transparent: true,
    opacity: 0.2 // Slightly more visible on white
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

plane.rotation.x = -Math.PI / 2;
plane.position.y = -10;
camera.position.z = 20; 
camera.position.y = 5;

// Animation
function animate() {
    requestAnimationFrame(animate);
    plane.position.z = (Date.now() * 0.005) % 2;
    plane.rotation.z += 0.0002;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 2. LIVE TIME
function updateTime() {
    const timeDisplay = document.getElementById('ny-time');
    const options = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    timeDisplay.innerText = `NYC: ${new Date().toLocaleTimeString('en-US', options)}`;
}
setInterval(updateTime, 1000);
updateTime();

// 3. THEME TOGGLE (Start = Light Mode)
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Set initial icon to Moon (because we are in Day mode)
toggleBtn.classList.remove('fa-sun');
toggleBtn.classList.add('fa-moon');

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        // Switch to Dark Mode
        toggleBtn.classList.remove('fa-moon');
        toggleBtn.classList.add('fa-sun');
        plane.material.color.setHex(0x64ffda); // Hacker Green
    } else {
        // Switch to Light Mode
        toggleBtn.classList.remove('fa-sun');
        toggleBtn.classList.add('fa-moon');
        plane.material.color.setHex(0x0056b3); // Dark Blue
    }
});

// 4. EASTER EGGS
const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let inputSequence = [];
window.addEventListener('keyup', (e) => {
    inputSequence.push(e.key);
    inputSequence.splice(-secretCode.length - 1, inputSequence.length - secretCode.length);
    if (inputSequence.join('') === secretCode.join('')) {
        alert("🚀 TURBO BOOST!");
        function spin() {
            plane.rotation.z += 0.1;
            plane.material.color.setHex(Math.random() * 0xffffff);
            requestAnimationFrame(spin);
        }
        spin();
    }
});

let docTitle = document.title;
window.addEventListener("blur", () => { document.title = "⚠️ System Offline..."; });
window.addEventListener("focus", () => { document.title = docTitle; });


const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});