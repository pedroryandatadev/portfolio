// --- Partículas (do código anterior - Mantido) ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

let mouse = {
    x: null,
    y: null,
    radius: 150 
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; 
        this.vy = (Math.random() - 0.5) * 0.5; 
        this.size = Math.random() * 2 + 0.5; 
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function init() {
    particles = [];
    let numberOfParticles = (width * height) / 9000; 
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = dx * dx + dy * dy;

            if (distance < (120 * 120)) { 
                opacityValue = 1 - (distance / (120 * 120));
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }

        if (mouse.x != null) {
            let dx = particles[a].x - mouse.x;
            let dy = particles[a].y - mouse.y;
            let distance = dx * dx + dy * dy;

            if (distance < (mouse.radius * mouse.radius)) {
                opacityValue = 1 - (distance / (mouse.radius * mouse.radius));
                ctx.strokeStyle = `rgba(150, 200, 255, ${opacityValue * 0.5})`; 
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connect();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    init();
});

// --- Lógica do Carrossel (Nova) ---
const carousel = document.querySelector('.projects-carousel');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

let currentIndex = 0;

// Inicializa os indicadores de paginação dinamicamente
function createIndicators() {
    for (let i = 0; i < items.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.dataset.index = i; // Adiciona o índice como dado
        dot.addEventListener('click', () => {
            goToItem(i);
        });
        indicatorsContainer.appendChild(dot);
    }
}

// Move para um item específico pelo índice
function goToItem(index) {
    if (index < 0) {
        currentIndex = items.length - 1; // Volta ao final
    } else if (index >= items.length) {
        currentIndex = 0; // Volta ao início
    } else {
        currentIndex = index;
    }
    updateCarousel();
}

// Atualiza a aparência do carrossel
function updateCarousel() {
    // Altera a transição por deslocamento de scrollLeft
    carousel.scrollLeft = currentIndex * carousel.clientWidth;

    // Atualiza o estado ativo dos itens e indicadores
    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentIndex) item.classList.add('active');
    });

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) dot.classList.add('active');
    });
}

// Adiciona ouvintes de eventos para as setas
prevBtn.addEventListener('click', () => {
    goToItem(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    goToItem(currentIndex + 1);
});

// --- Inicialização Geral ---
resize();
init();
animate();
// Inicialização do Carrossel
createIndicators();
updateCarousel(); // Garante que o primeiro item esteja visível e indicadores corretos