const Hostel = require('../models/Hostel');

const addHostel = async (req, res) => {
    const { hostelID, name, location, monthlyRent, facilities, contactNumber, remainingRooms } = req.body;
    try {
        const hostel = new Hostel({ hostelID, name, location, monthlyRent, facilities, contactNumber, remainingRooms });
        await hostel.save();
        res.status(201).json({ message: "Hostel added successfully!", hostel });
    } catch (error) {
        console.error(error); // Log the error for debugging
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