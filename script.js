// Mobile menu toggle functionality
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Load articles into grid
function loadArticles(limit = null) {
    const articlesGrid = document.getElementById('articlesGrid');
    if (!articlesGrid) return;

    const articles = limit ? getRecentArticles(limit) : (typeof articlesData !== 'undefined' ? articlesData : []);

    articlesGrid.innerHTML = articles.map(article => `
        <a href="articles/${article.id}.html" class="article-card">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <div class="article-card-meta">
                <span class="article-card-date">📅 ${new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                <span class="article-card-read-time">⏱️ ${article.readTime} min read</span>
            </div>
            <div class="article-card-tags">
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </a>
    `).join('');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
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
});