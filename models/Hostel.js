// models/Hostel.js
const mongoose = require('mongoose');

// models/Hostel.js
const hostelSchema = new mongoose.Schema({
    hostelID: { type: Number, required: true, unique: true },
    hostelname: { type: String, required: true },
    monthlyRent: { type: Number, required: true },
    facilities: { type: [String], required: true },
    location: { type: String, required: true },
    ContactNumber: { type: Number, required: true },
    numberOfRooms: { type: Number, required: true },
    availableRooms: { type: Number, required: true },
    images: { type: [String], required: true },
    description: { type: String, required: true },
    amenities: { type: [String], required: true }
});

module.exports = mongoose.model("Hostel", hostelSchema);