const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");

const {
  authenticateToken,
  authorizeAdmin,
  authorizeTeacher,
  authorizeStudent,
} = require("./middlewares/authorization");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/admin", authenticateToken, authorizeAdmin, adminRoutes);
app.use("/api/teacher", authenticateToken, authorizeTeacher, teacherRoutes);
app.use("/api/student", authenticateToken, authorizeStudent, studentRoutes);

module.exports = app;
