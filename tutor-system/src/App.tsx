import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import StudentDashboard from './pages/Student/Dashboard';
import StudentClasses from './pages/Student/FindClass';
import RequestClass from './pages/Student/RequestClass';
import { Toaster } from './component/ui/toaster';
import { StudentClassDetail } from './pages/Student/ClassDetail';
import StudentSchedule from './pages/Student/Schedule';
import StudentMyClasses from './pages/Student/MyClass';
import TuTorDashboard from './pages/Tutor/DashBoard';
import TutorMyClasses from './pages/Tutor/MyClass';
import CreateClass from './pages/Tutor/CreateClass';
import TutorSchedule from './pages/Tutor/Schedule';
import { TutorClassDetail } from './pages/Tutor/ClassDetail';
import ViewClassReport from './pages/Tutor/ClassReport';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminRequests from './pages/Admin/Request';
import AdminClassReports from './pages/Admin/ClassReport';
import AdminClasses from './pages/Admin/Classes';

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/classes" element={<StudentClasses />} />
          <Route path="/student/request" element={<RequestClass />} />
          <Route path="/student/classes/:id" element={<StudentClassDetail />} />
          <Route path="/student/schedule" element={<StudentSchedule />} />
          <Route path="/student/my-classes" element={<StudentMyClasses />} />
          <Route path="/tutor/dashboard" element={<TuTorDashboard />} />
          <Route path="/tutor/classes" element={<TutorMyClasses />} />
          <Route path="/tutor/create-class" element={<CreateClass />} />
          <Route path="/tutor/schedule" element={<TutorSchedule />} />
          <Route path="/tutor/classes/:id" element={<TutorClassDetail />} />
          <Route path="/tutor/reports" element={<ViewClassReport />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/admin/reports" element={<AdminClassReports />} />
          <Route path="/admin/classes" element={<AdminClasses />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;