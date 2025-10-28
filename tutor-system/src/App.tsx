import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import StudentDashboard from './pages/Student/Dashboard';
import StudentClasses from './pages/Student/FindClass';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/classes" element={<StudentClasses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;