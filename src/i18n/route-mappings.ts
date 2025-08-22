export const routeMappings: Record<string, Record<string, string>> = {
  // FR -> EN mappings
  'a-propos': { en: 'about', fr: 'a-propos' },
  'comptabilite': { en: 'accounting', fr: 'comptabilite' },
  'creation-societe-luxembourg': { en: 'company-formation-luxembourg', fr: 'creation-societe-luxembourg' },
  'domiciliation': { en: 'domiciliation', fr: 'domiciliation' },
  'paie': { en: 'payroll', fr: 'paie' },
  'fiscalite': { en: 'tax', fr: 'fiscalite' },
  'services': { en: 'services', fr: 'services' },
  'contact': { en: 'contact', fr: 'contact' },
  'merci': { en: 'contact/thank-you', fr: 'merci' },
  'articles': { en: 'articles', fr: 'articles' },
  'recherche': { en: 'search', fr: 'recherche' },
  'mentions-legales': { en: 'legal-notice', fr: 'mentions-legales' },
  'politique-confidentialite': { en: 'privacy-policy', fr: 'politique-confidentialite' },
  'taxpertize': { en: 'taxpertize', fr: 'taxpertize' },
  
  // EN -> FR mappings (miroir des mappings FR -> EN)
  'about': { fr: 'a-propos', en: 'about' },
  'accounting': { fr: 'comptabilite', en: 'accounting' },
  'company-formation-luxembourg': { fr: 'creation-societe-luxembourg', en: 'company-formation-luxembourg' },
  'payroll': { fr: 'paie', en: 'payroll' },
  'tax': { fr: 'fiscalite', en: 'tax' },
  'contact/thank-you': { fr: 'merci', en: 'contact/thank-you' },
  'search': { fr: 'recherche', en: 'search' },
  'legal-notice': { fr: 'mentions-legales', en: 'legal-notice' },
  'privacy-policy': { fr: 'politique-confidentialite', en: 'privacy-policy' }
};

// Pages qui n'ont pas de traduction - redirection vers l'accueil
export const untranslatedPages = {
  fr: [],
  en: []
};