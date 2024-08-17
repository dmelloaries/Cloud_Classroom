const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController.js');

router.get('/dashboard', teacherController.getTeacherDashboard);
router.post('/create-timetable', teacherController.createTimetable);
router.get('/classroom/:classroomId/timetables', teacherController.getTimetables);

module.exports = router;
