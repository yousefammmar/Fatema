// Fatema's Custom Background Animation Script
// Theme: Purple/Cyber, CS Symbols
// Updated to use existing canvas with ID 'bg-canvas'

const canvas = document.getElementById('bg-canvas') || document.createElement('canvas');
if (!document.getElementById('bg-canvas')) {
    document.body.appendChild(canvas);
    canvas.id = 'bg-canvas';
}

const ctx = canvas.getContext('2d');

// We let CSS handle the background color entirely to allow for gradients/themes
// content in fatema.html already sets body background.

let width, height;
let particles = [];

// Symbols related to CS/Programming
const symbols = ['0', '1', '{', '}', '<', '>', '++', '&&', '!=', '[]', '()', 'if', 'for', 'return', ';', 'λ', 'φ', 'π'];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
        // Start at random positions initially
        this.y = Math.random() * height;
    }

    reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100; // Start slightly below screen
        this.speed = 0.5 + Math.random() * 1.5;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        // Purple-ish opacity for particles to match theme
        this.opacity = 0.1 + Math.random() * 0.4;
        this.size = 12 + Math.random() * 16;
        this.drift = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.y -= this.speed;
        this.x += this.drift;

        if (this.y < -50) {
            this.reset();
        }
    }

    draw() {
        ctx.font = `${this.size}px monospace`;
        // Matching the primary purple/violet colors: #8B5CF6 (139, 92, 246)
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.fillText(this.symbol, this.x, this.y);
    }
}

function init() {
    resize();
    particles = [];
    const particleCount = Math.floor((width * height) / 12000); // Moderate density
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    init();
});

// Initialize
init();
animate();
