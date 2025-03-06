const Hostel = require('../models/Hostel');

const addHostel = async (req, res) => {
    const { name, location, contactNumber, remainingRooms } = req.body;
    try {
        const hostel = new Hostel({ name, location, contactNumber, remainingRooms });
        await hostel.save();
        res.status(201).json(hostel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getHostels = async (req, res) => {
    try {
        const hostels = await Hostel.find();
        res.json(hostels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteHostel = async (req, res) => {
    try {
        await Hostel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Hostel deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addHostel, getHostels, deleteHostel };