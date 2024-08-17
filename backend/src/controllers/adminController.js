const prisma = require("../utils/prismaClient");

exports.getAllUsers = async (req, res) => {
  const teachers = await prisma.user.findMany({ where: { role: "teacher" } });
  const students = await prisma.user.findMany({ where: { role: "student" } });
  res.json({ teachers, students });
};

exports.createUser = async (req, res) => {
  const {name , email, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const user = await prisma.user.create({
      data: { name ,email, password, role },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

exports.createClassroom = async (req, res) => {
  const { class_name, startTime, endTime, days, principalId } = req.body; // instead of principalid , make req of teacher name and 
  try {
    const classroom = await prisma.classroom.create({
      data: {
        class_name,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        days,
        principalId,
      },
    });
    res.json(classroom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getClassrooms = async (req, res) => {
  const classrooms = await prisma.classroom.findMany({
    include: {
      principal: false,
      timetables: true,
    },
  });
  res.json(classrooms);
};
