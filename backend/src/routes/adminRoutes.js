const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/users', adminController.getAllUsers);
router.post('/create', adminController.createUser);
router.post('/create-classroom', adminController.createClassroom);
router.get('/classrooms', adminController.getClassrooms);
router.post("/assign-student", adminController.assignStudentToTeacher);

router.put('/users/:id', adminController.updateUser);  // Update user by ID
router.delete('/users/:id', adminController.deleteUser);  // Delete user by ID

module.exports = router;