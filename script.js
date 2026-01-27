// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ===== Navbar Scroll Effect =====
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
});

// ===== Easter Egg (Konami Code) =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach(orb => {
        orb.style.animation = 'none';
        orb.offsetHeight; // Trigger reflow
        orb.style.animation = 'float 5s ease-in-out infinite';
    });
    
    // Rainbow mode for 5 seconds
    document.body.style.transition = 'filter 0.5s ease';
    let hue = 0;
    const rainbow = setInterval(() => {
        hue = (hue + 5) % 360;
        document.body.style.filter = `hue-rotate(${hue}deg)`;
    }, 50);
    
    setTimeout(() => {
        clearInterval(rainbow);
        document.body.style.filter = '';
    }, 5000);
}

// ===== Snow Toggle =====
const snowToggle = document.getElementById('snow-toggle');
const snowContainer = document.querySelector('.snow-container');
let snowEnabled = localStorage.getItem('snow') === 'true';
let snowflakes = [];

// Initialize snow state
if (snowEnabled) {
    enableSnow();
    snowToggle.classList.add('active');
}

snowToggle.addEventListener('click', () => {
    snowEnabled = !snowEnabled;
    localStorage.setItem('snow', snowEnabled);
    
    if (snowEnabled) {
        enableSnow();
        snowToggle.classList.add('active');
    } else {
        disableSnow();
        snowToggle.classList.remove('active');
    }
});

function enableSnow() {
    snowContainer.innerHTML = '';
    const count = 50;
    
    for (let i = 0; i < count; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.width = snowflake.style.height = (Math.random() * 6 + 4) + 'px';
        
        // Start invisible for fade-in
        const targetOpacity = Math.random() * 0.6 + 0.4;
        snowflake.style.opacity = '0';
        snowflake.style.transition = 'opacity 0.8s ease-in';
        
        snowContainer.appendChild(snowflake);
        
        // Fade in with slight delay for staggered effect
        setTimeout(() => {
            snowflake.style.opacity = targetOpacity;
        }, Math.random() * 500);
    }
}

function disableSnow() {
    // Fade out snowflakes smoothly
    const flakes = snowContainer.querySelectorAll('.snowflake');
    flakes.forEach(flake => {
        flake.style.transition = 'opacity 1s ease-out';
        flake.style.opacity = '0';
    });
    
    // Remove after animation completes
    setTimeout(() => {
        snowContainer.innerHTML = '';
    }, 1000);
}

// ===== Console Message =====
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold;');
console.log('%cWant to see the code? Check out: https://github.com/prsanthx', 'font-size: 14px;');
