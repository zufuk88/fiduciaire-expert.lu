import { defaultLang, type Language } from './translations';
import { routeMappings, untranslatedPages } from './route-mappings';
import { categoryTranslations } from './category-translations';
import { articleTranslations } from './article-translations';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang === 'fr' || lang === 'en') return lang as Language;
  return defaultLang;
}

export function getRouteFromUrl(url: URL): string | undefined {
  const segments = url.pathname.split('/');
  const route = segments.slice(2).join('/');
  // Supprimer le trailing slash pour éviter les problèmes de matching
  const cleanRoute = route.replace(/\/$/, '');
  return cleanRoute.length > 0 ? cleanRoute : undefined;
}

export function getLocalizedUrl(url: URL, lang: Language): string {
  const route = getRouteFromUrl(url);
  return `/${lang}${route ? `/${route}` : ''}`;
}

// Fonction helper pour traduire les slugs de catégories
function translateCategorySlug(slug: string, fromLang: Language, toLang: Language): string {
  // Trouver la catégorie correspondante
  for (const [key, translations] of Object.entries(categoryTranslations)) {
    const fromSlug = translations[fromLang].toLowerCase().replace(/\s+/g, '-').replace(/'/g, '-');
    if (fromSlug === slug) {
      const toSlug = translations[toLang].toLowerCase().replace(/\s+/g, '-').replace(/'/g, '-');
      return toSlug;
    }
  }
  return slug; // Retourner le slug original si pas de traduction trouvée
}

export function getAlternateLinks(url: URL) {
  const route = getRouteFromUrl(url);
  const currentLang = getLangFromUrl(url);
  const searchParams = url.searchParams.toString();
  
  const links: Record<string, string | null> = {
    current: currentLang
  };
  
  // Pour chaque langue, trouver le lien approprié
  (['fr', 'en'] as Language[]).forEach(lang => {
    if (route) {
      // Gérer les routes dynamiques d'articles
      if (route.startsWith('articles/')) {
        // Gérer les pages de catégories
        if (route.startsWith('articles/category/')) {
          // Décoder l'URL pour gérer les caractères accentués et supprimer le trailing slash
          const categorySlug = decodeURIComponent(route.replace('articles/category/', '')).replace(/\/$/, '');
          const translatedSlug = translateCategorySlug(categorySlug, currentLang, lang);
          links[lang] = `/${lang}/articles/category/${translatedSlug}`;
        } else if (route.startsWith('articles/page/')) {
          // Gérer les pages de pagination
          const pageNumber = route.replace('articles/page/', '');
          links[lang] = `/${lang}/articles/page/${pageNumber}`;
        } else if (route === 'articles') {
          // Page principale des articles
          links[lang] = `/${lang}/articles`;
        } else {
          // Pour les articles individuels
          const articleSlug = route.replace('articles/', '');
          const translation = articleTranslations[articleSlug];
          
          if (translation && translation[lang]) {
            links[lang] = `/${lang}/articles/${translation[lang]}`;
          } else {
            // Pas de traduction, pas de lien hreflang
            links[lang] = null;
          }
        }
      } else {
        // Chercher la correspondance dans les mappings
        let translatedRoute = null;
        
        // D'abord, vérifier si la route existe directement dans les mappings
        if (routeMappings[route] && routeMappings[route][lang]) {
          translatedRoute = routeMappings[route][lang];
        } else {
          // Sinon, chercher la route dans toutes les valeurs pour trouver la bonne correspondance
          for (const [key, mapping] of Object.entries(routeMappings)) {
            // Si on trouve notre route actuelle dans les valeurs
            if (mapping[currentLang] === route) {
              // Prendre la traduction pour la langue cible
              translatedRoute = mapping[lang];
              break;
            }
            // Vérifier aussi si la clé correspond à notre route
            if (key === route && mapping[lang]) {
              translatedRoute = mapping[lang];
              break;
            }
          }
        }
        
        if (translatedRoute) {
          // La page a une traduction
          links[lang] = `/${lang}/${translatedRoute}`;
        } else {
          // Pour les pages avec exactement le même nom dans les deux langues
          const identicalPages = ['domiciliation', 'services', 'contact', 'articles', 'taxpertize'];
          if (identicalPages.includes(route)) {
            links[lang] = `/${lang}/${route}`;
          } else if (untranslatedPages[currentLang]?.includes(route as never)) {
            // La page n'a pas de traduction, rediriger vers l'accueil
            links[lang] = `/${lang}`;
          } else {
            // Dernier recours - vérifier si la page existe dans toutes les routes connues
            const allKnownRoutes = new Set<string>();
            Object.entries(routeMappings).forEach(([key, mapping]) => {
              allKnownRoutes.add(key);
              Object.values(mapping).forEach(r => allKnownRoutes.add(r));
            });
            
            if (allKnownRoutes.has(route)) {
              // On a trouvé la route dans nos mappings mais pas sa traduction
              // Cela signifie qu'il y a peut-être un problème dans notre mapping
              links[lang] = `/${lang}/${route}`;
            } else {
              // Dernière chance : essayer d'utiliser la même route pour l'autre langue
              // Cela couvre les cas où une page existe dans les deux langues mais n'est pas dans les mappings
              links[lang] = `/${lang}/${route}`;
            }
          }
        }
      }
    } else {
      // Page d'accueil
      links[lang] = `/${lang}`;
    }
    
    // Ajouter les paramètres de recherche si présents
    if (searchParams && links[lang] && links[lang] !== null) {
      links[lang] += `?${searchParams}`;
    }
  });
  
  return links;
}