const router = require('express').Router();
const {
    CreateBackup,
    ListBackups,
    ScheduleBackup,
    DeleteBackup,
    RestoreBackup,
    ListDatabases
} = require('../controllers/app.controllers');

//BACKUPS
router.get('/backups',ListBackups);
router.post('/backups',CreateBackup);
router.post('/backups/restore',RestoreBackup);

//LIST ALL DATABASE
router.get('/list/database',ListDatabases);

module.exports = router;
