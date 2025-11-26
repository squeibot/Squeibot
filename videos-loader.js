// Sistema de gestión de videos premium - CON LINKS COMPLETOS EXACTOS
class VideoManager {
    constructor() {
        this.videos = {
            youtube: [],
            shorts: [],
            tiktok: []
        };
        this.currentFilter = 'all';
        this.videosPerLoad = 12;
        this.loadedCount = 0;
        
        this.init();
    }
    
    init() {
        this.loadVideoData();
        this.setupEventListeners();
        this.setupInfiniteScroll();
        this.setupSearch();
    }
    
    loadVideoData() {
        // YOUTUBE VIDEOS - LINKS COMPLETOS EXACTOS
        this.videos.youtube = [
            {
                url: "https://youtu.be/8Ku6rnC06Gs?si=BI78YQ88E4IZNNRh",
                title: "💸 GASTÉ MÁS DE 15.000 DE ORO EN BLOODSTRIKE POR LAS P90 ETERNAL Y M700 ETERNAL 😱🔥 ¿VALIÓ LA PENA?",
                type: 'youtube',
                views: "15.2K",
                date: "Hace 2 días",
                duration: "12:45"
            },
            {
                url: "https://youtu.be/ayGRGhqaRjg?si=y7P8stKTLNC4GTxO", 
                title: "Review Gaming - Los Mejores del Año",
                type: 'youtube',
                views: "22.7K",
                date: "Hace 1 semana",
                duration: "18:33"
            },
            {
                url: "https://youtu.be/3m5boVFAPyw?si=4wJR3if0ZsgWyzTW",
                title: "Tutorial - Mejora tu Aim como Sung Jin-Woo",
                type: 'youtube',
                views: "35.1K",
                date: "Hace 2 semanas", 
                duration: "15:20"
            },
            {
                url: "https://www.youtube.com/watch?v=xq5TFwql6a8",
                title: "Directo - Nuevo Lanzamiento Gaming",
                type: 'youtube',
                views: "8.4K",
                date: "Hace 3 días",
                duration: "42:15"
            },
            {
                url: "https://www.youtube.com/watch?v=sT85py2tkdU&t=3s",
                title: "Fails Divertidos - Momentos Graciosos",
                type: 'youtube',
                views: "12.8K",
                date: "Hace 4 días",
                duration: "8:52"
            },
            {
                url: "https://www.youtube.com/watch?v=GrGK95DfDJA",
                title: "Victoria Épica - Clutch Moment",
                type: 'youtube', 
                views: "25.3K",
                date: "Hace 5 días",
                duration: "6:17"
            },
            {
                url: "https://www.youtube.com/watch?v=wqW_4un6vNE&t=18s",
                title: "Ranked - Subiendo a Leyenda",
                type: 'youtube',
                views: "18.9K",
                date: "Hace 6 días",
                duration: "25:44"
            },
            {
                url: "https://www.youtube.com/watch?v=PMXeGXeQ17Q&t=9s",
                title: "Challenge - 24 Horas de Gaming",
                type: 'youtube',
                views: "31.2K", 
                date: "Hace 1 semana",
                duration: "14:28"
            },
            {
                url: "https://www.youtube.com/watch?v=_JMxTY3tqmw",
                title: "Análisis - Meta Actual del Juego",
                type: 'youtube',
                views: "14.7K",
                date: "Hace 1 semana",
                duration: "20:15"
            },
            {
                url: "https://www.youtube.com/watch?v=XEvtWF2s6E0",
                title: "Gameplay - Modo Historia Completo",
                type: 'youtube',
                views: "27.4K",
                date: "Hace 2 semanas",
                duration: "35:42"
            },
            {
                url: "https://www.youtube.com/watch?v=dIs_lBNLD7s",
                title: "Tips y Trucos - Secrets Revelados", 
                type: 'youtube',
                views: "33.8K",
                date: "Hace 2 semanas",
                duration: "11:23"
            },
            {
                url: "https://www.youtube.com/watch?v=3m5boVFAPyw",
                title: "VS - Duelo contra Pro Player",
                type: 'youtube',
                views: "45.1K",
                date: "Hace 3 semanas",
                duration: "28:17"
            },
            {
                url: "https://www.youtube.com/watch?v=ATnAxUYf3mg",
                title: "Funny Moments - Risas Garantizadas",
                type: 'youtube',
                views: "29.6K",
                date: "Hace 3 semanas",
                duration: "9:45"
            },
            {
                url: "https://www.youtube.com/watch?v=XlIawJF-Di8",
                title: "Speedrun - Nuevo Récord Personal", 
                type: 'youtube',
                views: "22.3K",
                date: "Hace 4 semanas",
                duration: "7:52"
            },
            {
                url: "https://www.youtube.com/watch?v=r9u1fLKZu8k",
                title: "Co-op - Jugando con Suscriptores",
                type: 'youtube',
                views: "16.8K",
                date: "Hace 4 semanas",
                duration: "38:24"
            },
            {
                url: "https://www.youtube.com/watch?v=nLSlM4gEOAA",
                title: "Review - Hardware Gaming 2024",
                type: 'youtube',
                views: "24.5K",
                date: "Hace 1 mes",
                duration: "22:10"
            },
            {
                url: "https://www.youtube.com/watch?v=dxWPonzWYcM&t=13s&pp=0gcJCRUKAYcqIYzv",
                title: "Tutorial - Configuración Perfecta", 
                type: 'youtube',
                views: "19.7K",
                date: "Hace 1 mes",
                duration: "13:45"
            },
            {
                url: "https://www.youtube.com/watch?v=szAvuuIX6EU",
                title: "Gameplay - Evento Especial",
                type: 'youtube',
                views: "32.1K",
                date: "Hace 1 mes",
                duration: "26:33"
            },
            {
                url: "https://www.youtube.com/watch?v=e-vcf-VHbVg",
                title: "Analysis - Patch Notes Breakdown",
                type: 'youtube',
                views: "28.9K",
                date: "Hace 1 mes",
                duration: "17:48"
            }
        ];

        // YOUTUBE SHORTS - LINKS COMPLETOS EXACTOS
        this.videos.shorts = [
            {
                url: "https://www.youtube.com/shorts/6GXHVFRaRwc",
                title: "Momento Épico #1 - Short",
                type: 'shorts',
                views: "5.2K",
                date: "Hace 1 día",
                duration: "0:25"
            },
            {
                url: "https://www.youtube.com/shorts/d_D5WnRp5-I",
                title: "Clip Divertido #2 - Short", 
                type: 'shorts',
                views: "3.8K",
                date: "Hace 2 días",
                duration: "0:32"
            },
            {
                url: "https://www.youtube.com/shorts/AiaJf7WX2vk",
                title: "Gameplay Rápido - Short",
                type: 'shorts',
                views: "7.1K",
                date: "Hace 1 día",
                duration: "0:28"
            },
            {
                url: "https://www.youtube.com/shorts/wyJYjbIpmoM",
                title: "Momento Viral - Short",
                type: 'shorts',
                views: "10.4K",
                date: "Hace 3 días",
                duration: "0:35"
            },
            {
                url: "https://www.youtube.com/shorts/CdwG28PEzI8",
                title: "Fail Instantáneo - Short",
                type: 'shorts',
                views: "4.7K",
                date: "Hace 2 días",
                duration: "0:22"
            },
            {
                url: "https://www.youtube.com/shorts/x0_--BdWrnA",
                title: "Victoria Rápida - Short",
                type: 'shorts',
                views: "6.3K",
                date: "Hace 1 día",
                duration: "0:30"
            },
            {
                url: "https://www.youtube.com/shorts/X2gH8yTu6tA",
                title: "Trick Shot - Short",
                type: 'shorts',
                views: "8.9K",
                date: "Hace 4 días",
                duration: "0:27"
            },
            {
                url: "https://www.youtube.com/shorts/4s9oBfzcsYA",
                title: "Reacción Épica - Short",
                type: 'shorts',
                views: "12.1K",
                date: "Hace 5 días",
                duration: "0:33"
            }
        ];

        // TIKTOK VIDEOS - LINKS COMPLETOS EXACTOS
        this.videos.tiktok = [
            {
                url: "https://www.tiktok.com/@squeibot/video/7571859737197792533?is_from_webapp=1&sender_device=pc",
                title: "Momento Épico en TikTok",
                type: 'tiktok',
                views: "50.3K",
                date: "Hace 1 día"
            },
            {
                url: "https://www.tiktok.com/@squeibot/video/7567846810719423765?is_from_webapp=1&sender_device=pc",
                title: "Clip Viral Gaming",
                type: 'tiktok',
                views: "75.8K",
                date: "Hace 2 días"
            },
            {
                url: "https://www.tiktok.com/@squeibot/photo/7567846348347854101?is_from_webapp=1&sender_device=pc",
                title: "Foto Épica Gaming",
                type: 'tiktok',
                views: "42.1K",
                date: "Hace 2 días"
            },
            {
                url: "https://www.tiktok.com/@squeibot/video/7566714512389180692?is_from_webapp=1&sender_device=pc",
                title: "Fails Divertidos TikTok",
                type: 'tiktok',
                views: "30.7K",
                date: "Hace 3 días"
            },
            {
                url: "https://www.tiktok.com/@squeibot/video/7566423969230769429?is_from_webapp=1&sender_device=pc",
                title: "Momento Gaming Épico",
                type: 'tiktok',
                views: "45.6K",
                date: "Hace 4 días"
            }
        ];
        
        this.displayVideos();
        this.showVideoStats();
    }
    
