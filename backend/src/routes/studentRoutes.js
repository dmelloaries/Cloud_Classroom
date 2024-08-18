const express = require('express');
const { getStudentDashboard } = require('../controllers/studentController');
const { getAllUsers } = require('../controllers/adminController');
const router = express.Router();

router.get('/dashboard', getStudentDashboard);
router.get('/users', getAllUsers);

module.exports = router;
