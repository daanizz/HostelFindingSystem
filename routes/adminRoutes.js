const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.post('/addHostel', adminController.addHostel); // POST request for adding Hostel