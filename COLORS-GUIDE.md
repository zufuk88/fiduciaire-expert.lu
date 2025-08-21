# 🎨 Guide des Couleurs - Fiduciaire Expert Luxembourg

## Palette Simplifiée

Notre identité visuelle repose sur une palette minimaliste et professionnelle de **5 couleurs principales** :

### 1️⃣ **Bleu Foncé** `#2c4157`
- **Usage** : Boutons principaux, icônes importantes, hover foncé
- **Où** : Bouton Contact header, fond des icônes ContactInfo, CTAs principales
- **Psychologie** : Confiance, professionnalisme, expertise

### 2️⃣ **Bleu Clair** `#3b82f6`
- **Usage** : Liens, hover, accents colorés, breadcrumbs actifs
- **Où** : Liens de navigation, breadcrumb PageHero, hover sur éléments
- **Psychologie** : Dynamisme, modernité, interactivité

### 3️⃣ **Gris Clair** `#f1f5f9`
- **Usage** : Fonds de sections alternées, arrière-plans légers
- **Où** : Sections alternées, fonds de cartes, zones de contenu
- **Psychologie** : Neutralité, clarté, espace

### 4️⃣ **Gris Texte Principal** `#0f172a`
- **Usage** : Titres, texte important, contenu principal
- **Où** : Tous les titres H1-H6, paragraphes principaux
- **Psychologie** : Lisibilité, sérieux, autorité

### 5️⃣ **Gris Texte Secondaire** `#64748b`
- **Usage** : Sous-titres, meta info, texte secondaire
- **Où** : Dates, catégories, descriptions courtes
- **Psychologie** : Hiérarchie, discrétion, support

---

## Couleurs Complémentaires (Déjà codées)

Ces couleurs restent codées en dur là où elles sont utilisées :

- **Blanc** `#ffffff` - Fonds principaux
- **Bordures** `#e2e8f0` - Séparations légères
- **Gradients** - Codés directement dans les composants
- **Ombres** - Définies avec rgba() dans chaque contexte

---

## Comment Utiliser

### Dans un fichier CSS/Astro :

```css
/* Importer les variables */
@import '/src/styles/colors.css';

/* Utiliser les variables */
.mon-bouton {
  background: var(--color-primary);
  color: white;
}

.ma-section {
  background: var(--color-bg-light);
  color: var(--color-text-primary);
}

.meta-info {
  color: var(--color-text-secondary);
}
```

### Avantages de cette approche :

1. **Cohérence** : Une seule source de vérité pour les couleurs
2. **Maintenance** : Changement global en un seul endroit
3. **Lisibilité** : Noms explicites des variables
4. **Performance** : Variables CSS natives, pas de runtime JS
5. **Accessibilité** : Contraste garanti avec cette palette

---

## Règles d'Usage

✅ **À FAIRE** :
- Utiliser UNIQUEMENT ces 5 couleurs principales
- Importer `colors.css` dans les nouveaux composants
- Utiliser les variables CSS plutôt que les hex

❌ **À ÉVITER** :
- Ajouter de nouvelles couleurs sans nécessité absolue
- Coder en dur les couleurs principales
- Créer des variantes non documentées

---

## Migration Progressive

Pour migrer les anciens composants :
1. Importer `@import '/src/styles/colors.css';`
2. Remplacer les hex par les variables
3. Tester visuellement
4. Commit par composant

---

*Dernière mise à jour : Août 2024*