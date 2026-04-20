const themeSwitch = document.getElementById('theme-switch');
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dots = Array.from(document.querySelectorAll('.dot'));

// Tema
themeSwitch.addEventListener('change', () => {
    document.body.setAttribute('data-theme', themeSwitch.checked ? 'dark' : 'light');
});

// Carrossel
let currentIndex = 0;

function updateCarousel(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel(currentIndex);
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel(currentIndex);
    });
});

// Ajuste no resize
window.addEventListener('resize', () => updateCarousel(currentIndex));

// --- Lógica do Modal de Imagens ---
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("expanded-img");
const closeModal = document.querySelector(".close-modal");

// Pega todas as imagens dentro de card-img
const cardImages = document.querySelectorAll(".card-img img");

cardImages.forEach(img => {
    img.addEventListener("click", function() {
        modal.style.display = "flex"; // Mostra o modal centralizado
        modalImg.src = this.src;      // Pega o caminho da imagem clicada
    });
});

// Fecha o modal ao clicar no 'X'
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fecha o modal se clicar fora da imagem (no fundo escuro)
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});