# Guide pour améliorer l'indexation Google

## Problèmes identifiés
- 76 pages non indexées vs 32 indexées
- Status principal : "Détectée, actuellement non indexée" (53 pages)

## Actions correctives effectuées

### 1. ✅ Configuration technique vérifiée
- **robots.txt** : Correctement configuré (Allow: /)
- **sitemap.xml** : Généré automatiquement avec 57 URLs
- **Meta robots** : Seules les pages de recherche et remerciement ont noindex (correct)

### 2. ✅ Corrections appliquées
- Suppression de la page vide `/en/training.astro`
- Les balises hreflang sont déjà correctement configurées dans LayoutI18n.astro

## Actions à effectuer manuellement

### 1. **Dans Google Search Console**

#### A. Soumettre le sitemap
1. Aller dans **Sitemaps** dans le menu
2. Ajouter : `https://www.fiduciaire-expert.lu/sitemap-index.xml`
3. Cliquer sur **Soumettre**

#### B. Demander l'indexation des pages prioritaires
Pour chaque page importante non indexée :
1. Aller dans **Inspection de l'URL**
2. Entrer l'URL (ex: `https://www.fiduciaire-expert.lu/en/`)
3. Cliquer sur **Demander une indexation**

Pages prioritaires à soumettre :
- `/en/` (page d'accueil anglaise)
- `/en/about/`
- `/en/services/`
- `/en/tax/`
- `/en/accounting/`

### 2. **Améliorer le contenu des pages**

#### A. Différencier le contenu FR/EN
- Assurez-vous que les traductions anglaises sont complètes et uniques
- Évitez le contenu dupliqué entre les versions linguistiques

#### B. Enrichir le contenu
- Ajouter plus de contenu unique sur chaque page (minimum 300 mots)
- Inclure des mots-clés pertinents naturellement
- Ajouter des FAQ ou sections supplémentaires

### 3. **Stratégie de liens**

#### A. Liens internes
- Ajouter plus de liens entre les articles et les pages de services
- Créer une structure de navigation claire

#### B. Backlinks
- Obtenir des liens depuis des sites luxembourgeois pertinents
- Inscriptions dans des annuaires professionnels
- Partenariats avec d'autres entreprises

### 4. **Performance technique**

#### A. Vitesse de chargement
```bash
# Vérifier avec Lighthouse
npm run build
npx lighthouse https://www.fiduciaire-expert.lu --view
```

#### B. Core Web Vitals
- Optimiser les images (déjà en WebP ✅)
- Minimiser le JavaScript
- Utiliser le lazy loading pour les images

## Suivi recommandé

### Semaine 1-2
- Soumettre le sitemap
- Demander l'indexation des 10 pages principales
- Vérifier quotidiennement dans Search Console

### Semaine 3-4
- Analyser les pages toujours non indexées
- Améliorer le contenu des pages problématiques
- Soumettre à nouveau si nécessaire

### Mois 2
- Créer du nouveau contenu (articles de blog)
- Obtenir des backlinks de qualité
- Analyser les performances dans Search Console

## Commandes utiles

```bash
# Générer le sitemap
npm run build

# Vérifier le sitemap généré
cat dist/sitemap-0.xml | grep "<loc>" | wc -l

# Tester la vitesse
npx lighthouse https://www.fiduciaire-expert.lu --view
```

## Ressources
- [Google Search Console](https://search.google.com/search-console)
- [Guide Google sur l'indexation](https://developers.google.com/search/docs/crawling-indexing)
- [Outil de test des données structurées](https://search.google.com/test/rich-results)

## Notes importantes
⚠️ L'indexation par Google peut prendre 2-4 semaines après soumission
⚠️ Google privilégie le contenu de qualité et unique
⚠️ Les pages avec peu de contenu ou dupliqué sont souvent ignorées