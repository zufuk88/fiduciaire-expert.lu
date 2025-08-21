import { getCollection } from 'astro:content';
import type { Language } from './translations';

// Cache pour éviter de recharger la collection à chaque appel
let articlesCache: Map<string, any> | null = null;

export async function getArticleTranslations(): Promise<Map<string, Record<Language, string>>> {
  if (articlesCache) return articlesCache;
  
  const translations = new Map<string, Record<Language, string>>();
  const allArticles = await getCollection('blog');
  
  // Parcourir tous les articles pour construire la map de traductions
  for (const article of allArticles) {
    const slug = article.slug.replace('fr/', '').replace('en/', '');
    const lang = article.id.startsWith('fr/') ? 'fr' : 'en';
    
    // Si l'article a des traductions définies
    if (article.data.translations) {
      const translationData: Record<Language, string> = { [lang]: slug };
      
      // Ajouter les traductions définies dans le frontmatter
      Object.entries(article.data.translations).forEach(([targetLang, targetSlug]) => {
        if (targetSlug) {
          translationData[targetLang as Language] = targetSlug;
        }
      });
      
      // Stocker dans la map
      translations.set(slug, translationData);
    }
  }
  
  articlesCache = translations;
  return translations;
}

// Fonction synchrone pour une utilisation dans getAlternateLinks
// Cette fonction nécessite que getArticleTranslations ait été appelée au préalable
export function getArticleTranslationSync(slug: string): Record<Language, string> | null {
  if (!articlesCache) {
    console.warn('Article translations cache not initialized');
    return null;
  }
  
  return articlesCache.get(slug) || null;
}