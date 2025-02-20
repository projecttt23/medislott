import React from 'react';

const SuccessPage = ({ formData, timeSlot, consultationMode, onBookingSuccess }) => {
  return (
    <div className="fs-container">
      <div className="card">
        <h2>Appointment Confirmation</h2>

        <div className="appointment-summary">
          <p><strong>Name:</strong> {formData.fullName}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Problem:</strong> {formData.problem}</p>
          <p><strong>Date:</strong> {formData.date || "Not specified"}</p>
          <p><strong>Time Slot:</strong> {timeSlot.startTime} - {timeSlot.endTime}</p>
          <p><strong>Consultation Mode:</strong> {consultationMode}</p>
        </div>

        <button className="primary-button" onClick={onBookingSuccess}>
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
