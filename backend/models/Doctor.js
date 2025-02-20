const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    
    hospital: {
        name: { type: String, required: true }, // Hospital Name
        address: { type: String, required: true }, // Street Address
        area: { type: String, required: true }, // Locality/Area
        city: { type: String, required: true }, // City
        state: { type: String, required: true }, // State
        pincode: { type: String, required: true } // Pincode/ZIP Code
    },

    photo: { type: String }, // Optional Photo URL
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    keywords: { type: [String], required: true } 
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);