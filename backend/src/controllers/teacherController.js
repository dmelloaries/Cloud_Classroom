const prisma = require('../utils/prismaClient');


exports.getTeacherDashboard = async (req, res) => {
  res.json({ message: "Teacher Dashboard" });
};
