import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

function StudentDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:3000/api/student/users', {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }

        const data = await response.json();
        setStudents(data.students.filter(student => student.role === 'student'));
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Container>
      <Typography variant="h4" className="mt-10">Student Dashboard</Typography>
      <Typography variant="body1" className="mt-4">Welcome to the student's dashboard.</Typography>

      <Box mt={4}>
        <Typography variant="h6">Student List</Typography>
        <List>
          {students.map(student => (
            <ListItem key={student.id}>
              <ListItemText
                primary={student.name}
                secondary={`Email: ${student.email} | ID: ${student.id}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default StudentDashboard;
