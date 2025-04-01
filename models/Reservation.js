const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    reservationID: { type: Number, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hostelId: { type: mongoose.Schema.Types.Number, ref: 'Hostel', required: true },
    reservationdate: { type: Date, default: Date.now },
    status: { 
        type: String, 
        enum: ["pending", "confirmed", "cancelled"], 
        default: "pending" 
    }
});

module.exports = mongoose.model("Reservation", reservationSchema);