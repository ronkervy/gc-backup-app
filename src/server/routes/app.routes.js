const router = require('express').Router();
const {
    CreateBackup,
    ListBackups,
    WeeklyBackup,
    MonthlyBackup,
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

//WEEKLY BACKUPS
router.get('/cron/weekly',WeeklyBackup);

//MONTHLY BACKUPS
router.get('/cron/monthly',MonthlyBackup);
module.exports = router;
