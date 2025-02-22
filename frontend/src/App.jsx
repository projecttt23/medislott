import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';  // Import Home (Appointment Booking Flow)
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppointmentsPage from './pages/AppointmentsPage';
import DoctorList from './pages/DoctorList';
import HomePage from './pages/HomePage'
import "../src/App.css";

const App = () => {
  return (
    <Router>
      
      <Routes>
        {/* Add Route for Home */}
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<Home />} />

        {/* Routes for Login, Register, Appointments */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/doctor-list" element={<DoctorList />} />
      </Routes>
    </Router>
  );
};

export default App;
