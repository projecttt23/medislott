const express = require("express");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const axios = require("axios");
const router = express.Router();

// Configure API key authorization for Brevo (Sendinblue)
// Brevo API Key & URL
const apiKey = process.env.BREVO_API;
const url = 'https://api.brevo.com/v3/smtp/email'; // Brevo SMTP API endpoint

// 📌 1️⃣ Book an Appointment
router.post("/book", async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, age, gender, phoneNumber, email, doctorId, date, timeSlot, consultationMode, problem } = req.body;

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
      problem, // New problem field
    });

    await appointment.save();

    const formattedDate = new Date(date).toLocaleDateString('en-GB');
    // Prepare email content for the patient
    const emailData = {
      sender: {
        name: "Your Health Team",
        email: "testteammce@gmail.com",  // Replace with your verified Brevo email
      },
      to: [
        {
          email: email,  // Patient's email
          name: fullName,
        }
      ],
      subject: "Appointment Confirmation",
      htmlContent: `
        <h3>Dear ${fullName},</h3>
        <p>Your appointment with Dr. ${doctor.name} has been successfully booked.</p>
        <p><strong>Appointment Details:</strong><br>
        Doctor: Dr. ${doctor.name}<br>
        Date: ${formattedDate}<br>  <!-- Use the formatted date -->
        Time: ${timeSlot.startTime} to ${timeSlot.endTime}<br>
        Consultation Mode: ${consultationMode}</p>
        <p>We look forward to seeing you soon!</p>
        <p>Best Regards,<br>Your Health Team</p>
      `
    };

    // Send the email using Brevo API via axios
    const response = await axios.post(url, emailData, {
      headers: {
        'Content-Type': 'application/json',
        'api-Key': apiKey,  // Replace with your API key
      }
    });

    console.log('Email sent successfully:', response.data);

    res.status(201).json({ message: "Appointment booked successfully", appointmentId: appointment._id });
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message);
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
