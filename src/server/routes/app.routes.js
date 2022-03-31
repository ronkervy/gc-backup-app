const router = require('express').Router();
const {
    CreateBackup,
    BackupList,
    RestoreBackup,
    ListDatabases
} = require('../controllers/app.controllers');

//BACKUPS
router.get('/backups',BackupList);
router.post('/backups',CreateBackup);
router.post('/backups/restore',RestoreBackup);

//LIST ALL DATABASE
router.get('/list/database',ListDatabases);

module.exports = router;
