// frontend/src/pages/StudentPage.jsx
import AdminNavbar from '../components/AdminNavbar';

import StudentDashboard from '../components/StudentDashboard';

function StudentPage() {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <StudentDashboard />
    </>
  );
}

export default StudentPage;
