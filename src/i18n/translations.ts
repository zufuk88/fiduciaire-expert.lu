export const languages = {
  fr: 'Français',
  en: 'English'
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'fr';

export const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      about: 'À propos',
      accounting: 'Préparation des comptes annuels',
      payroll: 'Gestion de la paie',
      tax: 'Conformité fiscale',
      'company-creation': 'Création de société',
      domiciliation: 'Domiciliation',
      formations: 'Formations',
      articles: 'Articles',
      contact: 'Contact',
    },
    meta: {
      title: 'Expert Comptable Luxembourg | Fiduciaire Expert',
      description: 'Expert comptable au Luxembourg spécialisé en création de SARL, comptabilité PME, fiscalité IRC et TVA. Accompagnement personnalisé pour votre entreprise.',
    },
    footer: {
      'quick-links': 'Liens rapides',
      legal: 'Informations légales',
      privacy: 'Politique de confidentialité',
      terms: 'Mentions légales',
      rights: 'Tous droits réservés',
      services: 'Nos Services',
      company: 'Le Cabinet',
      domiciliation: 'Domiciliation',
      description: 'Votre partenaire expert-comptable, fiscal et conseil en création d\'entreprise au Grand-Duché de Luxembourg.',
      'legal-notices': 'Mentions Légales',
      'privacy-policy': 'Politique de Confidentialité',
      'rights-reserved': 'Tous droits réservés',
    },
    common: {
      'learn-more': 'En savoir plus',
      'contact-us': 'Nous contacter',
      'get-quote': 'Obtenir un devis',
      language: 'Langue',
      'back-to-home': 'Retour à l\'accueil de Fiduciaire Expert',
    },
    services: {
      accounting: {
        title: 'Comptabilité',
        desc: 'Gestion complète de votre comptabilité avec expertise et conformité luxembourgeoise',
      },
      payroll: {
        title: 'Gestion de la paie',
        desc: 'Administration des salaires et déclarations sociales en toute conformité',
      },
      company: {
        title: 'Création de société',
        desc: 'Accompagnement complet pour créer votre SARL, SA ou SCI au Luxembourg',
      },
      domiciliation: {
        title: 'Domiciliation',
        desc: 'Adresse prestigieuse et services de domiciliation pour votre entreprise',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      accounting: 'Annual Accounts Preparation',
      payroll: 'Payroll Management',
      tax: 'Tax Compliance',
      'company-creation': 'Company Incorporation',
      domiciliation: 'Domiciliation',
      training: 'Training',
      articles: 'Articles',
      contact: 'Contact',
    },
    meta: {
      title: 'Chartered Accountant Luxembourg | Fiduciaire Expert',
      description: 'Chartered accountant in Luxembourg specialized in SARL creation, SME accounting, IRC taxation and VAT. Personalized support for your business.',
    },
    footer: {
      'quick-links': 'Quick links',
      legal: 'Legal information',
      privacy: 'Privacy policy',
      terms: 'Legal notice',
      rights: 'All rights reserved',
      services: 'Our Services',
      company: 'The Firm',
      domiciliation: 'Domiciliation',
      description: 'Your accounting, tax and business creation partner in the Grand Duchy of Luxembourg.',
      'legal-notices': 'Legal Notices',
      'privacy-policy': 'Privacy Policy',
      'rights-reserved': 'All rights reserved',
    },
    common: {
      'learn-more': 'Learn more',
      'contact-us': 'Contact us',
      'get-quote': 'Get a quote',
      language: 'Language',
      'back-to-home': 'Back to Fiduciaire Expert homepage',
    },
    services: {
      accounting: {
        title: 'Accounting',
        desc: 'Complete management of your accounting with Luxembourg expertise and compliance',
      },
      payroll: {
        title: 'Payroll management',
        desc: 'Salary administration and social declarations in full compliance',
      },
      company: {
        title: 'Company Incorporation',
        desc: 'Complete support to create your SARL, SA or SCI in Luxembourg',
      },
      domiciliation: {
        title: 'Domiciliation',
        desc: 'Prestigious address and domiciliation services for your company',
      },
    },
  },
} as const;

export function useTranslation(lang: Language) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
}