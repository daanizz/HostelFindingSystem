const express = require('express');
const { reserveHostel, getMyReservations, cancelReservation } = require('../controllers/reserveController');
const { authMiddleware } = require('../config/auth');
const router = express.Router();

router.post('/', authMiddleware, reserveHostel);
router.get('/my', authMiddleware, getMyReservations);
router.delete('/:id', authMiddleware, cancelReservation);

module.exports = router;