// Mapping bidirectionnel des traductions d'articles
export const articleTranslations: Record<string, Record<string, string>> = {
  // Articles français
  "avantage-en-nature": {
    fr: "avantage-en-nature",
    en: "benefits-in-kind-luxembourg-company-car-housing"
  },
  "agents-diplomatiques": {
    fr: "agents-diplomatiques"
    // en: "embassy-employees-luxembourg-tax-social-security" // Draft article
  },
  "integration-fiscale": {
    fr: "integration-fiscale",
    en: "tax-consolidation-luxembourg-group-companies"
  },
  "sarl-luxembourg": {
    fr: "sarl-luxembourg",
    en: "creating-sarl-luxembourg-complete-guide"
  },
  "sarl-s": {
    fr: "sarl-s"
    // en: "sarl-s-luxembourg-simplified-limited-liability-company" // Draft article
  },
  "SAS-luxembourg": {
    fr: "SAS-luxembourg"
    // en: "sas-luxembourg-simplified-joint-stock-company-guide" // Draft article
  },
  "sci-luxembourg": {
    fr: "sci-luxembourg",
    en: "sci-luxembourg-real-estate-holding-company"
  },
  "societe-anonyme-sa": {
    fr: "societe-anonyme-sa"
    // en: "sa-luxembourg-public-limited-company-guide" // Draft article
  },
  "soparfi-holding": {
    fr: "soparfi-holding",
    en: "soparfi-luxembourg-holding-company-guide"
  },
  "leasing-oeuvre-art": {
    fr: "leasing-oeuvre-art"
    // en: "art-leasing-luxembourg-companies-accounting-tax-guide" // Draft article
  },
  
  // Articles anglais (même mapping, clé différente pour la recherche)
  "benefits-in-kind-luxembourg-company-car-housing": {
    en: "benefits-in-kind-luxembourg-company-car-housing",
    fr: "avantage-en-nature"
  },
  // "embassy-employees-luxembourg-tax-social-security": { // Draft article
  //   en: "embassy-employees-luxembourg-tax-social-security",
  //   fr: "agents-diplomatiques"
  // },
  "tax-consolidation-luxembourg-group-companies": {
    en: "tax-consolidation-luxembourg-group-companies",
    fr: "integration-fiscale"
  },
  "creating-sarl-luxembourg-complete-guide": {
    en: "creating-sarl-luxembourg-complete-guide",
    fr: "sarl-luxembourg"
  },
  // "sarl-s-luxembourg-simplified-limited-liability-company": { // Draft article
  //   en: "sarl-s-luxembourg-simplified-limited-liability-company",
  //   fr: "sarl-s"
  // },
  // "sas-luxembourg-simplified-joint-stock-company-guide": { // Draft article
  //   en: "sas-luxembourg-simplified-joint-stock-company-guide",
  //   fr: "SAS-luxembourg"
  // },
  "sci-luxembourg-real-estate-holding-company": {
    en: "sci-luxembourg-real-estate-holding-company",
    fr: "sci-luxembourg"
  },
  // "sa-luxembourg-public-limited-company-guide": { // Draft article
  //   en: "sa-luxembourg-public-limited-company-guide",
  //   fr: "societe-anonyme-sa"
  // },
  "soparfi-luxembourg-holding-company-guide": {
    en: "soparfi-luxembourg-holding-company-guide",
    fr: "soparfi-holding"
  },
  // "art-leasing-luxembourg-companies-accounting-tax-guide": { // Draft article
  //   en: "art-leasing-luxembourg-companies-accounting-tax-guide",
  //   fr: "leasing-oeuvre-art"
  // },
  
  // Nouvel article plus-values immobilières
  "plus-values-immobilieres": {
    fr: "plus-values-immobilieres",
    en: "real-estate-capital-gains-luxembourg"
  },
  "real-estate-capital-gains-luxembourg": {
    en: "real-estate-capital-gains-luxembourg",
    fr: "plus-values-immobilieres"
  }
};
