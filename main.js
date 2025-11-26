// ===== SISTEMA PRINCIPAL MEJORADO - SQUEIBOT GAMING =====

// MEJORAS PARA LA SECCIÓN DE VIDEOS
function initVideoEnhancements() {
    // Agregar contador de videos
    const updateVideoCounter = () => {
        if (window.videoManager) {
            const stats = window.videoManager.getVideoStats();
            const counterElement = document.createElement('div');
            counterElement.className = 'video-counter';
            counterElement.innerHTML = `
                <div style="text-align:center; padding:1rem; background:rgba(0,255,136,0.1); border-radius:10px; border:1px solid var(--accent-neon); margin: 1rem auto; max-width: 600px;">
                    <h4 style="color:var(--accent-neon); margin-bottom:0.5rem;">🎮 Biblioteca de Contenido</h4>
                    <p style="margin:0; color:var(--text-light);">
                        <strong>${stats.total} videos</strong> disponibles | 
                        <span style="color:var(--accent-blue);">${stats.youtube} YouTube</span> • 
                        <span style="color:var(--accent-purple);">${stats.shorts} Shorts</span> • 
                        <span style="color:#69C9D0;">${stats.tiktok} TikTok</span>
                    </p>
                </div>
            `;
            
            const existingCounter = document.querySelector('.video-counter');
            if (existingCounter) existingCounter.remove();
            
            const pageHeader = document.querySelector('.page-header');
            if (pageHeader) {
                pageHeader.parentNode.insertBefore(counterElement, pageHeader.nextSibling);
            }
        }
    };

    // Agregar botones de acción rápida
    const addQuickActions = () => {
        const quickActions = document.createElement('div');
        quickActions.className = 'quick-actions';
        quickActions.innerHTML = `
            <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin: 2rem auto;">
                <button class="quick-action-btn" data-action="subscribe" style="background: var(--gradient-primary); color: var(--primary-dark); border: none; padding: 12px 20px; border-radius: 25px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;">
                    <i class="fab fa-youtube"></i> Suscribirse
                </button>
                <button class="quick-action-btn" data-action="follow-tiktok" style="background: linear-gradient(135deg, #000000, #69C9D0); color: white; border: none; padding: 12px 20px; border-radius: 25px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;">
                    <i class="fab fa-tiktok"></i> Seguir en TikTok
                </button>
                <button class="quick-action-btn" data-action="join-discord" style="background: var(--gradient-secondary); color: white; border: none; padding: 12px 20px; border-radius: 25px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;">
                    <i class="fab fa-discord"></i> Unirse al Discord
                </button>
            </div>
        `;

        const existingActions = document.querySelector('.quick-actions');
        if (!existingActions) {
            const videoFilters = document.querySelector('.video-filters');
            if (videoFilters) {
                videoFilters.parentNode.insertBefore(quickActions, videoFilters);
            }
        }

        // Configurar eventos de los botones rápidos
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                let url = '';
                
                switch(action) {
                    case 'subscribe':
                        url = 'https://www.youtube.com/@squeibot';
                        break;
                    case 'follow-tiktok':
                        url = 'https://www.tiktok.com/@squeibot';
                        break;
                    case 'join-discord':
                        url = 'https://discord.gg/2JTDC4ARjC';
                        break;
                }
                
                if (url) {
                    window.open(url, '_blank');
                    
                    // Mostrar notificación
                    if (window.notificationSystem) {
                        const messages = {
                            'subscribe': '¡Redirigiendo a YouTube!',
                            'follow-tiktok': '¡Redirigiendo a TikTok!', 
                            'join-discord': '¡Redirigiendo al Discord!'
                        };
                        window.notificationSystem.createNotification(
                            '🎮 Redirigiendo...',
                            messages[action],
                            'success'
                        );
                    }
                }
            });
        });
    };

    // Mejorar filtros con animaciones
    const enhanceFilters = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            // Agregar contador a cada filtro
            const filterType = btn.getAttribute('data-filter');
            if (filterType !== 'all' && window.videoManager) {
                const stats = window.videoManager.getVideoStats();
                const count = stats[filterType] || 0;
                const countBadge = document.createElement('span');
                countBadge.className = 'filter-count';
                countBadge.textContent = count;
                countBadge.style.cssText = `
                    background: var(--accent-purple);
                    color: white;
                    border-radius: 10px;
                    padding: 2px 6px;
                    font-size: 0.7rem;
                    margin-left: 5px;
                    font-weight: bold;
                `;
                btn.appendChild(countBadge);
            }
            
            btn.addEventListener('click', function() {
                // Animación de pulso
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    };

    // Agregar funcionalidad de teclado
    const addKeyboardShortcuts = () => {
        document.addEventListener('keydown', (e) => {
            // Solo en página de videos
            if (!document.querySelector('#videos-page.active')) return;
            
            // Atajos de teclado
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    document.querySelector('[data-filter="all"]')?.click();
                    break;
                case '2':
                    e.preventDefault();
                    document.querySelector('[data-filter="youtube"]')?.click();
                    break;
                case '3':
                    e.preventDefault();
                    document.querySelector('[data-filter="shorts"]')?.click();
                    break;
                case '4':
                    e.preventDefault();
                    document.querySelector('[data-filter="tiktok"]')?.click();
                    break;
                case '/':
                    e.preventDefault();
                    const searchInput = document.getElementById('videoSearch');
                    if (searchInput) {
                        searchInput.focus();
                    }
                    break;
                case 'Escape':
                    const activeSearch = document.getElementById('videoSearch');
                    if (activeSearch && document.activeElement === activeSearch) {
                        activeSearch.blur();
                        if (activeSearch.value === '') {
                            window.videoManager?.displayVideos();
                        }
                    }
                    break;
            }
        });
    };

    // Mejorar experiencia de carga
    const enhanceLoading = () => {
        // Mostrar skeleton al cambiar filtros
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const videoGrid = document.getElementById('videoGrid');
                if (videoGrid && window.videoManager) {
                    videoGrid.innerHTML = `
                        <div class="video-card skeleton" style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 1rem; margin: 1rem 0;">
                            <div class="video-thumbnail skeleton" style="height: 200px; background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%); background-size: 200% 100%; animation: loading 1.5s infinite; border-radius: 10px;"></div>
                            <div class="video-info">
                                <div class="skeleton-text" style="height: 16px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-bottom: 8px;"></div>
                                <div class="skeleton-text short" style="height: 16px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-bottom: 8px; width: 60%;"></div>
                                <div class="skeleton-text" style="height: 16px; background: rgba(255,255,255,0.1); border-radius: 4px; width: 40%;"></div>
                            </div>
                        </div>
                    `.repeat(6);
                }
            });
        });
    };

    // Inicializar todas las mejoras
    const initAllEnhancements = () => {
        if (window.videoManager) {
            updateVideoCounter();
            addQuickActions();
            enhanceFilters();
            addKeyboardShortcuts();
            enhanceLoading();
            
            // Actualizar contador cada 5 segundos
            setInterval(updateVideoCounter, 5000);
            
            console.log('🎯 Mejoras de videos inicializadas');
        }
    };

    // Esperar a que VideoManager esté listo
    if (window.videoManager) {
        initAllEnhancements();
    } else {
        const checkVideoManager = setInterval(() => {
            if (window.videoManager) {
                initAllEnhancements();
                clearInterval(checkVideoManager);
            }
        }, 100);
    }
}

