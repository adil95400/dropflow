# DropFlow

DropFlow est une plateforme SaaS complète dédiée au dropshipping intelligent.
Elle simplifie l'importation de produits, la synchronisation des boutiques et le suivi des commandes.

## Fonctionnalités clés

- Importation multi-sources (AliExpress, BigBuy, CSV, etc.)
- Synchronisation Shopify / WooCommerce
- Suivi des colis via 17track.net
- Optimisation IA (produits, SEO, gagnants)
- Marketplace B2B
- CRM avec intégration Zapier
- Extension Chrome et application mobile Flutter

## Objectif du projet

Ce dépôt contient le code du frontend React/Vite et d'une API FastAPI.
L'objectif est de fournir une base légère pour tester et démontrer la plateforme.

## Prérequis

- **Node.js** et **npm** installés (version récente recommandée)
- **Python 3.10+** avec `pip`
- (Optionnel) **Docker** et **docker-compose** pour une exécution simplifiée

## Variables d'environnement

Copiez `\.env.example` vers `.env` et renseignez les valeurs suivantes :

- `VITE_OPENAI_API_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SHOPIFY_API_KEY`
- `VITE_BIGBUY_API_KEY`
- `VITE_TRACKING_API_KEY`

## Lancer le frontend

```bash
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:3000`.

## Lancer le backend

```bash
cd backend
pip install -r requirements.txt
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

L'API répondra sur `http://localhost:8000`.

Vous pouvez aussi démarrer les deux services avec `docker-compose up`.
