const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const reserveController = require('../controllers/reserveController');
const { render } = require('ejs');

// Homepage route
router.get('/', userController.getHomepage);

// Search page route
router.get('/search', userController.getSearchPage);
router.get('/searchfind', userController.searchHostels);

// Annex Hostel page route
router.get('/annex', userController.getAnnexPage);

router.get('/homepage', async (req, res) => {
    res.render('homepage');
});

// Taibha Hostel page route
router.get('/taibha', userController.getTaibhaPage);

// My Reserves page route
router.get('/my-reserves', userController.getMyReservesPage);

// Login page route
router.get('/login', userController.getLoginPage);

// Contact Us page route
router.get('/contact-us', userController.getContactUsPage);

// Route to handle reservation
router.post('/reserv', reserveController.reserve);

router.post('/cancel-reservation', userController.cancelReservation);

module.exports = router;