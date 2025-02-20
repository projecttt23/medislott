require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Use environment variables
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || '';

// Middleware
app.use(express.json()); // ✅ To handle JSON requests

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import Routes
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

// Use Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port ', port);
});