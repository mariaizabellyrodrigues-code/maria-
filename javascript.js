// ==========================================
// 1. DADOS DOS COMPONENTES (DATABASE LOCAL)
// ==========================================

const carouselData = [
    {
        title: "Street Basketball '94",
        description: "As quadras vibrantes, o som das correntes na cesta e as cores intensas dos tênis de cano alto. O basquete nos anos 90 era puro espetáculo, energia e atitude de rua.",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80",
        alt: "Basquete de rua colorido dos anos 90"
    },
    {
        title: "Skateboarding Grunge Era",
        description: "Calças largas, fitas VHS e o contraste das pistas de concrete com grafites vibrantes. O skate da década de 90 definiu o lifestyle e a revolução cultural urbana.",
        image: "https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?auto=format&fit=crop&w=800&q=80",
        alt: "Skate urbano cheio de cor e estilo anos 90"
    },
    {
        title: "Treino Neon & Weightlifting",
        description: "Estética marcante, blusões vibrantes, anilhas pesadas e foco total. A fusão do estilo neon com a força bruta que revolucionou os treinos da época.",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        alt: "Atleta em treino com cores intensas"
    }
];

const accordionData = [
    {
        question: "O que torna o estilo Retro-Grunge Vibrante tão único?",
        answer: "A combinação de paletas de cores cyberpunk e neon com a energia crua da cultura de rua dos anos 90, resultando em um design impactante que destaca sua marca."
    },
    {
        question: "Como funciona o acesso à plataforma?",
        answer: "Após a confirmação, você recebe acesso imediato ao nosso portal VIP com coleções de treino, conteúdos de época arquivados e acesso à comunidade secreta de atletas."
    },
    {
        question: "Existe garantia de reembolso?",
        answer: "Sim, garantimos 7 dias incondicionais. Se você sentir que o espírito dos anos 90 não é para você, devolvemos 100% do seu investimento sem perguntas."
    },
    {
        question: "As vagas são realmente limitadas?",
        answer: "Sim! Para manter a exclusividade do grupo e o suporte personalizado, liberamos apenas 50 vagas por lote de adesão."
    }
];

// ==========================================
// 2. ESTADO GLOBAL DA APLICAÇÃO
// ==========================================

let currentSlide = 0;
let currentFontSize = 16;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;

// ==========================================
// 3. RENDERIZAÇÃO DINÂMICA DE COMPONENTES
// ==========================================

function renderCarousel() {
    const target = document.getElementById('carousel-render-target');
    if (!target) return;

    target.innerHTML = carouselData.map((item, index) => `
        <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
            <div class="carousel-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
            <div class="hero-image-card">
                <img src="${item.image}" alt="${item.alt}">
            </div>
        </div>
    `).join('');
}

function renderAccordion() {
    const target = document.getElementById('accordion-render-target');
    if (!target) return;

    target.innerHTML = accordionData.map((item, index) => `
        <div class="accordion-item ${index === 0 ? 'active' : ''}">
            <button class="accordion-header" aria-expanded="${index === 0}">
                <span>${item.question}</span>
                <i data-lucide="chevron-down" class="accordion-icon icon"></i>
            </button>
            <div class="accordion-content">
                <p>${item.answer}</p>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 4. LÓGICA DE INTERAÇÃO DOS COMPONENTES
// ==========================================

function initCarouselControls() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');

    if (!slides.length || !prevBtn || !nextBtn) return;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    });
}

function initAccordionControls() {
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            items.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ==========================================
// 5. ACESSIBILIDADE E REGRAS DE NEGÓCIO
// ==========================================

function initAccessibility() {
    const root = document.documentElement;
    const btnIncrease = document.getElementById('btn-font-increase');
    const btnDecrease = document.getElementById('btn-font-decrease');
    const btnContrast = document.getElementById('btn-contrast');

    if (btnIncrease) {
        btnIncrease.addEventListener('click', () => {
            const novaFonte = currentFontSize + 2;
            if (novaFonte >= MIN_FONT_SIZE && novaFonte <= MAX_FONT_SIZE) {
                currentFontSize = novaFonte;
                root.style.setProperty('--base-font-size', `${currentFontSize}px`);
            }
        });
    }

    if (btnDecrease) {
        btnDecrease.addEventListener('click', () => {
            const novaFonte = currentFontSize - 2;
            if (novaFonte >= MIN_FONT_SIZE && novaFonte <= MAX_FONT_SIZE) {
                currentFontSize = novaFonte;
                root.style.setProperty('--base-font-size', `${currentFontSize}px`);
            }
        });
    }

    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });
    }
}

// ==========================================
// 6. INICIALIZAÇÃO DA APLICAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    renderCarousel();
    renderAccordion();
    initCarouselControls();
    initAccordionControls();
    initAccessibility();
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});