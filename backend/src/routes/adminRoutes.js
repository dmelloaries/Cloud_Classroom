const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/users', adminController.getAllUsers);
router.post('/create', adminController.createUser);
router.post('/create-classroom', adminController.createClassroom);
router.get('/classrooms', adminController.getClassrooms);
router.post("/assign-student", adminController.assignStudentToTeacher);

module.exports = router;