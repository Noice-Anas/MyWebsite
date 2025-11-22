// Articles configuration - metadata for all articles
const articlesData = [
    {
        id: 'vscode-ios-development-setup',
        title: 'VSCode iOS Development Setup Guide',
        titleAr: 'دليل إعداد تطوير iOS في VSCode',
        date: '2025-11-21',
        description: 'Configure VSCode for iOS development with modern AI coding tools. Learn how to set up xcode-build-server, xcbeautify, and swiftformat for a seamless development experience.',
        descriptionAr: 'قم بإعداد VSCode لتطوير iOS باستخدام أدوات البرمجة الحديثة المدعومة بالذكاء الاصطناعي. تعلم كيفية إعداد xcode-build-server و xcbeautify و swiftformat لتجربة تطوير سلسة.',
        tags: ['iOS', 'VSCode', 'Development', 'Setup', 'Swift', 'AI Tools'],
        tagsAr: ['iOS', 'VSCode', 'تطوير', 'إعداد', 'Swift', 'أدوات ذكاء اصطناعي'],
        readTime: 12,
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
