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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;