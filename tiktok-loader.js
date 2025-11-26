// Sistema mejorado para cargar videos de TikTok
class TikTokLoader {
    constructor() {
        this.videos = [
            {
                url: "https://www.tiktok.com/@squeibot/video/7571859737197792533",
                title: "Momento Épico en TikTok",
                type: "tiktok",
                views: "50K",
                date: "Hace 1 día",
                thumbnail: "https://via.placeholder.com/350x500/000000/69C9D0?text=TikTok+Video"
            },
            {
                url: "https://www.tiktok.com/@squeibot/video/7567846810719423765", 
                title: "Clip Viral Gaming",
                type: "tiktok",
                views: "75K",
                date: "Hace 2 días",
                thumbnail: "https://via.placeholder.com/350x500/000000/69C9D0?text=TikTok+Gaming"
            },
            {
                url: "https://www.tiktok.com/@squeibot/video/7566714512389180692",
                title: "Fails Divertidos TikTok",
                type: "tiktok",
                views: "30K", 
                date: "Hace 3 días",
                thumbnail: "https://via.placeholder.com/350x500/000000/69C9D0?text=TikTok+Fails"
            },
            {
                url: "https://www.tiktok.com/@squeibot/video/7566423969230769429",
                title: "Momento Gaming Épico",
                type: "tiktok",
                views: "45K",
                date: "Hace 4 días",
                thumbnail: "https://via.placeholder.com/350x500/000000/69C9D0?text=Gaming+Epic"
            }
        ];
        this.init();
    }
    
    init() {
        this.injectStyles();
        this.loadVideos();
    }
    
    injectStyles() {
        const styles = `
            .tiktok-card {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                overflow: hidden;
                border: 1px solid rgba(105, 201, 208, 0.3);
                transition: all 0.3s ease;
                margin: 1rem 0;
            }
            
            .tiktok-card:hover {
                transform: translateY(-5px);
                border-color: #69C9D0;
                box-shadow: 0 10px 30px rgba(105, 201, 208, 0.3);
            }
            
            .tiktok-thumbnail {
                position: relative;
                width: 100%;
                height: 300px;
                background: linear-gradient(135deg, #000000, #69C9D0);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }
            
            .tiktok-badge {
                position: absolute;
                top: 15px;
                right: 15px;
                background: linear-gradient(135deg, #000000, #69C9D0);
                color: white;
                padding: 6px 12px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 700;
            }
            
            .tiktok-info {
                padding: 1.5rem;
            }
            
            .tiktok-info h3 {
                margin-bottom: 1rem;
                font-size: 1.1rem;
                line-height: 1.4;
            }
            
            .tiktok-meta {
                display: flex;
                justify-content: space-between;
                color: var(--text-gray);
                font-size: 0.9rem;
                margin-bottom: 1rem;
            }
            
            .tiktok-button {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, #000000, #69C9D0);
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                font-weight: 600;
                transition: all 0.3s ease;
                width: 100%;
                justify-content: center;
            }
            
            .tiktok-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(105, 201, 208, 0.3);
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    loadVideos() {
        const videoGrid = document.getElementById('videoGrid');
        if (!videoGrid) {
            console.log('Video grid no encontrado, reintentando...');
            setTimeout(() => this.loadVideos(), 500);
            return;
        }
        
        this.videos.forEach(video => {
            const videoCard = this.createVideoCard(video);
            videoGrid.appendChild(videoCard);
        });
        
        console.log('🎵 Videos de TikTok cargados:', this.videos.length);
    }
    
    createVideoCard(video) {
        const card = document.createElement('div');
        card.className = 'video-card tiktok';
        
        card.innerHTML = `
            <div class="video-thumbnail">
                <div class="tiktok-placeholder">
                    <i class="fab fa-tiktok" style="font-size: 3rem;"></i>
                    <span style="font-size: 1rem; margin-top: 1rem;">Ver en TikTok</span>
                </div>
                <div class="video-badge tiktok-badge">TIKTOK</div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <div class="video-meta">
                    <span class="video-date">${video.date}</span>
                    <span class="video-views">${video.views} vistas</span>
                </div>
                <a href="${video.url}" target="_blank" class="social-button tiktok-btn">
                    <i class="fas fa-external-link-alt"></i>
                    Ver en TikTok
                </a>
            </div>
        `;
        
        return card;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new TikTokLoader();
});