const prisma = require('../utils/prismaClient');

exports.getAllUsers = async (req, res) => {
  const teachers = await prisma.user.findMany({ where: { role: 'teacher' } });
  const students = await prisma.user.findMany({ where: { role: 'student' } });
  res.json({ teachers, students });
};

exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await prisma.user.create({
    data: { email, password, role },
  });
  res.json(user);
};
