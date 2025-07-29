export function customSitemapTransform(page) {
  // Vérifier que page existe
  if (!page) {
    return page;
  }

  // Obtenir l'URL de manière sûre
  const url = typeof page === 'string' ? page : page.url || page;
  const pathname = url.replace('https://www.fiduciaire-expert.lu', '').replace(/\/$/, '') || '/';

  // Définir les priorités en fonction du type de page
  const priorities = {
    '/': 1.0, // Page d'accueil
    '/services': 0.9,
    '/creation-societe-luxembourg': 0.9,
    '/comptabilite': 0.8,
    '/paie': 0.8,
    '/domiciliation': 0.7,
    '/contact': 0.7,
    '/a-propos': 0.7,
    '/articles': 0.6,
    'default': 0.5
  };

  // Obtenir la priorité basée sur l'URL
  let priority = priorities.default;
  
  // Vérifier d'abord les correspondances exactes
  if (priorities[pathname]) {
    priority = priorities[pathname];
  } else {
    // Ensuite vérifier les correspondances de préfixe
    for (const [path, prio] of Object.entries(priorities)) {
      if (path !== 'default' && pathname.startsWith(path + '/')) {
        priority = prio;
        break;
      }
    }
  }

  // Articles de blog ont une priorité plus faible
  if (pathname.includes('/articles/') && pathname !== '/articles') {
    priority = 0.4;
  }

  // Pages légales ont une priorité très faible
  if (pathname.includes('/mentions-legales') || pathname.includes('/politique-confidentialite')) {
    priority = 0.3;
  }

  return {
    url: url,
    lastmod: new Date().toISOString(),
    priority: priority,
    changefreq: priority >= 0.8 ? 'weekly' : 'monthly'
  };
}