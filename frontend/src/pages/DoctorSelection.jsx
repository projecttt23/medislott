import React, { useEffect, useState } from 'react';

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
    <div>
      <h2>Select Doctor</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            <button onClick={() => onDoctorSelect(doctor._id)}>
              Dr. {doctor.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorSelection;