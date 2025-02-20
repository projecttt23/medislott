import React, { useState } from 'react';
import AppointmentForm from './pages/AppointmentForm';
import DoctorSelection from './pages/DoctorSelection';
import TimeSlotSelection from './pages/TimeSlotSelection';
import SuccessPage from './pages/SuccessPage';

const App = () => {
  const [step, setStep] = useState(1); // Track the current step
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    phoneNumber: '',
    email: '',
    problem: '',
    doctorId: null, // Corrected from 'doctor' to 'doctorId'
    date: '',
  });

  const [timeSlot, setTimeSlot] = useState({
    startTime: '',
    endTime: ''
  });

  const [consultationMode, setConsultationMode] = useState('');

  const handleFormSubmit = (data) => {
    setFormData({ ...formData, ...data });
    setStep(2); // Move to the next step
  };

  const handleDoctorSelect = (doctorId) => {
    setFormData({ ...formData, doctorId });
    setStep(3); // Move to time slot selection
  };

  const handleTimeSlotSelect = (date, startTime, endTime) => {
    setFormData({
      ...formData,
      date, // Pass the date
    });
    setTimeSlot({
      startTime,
      endTime
    });
  };

  const handleConsultationModeSelect = (mode) => {
    setConsultationMode(mode);
  };

  const handleBookingSuccess = () => {
    if (!formData.date || !timeSlot.startTime || !consultationMode) {
      alert("Please select both time slot and consultation mode!");
      return;
    }

    fetch('http://localhost:4000/api/appointments/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timeSlot, // Ensure timeSlot is included
        consultationMode
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Appointment booked successfully') {
          setStep(5); // Go to success page if booking is successful
        }
      })
      .catch((error) => {
        console.error('Error booking appointment:', error);
      });
  };

  // This function will be passed down to TimeSlotSelection to move to next step
  const handleNext = () => {
    if (timeSlot.startTime && consultationMode) {
      setStep(4); // Move to the confirmation step
    } else {
      alert("Please select both time slot and consultation mode!");
    }
  };

  return (
    <div>
      {step === 1 && <AppointmentForm onFormSubmit={handleFormSubmit} />}
      {step === 2 && <DoctorSelection formData={formData} onDoctorSelect={handleDoctorSelect} />}
      {step === 3 && (
        <TimeSlotSelection
          formData={formData}
          onTimeSlotSelect={handleTimeSlotSelect}
          onConsultationModeSelect={handleConsultationModeSelect}
          onNext={handleNext}  // Pass the handleNext function here
        />
      )}
      {step === 4 && <SuccessPage onBookingSuccess={handleBookingSuccess} />}
      {step === 5 && <div>Appointment booked successfully! Thank you.</div>}
    </div>
  );
};

export default App;
