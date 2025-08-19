// Configurazione delle risorse da precaricare
export const preloadResources = [
    // Immagini principali
    { type: 'image', url: '/immagini/logo.png', name: 'Logo principale', priority: 'high' },
    { type: 'image', url: '/immagini/auroramainlogo_dark.webp', name: 'Logo Aurora', priority: 'high' },
    { type: 'image', url: '/immagini/sfondo.png', name: 'Sfondo 1', priority: 'medium' },
    { type: 'image', url: '/immagini/sfondo2.png', name: 'Sfondo 2', priority: 'medium' },
    
    // Anteprime progetti (priorità alta per la pagina progetti)
    { type: 'image', url: '/immagini/ANTEPRIME/AVEN.png', name: 'Anteprima AVEN', priority: 'high' },
    { type: 'image', url: '/immagini/ANTEPRIME/BBS.png', name: 'Anteprima BBS', priority: 'high' },
    { type: 'image', url: '/immagini/ANTEPRIME/JDEAM.png', name: 'Anteprima JDEAM', priority: 'high' },
    { type: 'image', url: '/immagini/ANTEPRIME/SECONDLIFE.png', name: 'Anteprima SECONDLIFE', priority: 'high' },
    { type: 'image', url: '/immagini/ANTEPRIME/VENDOR.png', name: 'Anteprima VENDOR', priority: 'high' },
    { type: 'image', url: '/immagini/ANTEPRIME/TODO.png', name: 'Anteprima TODO', priority: 'high' },
    { type: 'image', url: '/immagini/ANTEPRIME/JSTORE.png', name: 'Anteprima JSTORE', priority: 'high' },
    { type: 'image', url: '/immagini/ANTEPRIME/JDEAM2.png', name: 'Anteprima JDEAM2', priority: 'high' },
    { type: 'image', url: '/immagini/ANTEPRIME/BUSINESSDISCOVERYPRO.png', name: 'Anteprima BD-PRO', priority: 'high' },
    
    // Logo linguaggi (priorità alta per la pagina competenze)
    { type: 'image', url: '/immagini/LINGUAGGI/html.png', name: 'HTML', priority: 'high' },
    { type: 'image', url: '/immagini/LINGUAGGI/css.png', name: 'CSS', priority: 'high' },
    { type: 'image', url: '/immagini/LINGUAGGI/javascript.png', name: 'JavaScript', priority: 'high' },
    { type: 'image', url: '/immagini/LINGUAGGI/bootstrap.png', name: 'Bootstrap', priority: 'high' },
    { type: 'image', url: '/immagini/LINGUAGGI/laravel.png', name: 'Laravel', priority: 'high' },
    { type: 'image', url: '/immagini/LINGUAGGI/php.png', name: 'PHP', priority: 'high' },
    { type: 'image', url: '/immagini/LINGUAGGI/react.svg', name: 'React', priority: 'high' },
    
    // Strumenti (priorità media)
    { type: 'image', url: '/immagini/STRUMENTI/canva-wordmark-2.svg', name: 'Canva', priority: 'medium' },
    { type: 'image', url: '/immagini/STRUMENTI/figma-icon.svg', name: 'Figma', priority: 'medium' },
    { type: 'image', url: '/immagini/STRUMENTI/git-bash.svg', name: 'Git', priority: 'medium' },
    { type: 'image', url: '/immagini/STRUMENTI/gsap-greensock.svg', name: 'GSAP', priority: 'medium' },
    { type: 'image', url: '/immagini/STRUMENTI/postman.svg', name: 'Postman', priority: 'medium' },
    { type: 'image', url: '/immagini/STRUMENTI/wordpress-icon-1.svg', name: 'WordPress', priority: 'medium' },
    
    // Avatar (priorità media)
    { type: 'image', url: '/immagini/AVATAR/1-Photoroom.png', name: 'Avatar 1', priority: 'medium' },
    { type: 'image', url: '/immagini/AVATAR/10-Photoroom.png', name: 'Avatar 10', priority: 'medium' },
    { type: 'image', url: '/immagini/AVATAR/11-Photoroom.png', name: 'Avatar 11', priority: 'medium' },
    
    // Immagini di sfondo e UI (priorità bassa)
    { type: 'image', url: '/immagini/calendario.jpg', name: 'Calendario', priority: 'low' },
    { type: 'image', url: '/immagini/chatbot.png', name: 'Chatbot', priority: 'low' },
    { type: 'image', url: '/public/low-poly-grid-haikei.svg', name: 'Sfondo geometrico', priority: 'low' },
    
    // Font (simulati)
    { type: 'font', url: '', name: 'Font principali', priority: 'high' },
    { type: 'font', url: '', name: 'Font secondari', priority: 'medium' }
];

// Funzione per filtrare le risorse per priorità
export const getResourcesByPriority = (priority) => {
    return preloadResources.filter(resource => resource.priority === priority);
};

// Funzione per ottenere tutte le risorse ordinate per priorità
export const getAllResourcesOrdered = () => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return preloadResources.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};
