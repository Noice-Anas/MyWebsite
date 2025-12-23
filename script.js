// Mobile menu toggle functionality
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Load article header metadata from config
function loadArticleHeader() {
    const articleContainer = document.querySelector('[data-article-id]');
    if (!articleContainer) return;

    const articleId = articleContainer.getAttribute('data-article-id');
    const article = getArticleById(articleId);

    if (!article) {
        console.warn(`Article with ID "${articleId}" not found in config`);
        return;
    }

    // Populate title
    document.querySelector('.article-title').textContent = article.title;

    // Populate date
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    document.querySelector('.article-date').textContent = formattedDate;

    // Populate read time
    document.querySelector('.article-read-time').textContent = `${article.readTime} min read`;

    // Populate tags
    const tagsContainer = document.querySelector('.article-tags');
    tagsContainer.innerHTML = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    // Update page title
    document.title = `${article.title} - Anas Alhalabi`;
}

// Load articles into grid
function loadArticles(limit = null) {
    const articlesGrid = document.getElementById('articlesGrid');
    if (!articlesGrid) return;

    const articles = limit ? getRecentArticles(limit) : (typeof articlesData !== 'undefined' ? articlesData : []);
    const isArabic = document.documentElement.lang === 'ar';

    articlesGrid.innerHTML = articles.map(article => {
        const title = isArabic ? article.titleAr || article.title : article.title;
        const description = isArabic ? article.descriptionAr || article.description : article.description;
        const tags = isArabic ? article.tagsAr || article.tags : article.tags;
        const readTimeLabel = isArabic ? 'دقائق قراءة' : 'min read';

        return `
            <a href="articles/${article.id}.html" class="article-card">
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="article-card-meta">
                    <span class="article-card-date">📅 ${new Date(article.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <span class="article-card-read-time">⏱️ ${article.readTime} ${readTimeLabel}</span>
                </div>
                <div class="article-card-tags">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </a>
        `;
    }).join('');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load article header metadata if on article page
    loadArticleHeader();

    // Load articles
    const articlesGrid = document.getElementById('articlesGrid');
    if (articlesGrid && typeof articlesData !== 'undefined') {
        // Check if we're on the homepage (limit to 3) or articles page (show all)
        const limit = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ? 3 : null;
        loadArticles(limit);
    }

    // Mobile menu button event listener
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
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

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelector('.nav-links');

        if (!nav.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });

    // GSAP ScrollTrigger Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Scroll-triggered parallax fade
        const profileHero = document.querySelector('.profile-hero');
        if (profileHero) {
            gsap.to(profileHero, {
                scrollTrigger: {
                    trigger: profileHero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                },
                yPercent: 30,
                scale: 0.9,
                opacity: 0.3,
                ease: 'none'
            });
        }

        // Animate main content sections
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            // Hero section animation
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                gsap.from(heroSection, {
                    scrollTrigger: {
                        trigger: heroSection,
                        start: 'top 80%',
                        end: 'top 20%',
                        scrub: 1
                    },
                    scale: 0.8,
                    opacity: 0,
                    y: 100,
                    transformOrigin: 'center center',
                    ease: 'power2.out'
                });
            }

            // Services section animation
            const servicesSection = document.querySelector('.services-section');
            if (servicesSection) {
                gsap.from(servicesSection, {
                    scrollTrigger: {
                        trigger: servicesSection,
                        start: 'top 80%',
                        end: 'top 30%',
                        scrub: 1
                    },
                    scale: 0.9,
                    opacity: 0,
                    y: 80,
                    ease: 'power2.out'
                });
            }

            // Articles section animation
            const articlesSection = document.querySelector('.articles-section');
            if (articlesSection) {
                gsap.from(articlesSection, {
                    scrollTrigger: {
                        trigger: articlesSection,
                        start: 'top 80%',
                        end: 'top 30%',
                        scrub: 1
                    },
                    scale: 0.9,
                    opacity: 0,
                    y: 80,
                    ease: 'power2.out'
                });
            }
        }
    }
});