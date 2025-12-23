/**
 * Header Component Loader
 * Injects shared header HTML into the DOM for all pages
 * Change the header markup in components/header.html or components/header-ar.html to update all pages
 */

async function loadHeader() {
    try {
        const isArabic = document.documentElement.lang === 'ar';
        const headerFile = isArabic ? 'components/header-ar.html' : 'components/header.html';
        
        const response = await fetch(headerFile);
        if (!response.ok) throw new Error(`Failed to load header: ${response.status}`);
        
        const headerHTML = await response.text();
        
        // Insert header at the beginning of body (or after profile-hero if it exists)
        const profileHero = document.querySelector('.profile-hero');
        const insertPoint = profileHero ? profileHero.nextElementSibling : document.body.firstElementChild;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = headerHTML;
        const headerNav = tempDiv.firstElementChild;
        
        if (insertPoint && insertPoint.tagName === 'NAV') {
            // Replace existing nav element
            insertPoint.replaceWith(headerNav);
        } else {
            // Insert before insertion point
            insertPoint ? insertPoint.parentNode.insertBefore(headerNav, insertPoint) : document.body.insertBefore(headerNav, document.body.firstChild);
        }
        
        // Re-attach mobile menu button listener
        attachMobileMenuListener();
        
    } catch (error) {
        console.error('Error loading header component:', error);
    }
}

function attachMobileMenuListener() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        // Remove any existing listeners by cloning
        const newBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
        
        // Add fresh listener
        newBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links')?.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelector('.nav-links');

        if (nav && navLinks && !nav.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// Load header when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
