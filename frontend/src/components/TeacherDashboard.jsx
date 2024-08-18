import React, { useState, useEffect } from 'react';
import { Container, Typography, Drawer, List, ListItem, ListItemText, Box, Card, CardContent, Grid } from '@mui/material';

function TeacherDashboard() {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Dashboard');

  useEffect(() => {
    
    const fetchData = async () => {
      const token = localStorage.getItem("token"); 

      try {
        const response = await fetch('https://cloud-classroom.onrender.com/api/teacher/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setClassrooms(data.classrooms);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const menuItems = [
    
    'Classrooms',
    'Create Timetable',
    'Timetables',
  ];

  const handleMenuClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={index} onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" className="mt-10">Teacher Dashboard</Typography>

        {selectedOption === 'Classrooms' && (
          <Box>
            <Typography variant="h6" className="mt-6 mb-4">Classrooms</Typography>
            <Grid container spacing={3}>
              {classrooms.map((classroom, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{classroom.class_name}</Typography>
                      <Typography variant="subtitle1">Students:</Typography>
                      {classroom.students.length > 0 ? (
                        <List>
                          {classroom.students.map((student) => (
                            <ListItem key={student.id}>
                              <ListItemText
                                primary={student.name}
                                secondary={student.email}
                              />
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography variant="body2">No students enrolled.</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {selectedOption !== 'Classrooms' && (
          <Typography variant="body1" className="mt-4">
            Welcome to the teacher's dashboard. Please select an option from the sidebar.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default TeacherDashboard;
