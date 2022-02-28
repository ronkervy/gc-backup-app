const router = require('express').Router();
const {
    CreateBackup,
    ListBackups,
    ScheduleBackup,
    DeleteBackup
} = require('../controllers/app.controllers');

router.get('/backups',ListBackups);
router.post('/backups',CreateBackup);

module.exports = router;
