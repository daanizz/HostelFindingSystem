const Reservation = require('../models/Reservation');
const Hostel = require('../models/Hostel');

const reserveHostel = async (req, res) => {
    const { hostelId } = req.body;
    try {
        const hostel = await Hostel.findById(hostelId);
        if (!hostel || hostel.remainingRooms <= 0) {
            return res.status(400).json({ message: 'No rooms available' });
        }
        const reservation = new Reservation({ userId: req.user.id, hostelId });
        await reservation.save();
        hostel.remainingRooms -= 1;
        await hostel.save();
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMyReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ userId: req.user.id }).populate('hostelId');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        const hostel = await Hostel.findById(reservation.hostelId);
        hostel.remainingRooms += 1;
        await hostel.save();
        await reservation.remove();
        res.json({ message: 'Reservation cancelled' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { reserveHostel, getMyReservations, cancelReservation };