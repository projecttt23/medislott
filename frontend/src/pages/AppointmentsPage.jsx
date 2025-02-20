import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    if (!doctorId) {
      navigate("/login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/appointments/${doctorId}`);
        setAppointments(response.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, [doctorId, navigate]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("doctorId");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="appointments-page">
      <h2>Your Appointments</h2>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="books-table">
          <div className="books-table-header">
            <div>Patient Name</div>
            <div>Date</div>
            <div>Time Slot</div>
            <div>Problem</div>
            <div>Consultation Mode</div>
          </div>
          <div className="books-table-body">
            {appointments.map((appointment) => (
              <div className="books-table-row" key={appointment._id}>
                <div>{appointment.fullName}</div>
                <div>{new Date(appointment.date).toLocaleDateString()}</div>
                <div>
                  {appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}
                </div>
                <div>{appointment.problem}</div>
                <div>{appointment.consultationMode}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
