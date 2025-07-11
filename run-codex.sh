#!/bin/bash

# Script automatique pour compiler et lancer codexsync.ts

echo "🚀 Compilation TypeScript..."
npx tsc codex/codexsync.ts

if [ $? -ne 0 ]; then
  echo "❌ Échec de la compilation. Vérifie ton fichier codexsync.ts"
  exit 1
fi

echo "✅ Compilation réussie."

echo "▶️ Lancement du script codexsync.js..."
node codex/codexsync.js
