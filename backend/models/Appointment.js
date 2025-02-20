const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: Date, required: true },  // Only the date, no time
  timeSlot: {
    startTime: { type: String, required: true },  // Store as Date (but only time part)
    endTime: { type: String, required: true }
  },
  consultationMode: { type: String, required: true, enum: ["Online", "In-person"] }
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;