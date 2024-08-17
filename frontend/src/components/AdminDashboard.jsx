import { useState, useEffect } from 'react';
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
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  GroupAdd as GroupAddIcon,
  Class as ClassIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    primary: {
      main: '#00308F', 
    },
    secondary: {
      main: '#00308F',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', 
          backgroundColor: '#00308F', 
          '&:hover': {
            backgroundColor: '#002A6D',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#00308F',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', 
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
  },
});

function AdminDashboard() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher');
  const [selectedView, setSelectedView] = useState('createUser');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTeachers(data.teachers);
        setStudents(data.students);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/admin/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const newUser = await response.json();
      if (role === 'teacher') {
        setTeachers([...teachers, newUser]);
      } else {
        setStudents([...students, newUser]);
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Failed to create user:', error);
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
            <TableCell>Email</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
            <TableRow key={user.id}>
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

  const renderContent = () => {
    switch (selectedView) {
      case 'teachers':
        return renderTable(teachers, 'Teachers');
      case 'students':
        return renderTable(students, 'Students');
      case 'classrooms':
        return <Typography variant="h6">Classroom List (Coming Soon)</Typography>;
      case 'createUser':
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
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Role"
                        variant="outlined"
                        select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        fullWidth
                        required
                      >
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2 }}
                      >
                        Create User
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Typography variant="h5" align="center" sx={{ m: 2 }}>
            Admin Panel
          </Typography>
          <Divider />
          <List>
            <ListItem button onClick={() => setSelectedView('dashboard')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => setSelectedView('teachers')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Teachers" />
            </ListItem>
            <ListItem button onClick={() => setSelectedView('students')}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </ListItem>
            <ListItem button onClick={() => setSelectedView('createUser')}>
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary="Create User" />
            </ListItem>
            <ListItem button onClick={() => setSelectedView('classrooms')}>
              <ListItemIcon>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText primary="Classrooms" />
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Container>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Admin Dashboard
            </Typography>
            {renderContent()}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminDashboard;