// FUNCIÓN PARA LAZY LOADING DE VIDEOS
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    const src = iframe.getAttribute('data-src');
                    if (src) {
                        iframe.src = src;
                        iframe.removeAttribute('data-src');
                    }
                    lazyObserver.unobserve(iframe);
                }
            });
        });

        // Configurar lazy loading para iframes
        const setupLazyIframes = () => {
            const iframes = document.querySelectorAll('.video-thumbnail iframe');
            iframes.forEach(iframe => {
                const src = iframe.src;
                iframe.setAttribute('data-src', src);
                iframe.src = '';
                lazyObserver.observe(iframe);
            });
        };

        // Ejecutar cuando se carguen nuevos videos
        const originalDisplayVideos = window.videoManager?.displayVideos;
        if (originalDisplayVideos) {
            window.videoManager.displayVideos = function() {
                originalDisplayVideos.call(this);
                setTimeout(setupLazyIframes, 100);
            };
        }

        // Configurar inicial
        setTimeout(setupLazyIframes, 2000);
    }
}

// SISTEMA DE ANALYTICS PARA VIDEOS
function initVideoAnalytics() {
    // Track filter changes
    document.addEventListener('click', (e) => {
        if (e.target.closest('.filter-btn')) {
            const filter = e.target.closest('.filter-btn').getAttribute('data-filter');
            console.log('📊 Filtro aplicado:', filter);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'video_filter', {
                    'event_category': 'engagement',
                    'event_label': filter
                });
            }
        }
    });

    // Track video clicks
    document.addEventListener('click', (e) => {
        const videoCard = e.target.closest('.video-card');
        if (videoCard) {
            const videoType = Array.from(videoCard.classList)
                .find(cls => cls.includes('youtube') || cls.includes('shorts') || cls.includes('tiktok'));
            
            if (videoType) {
                console.log('🎬 Video clickeado:', videoType);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'video_click', {
                        'event_category': 'engagement',
                        'event_label': videoType
                    });
                }
            }
        }
    });

    // Track search usage
    let searchTimer;
    document.addEventListener('input', (e) => {
        if (e.target.id === 'videoSearch') {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                if (e.target.value.trim()) {
                    console.log('🔍 Búsqueda realizada:', e.target.value);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'video_search', {
                            'event_category': 'engagement',
                            'event_label': e.target.value
                        });
                    }
                }
            }, 1000);
        }
    });
}

