const prisma = require('../utils/prismaClient');

exports.getTeacherDashboard = async (req, res) => {
  res.json({ message: "Teacher Dashboard" });
};

exports.createTimetable = async (req, res) => {
  const { subject, startTime, endTime, teacherId, classroomId } = req.body;
  try {
    // the timetable period is within the classroom time range
    const classroom = await prisma.classroom.findUnique({ where: { id: classroomId } });

    if (new Date(startTime) < new Date(classroom.startTime) || new Date(endTime) > new Date(classroom.endTime)) {
      return res.status(400).json({ error: "Timetable period must be within classroom's start and end time." });
    }

    const timetable = await prisma.timetable.create({
      data: {
        subject,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        teacherId,
        classroomId,
      },
    });
    res.json(timetable);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
