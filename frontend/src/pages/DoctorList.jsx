import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/doctors");
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  const handleBookAppointment = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  return (
    <div className="doctor-list">
      <h1>List of Doctors</h1>
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <div className="doctor-header">
            
              <div className="profile-photo">
                {doctor.photo ? (
                  <img src={doctor.photo} alt={`${doctor.name}'s profile`} />
                ) : (
                  <div className="profile-logo">👨‍⚕️</div> // Default logo if no photo is provided
                )}
              </div>
              <h3>{doctor.name}</h3>
              <p><strong>Role:</strong> {doctor.role}</p>
            </div>
            <div className="doctor-details">
              <p><strong>Hospital:</strong> {doctor.hospital.name}</p>
              <p><strong>Location:</strong> {doctor.hospital.address}, {doctor.hospital.city}, {doctor.hospital.state}</p>
              <p><strong>Specializations:</strong> {doctor.keywords.join(", ")}</p>
            </div>
            <button onClick={() => handleBookAppointment(doctor._id)}>
              Book Appointment
            </button>
          </div>
        ))
      ) : (
        <p>No doctors available.</p>
      )}
    </div>
  );
};

export default DoctorList;
