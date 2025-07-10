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

const API_MODULES = [
  { name: 'seo', file: 'backend/api/seo.ts' },
  { name: 'zapier', file: 'backend/api/zapier.ts' }
]

const TEST_DIR = '__tests__'
const DOCS_DIR = 'docs'

const UI_COMPONENTS = [
  'button.tsx',
  'card.tsx',
  'input.tsx'
]

const PAGES_DIR = 'src/pages'
const LIB_DIR = 'src/lib'
const UI_DIR = 'src/components/ui'
const ROUTES_FILE = 'src/routes.tsx'

const MISSING_PAGES = [
  'Register.tsx',
  'Profile.tsx',
  'Settings.tsx',
  'Subscription.tsx',
  'Help.tsx',
  'Notifications.tsx',
  'Pricing.tsx',
  'Terms.tsx',
  'Privacy.tsx',
  'Contact.tsx'
]

const argv = process.argv.slice(2)
const flags = {
  mode: argv[0] || '',
  page: argv[1] || ''
}

async function main() {
  console.log("\n🧠 Codex Ultimate Generator - DropFlow Edition\n")

  let choice = flags.mode
  if (!choice) {
    console.log("Que souhaites-tu générer ?")
    console.log("1. Créer une page (Auth, Dashboard)")
    console.log("2. Générer des modules (Supabase, OpenAI, Zapier)")
    console.log("3. Tout générer (Page + Lib)")
    console.log("4. Générer toutes les pages manquantes")
    choice = await ask("\n👉 Ton choix (1, 2, 3 ou 4) : ")
  }

  const date = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16)
  const branch = `codex-ultimate-${date}`

  try {
    console.log(`\n🚀 Création de branche : ${branch}`)
    execSync(`git checkout -b ${branch}`, { stdio: 'inherit' })
  } catch (e) {
    console.warn(`⚠️ Branche déjà existante ou erreur : ${branch}`)
  }

  if (choice === '1' || choice === '3') {
    const page = flags.page || await ask("\n📝 Nom de la page à créer (ex: Auth.tsx) : ")
    const pagePath = path.join(PAGES_DIR, page)
    if (!fs.existsSync(pagePath)) {
      fs.writeFileSync(pagePath, `
import React from 'react'

export default function ${page.replace(/\.tsx$/, '')}() {
  return <div className=\"p-4\">{/* ${page} */}</div>
}`.trimStart())
      console.log(`✅ Page ${page} a été créée.`)
      updateRoutesFile(page)
      generateTest(page)
      generateDoc(page)
    } else {
      console.log(`⚠️ ${page} existe déjà. Ignoré.`)
    }
  }

  if (choice === '4') {
    console.log("\n📄 Génération des pages manquantes :")
    for (const page of MISSING_PAGES) {
      const pagePath = path.join(PAGES_DIR, page)
      if (!fs.existsSync(pagePath)) {
        fs.writeFileSync(pagePath, `
import React from 'react'

export default function ${page.replace(/\.tsx$/, '')}() {
  return <div className=\"p-4\">{/* ${page} */}</div>
}`.trimStart())
        console.log(`✅ ${page} a été créée.`)
        updateRoutesFile(page)
        generateTest(page)
        generateDoc(page)
      } else {
        console.log(`⚠️ ${page} existe déjà. Ignoré.`)
      }
    }
  }

  if (choice === '2' || choice === '3') {
    console.log("\n📦 Modules à générer : Supabase, OpenAI, Zapier")

    for (const [key, filepath] of Object.entries(MODULES)) {
      if (!fs.existsSync(filepath)) {
        const content = key === 'supabase' ? `
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)` : key === 'openai' ? `
export async function generateSEO({ title }: { title: string }) {
  const response = await fetch('/api/seo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
  return response.json()
}` : `
export const triggerZap = async (event: string, payload: any) => {
  await fetch('/api/zapier', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, payload })
  })
}`
        fs.writeFileSync(filepath, content.trimStart())
        console.log(`✅ ${key} a été généré.`)
      } else {
        console.log(`⚠️ ${key} existe déjà.`)
      }
    }
  }

  console.log("\n🎨 Génération des composants UI de base")
  if (!fs.existsSync(UI_DIR)) fs.mkdirSync(UI_DIR, { recursive: true })
  for (const comp of UI_COMPONENTS) {
    const compPath = path.join(UI_DIR, comp)
    if (!fs.existsSync(compPath)) {
      fs.writeFileSync(compPath, `
import React from 'react'

export function ${comp.replace(/\.tsx$/, '')}() {
  return <div className=\"p-2 border rounded\">${comp.replace(/\.tsx$/, '')} UI</div>
}`.trimStart())
      console.log(`✅ ${comp} a été généré.`)
    } else {
      console.log(`⚠️ ${comp} existe déjà.`)
    }
  }

  console.log("\n📡 Génération des fichiers backend/api")
  for (const mod of API_MODULES) {
    if (!fs.existsSync(mod.file)) {
      fs.mkdirSync(path.dirname(mod.file), { recursive: true })
      fs.writeFileSync(mod.file, `
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: '${mod.name} endpoint OK' })
}`.trimStart())
      console.log(`✅ API ${mod.name}.ts a été généré.`)
    } else {
      console.log(`⚠️ API ${mod.name}.ts existe déjà.`)
    }
  }

  execSync('git add .', { stdio: 'inherit' })
  execSync(`git commit -m "chore(codex): génération du script ultimate ${date}"`, { stdio: 'inherit' })
  execSync(`git push -u origin ${branch}`, { stdio: 'inherit' })

  const prTitle = `🚀 Codex Ultimate - Génération ${date}`
  const prBody = `PR auto générée pour ajouter les composants nécessaires à la date du ${date}.`
  execSync(`gh pr create --title "${prTitle}" --body "${prBody}"`, { stdio: 'inherit' })

  console.log(`\n✅ Codex Ultimate terminé, pushé et PR créée 🚀`)
  rl.close()
}

