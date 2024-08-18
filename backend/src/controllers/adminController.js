const prisma = require("../utils/prismaClient");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  const teachers = await prisma.user.findMany({ where: { role: "teacher" } });
  const students = await prisma.user.findMany({ where: { role: "student" } });
  res.json({ teachers, students });
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,  
      { expiresIn: '1h' }  
    );

    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

exports.createClassroom = async (req, res) => {
    const { class_name, startTime, endTime, days, teacherEmail } = req.body;
  
    try {
      const teacher = await prisma.user.findUnique({
        where: { email: teacherEmail },
      });
  
      if (!teacher || teacher.role !== 'teacher') {
        return res.status(400).json({ error: "Teacher not found or not a valid teacher" });
      }
  
      const classroom = await prisma.classroom.create({
        data: {
          class_name,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          days,  
          principalId: teacher.id,  
        },
      });
  
      res.json(classroom);
    } catch (error) {
      console.error("Error creating classroom:", error);
      res.status(500).json({ error: "An error occurred while creating the classroom" });
    }
  };
  

exports.getClassrooms = async (req, res) => {
  const classrooms = await prisma.classroom.findMany({
    include: {
      principal: true,
      timetables: true,
    },
  });
  res.json(classrooms);
};

exports.assignStudentToTeacher = async (req, res) => {
    const { studentEmail, teacherEmail } = req.body;
  
    try {
      const student = await prisma.user.findUnique({
        where: { email: studentEmail },
      });
  
      if (!student || student.role !== "student") {
        return res.status(400).json({ error: "Student not found or not a valid student" });
      }
  
      const teacher = await prisma.user.findUnique({
        where: { email: teacherEmail },
      });
  
      if (!teacher || teacher.role !== "teacher") {
        return res.status(400).json({ error: "Teacher not found or not a valid teacher" });
      }
  
      const updatedStudent = await prisma.user.update({
        where: { id: student.id },
        data: {
          teacher: { connect: { id: teacher.id } },
        },
      });
  
      res.json(updatedStudent);
    } catch (error) {
      console.error("Error assigning student to teacher:", error);
      res.status(500).json({ error: "An error occurred while assigning the student to the teacher" });
    }
  };
  