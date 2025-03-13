const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/auth/login', authController.login);

router.get('/', (req,res) =>{
    res.render('login');
});

// Sign up route
router.post('/auth/sign_up', authController.signUp);

module.exports = router;
