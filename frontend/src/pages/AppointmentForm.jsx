import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
      </div>
      <div>
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
      </div>
      <div>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Problem:</label>
        <select name="problem" value={formData.problem} onChange={handleChange} required>
          <option value="">Select Problem</option>
          {problems.map((problem) => (
            <option key={problem} value={problem}>{problem}</option>
          ))}
        </select>
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default AppointmentForm;
