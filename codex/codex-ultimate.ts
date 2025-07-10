import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import readline from 'readline'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const ask = (q: string) => new Promise<string>(res => rl.question(q, res))

const MODULES = {
  auth: 'Auth.tsx',
  dashboard: 'Dashboard.tsx',
  supabase: 'src/lib/supabase.ts',
  openai: 'src/lib/openai.ts',
  zapier: 'src/lib/zapier.ts'
}

const PAGES_DIR = 'src/pages'
const LIB_DIR = 'src/lib'

async function main() {
  console.log("\n🧠 Codex Ultimate Generator - DropFlow Edition\n")

  console.log("Que souhaites-tu générer ?")
  console.log("1. Créer une page (Auth, Dashboard)")
  console.log("2. Générer des modules (Supabase, OpenAI, Zapier)")
  console.log("3. Tout générer (Page + Lib)")

  const choice = await ask("\n👉 Ton choix (1, 2 ou 3) : ")
  const date = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16)
  const branch = `codex-ultimate-${date}`

  try {
    console.log(`\n🚀 Création de branche : ${branch}`)
    execSync(`git checkout -b ${branch}`, { stdio: 'inherit' })
  } catch (e) {
    console.warn(`⚠️ Branche déjà existante ou erreur : ${branch}`)
  }

  if (choice === '1' || choice === '3') {
    const page = await ask("\n📝 Nom de la page à créer (ex: Auth.tsx) : ")
    const pagePath = path.join(PAGES_DIR, page)
    if (!fs.existsSync(pagePath)) {
      fs.writeFileSync(pagePath, `
import React from 'react'

export default function ${page.replace(/\.tsx$/, '')}() {
  return <div className="p-4">{/* ${page} */}</div>
}
      `.trimStart())
      console.log(`✅ Page ${page} créée.`)
    } else {
      console.log(`⚠️ ${page} existe déjà. Ignoré.`)
    }
  }

  if (choice === '2' || choice === '3') {
    console.log("\n📦 Modules à générer : Supabase, OpenAI, Zapier")

    if (!fs.existsSync(MODULES.supabase)) {
      fs.writeFileSync(MODULES.supabase, `
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)
      `.trimStart())
      console.log("✅ Supabase lib générée.")
    } else console.log("⚠️ supabase.ts existe déjà. Ignoré.")

    if (!fs.existsSync(MODULES.openai)) {
      fs.writeFileSync(MODULES.openai, `
export async function generateSEO({ title }: { title: string }) {
  const response = await fetch('/api/seo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
  return response.json()
}
      `.trimStart())
      console.log("✅ OpenAI lib générée.")
    } else console.log("⚠️ openai.ts existe déjà. Ignoré.")

    if (!fs.existsSync(MODULES.zapier)) {
      fs.writeFileSync(MODULES.zapier, `
export const triggerZap = async (event: string, payload: any) => {
  await fetch('/api/zapier', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, payload })
  })
}
      `.trimStart())
      console.log("✅ Zapier lib générée.")
    } else console.log("⚠️ zapier.ts existe déjà. Ignoré.")
  }

  execSync('git add .', { stdio: 'inherit' })
  execSync(`git commit -m "chore(codex): génération du script ultimate ${date}"`, { stdio: 'inherit' })
  execSync(`git push -u origin ${branch}`, { stdio: 'inherit' })

  console.log("\n✅ Codex Ultimate terminé et pushé avec succès 🚀")
  rl.close()
}

main()
