const Review = require('../models/Review');
const User = require('../models/User');

exports.createReview = async (req, res) => {
    console.log('Session in createReview:', req.session); // Debug session
    console.log('Request body:', req.body); // Debug request body
    if (!req.session.user) {
        return res.status(401).json({ error: 'User not logged in.' });
    }

    // Check if user is logged in
    if (!req.session.user) {
        return res.status(401).json({ error: 'User not logged in.' });
    }

    const { hostelID, rating, comment } = req.body;
    const userID = req.session.user._id; // Ensure the user is logged in

    try {
        // Validate required fields
        if (!hostelID || !rating || !comment) {
            return res.status(400).json({ error: 'All fields (hostelID, rating, comment) are required.' });
        }

        // Validate hostelID (ensure it's a number)
        if (isNaN(hostelID)) {
            return res.status(400).json({ error: 'Invalid hostelID. It must be a number.' });
        }

        // Convert hostelID to a number (if it's passed as a string)
        const numericHostelID = Number(hostelID);

        // Validate rating (ensure it's between 1 and 5)
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
        }

        // Check if the user has already reviewed this hostel
        const existingReview = await Review.findOne({ userID, hostelID: numericHostelID });
        if (existingReview) {
            return res.status(400).json({ error: 'You have already reviewed this hostel.' });
        }

        // Create and save the review
        const review = new Review({
            userID,
            hostelID: numericHostelID, // Ensure hostelID is a number
            rating,
            comment,
        });
        await review.save();

        // Populate the user's name for the response
        const populatedReview = await Review.findById(review._id).populate('userID', 'name');
        res.status(201).json(populatedReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
// 
// Fetch reviews for a specific hostel
exports.getReviews = async (req, res) => {
    const { hostelID } = req.query;

    try {
        // Validate hostelID (ensure it's provided and is a number)
        if (!hostelID || isNaN(hostelID)) {
            return res.status(400).json({ error: 'Invalid hostelID. It must be a number.' });
        }

        // Convert hostelID to a number (if it's passed as a string)
        const numericHostelID = Number(hostelID);

        // Fetch reviews, populate the user's name, and sort by timestamp (newest first)
        const reviews = await Review.find({ hostelID: numericHostelID })
            .populate('userID', 'name') // Populate user details
            .sort({ timestamp: -1 }); // Sort by timestamp in descending order (newest first)

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a review by ID (only the owner can delete)
exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params; // Review ID from the URL
    const userId = req.session.user?._id; // Logged-in user ID from the session

    try {
        // Check if the user is logged in
        if (!userId) {
            return res.status(401).json({ error: 'User not logged in.' });
        }

        // Find the review in the database
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found.' });
        }

        // Check if the logged-in user is the owner of the review
        if (review.userID.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete this review.' });
        }

        // Delete the review
        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Server error.' });
    }
};