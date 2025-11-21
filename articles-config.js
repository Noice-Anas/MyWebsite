// Articles configuration - metadata for all articles
const articlesData = [
    {
        id: 'vscode-ios-development-setup',
        title: 'VSCode iOS Development Setup Guide',
        date: '2025-11-21',
        description: 'Configure VSCode for iOS development with modern AI coding tools. Learn how to set up xcode-build-server, xcbeautify, and swiftformat for a seamless development experience.',
        tags: ['iOS', 'VSCode', 'Development', 'Setup', 'Swift', 'AI Tools'],
        readTime: 8,
        featured: true
    }
];

// Helper function to get recent articles (limit)
function getRecentArticles(limit = 3) {
    return articlesData.slice(0, limit);
}

// Helper function to get article by id
function getArticleById(id) {
    return articlesData.find(article => article.id === id);
}
