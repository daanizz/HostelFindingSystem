const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  hostelID: { type: Number, required: true }, // Reference to Hostel
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating (1-5)
  comment: { type: String, required: true }, // Review comment
  timestamp: { type: Date, default: Date.now }, // Timestamp of the review
});

// Add a unique compound index to ensure one review per user per hostel
reviewSchema.index({ userID: 1, hostelID: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);