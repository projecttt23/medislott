import React from 'react';

const SuccessPage = ({ onBookingSuccess }) => {
  return (
    <div>
      <h2>Appointment Confirmation</h2>
      <button onClick={onBookingSuccess}>Confirm Appointment</button>
    </div>
  );
};

export default SuccessPage;