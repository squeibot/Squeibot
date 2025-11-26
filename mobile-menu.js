// Sistema de navegación premium
class NavigationSystem {
    constructor() {
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.nav = document.querySelector('nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.currentPage = 'home';
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupNavLinks();
        this.setupSmoothScroll();
        this.setupPageTransitions();
    }
    
    setupMobileMenu() {
        if (this.mobileMenu && this.nav) {
            this.mobileMenu.addEventListener('click', () => {
                this.nav.classList.toggle('active');
                this.mobileMenu.textContent = this.nav.classList.contains('active') ? '✕' : '☰';
            });
        }
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && !this.mobileMenu.contains(e.target)) {
                this.nav.classList.remove('active');
                this.mobileMenu.textContent = '☰';
            }
        });
    }
    
    setupNavLinks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Actualizar enlaces activos
                this.navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Obtener página destino
                const targetPage = link.getAttribute('data-page');
                if (targetPage && targetPage !== this.currentPage) {
                    this.switchPage(targetPage);
                }
                
                // Cerrar menú móvil si está abierto
                if (window.innerWidth <= 768) {
                    this.nav.classList.remove('active');
                    this.mobileMenu.textContent = '☰';
                }
            });
        });
    }
    
    setupSmoothScroll() {
        // Smooth scroll para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
    }
    
    setupPageTransitions() {
        // Prevenir transiciones durante la carga
        this.disableTransitionsTemporarily();
    }
    
    disableTransitionsTemporarily() {
        document.body.classList.add('no-transitions');
        setTimeout(() => {
            document.body.classList.remove('no-transitions');
        }, 100);
    }
    
    switchPage(pageName) {
        // Ocultar página actual
        const currentPage = document.querySelector(`#${this.currentPage}-page`);
        if (currentPage) {
            currentPage.classList.remove('active');
        }
        
        // Mostrar nueva página
        const newPage = document.querySelector(`#${pageName}-page`);
        if (newPage) {
            newPage.classList.add('active');
            this.currentPage = pageName;
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Disparar evento personalizado
            window.dispatchEvent(new CustomEvent('pageChanged', {
                detail: { page: pageName }
            }));
        }
    }
}

// Inicializar sistema de navegación
document.addEventListener('DOMContentLoaded', () => {
    new NavigationSystem();
});