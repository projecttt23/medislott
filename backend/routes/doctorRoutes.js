const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey123"; // Change in production

// 📌 1️⃣ Register a Doctor  
router.post("/register", async (req, res) => {
  try {
    const { name, role, email, password, hospital, photo, keywords } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) return res.status(400).json({ message: "Doctor already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor
    const newDoctor = new Doctor({
      name,
      role,
      email,
      password: hashedPassword,
      hospital,
      photo,
      keywords,
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📌 2️⃣ Doctor Login (Generates Token)  
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate Token
    const token = jwt.sign({ doctorId: doctor._id }, SECRET_KEY, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token, doctorId: doctor._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📌 3️⃣ Get All Doctors  
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find({}, "-password"); // Exclude password field
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📌 4️⃣ Get Specific Doctor by ID (With Appointments)  
router.get("/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Fetch doctor details
    const doctor = await Doctor.findById(doctorId, "-password");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Fetch doctor's appointments
    const appointments = await Appointment.find({ doctor: doctorId });

    res.status(200).json({ doctor, appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📌 5️⃣ Get Doctor’s Own Appointments (Requires Auth)  
router.get("/appointments/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await Appointment.find({ doctor: doctorId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📌 6️⃣ Remove a Doctor by Email  
router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const deletedDoctor = await Doctor.findOneAndDelete({ email });
    if (!deletedDoctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ message: "Doctor removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;