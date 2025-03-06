const express = require('express');
const { getAllReservations, deleteReservation } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../config/auth');
const router = express.Router();

router.get('/reservations', authMiddleware, adminMiddleware, getAllReservations);
router.delete('/reservations/:id', authMiddleware, adminMiddleware, deleteReservation);

module.exports = router;