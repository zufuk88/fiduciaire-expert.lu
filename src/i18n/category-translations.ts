// Traductions des catégories d'articles
export const categoryTranslations: Record<string, Record<string, string>> = {
  // Format: { "category-in-french": { fr: "Catégorie", en: "Category" } }
  "Fiscalité": {
    fr: "Fiscalité",
    en: "Tax"
  },
  "Social": {
    fr: "Social",
    en: "Payroll"
  },
  "Comptabilité": {
    fr: "Comptabilité", 
    en: "Accounting"
  },
  "Juridique": {
    fr: "Juridique",
    en: "Corporate Law"
  },
  // Garder ces traductions pour compatibilité future
  "Tax": {
    fr: "Fiscalité",
    en: "Tax"
  },
  "Payroll": {
    fr: "Social",
    en: "Payroll"
  },
  "Accounting": {
    fr: "Comptabilité",
    en: "Accounting"
  },
  "Corporate Law": {
    fr: "Juridique",
    en: "Corporate Law"
  }
};

// Fonction pour obtenir la traduction d'une catégorie
export function translateCategory(category: string, lang: 'fr' | 'en'): string {
  return categoryTranslations[category]?.[lang] || category;
}

// Fonction pour obtenir le slug d'une catégorie dans une langue donnée
export function getCategorySlug(category: string, lang: 'fr' | 'en'): string {
  const translated = translateCategory(category, lang);
  return translated.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '-');
}

// Fonction inverse : obtenir la catégorie originale depuis un slug
export function getCategoryFromSlug(slug: string, lang: 'fr' | 'en'): string | null {
  const normalizedSlug = slug.toLowerCase();
  
  for (const [originalCategory, translations] of Object.entries(categoryTranslations)) {
    const translatedCategory = translations[lang];
    const categorySlug = translatedCategory.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '-');
    
    if (categorySlug === normalizedSlug) {
      return originalCategory;
    }
  }
  
  return null;
}