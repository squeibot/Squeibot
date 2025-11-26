// Sistema de enrutamiento de páginas SPA (Single Page Application)
class PageRouter {
    constructor() {
        this.currentPage = 'home';
        this.pages = new Map();
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.registerPages();
        this.setupNavigation();
        this.setupHistory();
        this.loadInitialPage();
        this.setupPageEvents();
    }
    
    registerPages() {
        // Registrar todas las páginas disponibles
        this.pages.set('home', {
            element: document.getElementById('home-page'),
            title: 'Squeibot - Content Creator & Gaming Pro',
            path: '/'
        });
        
        this.pages.set('videos', {
            element: document.getElementById('videos-page'), 
            title: 'Videos - Squeibot Gaming Content',
            path: '/videos'
        });
        
        this.pages.set('social', {
            element: document.getElementById('social-page'),
            title: 'Redes Sociales - Conecta con Squeibot', 
            path: '/social'
        });
        
        this.pages.set('apps', {
            element: document.getElementById('apps-page'),
            title: 'Aplicaciones - Herramientas Gaming',
            path: '/apps'
        });
        
        this.pages.set('support', {
            element: document.getElementById('support-page'),
            title: 'Soporte - Centro de Ayuda Squeibot',
            path: '/support'
        });
        
        this.pages.set('contact', {
            element: document.getElementById('contact-page'),
            title: 'Contacto - Colabora con Squeibot',
            path: '/contact'
        });
    }
    
    setupNavigation() {
        // Navegación por enlaces
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-page]');
            if (link) {
                e.preventDefault();
                const pageName = link.getAttribute('data-page');
                this.navigateTo(pageName);
            }
        });
        
        // Navegación por hash (para compatibilidad)
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (this.pages.has(hash)) {
                this.navigateTo(hash);
            }
        });
        
        // Eventos personalizados
        window.addEventListener('switchPage', (e) => {
            this.navigateTo(e.detail.page);
        });
    }
    
    setupHistory() {
        // Manejar botones atrás/adelante
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.showPage(e.state.page, false);
            }
        });
    }
    
    loadInitialPage() {
        const hash = window.location.hash.substring(1);
        const initialPage = this.pages.has(hash) ? hash : 'home';
        this.navigateTo(initialPage, false);
    }
    
    navigateTo(pageName, updateHistory = true) {
        if (this.isTransitioning || !this.pages.has(pageName) || pageName === this.currentPage) {
            return;
        }
        
        this.isTransitioning = true;
        
        // Actualizar estado de navegación
        if (updateHistory) {
            window.history.pushState(
                { page: pageName }, 
                '', 
                this.pages.get(pageName).path
            );
        }
        
        // Mostrar página
        this.showPage(pageName);
        
        // Actualizar enlace activo
        this.updateActiveLink(pageName);
        
        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('pageChanged', {
            detail: { 
                from: this.currentPage, 
                to: pageName 
            }
        }));
        
        this.currentPage = pageName;
        this.isTransitioning = false;
    }
    
    showPage(pageName) {
        // Ocultar todas las páginas
        this.pages.forEach((page, name) => {
            if (page.element) {
                page.element.classList.remove('active');
            }
        });
        
        // Mostrar página actual
        const currentPage = this.pages.get(pageName);
        if (currentPage && currentPage.element) {
            currentPage.element.classList.add('active');
            
            // Actualizar título
            document.title = currentPage.title;
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Cargar contenido específico de la página
            this.loadPageContent(pageName);
        }
    }
    
    loadPageContent(pageName) {
        switch (pageName) {
            case 'videos':
                this.loadVideosContent();
                break;
            case 'social':
                this.loadSocialContent();
                break;
            case 'apps':
                this.loadAppsContent();
                break;
            case 'contact':
                this.loadContactContent();
                break;
        }
    }
    
    loadVideosContent() {
        // El VideoManager ya maneja esto
        console.log('Cargando contenido de videos...');
    }
    
    loadSocialContent() {
        // Contenido social ya cargado
        console.log('Cargando contenido social...');
    }
    
    loadAppsContent() {
        // Las apps ya están cargadas
        console.log('Cargando contenido de aplicaciones...');
    }
    
    loadContactContent() {
        // El formulario de contacto se maneja por separado
        console.log('Cargando contenido de contacto...');
    }
    
    updateActiveLink(pageName) {
        // Actualizar enlaces de navegación
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            }
        });
        
        // Actualizar enlaces del footer
        document.querySelectorAll('a[data-page]').forEach(link => {
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setupPageEvents() {
        // Evento cuando cambia la página
        window.addEventListener('pageChanged', (e) => {
            const { from, to } = e.detail;
            console.log(`Navegando de ${from} a ${to}`);
            
            // Analytics (simulado)
            this.trackPageView(to);
            
            // Notificación de cambio de página
            if (window.notificationSystem) {
                window.notificationSystem.createNotification(
                    `Navegando a ${this.getPageTitle(to)}`,
                    `Ahora estás en la sección ${this.getPageTitle(to)}`,
                    'info'
                );
            }
        });
    }
    
    getPageTitle(pageName) {
        const titles = {
            home: 'Inicio',
            videos: 'Videos',
            social: 'Redes Sociales',
            apps: 'Aplicaciones',
            support: 'Soporte',
            contact: 'Contacto'
        };
        
        return titles[pageName] || pageName;
    }
    
    trackPageView(pageName) {
        // Simular tracking de analytics
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: this.pages.get(pageName)?.title,
                page_location: window.location.href
            });
        }
    }
    
    // API pública
    getCurrentPage() {
        return this.currentPage;
    }
    
    refreshCurrentPage() {
        this.loadPageContent(this.currentPage);
    }
}

// Inicializar router
document.addEventListener('DOMContentLoaded', () => {
    window.pageRouter = new PageRouter();
    
    // Ocultar pantalla de carga
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 2000);
});