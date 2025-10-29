import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import StudentDashboard from './pages/Student/Dashboard';
import StudentClasses from './pages/Student/FindClass';
import RequestClass from './pages/Student/RequestClass';
import { Toaster } from './component/ui/toaster';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;