# Classroom Management Website

A full-stack web application designed to manage a classroom environment with different user roles: Principal, Teacher, and Student.

## Features

### User Types and Their Roles

- **Principal**
  - Can create classrooms and assign teachers to those classrooms.
  - Can assign students to teachers.
  - Can create accounts for teachers and students.
  
- **Teacher**
  - Assigned to a single classroom by the Principal.
  - Can create a timetable for the assigned classroom.
  - Can create accounts for students.
  
- **Student**
  - Multiple students can belong to a single classroom.
  - Students can view their assigned timetable.

### Login/Signup Process

- **Principal**
  - A default principal account is created on app initialization with the following credentials:
    - **Email**: `principal@classroom.com`
    - **Password**: `Admin`
  - The Principal can create accounts for teachers and students.

- **Teacher**
  - Teachers can log in to the app using credentials provided by the Principal.
  - Teachers can create timetables and manage student accounts.

- **Student**
  - Students can log in using credentials provided by either the Principal or their assigned Teacher.
  

