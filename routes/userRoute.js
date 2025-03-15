const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Homepage route
router.get('/', userController.getHomepage);

// Search page route
router.get('/search', userController.getSearchPage);

// Annex Hostel page route
router.get('/annex', userController.getAnnexPage);

// Taibha Hostel page route
router.get('/taibha', userController.getTaibhaPage);

// My Reserves page route
router.get('/my-reserves', userController.getMyReservesPage);

// Login page route
router.get('/login', userController.getLoginPage);

// Contact Us page route
router.get('/contact-us', userController.getContactUsPage);

module.exports = router;