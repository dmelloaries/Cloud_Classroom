const express = require('express');
const { getTeacherDashboard } = require('../controllers/teacherController');
const router = express.Router();

router.get('/dashboard', getTeacherDashboard);

module.exports = router;
