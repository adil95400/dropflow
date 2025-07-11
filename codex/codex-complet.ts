import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import readline from 'readline'

const now = new Date()
const date = now.toISOString().split('T')[0]
const time = `${now.getHours()}h${now.getMinutes()}`
const branch = `codex-feature-${date}-${time}`
const commit = `feat: codex auto boost ${date} ${time}`
const libPath = 'src/lib'
const prPath = `codex/PR_${date}-${time}.md`

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const options = [
  { key: '1', name: 'Supabase', file: 'supabase.ts', content: `
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)
`.trim() },
  { key: '2', name: 'OpenAI (SEO)', file: 'openai.ts', content: `
export async function generateSEO({ title }: { title: string }) {
  const response = await fetch('/api/seo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
  return response.json()
}
`.trim() },
  { key: '3', name: 'Zapier', file: 'zapier.ts', content: `
export const triggerZap = async (event: string, payload: any) => {
  await fetch('/api/zapier', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, payload })
  })
}
`.trim() },
  { key: '4', name: 'Tous les modules' }
]

function showMenu() {
  console.log('\n🎛️ Sélectionne les modules à générer :')
  options.forEach(opt => {
    console.log(`  ${opt.key}. ${opt.name}`)
  })

  rl.question('\n👉 Ton choix (ex: 1,2 ou 4) : ', handleChoice)
}

function handleChoice(answer: string) {
  const selected = answer.split(',').map(v => v.trim())
  const all = selected.includes('4')

  if (!all && selected.length === 0) {
    console.log('❌ Aucun module sélectionné.')
    rl.close()
    return
  }

  try {
    console.log(`\n🚀 Création de branche : ${branch}`)
    execSync(`git checkout -b ${branch}`, { stdio: 'inherit' })
    fs.mkdirSync(libPath, { recursive: true })

    const generated: string[] = []

    for (const opt of options) {
      if (opt.file && (all || selected.includes(opt.key))) {
        const fullPath = path.join(libPath, opt.file)
        if (!fs.existsSync(fullPath)) {
          fs.writeFileSync(fullPath, opt.content)
          generated.push(opt.name)
          console.log(`✅ Fichier généré : ${opt.file}`)
        } else {
          console.log(`⚠️  Déjà existant : ${opt.file} (ignoré)`)
        }
      }
    }

    if (generated.length === 0) {
      console.log('\n⚠️ Aucun fichier généré. Abandon.')
      rl.close()
      return
    }

    execSync('git add .', { stdio: 'inherit' })
    execSync(`git commit -m "${commit}"`, { stdio: 'inherit' })
    execSync(`git push -u origin ${branch}`, { stdio: 'inherit' })

    fs.mkdirSync('codex', { recursive: true })
    fs.writeFileSync(prPath, `
# 🚀 Codex PR du ${date} - ${time}

Modules générés automatiquement :
${generated.map(g => `- ✅ ${g}`).join('\n')}

> Créé via script Codex CLI.
    `.trim())

    execSync(`gh pr create --title "🚀 Modules auto (${date})" --body-file "${prPath}"`, { stdio: 'inherit' })

    console.log('\n✅ Codex terminé avec succès.')
  } catch (error: any) {
    console.error('❌ Erreur Codex :', error.message)
  } finally {
    rl.close()
  }
}

showMenu()
