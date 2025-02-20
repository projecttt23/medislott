import React, { useEffect, useState } from 'react';
import '../App.css'; // Ensure your CSS is applied properly

const DoctorSelection = ({ formData, onDoctorSelect }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await fetch('http://localhost:4000/api/doctors');
      const data = await response.json();
      setDoctors(data.filter((doctor) => doctor.keywords.includes(formData.problem)));
    };
    fetchDoctors();
  }, [formData.problem]);

  return (
    <div className="fs-container">
      <div className="card">
        <h2>Select Doctor</h2>
        <div className="doctor-cards">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="doctor-card" onClick={() => onDoctorSelect(doctor._id)}>
              <div className="doctor-photo">
                <img src={doctor.photo} alt={doctor.name} />
              </div>
              <div className="doctor-info">
                <h3>Dr. {doctor.name}</h3>
                <p>Role: {doctor.role}</p>
                <p>Hospital: {doctor.hospital.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSelection;
