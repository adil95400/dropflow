import { execSync } from 'child_process'

const MODULE_NAME = 'dashboard' // 👈 tu peux changer le nom de module ici
const DATE = new Date().toISOString().split('T')[0]
const BRANCH = `codex-${MODULE_NAME}-${DATE}`
const COMMIT_MSG = `feat(${MODULE_NAME}): génération automatique du module ${MODULE_NAME}`
const PR_TITLE = `🚀 Ajout module ${MODULE_NAME}`
const PR_BODY = `Ajout automatique du module **${MODULE_NAME}** via script Codex le ${DATE}.`

try {
  console.log(`🚀 Création branche : ${BRANCH}`)
  execSync(`git checkout -b ${BRANCH}`, { stdio: 'inherit' })

  console.log('📦 Ajout de tous les fichiers modifiés...')
  execSync('git add .', { stdio: 'inherit' })

  console.log(`✅ Commit : ${COMMIT_MSG}`)
  execSync(`git commit -m "${COMMIT_MSG}"`, { stdio: 'inherit' })

  console.log('⏫ Push vers GitHub...')
  execSync(`git push -u origin ${BRANCH}`, { stdio: 'inherit' })

  console.log('🔃 Création Pull Request via GitHub CLI...')
  execSync(`gh pr create --title "${PR_TITLE}" --body "${PR_BODY}"`, { stdio: 'inherit' })

  console.log('✅ PR créée automatiquement 🎉')
} catch (error: any) {
  console.error('❌ Erreur Codex :', error.message)
}
