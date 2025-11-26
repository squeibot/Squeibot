// Sistema de fondos animados premium
class BackgroundSlider {
    constructor() {
        this.videos = document.querySelectorAll('.background-video');
        this.currentIndex = 0;
        this.interval = 15000; // 15 segundos
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        if (this.videos.length === 0) return;
        
        // Precargar videos
        this.preloadVideos();
        
        // Mostrar primer video
        this.showVideo(this.currentIndex);
        
        // Iniciar rotación
        this.startRotation();
        
        // Configurar eventos
        this.setupEventListeners();
        
        // Configurar performance
        this.setupPerformance();
    }
    
    preloadVideos() {
        this.videos.forEach(video => {
            video.load();
        });
    }
    
    showVideo(index) {
        // Ocultar todos los videos
        this.videos.forEach(video => {
            video.classList.remove('active');
        });
        
        // Mostrar video actual
        this.videos[index].classList.add('active');
        
        // Asegurar que el video se reproduzca
        const currentVideo = this.videos[index];
        currentVideo.play().catch(e => {
            console.log('Auto-play prevented, waiting for interaction:', e);
        });
    }
    
    nextVideo() {
        if (this.isPaused) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.videos.length;
        this.showVideo(this.currentIndex);
    }
    
    startRotation() {
        this.rotationInterval = setInterval(() => {
            this.nextVideo();
        }, this.interval);
    }
    
    setupEventListeners() {
        // Pausar/reanudar al interactuar
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
        
        // Pausar al hacer hover (opcional)
        const slider = document.querySelector('.background-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                // this.pause();
            });
            
            slider.addEventListener('mouseleave', () => {
                // this.resume();
            });
        }
        
        // Manejar errores de video
        this.videos.forEach(video => {
            video.addEventListener('error', (e) => {
                console.error('Video error:', e);
                this.skipToNext();
            });
            
            video.addEventListener('loadeddata', () => {
                console.log('Video loaded:', video.src);
            });
        });
    }
    
    setupPerformance() {
        // Optimizar para dispositivos móviles
        if ('connection' in navigator) {
            if (navigator.connection.saveData || navigator.connection.effectiveType.includes('2g')) {
                this.interval = 30000; // Reducir frecuencia en conexiones lentas
            }
        }
    }
    
    pause() {
        this.isPaused = true;
        clearInterval(this.rotationInterval);
        
        // Pausar video actual
        const currentVideo = this.videos[this.currentIndex];
        if (currentVideo) {
            currentVideo.pause();
        }
    }
    
    resume() {
        this.isPaused = false;
        this.startRotation();
        
        // Reanudar video actual
        const currentVideo = this.videos[this.currentIndex];
        if (currentVideo) {
            currentVideo.play().catch(console.error);
        }
    }
    
    skipToNext() {
        this.nextVideo();
    }
    
    setVideo(index) {
        if (index >= 0 && index < this.videos.length) {
            this.currentIndex = index;
            this.showVideo(this.currentIndex);
        }
    }
    
    // Método para agregar video dinámicamente
    addVideo(src) {
        const video = document.createElement('video');
        video.className = 'background-video';
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        
        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        video.appendChild(source);
        
        document.querySelector('.background-slider').appendChild(video);
        this.videos = document.querySelectorAll('.background-video');
    }
}

// Inicializar slider de fondo
document.addEventListener('DOMContentLoaded', () => {
    new BackgroundSlider();
});