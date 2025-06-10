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

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
const passport = require('../config/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { render } = require('ejs');

// Auth check endpoint
router.get('/check', (req, res) => {
    res.json({ authenticated: !!req.user || !!req.session.user });
});

// Login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).send(info.message);
        
        req.logIn(user, (err) => {
            if (err) return next(err);
            // Explicitly save session
            req.session.save(() => {
                return res.status(200).send('Login successful');
            });
        });
    })(req, res, next);
});

// Signup route
router.post('/sign_up', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already registered');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        
        // Automatically log in the user after registration
        req.login(newUser, (err) => {
            if (err) {
                console.error('Auto login error:', err);
                return res.status(500).send('Registration successful but login failed');
            }
            req.session.save(() => {
                return res.status(201).send('Registration and login successful');
            });
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).send('Registration failed');
    }
});

// Logout route
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('Logout failed');
        }
        res.redirect('/login');
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.status(200).send('Logout successful');
        });
    });
});

module.exports = router;