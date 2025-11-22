// i18n - Internationalization utility for language switching
let translations = {};
let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

// Initialize i18n system
async function initializeI18n() {
    try {
        const response = await fetch('translations/translations.json');
        if (!response.ok) throw new Error('Failed to load translations');
        translations = await response.json();
        applyLanguage(currentLanguage);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Get translation value by key path (e.g., 'hero.name')
function getTranslation(key, lang = currentLanguage) {
    const keys = key.split('.');
    let value = translations[lang];

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            console.warn(`Translation key not found: ${key}`);
            return key;
        }
    }

    return value;
}

// Apply language to page
function applyLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language '${lang}' not found in translations`);
        return;
    }

    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);

    // Update HTML lang and dir attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key, lang);

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });

    // Update page title if available
    const pageTitle = getTranslation('pageTitle', lang);
    if (pageTitle && pageTitle !== 'pageTitle') {
        document.title = pageTitle;
    }
}

// Switch language function
function switchLanguage(lang) {
    if (translations[lang]) {
        applyLanguage(lang);
    }
}

// Get current language
function getCurrentLanguage() {
    return currentLanguage;
}

// Detect if current page is articles page
function isArticlesPage() {
    return window.location.pathname.includes('articles');
}

// Initialize on DOMContentLoaded if translations file exists
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize i18n for non-homepage articles pages
    if (!window.location.pathname.endsWith('index.html') &&
        !window.location.pathname === '/' &&
        (window.location.pathname.includes('articles') || document.querySelector('[data-i18n]'))) {
        initializeI18n();
    }
});
