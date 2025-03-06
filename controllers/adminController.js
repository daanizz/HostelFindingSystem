const Reservation = require('../models/Reservation');
const Hostel = require('../models/Hostel');

// Get all reservations with user and hostel details
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('userId hostelId');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update reservation status (pending, confirmed, canceled)
const updateReservationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.json({ message: "Reservation status updated", reservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Reservation deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all hostels
const getAllHostels = async (req, res) => {
    try {
        const hostels = await Hostel.find();
        res.json(hostels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a hostel
const deleteHostel = async (req, res) => {
    try {
        await Hostel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Hostel deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    getAllReservations, 
    updateReservationStatus, 
    deleteReservation, 
    getAllHostels, 
    deleteHostel 
};
