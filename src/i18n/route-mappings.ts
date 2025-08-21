export const routeMappings: Record<string, Record<string, string>> = {
  // FR -> EN mappings
  'a-propos': { en: 'about' },
  'comptabilite': { en: 'accounting' },
  'creation-societe-luxembourg': { en: 'company-formation-luxembourg' },
  'domiciliation': { en: 'domiciliation' },
  'paie': { en: 'payroll' },
  'fiscalite': { en: 'tax' },
  'services': { en: 'services' },
  'contact': { en: 'contact' },
  'merci': { en: 'contact/thank-you' },
  'articles': { en: 'articles' },
  'recherche': { en: 'search' },
  'mentions-legales': { en: 'legal-notice' },
  'politique-confidentialite': { en: 'privacy-policy' },
  
  // EN -> FR mappings
  'about': { fr: 'a-propos' },
  'accounting': { fr: 'comptabilite' },
  'company-formation-luxembourg': { fr: 'creation-societe-luxembourg' },
  // 'domiciliation': { fr: 'domiciliation' }, // Same in both languages
  'payroll': { fr: 'paie' },
  'tax': { fr: 'fiscalite' },
  // 'services': { fr: 'services' }, // Same in both languages
  // 'contact': { fr: 'contact' }, // Same in both languages
  'contact/thank-you': { fr: 'merci' },
  // 'articles': { fr: 'articles' }, // Same in both languages
  'search': { fr: 'recherche' },
  'legal-notice': { fr: 'mentions-legales' },
  'privacy-policy': { fr: 'politique-confidentialite' }
};

// Pages qui n'ont pas de traduction - redirection vers l'accueil
export const untranslatedPages = {
  fr: [],
  en: []
};