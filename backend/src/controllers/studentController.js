const prisma = require('../utils/prismaClient');

exports.getStudentDashboard = async (req, res) => {
  res.json({ message: "Student Dashboard" });
};
