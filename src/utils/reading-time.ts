/**
 * Calcule le temps de lecture estimé d'un texte
 * Basé sur une vitesse de lecture moyenne de 200 mots par minute en français
 */
export function calculateReadingTime(text: string, lang: 'fr' | 'en' = 'fr'): number {
  // Nettoyer le texte HTML et markdown
  const cleanText = text
    .replace(/<[^>]*>/g, '') // Supprimer les balises HTML
    .replace(/```[\s\S]*?```/g, '') // Supprimer les blocs de code
    .replace(/`[^`]*`/g, '') // Supprimer le code inline
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Convertir les liens markdown
    .replace(/[#*_~]/g, '') // Supprimer les marqueurs markdown
    .trim();
  
  // Compter les mots
  const words = cleanText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Vitesse de lecture moyenne (mots par minute)
  const wordsPerMinute = lang === 'fr' ? 200 : 225;
  
  // Calculer le temps en minutes, minimum 1 minute
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return Math.max(1, minutes);
}

/**
 * Formate le temps de lecture pour l'affichage
 */
export function formatReadingTime(minutes: number, lang: 'fr' | 'en' = 'fr'): string {
  if (lang === 'fr') {
    return minutes === 1 ? '1 min de lecture' : `${minutes} min de lecture`;
  } else {
    return minutes === 1 ? '1 min read' : `${minutes} min read`;
  }
}