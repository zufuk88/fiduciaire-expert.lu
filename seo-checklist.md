# Checklist SEO - Résolution des problèmes d'indexation Google

## ✅ Actions réalisées

1. **Optimisation du sitemap** 
   - Augmentation des priorités pour les pages importantes (fiscalité, taxpertize)
   - Exclusion des pages de recherche du sitemap
   - Amélioration de la fréquence de mise à jour (changefreq)
   - Articles individuels passés en priorité 0.5 (au lieu de 0.4)

2. **Sitemap généré avec 53 URLs** (au lieu de 55, sans les pages recherche)

## 📋 Actions à effectuer dans Google Search Console

### 1. Soumettre le nouveau sitemap
- Aller dans Google Search Console > Sitemaps
- Soumettre : `https://www.fiduciaire-expert.lu/sitemap-index.xml`
- Attendre la validation (peut prendre 24-48h)

### 2. Demander l'indexation manuelle des pages prioritaires
Dans l'ordre suivant, utiliser l'outil "Inspection de l'URL" :
1. `https://www.fiduciaire-expert.lu/fr/fiscalite/`
2. `https://www.fiduciaire-expert.lu/fr/taxpertize/`
3. `https://www.fiduciaire-expert.lu/fr/creation-societe-luxembourg/`
4. `https://www.fiduciaire-expert.lu/fr/services/`
5. `https://www.fiduciaire-expert.lu/fr/comptabilite/`

Pour chaque URL :
- Coller l'URL dans la barre de recherche
- Cliquer sur "Demander une indexation"
- Attendre la confirmation

### 3. Vérifier les problèmes de couverture
- Aller dans "Couverture" ou "Pages"
- Identifier les pages avec erreurs ou avertissements
- Noter les raisons spécifiques de non-indexation

## 🔍 Points de vérification supplémentaires

### Performance du site
- [ ] Vérifier la vitesse de chargement avec PageSpeed Insights
- [ ] S'assurer que le site est accessible aux robots Google
- [ ] Vérifier qu'il n'y a pas de blocage dans le fichier robots.txt

### Contenu
- [ ] S'assurer que chaque article a au moins 300 mots
- [ ] Vérifier l'unicité du contenu (pas de duplication)
- [ ] Avoir des meta descriptions uniques pour chaque page

### Technique
- [ ] Vérifier que les pages sont bien rendues côté serveur (SSR)
- [ ] S'assurer que les balises canonical sont correctes
- [ ] Vérifier les redirections (www vers non-www)

## 📊 Suivi des résultats

Après les actions :
1. **J+3** : Vérifier la prise en compte du sitemap
2. **J+7** : Contrôler l'évolution du nombre de pages indexées
3. **J+14** : Analyser les premières données de trafic
4. **J+30** : Faire un bilan complet

## 💡 Recommandations supplémentaires

1. **Créer du contenu régulièrement** : Publier au moins 1 article par semaine
2. **Obtenir des backlinks** : Liens depuis d'autres sites luxembourgeois
3. **Optimiser les Core Web Vitals** : Améliorer LCP, FID et CLS
4. **Structurer les données** : Ajouter plus de schema.org pour les articles

## 🚨 Si le problème persiste après 30 jours

1. Vérifier s'il y a des pénalités manuelles dans Search Console
2. Analyser les logs serveur pour voir si Googlebot accède au site
3. Utiliser l'outil de test robots.txt de Google
4. Considérer une migration vers un sous-domaine ou changement d'hébergeur

## 📈 Objectifs

- **Court terme (30 jours)** : Passer de 32 à 50+ pages indexées
- **Moyen terme (90 jours)** : Avoir 80%+ des pages indexées
- **Long terme (6 mois)** : 100% des pages importantes indexées + amélioration du ranking