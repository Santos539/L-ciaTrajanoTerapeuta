// JavaScript para o site Lúcia Trajano Terapeuta

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  initializeMenu();
  initializeScrollEffects();
  initializeScrollReveal();
  initializeSmoothScroll();
});

/**
 * Inicializa o menu mobile (hamburger)
 */
function initializeMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  
  if (menuToggle && nav) {
    // Toggle do menu ao clicar no hamburger
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
      const isClickInsideNav = nav.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/**
 * Adiciona efeito de scroll no header
 */
function initializeScrollEffects() {
  const header = document.querySelector('header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

/**
 * Inicializa animações de scroll reveal usando Intersection Observer
 */
function initializeScrollReveal() {
  // Configuração do Intersection Observer para animações
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observar todos os elementos com classes de animação
  const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Adicionar delay progressivo para cards em grid
  const cards = document.querySelectorAll('.therapy-card');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Otimização de carregamento de imagens
  initializeImageLoading();
}

/**
 * Otimiza carregamento de imagens com Intersection Observer
 */
function initializeImageLoading() {
  // Configuração mais agressiva para carregar imagens antes
  const imageObserverOptions = {
    threshold: 0,
    rootMargin: '200px 0px 200px 0px' // Começa a carregar 200px antes de aparecer
  };
  
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Se a imagem já tem src, marcar como carregada
        if (img.complete) {
          img.classList.add('loaded');
        } else {
          // Adicionar listener para quando carregar
          img.addEventListener('load', function() {
            img.classList.add('loaded');
          });
          
          // Caso de erro, também marcar como loaded para evitar placeholder infinito
          img.addEventListener('error', function() {
            img.classList.add('loaded');
          });
        }
        
        // Parar de observar após iniciar carregamento
        imageObserver.unobserve(img);
      }
    });
  }, imageObserverOptions);
  
  // Observar todas as imagens lazy
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    imageObserver.observe(img);
    
    // Para imagens já carregadas (cache), adicionar classe imediatamente
    if (img.complete) {
      img.classList.add('loaded');
    }
  });
  
  // Precarregar imagens da hero section imediatamente
  const heroImages = document.querySelectorAll('.hero-image img, .therapy-card-image img');
  heroImages.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function() {
        img.classList.add('loaded');
      });
    }
  });
}

/**
 * Scroll suave para links internos
 */
function initializeSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Ignorar links vazios
      if (href === '#' || href === '#!') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Adiciona animação de hover aos botões
 */
function initializeButtonAnimations() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

/**
 * Adiciona efeito parallax suave no hero (opcional)
 */
function initializeParallax() {
  const hero = document.querySelector('.hero');
  
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });
  }
}

/**
 * Validação de formulário (se necessário no futuro)
 */
function validateForm(formId) {
  const form = document.getElementById(formId);
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Adicionar validação aqui se necessário
      const formData = new FormData(form);
      
      console.log('Formulário enviado:', Object.fromEntries(formData));
      
      // Feedback visual
      alert('Mensagem enviada com sucesso!');
      form.reset();
    });
  }
}

/**
 * Utilitário: Debounce para otimizar eventos de scroll/resize
 */
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Otimizar scroll events com debounce
 */
const optimizedScrollHandler = debounce(function() {
  // Handlers de scroll otimizados podem ser adicionados aqui
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

/**
 * Preloader (opcional - pode ser ativado se necessário)
 */
function initializePreloader() {
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });
}

/**
 * Animação de contagem (para números, se necessário)
 */
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

/**
 * Lazy loading para imagens (otimização de performance)
 */
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Exportar funções se necessário (para uso em módulos)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeMenu,
    initializeScrollEffects,
    initializeScrollReveal,
    initializeSmoothScroll
  };
}