    setupEventListeners() {
        // Filtros
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.getAttribute('data-filter');
                this.displayVideos();
            });
        });
        
        // Botón cargar más
        const loadMoreBtn = document.getElementById('loadMoreVideos');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreVideos());
        }
    }
    
    setupInfiniteScroll() {
        let isScrolling = false;
        
        window.addEventListener('scroll', () => {
            if (!isScrolling && this.isNearBottom() && this.hasMoreVideos()) {
                isScrolling = true;
                this.loadMoreVideos();
                setTimeout(() => {
                    isScrolling = false;
                }, 500);
            }
        });
    }
    
    setupSearch() {
        const searchInput = document.getElementById('videoSearch');
        const searchButton = document.getElementById('searchButton');
        
        if (searchInput && searchButton) {
            const performSearch = () => {
                const query = searchInput.value.trim();
                if (query) {
                    const results = this.searchVideos(query);
                    const videoGrid = document.getElementById('videoGrid');
                    
                    if (videoGrid) {
                        videoGrid.innerHTML = '';
                        if (results.length === 0) {
                            videoGrid.innerHTML = `
                                <div class="no-results">
                                    <i class="fas fa-search"></i>
                                    <h3>No se encontraron videos</h3>
                                    <p>Intenta con otros términos de búsqueda</p>
                                </div>
                            `;
                        } else {
                            results.forEach(video => {
                                const videoCard = this.createVideoCard(video);
                                videoGrid.appendChild(videoCard);
                            });
                        }
                        this.showVideoStats();
                    }
                } else {
                    this.displayVideos();
                }
            };
            
            searchButton.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }
    }
    
    isNearBottom() {
        return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000;
    }
    
    hasMoreVideos() {
        const allVideos = this.getAllVideos();
        return this.loadedCount < allVideos.length;
    }
    
    getAllVideos() {
        if (this.currentFilter === 'all') {
            return [...this.videos.youtube, ...this.videos.shorts, ...this.videos.tiktok];
        }
        return this.videos[this.currentFilter] || [];
    }
    
    displayVideos() {
        const videoGrid = document.getElementById('videoGrid');
        if (!videoGrid) return;
        
        videoGrid.innerHTML = '';
        this.loadedCount = 0;
        this.loadMoreVideos();
        this.showVideoStats();
    }
    
    loadMoreVideos() {
        const videoGrid = document.getElementById('videoGrid');
        if (!videoGrid) return;
        
        const allVideos = this.getAllVideos();
        const videosToLoad = allVideos.slice(this.loadedCount, this.loadedCount + this.videosPerLoad);
        
        if (videosToLoad.length === 0) {
            this.hideLoadMoreButton();
            return;
        }
        
        videosToLoad.forEach(video => {
            const videoCard = this.createVideoCard(video);
            videoGrid.appendChild(videoCard);
        });
        
        this.loadedCount += videosToLoad.length;
        this.updateLoadMoreButton();
    }
    
    createVideoCard(video) {
        const card = document.createElement('div');
        card.className = `video-card ${video.type}`;
        
        let thumbnailContent = '';
        let actionButton = '';
        
        if (video.type === 'tiktok') {
            thumbnailContent = `
                <div class="tiktok-placeholder">
                    <i class="fab fa-tiktok"></i>
                    <span>Ver en TikTok</span>
                </div>
            `;
            actionButton = `
                <a href="${video.url}" target="_blank" class="social-button tiktok-btn">
                    <i class="fas fa-external-link-alt"></i>
                    Ver en TikTok
                </a>
            `;
        } else {
            const videoId = this.extractVideoId(video.url);
            const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : video.url;
            
            thumbnailContent = `
                <iframe 
                    src="${embedUrl}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    loading="lazy"
                    title="${video.title}">
                </iframe>
            `;
            actionButton = `
                <a href="${video.url}" target="_blank" class="social-button youtube-btn">
                    <i class="fab fa-youtube"></i>
                    Ver en YouTube
                </a>
            `;
        }
        
        card.innerHTML = `
            <div class="video-thumbnail">
                ${thumbnailContent}
                <div class="video-badge ${video.type}-badge">
                    ${video.type === 'youtube' ? 'VIDEO' : 
                      video.type === 'shorts' ? 'SHORTS' : 'TIKTOK'}
                </div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <div class="video-meta">
                    <span class="video-date">${video.date}</span>
                    <span class="video-views">${video.views} vistas</span>
                </div>
                ${video.duration ? `<div class="video-duration">${video.duration}</div>` : ''}
                ${actionButton}
            </div>
        `;
        
        return card;
    }
    
    extractVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|shorts\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
    
    searchVideos(query) {
        const allVideos = this.getAllVideos();
        return allVideos.filter(video => 
            video.title.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    getVideoStats() {
        return {
            total: this.videos.youtube.length + this.videos.shorts.length + this.videos.tiktok.length,
            youtube: this.videos.youtube.length,
            shorts: this.videos.shorts.length,
            tiktok: this.videos.tiktok.length,
            totalViews: this.calculateTotalViews()
        };
    }
    
    calculateTotalViews() {
        const allVideos = [...this.videos.youtube, ...this.videos.shorts, ...this.videos.tiktok];
        let total = 0;
        
        allVideos.forEach(video => {
            const views = parseFloat(video.views);
            if (!isNaN(views)) {
                total += views;
            }
        });
        
        return total >= 1000 ? (total / 1000).toFixed(1) + 'K' : total.toString();
    }
    
    showVideoStats() {
        const stats = this.getVideoStats();
        let statsElement = document.querySelector('.video-stats');
        
        if (!statsElement) {
            statsElement = document.createElement('div');
            statsElement.className = 'video-stats';
            const videoGrid = document.getElementById('videoGrid');
            if (videoGrid) {
                videoGrid.parentNode.insertBefore(statsElement, videoGrid);
            }
        }
        
        const showingCount = Math.min(this.loadedCount, this.getAllVideos().length);
        statsElement.innerHTML = `
            <p>🎮 Mostrando <strong>${showingCount}</strong> de <strong>${stats.total} videos</strong> | 
            YouTube: ${stats.youtube} | Shorts: ${stats.shorts} | TikTok: ${stats.tiktok}</p>
        `;
    }
    
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreVideos');
        if (!loadMoreBtn) return;
        
        const hasMore = this.hasMoreVideos();
        loadMoreBtn.style.display = hasMore ? 'block' : 'none';
        
        if (hasMore) {
            const remaining = this.getAllVideos().length - this.loadedCount;
            loadMoreBtn.innerHTML = `
                <i class="fas fa-sync-alt"></i>
                Cargar ${Math.min(remaining, this.videosPerLoad)} más
            `;
        }
    }
    
    hideLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreVideos');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }
}

// Inicializar gestor de videos
document.addEventListener('DOMContentLoaded', () => {
    const videoManager = new VideoManager();
    window.videoManager = videoManager;
    
    console.log('🎮 Videos de Squeibot cargados:', videoManager.getVideoStats());
});