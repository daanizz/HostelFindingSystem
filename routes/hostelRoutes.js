const express = require('express');
const { addHostel, getHostels, deleteHostel } = require('../controllers/HostelController');
const { authMiddleware, adminMiddleware } = require('../config/auth');
const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, addHostel);
router.get('/', getHostels);
router.delete('/:id', authMiddleware, adminMiddleware, deleteHostel);

module.exports = router;