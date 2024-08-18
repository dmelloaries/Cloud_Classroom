const prisma = require('../utils/prismaClient');

exports.getStudentDashboard = async (req, res) => {
  res.json({ message: "Student Dashboard" });
};


//get all students list 
exports.getAllUsers = async (req, res) => {
    
    const students = await prisma.user.findMany({ where: { role: "student" } });
    res.json({  students });
  };
  