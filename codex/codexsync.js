"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var MODULE_NAME = 'dashboard';
var DATE = new Date().toISOString().split('T')[0];
var BRANCH = "codex-".concat(MODULE_NAME, "-").concat(DATE);
var COMMIT_MSG = "feat(".concat(MODULE_NAME, "): g\u00E9n\u00E9ration automatique du module ").concat(MODULE_NAME);
var PR_TITLE = "\uD83D\uDE80 Ajout module ".concat(MODULE_NAME);
var PR_BODY = "Ajout automatique du module **".concat(MODULE_NAME, "** via script Codex le ").concat(DATE, ".");
try {
    console.log('📦 Codex Sync Started');
    (0, child_process_1.execSync)("git checkout -b ".concat(BRANCH));
    (0, child_process_1.execSync)('git add .');
    (0, child_process_1.execSync)("git commit -m \"".concat(COMMIT_MSG, "\""));
    (0, child_process_1.execSync)("git push -u origin ".concat(BRANCH));
    (0, child_process_1.execSync)("gh pr create --title \"".concat(PR_TITLE, "\" --body \"").concat(PR_BODY, "\""));
    console.log('✅ PR créée automatiquement');
}
catch (error) {
    console.error('❌ Erreur :', error.message);
}
