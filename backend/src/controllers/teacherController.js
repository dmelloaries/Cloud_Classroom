const prisma = require('../utils/prismaClient');
exports.getTeacherDashboard = async (req, res) => {
    try {
      // Assume the teacher's ID is passed through the request, e.g., via JWT or session
      const teacherId = 4;
  
      
      const classrooms = await prisma.classroom.findMany({
        where: {
          principalId: teacherId,
        },
        include: {
          timetables: true
        }
      });
  
      // If no classrooms are found, return an empty list
      if (!classrooms || classrooms.length === 0) {
        return res.status(200).json({ message: "No classrooms assigned", classrooms: [] });
      }
  
      // Fetch the students assigned to this teacher
      const students = await prisma.user.findMany({
        where: {
          role: 'student',
          teacherId: teacherId
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      });
  
      // Respond with the classroom(s), list of students, and timetables
      res.status(200).json({
        message: "Teacher Dashboard",
        classrooms: classrooms.map(classroom => ({
          class_name: classroom.class_name,
          students: students, // Use the fetched students for this teacher
          timetables: classroom.timetables.map(timetable => ({
            subject: timetable.subject,
            startTime: timetable.startTime,
            endTime: timetable.endTime,
          })),
        })),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching the dashboard" });
    }
  };
  exports.createTimetable = async (req, res) => {
    const { subject, startTime, endTime, teacherId, classroomId } = req.body;
  
    try {
      // Ensure startTime and endTime are valid Date objects
      const startDate = new Date(startTime);
      const endDate = new Date(endTime);
  
      // Check for valid date range
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ error: "Invalid date format." });
      }
  
      // Find the classroom
      const classroom = await prisma.classroom.findUnique({ where: { id: classroomId } });
  
      if (!classroom) {
        return res.status(404).json({ error: "Classroom not found." });
      }
  
      // Check if the timetable period is within the classroom's time range
      const classroomStartDate = new Date(classroom.startTime);
      const classroomEndDate = new Date(classroom.endTime);
  
      if (startDate < classroomStartDate || endDate > classroomEndDate) {
        return res.status(400).json({ error: "Timetable period must be within classroom's start and end time." });
      }
  
      // Check for overlapping timetables in the same classroom
      const overlappingTimetable = await prisma.timetable.findFirst({
        where: {
          classroomId,
          OR: [
            { startTime: { lt: endDate }, endTime: { gt: startDate } }
          ],
        },
      });
  
      if (overlappingTimetable) {
        return res.status(400).json({ error: "The timetable overlaps with an existing timetable in the classroom." });
      }
  
      // Create the new timetable
      const timetable = await prisma.timetable.create({
        data: {
          subject,
          startTime: startDate,
          endTime: endDate,
          teacherId,
          classroomId,
        },
      });
  
      res.json(timetable);
    } catch (error) {
      console.error("Error creating timetable:", error); // Log error details
      res.status(500).json({ error: "Internal server error." });
    }
  };
  
exports.getTimetables = async (req, res) => {
  const { classroomId } = req.params;
  const timetables = await prisma.timetable.findMany({
    where: { classroomId: parseInt(classroomId) },
    include: {
      teacher: true,
      classroom: true,
    },
  });
  res.json(timetables);
};
