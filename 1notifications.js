// Sistema de notificaciones premium
class NotificationSystem {
    constructor() {
        this.container = document.getElementById('notificationContainer');
        this.notifications = [];
        this.isVisible = false;
        
        this.init();
    }
    
    init() {
        this.setupStyles();
        this.loadNotifications();
        this.setupServiceWorker();
        this.setupAutomaticNotifications();
    }
    
    setupStyles() {
        // Los estilos están en el CSS principal
    }
    
    loadNotifications() {
        // Notificaciones predefinidas
        this.notifications = [
            {
                id: 1,
                type: 'new_video',
                title: '🎥 Nuevo Video Subido',
                message: '¡No te pierdas mi último gameplay épico!',
                link: '#videos',
                icon: 'fas fa-play-circle',
                timestamp: Date.now()
            },
            {
                id: 2, 
                type: 'live_stream',
                title: '🔴 Transmisión en Vivo',
                message: 'Únete a mi stream en vivo ahora mismo',
                link: 'https://kick.com/squeibot',
                icon: 'fas fa-broadcast-tower',
                timestamp: Date.now() - 3600000
            },
            {
                id: 3,
                type: 'community_event',
                title: '👥 Evento de la Comunidad',
                message: 'Torneo especial este fin de semana',
                link: '#social',
                icon: 'fas fa-users',
                timestamp: Date.now() - 86400000
            }
        ];
    }
    
    showNotification(notification) {
        if (!this.container) return;
        
        const notificationEl = document.createElement('div');
        notificationEl.className = 'notification';
        notificationEl.innerHTML = `
            <i class="${notification.icon}"></i>
            <div class="notification-content">
                <strong>${notification.title}</strong>
                <span class="notification-message">${notification.message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        // Agregar evento de clic
        if (notification.link) {
            notificationEl.style.cursor = 'pointer';
            notificationEl.addEventListener('click', () => {
                if (notification.link.startsWith('#')) {
                    // Navegación interna
                    const targetPage = notification.link.substring(1);
                    window.dispatchEvent(new CustomEvent('switchPage', {
                        detail: { page: targetPage }
                    }));
                } else {
                    // Enlace externo
                    window.open(notification.link, '_blank');
                }
                this.hideNotification();
            });
        }
        
        // Botón cerrar
        const closeBtn = notificationEl.querySelector('.notification-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideNotification();
        });
        
        this.container.innerHTML = '';
        this.container.appendChild(notificationEl);
        this.container.classList.add('show');
        this.isVisible = true;
        
        // Auto-ocultar después de 8 segundos
        setTimeout(() => {
            if (this.isVisible) {
                this.hideNotification();
            }
        }, 8000);
    }
    
    hideNotification() {
        if (!this.container) return;
        
        this.container.classList.remove('show');
        this.isVisible = false;
        
        // Limpiar después de la animación
        setTimeout(() => {
            this.container.innerHTML = '';
        }, 300);
    }
    
    createNotification(title, message, type = 'info', link = null) {
        const icons = {
            info: 'fas fa-info-circle',
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            error: 'fas fa-exclamation-circle',
            new_video: 'fas fa-play-circle',
            live_stream: 'fas fa-broadcast-tower',
            community_event: 'fas fa-users'
        };
        
        const notification = {
            id: Date.now(),
            type: type,
            title: title,
            message: message,
            link: link,
            icon: icons[type] || icons.info,
            timestamp: Date.now()
        };
        
        this.notifications.unshift(notification);
        this.showNotification(notification);
        this.saveToLocalStorage();
        
        // Mostrar notificación del sistema si está permitido
        this.showSystemNotification(notification);
    }
    
    showSystemNotification(notification) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(notification.title, {
                body: notification.message,
                icon: '/icon.png',
                tag: 'squeibot-notification'
            });
        }
    }
    
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registrado:', registration);
                })
                .catch(error => {
                    console.log('Error registrando Service Worker:', error);
                });
        }
    }
    
    setupAutomaticNotifications() {
        // Notificación de bienvenida
        setTimeout(() => {
            if (!this.hasSeenWelcome()) {
                this.createNotification(
                    '¡Bienvenido a Squeibot! 🎮',
                    'Descubre contenido gaming épico y únete a la comunidad',
                    'info',
                    '#home'
                );
                this.markWelcomeSeen();
            }
        }, 2000);
        
        // Simular nuevas notificaciones periódicamente
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% de probabilidad cada intervalo
                this.showRandomNotification();
            }
        }, 300000); // Cada 5 minutos
    }
    
    showRandomNotification() {
        const types = ['new_video', 'community_event', 'live_stream'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        const messages = {
            new_video: {
                title: '🎥 Nuevo Contenido Disponible',
                message: '¡Acabo de subir un video nuevo! Échale un vistazo'
            },
            community_event: {
                title: '👥 Evento Especial',
                message: 'Participa en nuestro próximo torneo comunitario'
            },
            live_stream: {
                title: '🔴 Próximo Stream',
                message: 'No te pierdas mi transmisión en vivo esta noche'
            }
        };
        
        const message = messages[randomType];
        if (message) {
            this.createNotification(
                message.title,
                message.message,
                randomType,
                randomType === 'live_stream' ? 'https://kick.com/squeibot' : '#videos'
            );
        }
    }
    
    hasSeenWelcome() {
        return localStorage.getItem('squeibot_welcome_seen') === 'true';
    }
    
    markWelcomeSeen() {
        localStorage.setItem('squeibot_welcome_seen', 'true');
    }
    
    saveToLocalStorage() {
        localStorage.setItem('squeibot_notifications', JSON.stringify(this.notifications));
    }
    
    loadFromLocalStorage() {
        const saved = localStorage.getItem('squeibot_notifications');
        if (saved) {
            this.notifications = JSON.parse(saved);
        }
    }
    
    // Solicitar permisos para notificaciones push
    requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.createNotification(
                        'Notificaciones Activadas 🔔',
                        '¡Recibirás alertas de nuevo contenido!',
                        'success'
                    );
                }
            });
        }
    }
}

// Inicializar sistema de notificaciones
document.addEventListener('DOMContentLoaded', () => {
    window.notificationSystem = new NotificationSystem();
    
    // Exponer función global para crear notificaciones
    window.showNotification = (title, message, type, link) => {
        window.notificationSystem.createNotification(title, message, type, link);
    };
});