function updateRoutesFile(newPage: string) {
  const routeName = newPage.replace(/\.tsx$/, '')
  const importLine = `import ${routeName} from './pages/${routeName}'`
  const routeLine = `  { path: '/${routeName.toLowerCase()}', element: <${routeName} /> },`

  if (!fs.existsSync(ROUTES_FILE)) {
    fs.writeFileSync(ROUTES_FILE, `import React from 'react'
${importLine}

export const routes = [
${routeLine}
]`)
  } else {
    const content = fs.readFileSync(ROUTES_FILE, 'utf-8')
    if (!content.includes(importLine)) {
      const updated = content.replace(/(import .*? from '.*?';?\n)+/, match => match + importLine + '\n')
                            .replace(/export const routes = \[(.*?)\]/s, match => match.replace(/\]/, `  ,\n${routeLine}\n]`))
      fs.writeFileSync(ROUTES_FILE, updated)
    }
  }
}

function generateTest(page: string) {
  const name = page.replace(/\.tsx$/, '')
  const testFile = `${TEST_DIR}/${name}.test.tsx`
  if (!fs.existsSync(TEST_DIR)) fs.mkdirSync(TEST_DIR)
  if (!fs.existsSync(testFile)) {
    fs.writeFileSync(testFile, `import { render } from '@testing-library/react'
import ${name} from '../src/pages/${name}'

test('renders ${name}', () => {
  render(<${name} />)
})`)
    console.log(`✅ Test ajouté : ${testFile}`)
  }
}

function generateDoc(page: string) {
  const name = page.replace(/\.tsx$/, '')
  const docFile = `${DOCS_DIR}/${name}.md`
  if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR)
  if (!fs.existsSync(docFile)) {
    fs.writeFileSync(docFile, `# ${name}

Cette page est générée automatiquement par Codex Ultimate.`)
    console.log(`✅ Documentation ajoutée : ${docFile}`)
  }
}

main()