// ===== CORRECCIONES DE BOTONES QUE NO FUNCIONABAN =====

function fixBrokenButtons() {
    console.log('🔧 Arreglando botones que no funcionan...');
    
    // Botones de la página de Apps
    const appButtons = document.querySelectorAll('.app-button[href="#"]');
    appButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const appName = button.closest('.app-card')?.querySelector('h3')?.textContent || 'Aplicación';
            
            if (window.notificationSystem) {
                window.notificationSystem.createNotification(
                    '🚧 Función en Desarrollo',
                    `${appName} estará disponible pronto`,
                    'info'
                );
            }
            console.log('📱 Botón de app clickeado:', appName);
        });
    });
    
    // Botones de Soporte
    const supportButtons = document.querySelectorAll('.support-button[href="#"]');
    supportButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const supportType = button.closest('.support-card')?.querySelector('h3')?.textContent || 'Recurso';
            
            if (window.notificationSystem) {
                window.notificationSystem.createNotification(
                    '🔧 Sección en Construcción',
                    `Estamos trabajando en ${supportType.toLowerCase()}`,
                    'warning'
                );
            }
            console.log('🛠️ Botón de soporte clickeado:', supportType);
        });
    });
    
    // Botón "No Te Pierdas Nada" del footer
    const newsletterButton = document.querySelector('.newsletter-button');
    if (newsletterButton) {
        newsletterButton.addEventListener('click', (e) => {
            e.preventDefault();
            const input = document.querySelector('.newsletter-input');
            if (input && input.value) {
                if (window.notificationSystem) {
                    window.notificationSystem.createNotification(
                        '✅ Suscrito Correctamente',
                        `Te has suscrito con: ${input.value}`,
                        'success'
                    );
                }
                console.log('📧 Email suscrito:', input.value);
                input.value = '';
            } else {
                if (window.notificationSystem) {
                    window.notificationSystem.createNotification(
                        '📧 Email Requerido',
                        'Por favor ingresa tu email para suscribirte',
                        'warning'
                    );
                }
            }
        });
    }
    
    // Botones CTA principales
    const ctaButtons = document.querySelectorAll('.cta-button[data-page]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetPage = button.getAttribute('data-page');
            console.log('🎯 Navegando a:', targetPage);
        });
    });
    
    console.log('✅ Botones arreglados correctamente');
}

// ===== SISTEMA DE MEJORAS GENERALES =====

