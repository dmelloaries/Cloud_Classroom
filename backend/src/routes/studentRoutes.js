const express = require('express');
const { getStudentDashboard } = require('../controllers/studentController');
const router = express.Router();

router.get('/dashboard', getStudentDashboard);

module.exports = router;
