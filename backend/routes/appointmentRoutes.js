const express = require("express");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");



const router = express.Router();

router.post("/book", async (req, res) => {
    try {
      const { fullName, age, gender, phoneNumber, email, doctorId, date, timeSlot,consultationMode } = req.body;
  
      // Check if doctor exists
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  
      // 🛑 Check if time slot is already booked
      const isBooked = await Appointment.findOne({
        doctor: doctorId,
        date,
        "timeSlot.startTime": timeSlot.startTime,
        "timeSlot.endTime": timeSlot.endTime,
      });
  
      if (isBooked) {
        return res.status(400).json({ message: "Time slot already booked" });
      }
  
      // Create appointment
      const appointment = new Appointment({
        fullName,
        age,
        gender,
        phoneNumber,
        email,
        doctor: doctorId,
        date,
        timeSlot,
        consultationMode,
      });
  
      await appointment.save();
  
      res.status(201).json({ message: "Appointment booked successfully", appointmentId: appointment._id });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });


// 📌 2️⃣ Get Appointments for a Specific Doctor
router.get("/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Find appointments for the doctor
    const appointments = await Appointment.find({ doctor: doctorId });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📌 3️⃣ Get All Appointments (With Doctor Details)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctor", "name email hospital role");

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;