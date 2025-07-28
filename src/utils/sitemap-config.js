export function customSitemapTransform(page) {
  // Définir les priorités en fonction du type de page
  const priorities = {
    '/': 1.0, // Page d'accueil
    '/services': 0.9,
    '/creation-societe-luxembourg': 0.9,
    '/comptabilite': 0.8,
    '/assistance-controle-fiscal': 0.8,
    '/contact': 0.7,
    '/tarifs': 0.7,
    '/articles': 0.6,
    'default': 0.5
  };

  // Obtenir la priorité basée sur l'URL
  let priority = priorities.default;
  for (const [path, prio] of Object.entries(priorities)) {
    if (page.url.pathname === path || page.url.pathname.startsWith(path + '/')) {
      priority = prio;
      break;
    }
  }

  // Articles de blog ont une priorité plus faible
  if (page.url.pathname.includes('/articles/') && page.url.pathname !== '/articles/') {
    priority = 0.4;
  }

  return {
    url: page.url.href,
    lastmod: new Date().toISOString(),
    priority: priority,
    changefreq: priority >= 0.8 ? 'weekly' : 'monthly'
  };
}