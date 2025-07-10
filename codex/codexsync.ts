import { execSync } from 'child_process'

const MODULE_NAME = 'dashboard'
const DATE = new Date().toISOString().split('T')[0]
const BRANCH = `codex-${MODULE_NAME}-${DATE}`
const COMMIT_MSG = `feat(${MODULE_NAME}): génération automatique du module ${MODULE_NAME}`
const PR_TITLE = `🚀 Ajout module ${MODULE_NAME}`
const PR_BODY = `Ajout automatique du module **${MODULE_NAME}** via script Codex le ${DATE}.`

try {
  console.log('📦 Codex Sync Started')

  execSync(`git checkout -b ${BRANCH}`)
  execSync('git add .')
  execSync(`git commit -m "${COMMIT_MSG}"`)
  execSync(`git push -u origin ${BRANCH}`)
  execSync(`gh pr create --title "${PR_TITLE}" --body "${PR_BODY}"`)

  console.log('✅ PR créée automatiquement')
} catch (error: any) {
  console.error('❌ Erreur :', error.message)
}
