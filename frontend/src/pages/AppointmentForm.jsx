import React, { useState } from 'react';
import '../App.css'; // Make sure your CSS is applied properly

const AppointmentForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    phoneNumber: '',
    email: '',
    problem: '',
  });

  const problems = [
    'Fever', 'Cough', 'Headache', 'Skin Rash', 'Stomach Ache', 'Cold',
    'Body Pain', 'Sore Throat', 'Fatigue', 'Chest Pain', 'Shortness of Breath',
    'Nausea', 'Vomiting', 'Dizziness', 'Diarrhea', 'Constipation', 'High Blood Pressure',
    'Back Pain', 'Joint Pain', 'Allergies',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <div className="fs-container">
      <div className="card scrollable-container">
        <h2>Appointment Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              className="input-text"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              className="input-text"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
              className="dropdown"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              className="input-text"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              className="input-text"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Problem:</label>
            <select
              className="dropdown"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
            >
              <option value="">Select Problem</option>
              {problems.map((problem) => (
                <option key={problem} value={problem}>{problem}</option>
              ))}
            </select>
          </div>
          <button className="primary-button" type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
