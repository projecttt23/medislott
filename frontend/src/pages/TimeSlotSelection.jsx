import React, { useState } from 'react';

const TimeSlotSelection = ({ onTimeSlotSelect, onConsultationModeSelect, formData, onNext }) => {
  const timeSlots = [
    { label: '10:30AM to 11:00AM', value: '10:30AM-11:00AM' },
    { label: '11:30AM to 12:00PM', value: '11:30AM-12:00PM' },
    { label: '4:00PM to 4:30PM', value: '4:00PM-4:30PM' },
    { label: '4:30PM to 5:00PM', value: '4:30PM-5:00PM' },
    { label: '5:30PM to 6:00PM', value: '5:30PM-6:00PM' },
  ];

  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState(formData.date || ''); // Ensure the initial date is not empty
  const [consultationMode, setConsultationMode] = useState('');

  const handleTimeSlotChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedTimeSlot(selectedValue);

    // Parse start and end times
    const [startTime, endTime] = selectedValue.split('-');
    onTimeSlotSelect(selectedDate, startTime.trim(), endTime.trim());  // Pass selected date, start, and end times
  };

  const handleConsultationModeChange = (e) => {
    const mode = e.target.value;
    setConsultationMode(mode);
    onConsultationModeSelect(mode);  // Pass consultation mode to parent
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);  // Update the date
    if (selectedTimeSlot) {
      const [startTime, endTime] = selectedTimeSlot.split('-');
      onTimeSlotSelect(date, startTime.trim(), endTime.trim());  // Update with new date, preserve selected time
    }
  };

  // Enable the Next button only if both timeSlot and consultationMode are selected
  const isNextEnabled = selectedTimeSlot && consultationMode;

  return (
    <div className="fs-container">
      <div className="card">
        <h2>Select Date and Time Slot</h2>

        {/* Date Picker */}
        <div>
          <label>Select Date: </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        {/* Time Slot Selection */}
        <div>
          <label style={{ marginTop: '12px' }}>Available Time Slots</label>
          <div>
            {timeSlots.map((slot, index) => (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    name="timeSlot"
                    value={slot.value}
                    checked={selectedTimeSlot === slot.value}
                    onChange={handleTimeSlotChange}
                  />
                  {slot.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Mode Selection */}
        <div>
          <label style={{ marginTop: '16px' }}>Select Consultation Mode</label>
          <div>
            <label>
              <input
                type="radio"
                name="consultationMode"
                value="Online"
                checked={consultationMode === 'Online'}
                onChange={handleConsultationModeChange}
              />
              Online
            </label>
            <label >
              <input
                type="radio"
                name="consultationMode"
                value="In-person"
                checked={consultationMode === 'In-person'}
                onChange={handleConsultationModeChange}
              />
              In-person
            </label>
          </div>
        </div>

        {/* Next Button */}
        <div>
          <button
            className="primary-button"
            onClick={onNext}
            disabled={!isNextEnabled}  // Disable if either timeSlot or consultationMode is not selected
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelection;
