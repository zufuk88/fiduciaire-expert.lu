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
  return route.length > 0 ? route : undefined;
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
        // Vérifier si la page a une traduction dans les deux sens
        let mapping = routeMappings[route];
        
        // Si pas trouvé directement, chercher dans toutes les entrées
        if (!mapping) {
          // Parcourir toutes les entrées pour trouver une correspondance
          for (const [, value] of Object.entries(routeMappings)) {
            if (value[currentLang] === route) {
              mapping = value;
              break;
            }
          }
        }
        
        if (mapping && mapping[lang]) {
          // La page a une traduction
          links[lang] = `/${lang}/${mapping[lang]}`;
        } else if (untranslatedPages[currentLang]?.includes(route as never)) {
          // La page n'a pas de traduction, rediriger vers l'accueil
          links[lang] = `/${lang}`;
        } else {
          // Pour les pages avec le même nom dans les deux langues
          // (domiciliation, services, contact, articles, taxpertize)
          const sameNamePages = ['domiciliation', 'services', 'contact', 'articles', 'taxpertize'];
          if (sameNamePages.includes(route)) {
            links[lang] = `/${lang}/${route}`;
          } else {
            // Pas de fallback - retourner null si aucune traduction trouvée
            links[lang] = null;
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