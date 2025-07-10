import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const date = new Date().toISOString().slice(0, 10)
const branch = `codex-feature-${date}`
const commit = `feat: codex auto boost ${date}`

try {
  // ✅ Création branche
  execSync(`git checkout -b ${branch}`, { stdio: 'inherit' })

  // ✅ Génération de fichiers clés
  fs.writeFileSync('src/lib/supabase.ts', `
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)
`)

  fs.writeFileSync('src/lib/openai.ts', `
export async function generateSEO({ title }: { title: string }) {
  const response = await fetch('/api/seo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
  return response.json()
}
`)

  fs.writeFileSync('src/lib/zapier.ts', `
export const triggerZap = async (event: string, payload: any) => {
  await fetch('/api/zapier', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, payload })
  })
}
`)

  // ✅ Ajout + Commit + Push
  execSync('git add .', { stdio: 'inherit' })
  execSync(`git commit -m "${commit}"`, { stdio: 'inherit' })
  execSync(`git push origin ${branch}`, { stdio: 'inherit' })

  // ✅ Fichier PR auto
  fs.writeFileSync(`codex/PR_${date}.md`, "# 🤖 Codex Sync PR\n\nAuto génération de fichiers lib pour Supabase, OpenAI, Zapier.")

  console.log('✅ Codex complet exécuté avec succès !')
} catch (error) {
  console.error('❌ Erreur Codex:', error)
}