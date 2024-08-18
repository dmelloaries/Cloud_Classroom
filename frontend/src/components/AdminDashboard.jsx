import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  MenuItem,
  Box,
  CssBaseline,
  Drawer,
  ListItemIcon,
  Divider,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  GroupAdd as GroupAddIcon,
  Class as ClassIcon,
} from "@mui/icons-material";
import SaveAsIcon from "@mui/icons-material/SaveAs";

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#00308F",
    },
    secondary: {
      main: "#00308F",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          backgroundColor: "#00308F",
          "&:hover": {
            backgroundColor: "#002A6D",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#00308F",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
  },
});

import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher");
  const [selectedView, setSelectedView] = useState("createUser");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [classrooms, setClassrooms] = useState([]);

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [classroomId, setClassroomId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          navigate("/");
        } else if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTeachers(data.teachers);
        setStudents(data.students);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, [navigate]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/admin/classrooms",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        } else if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setClassrooms(data);
      } catch (error) {
        console.error("Failed to fetch classrooms:", error);
      }
    };
    if (selectedView === "classrooms") {
      fetchClassrooms();
    }
  }, [selectedView, navigate]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newUser = await response.json();
      if (role === "teacher") {
        setTeachers([...teachers, newUser]);
      } else {
        setStudents([...students, newUser]);
      }
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const handleAssignStudent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/admin/assign-student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            studentEmail: selectedStudent,
            teacherEmail: selectedTeacher,
          }),
        }
      );
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Student assigned successfully");
      setSelectedStudent("");
      setSelectedTeacher("");
    } catch (error) {
      console.error("Failed to assign student:", error);
    }
  };

  const handleCreateClassroom = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/admin/create-classroom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subject,
            startTime,
            endTime,
            teacherId,
            classroomId,
          }),
        }
      );
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newClassroom = await response.json();
      console.log("Classroom created:", newClassroom);
      setSubject("");
      setStartTime("");
      setEndTime("");
      setTeacherId("");
      setClassroomId("");
    } catch (error) {
      console.error("Failed to create classroom:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderTable = (data, title) => (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.id}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );

  const renderClassroomTable = () => (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Classrooms
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Teacher ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classrooms
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((classroom) => (
              <TableRow key={classroom.id}>
                <TableCell>{classroom.subject}</TableCell>
                <TableCell>
                  {new Date(classroom.startTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(classroom.endTime).toLocaleString()}
                </TableCell>
                <TableCell>{classroom.teacherId}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={classrooms.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );

  const renderContent = () => {
    switch (selectedView) {
      case "assignStudents":
        return (
          <>
            <Typography variant="h6">Assign Students to Teachers</Typography>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Box
                  component="form"
                  onSubmit={handleAssignStudent}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <TextField
                    select
                    label="Select Teacher"
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    fullWidth
                    required
                  >
                    {teachers.map((teacher) => (
                      <MenuItem key={teacher.id} value={teacher.email}>
                        {teacher.name} - {teacher.email}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Select Student"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    fullWidth
                    required
                  >
                    {students.map((student) => (
                      <MenuItem key={student.id} value={student.email}>
                        {student.name} - {student.email}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ alignSelf: "flex-end" }}
                  >
                    Assign Student
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </>
        );

      case "teachers":
        return renderTable(teachers, "Teachers");
      case "students":
        return renderTable(students, "Students");
      case "classrooms":
        return renderClassroomTable();
      case "createClassroom":
        return (
          <>
            <Typography variant="h6">Create New Classroom</Typography>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Box
                  component="form"
                  onSubmit={handleCreateClassroom}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Subject"
                        variant="outlined"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Start Time"
                        variant="outlined"
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="End Time"
                        variant="outlined"
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Teacher ID"
                        variant="outlined"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Classroom ID"
                        variant="outlined"
                        value={classroomId}
                        onChange={(e) => setClassroomId(e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ alignSelf: "flex-end" }}
                  >
                    Create Classroom
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </>
        );
      default:
        return (
          <>
            <Typography variant="h6">Create New User</Typography>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Box
                  component="form"
                  onSubmit={handleCreateUser}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <TextField
                    select
                    label="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                  </TextField>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ alignSelf: "flex-end" }}
                  >
                    Create User
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  const drawer = (
    <div>
      <Typography variant="h5" align="center" sx={{ m: 2 }}>
        Principal
      </Typography>
      <Divider />

      <ListItem button onClick={() => setSelectedView("dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      {/* <ListItem button onClick={() => setSelectedView("AssignStudents")}>
        <ListItemIcon>
          <SaveAsIcon></SaveAsIcon>
        </ListItemIcon>
        <ListItemText primary="Assign Students" />
      </ListItem> */}

      <ListItem
        button
        onClick={() => setSelectedView("assignStudents")}
        selected={selectedView === "assignStudents"}
      >
        <ListItemIcon>
          <SaveAsIcon />
        </ListItemIcon>
        <ListItemText primary="Assign Students" />
      </ListItem>

      <List>
        <ListItem
          button
          onClick={() => setSelectedView("createUser")}
          selected={selectedView === "createUser"}
        >
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create User" />
        </ListItem>
        <ListItem
          button
          onClick={() => setSelectedView("teachers")}
          selected={selectedView === "teachers"}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Teachers" />
        </ListItem>
        <ListItem
          button
          onClick={() => setSelectedView("students")}
          selected={selectedView === "students"}
        >
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
        <ListItem
          button
          onClick={() => setSelectedView("createClassroom")}
          selected={selectedView === "createClassroom"}
        >
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create Classroom" />
        </ListItem>
        <ListItem
          button
          onClick={() => setSelectedView("classrooms")}
          selected={selectedView === "classrooms"}
        >
          <ListItemIcon>
            <ClassIcon />
          </ListItemIcon>
          <ListItemText primary="Classrooms" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#1e1e1e",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            color: "text.primary",
          }}
        >
          <Container maxWidth="md">{renderContent()}</Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminDashboard;
