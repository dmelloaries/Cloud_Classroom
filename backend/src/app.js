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

app.use(
  cors({
    origin: ["http://localhost:5173","https://cloud-classroom-frontend-c9hd.onrender.com"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use("/",(req,res)=>{
    res.json("server is alive");
})

app.use("/api/auth", authRoutes);

app.use("/api/admin", authenticateToken, authorizeAdmin, adminRoutes);
app.use("/api/teacher", authenticateToken, authorizeTeacher, teacherRoutes);
app.use("/api/student", authenticateToken, authorizeStudent, studentRoutes);

module.exports = app;
