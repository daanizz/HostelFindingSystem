const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    hostelID: { type: Number, required: true, unique: true }, // Explicit Hostel ID
    hostelname: { type: String, required: true },
    monthlyRent: { type: Number, required: true },
    facilities: { type: [String], required: true }, // Array to store multiple facilities
    location: { type: String, required: true },
    ContactNumber: { type: Number, required: true },
    numberOfRooms: { type: Number, required: true },
});

module.exports = mongoose.model("Hostel", hostelSchema);