function initGeneralEnhancements() {
    // Mejorar experiencia de carga
    const improveLoadingExperience = () => {
        // Simular carga de recursos
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 2000);
    };

    // Agregar efectos de particles al hover
    const addHoverEffects = () => {
        const cards = document.querySelectorAll('.video-card, .social-card, .app-card, .support-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    };

    // Sistema de progreso de carga
    const initProgressSystem = () => {
        let loadedResources = 0;
        const totalResources = 5; // Videos, imágenes, etc.
        
        const updateProgress = () => {
            loadedResources++;
            const progress = (loadedResources / totalResources) * 100;
            
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                const progressBar = loadingScreen.querySelector('.progress-bar') || (() => {
                    const bar = document.createElement('div');
                    bar.className = 'progress-bar';
                    bar.style.cssText = `
                        width: 80%;
                        height: 4px;
                        background: rgba(255,255,255,0.2);
                        border-radius: 2px;
                        margin: 1rem auto;
                        overflow: hidden;
                    `;
                    
                    const fill = document.createElement('div');
                    fill.className = 'progress-fill';
                    fill.style.cssText = `
                        height: 100%;
                        background: var(--gradient-primary);
                        border-radius: 2px;
                        transition: width 0.3s ease;
                        width: 0%;
                    `;
                    
                    bar.appendChild(fill);
                    loadingScreen.querySelector('.loading-content').appendChild(bar);
                    return bar;
                })();
                
                const fill = progressBar.querySelector('.progress-fill');
                if (fill) {
                    fill.style.width = `${progress}%`;
                }
            }
        };

        // Simular carga de recursos
        for (let i = 0; i < totalResources; i++) {
            setTimeout(updateProgress, 500 + (i * 300));
        }
    };

    // Inicializar todas las mejoras generales
    improveLoadingExperience();
    addHoverEffects();
    initProgressSystem();
}

// ===== UTILIDADES GLOBALES PARA DESARROLLO =====

window.videoUtils = {
    refresh: function() {
        if (window.videoManager) {
            window.videoManager.displayVideos();
            return '🔄 Videos actualizados';
        }
        return '❌ VideoManager no disponible';
    },
    
    stats: function() {
        if (window.videoManager) {
            return window.videoManager.getVideoStats();
        }
        return null;
    },
    
    search: function(query) {
        if (window.videoManager) {
            return window.videoManager.searchVideos(query);
        }
        return [];
    },
    
    filter: function(filterType) {
        const btn = document.querySelector(`[data-filter="${filterType}"]`);
        if (btn) {
            btn.click();
            return `🎛️ Filtro cambiado a: ${filterType}`;
        }
        return '❌ Filtro no encontrado';
    },
    
    notify: function(title, message, type = 'info') {
        if (window.notificationSystem) {
            window.notificationSystem.createNotification(title, message, type);
            return '🔔 Notificación enviada';
        }
        return '❌ NotificationSystem no disponible';
    }
};

// ===== INICIALIZACIÓN PRINCIPAL =====

function initMainSystem() {
    console.log('🚀 Iniciando sistema principal de Squeibot...');
    
    // Inicializar mejoras después de un delay
    setTimeout(() => {
        initVideoEnhancements();
        initLazyLoading();
        initVideoAnalytics();
        fixBrokenButtons();
        initGeneralEnhancements();
    }, 1500);
    
    // Manejar cambios de página
    window.addEventListener('pageChanged', (e) => {
        console.log('🔄 Cambio de página:', e.detail);
        
        if (e.detail.to === 'videos') {
            // Reinicializar mejoras cuando se entre a la página de videos
            setTimeout(() => {
                initVideoEnhancements();
                fixBrokenButtons();
            }, 500);
        } else {
            // Arreglar botones en otras páginas
            setTimeout(fixBrokenButtons, 300);
        }
    });
    
    // Mensaje de consola para desarrolladores
    console.log('💡 Usa window.videoUtils para utilidades de desarrollo');
    console.log('🎮 Sistema principal cargado correctamente');
}

// INICIALIZAR CUANDO SE CARGUE EL DOM
document.addEventListener('DOMContentLoaded', initMainSystem);

// Backup initialization en caso de que falle el DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMainSystem);
} else {
    initMainSystem();
}

// Exportar para uso global
window.SqueibotApp = {
    version: '1.0.0',
    init: initMainSystem,
    utils: window.videoUtils
};