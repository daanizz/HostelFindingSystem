const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Submit a review
router.post('/', reviewController.createReview);

// Fetch reviews for a specific hostel
router.get('/', reviewController.getReviews);

// New route for deleting a review
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;