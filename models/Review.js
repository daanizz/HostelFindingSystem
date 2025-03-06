const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewID: { type: Number, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
    hostelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true }, 
    rating: { type: Number, required: true, min: 1, max: 5 },  
    date: { type: Date, default: Date.now },  
    comment: { type: String, required: false }  
});

module.exports = mongoose.model('Review', reviewSchema);
