# Architecture CRM pour Fiduciaire Expert

## 1. Stack technique recommandé

### Frontend (existant)
- **Astro** : Site vitrine et formulaires
- **Netlify Forms** : Capture initiale des leads

### Backend CRM
- **Supabase** : Base de données + Auth + API
- **Dashboard** : Application React/Vue séparée ou Astro avec islands

## 2. Structure de la base de données

```sql
-- Table des leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Informations contact
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  
  -- Détails demande
  service VARCHAR(100),
  message TEXT,
  source VARCHAR(50), -- 'contact-form', 'landing-page', etc.
  
  -- Statut CRM
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, converted, lost
  assigned_to UUID REFERENCES users(id),
  priority VARCHAR(20) DEFAULT 'normal', -- low, normal, high, urgent
  
  -- Notes et suivi
  internal_notes TEXT,
  last_contact_date TIMESTAMP,
  next_action_date TIMESTAMP
);

-- Table des interactions
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  created_at TIMESTAMP DEFAULT NOW(),
  type VARCHAR(50), -- email, phone, meeting, note
  content TEXT,
  created_by UUID REFERENCES users(id)
);

-- Table des utilisateurs (équipe)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) -- admin, agent
);
```

## 3. Workflow d'intégration

### Étape 1 : Capture du lead
```javascript
// Dans ContactForm.astro - Ajouter après soumission Netlify
const saveToSupabase = async (formData) => {
  const response = await fetch('/api/leads', {
    method: 'POST',
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: formData.service,
      message: formData.message,
      source: 'contact-form'
    })
  });
};
```

### Étape 2 : Webhook Netlify → Supabase
```javascript
// netlify/functions/form-submission.js
import { createClient } from '@supabase/supabase-js';

export async function handler(event) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
  
  const formData = JSON.parse(event.body);
  
  const { data, error } = await supabase
    .from('leads')
    .insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: formData.service,
      message: formData.message,
      source: formData.form_name
    });
    
  // Notification email à l'équipe
  if (!error) {
    await sendNotificationEmail(data);
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
```

## 4. Dashboard CRM

### Option 1 : Dashboard séparé (Recommandé)
Créer une app React/Vue sur `crm.fiduciaire-expert.lu` :

```javascript
// Composants principaux
- LeadsList : Liste filtrable des leads
- LeadDetail : Fiche détaillée avec historique
- Pipeline : Vue Kanban des leads par statut
- Analytics : Statistiques et rapports
```

### Option 2 : Dashboard dans Astro avec islands
```astro
---
// src/pages/admin/dashboard.astro
import { supabase } from '../../lib/supabase';

// Protection de la page
const session = await supabase.auth.getSession();
if (!session) {
  return Astro.redirect('/admin/login');
}

const { data: leads } = await supabase
  .from('leads')
  .select('*')
  .order('created_at', { ascending: false });
---

<Layout>
  <!-- React island pour l'interactivité -->
  <LeadsDashboard client:load leads={leads} />
</Layout>
```

## 5. Fonctionnalités essentielles

### MVP (Version 1)
- ✅ Capture automatique des leads depuis formulaires
- ✅ Liste des leads avec filtres (statut, date, service)
- ✅ Fiche détaillée de chaque lead
- ✅ Changement de statut (nouveau → contacté → qualifié)
- ✅ Ajout de notes internes
- ✅ Notification email pour nouveaux leads

### Version 2
- 📊 Tableau de bord avec statistiques
- 📧 Envoi d'emails depuis le CRM
- 📅 Calendrier de relances
- 🏷️ Tags et catégories personnalisées
- 📱 App mobile responsive

### Version 3
- 🤖 Attribution automatique des leads
- 📈 Rapports et analytics avancés
- 🔄 Intégration comptabilité
- 📄 Génération de devis
- 🎯 Scoring automatique des leads

## 6. Sécurité et RGPD

```javascript
// Mesures essentielles
- Authentification forte (2FA)
- Chiffrement des données sensibles
- Logs d'audit
- Droit à l'effacement
- Export des données
- Consentement explicite
```

## 7. Coûts estimés

### Option Supabase (Recommandé)
- **Gratuit** : Jusqu'à 500MB stockage, 2GB transfert
- **Pro** : 25€/mois pour usage illimité

### Option serveur dédié
- **VPS** : 10-30€/mois
- **Maintenance** : À prévoir

## 8. Mise en œuvre

### Phase 1 (1 semaine)
1. Créer compte Supabase
2. Configurer base de données
3. Créer webhook Netlify
4. Tester capture des leads

### Phase 2 (2 semaines)
1. Développer dashboard basique
2. Authentification équipe
3. CRUD des leads
4. Notifications email

### Phase 3 (2 semaines)
1. Fonctionnalités avancées
2. Tests et optimisations
3. Formation équipe
4. Mise en production

## Commandes pour démarrer

```bash
# Installer Supabase
npm install @supabase/supabase-js

# Créer fonction Netlify
netlify functions:create form-submission

# Pour le dashboard React
npx create-react-app crm-dashboard
cd crm-dashboard
npm install @supabase/supabase-js @supabase/auth-ui-react
```

## Ressources
- [Supabase Docs](https://supabase.com/docs)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Template CRM React](https://github.com/supabase/supabase/tree/master/examples)