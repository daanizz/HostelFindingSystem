const Hostel = require('../models/Hostel');

exports.addHostel = async (req, res) => {
    try {
        const { hostelID, hostelname, monthlyRent, facilities, location, numberOfRooms, ContactNumber } = req.body;
        const hostel = new Hostel({ hostelID, hostelname, monthlyRent, facilities, location, numberOfRooms, ContactNumber });
        if (!hostelID || !hostelname || !monthlyRent || !facilities || !location || !numberOfRooms || !ContactNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }
        await hostel.save();
        res.redirect('/getHostel');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding hostel");
    }
};//upto here is a confirmed code for adding the hostel into database and redirecting to hostel management page.

exports.getHostel = async(req,res) => {
    try {
        const hostels = await Hostel.find({}); // Fetch all hostels from DB
        res.render('admin/manageHostels', { hostels }); // Render `manageHostels.ejs` with data
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching hostels");
    }
};

exports.deleteHostel = async (req, res) => {
    try {
        const deletedHostel = await Hostel.findByIdAndDelete(req.params.id);
        if (!deletedHostel) {
            return res.status(404).json({ message: "Hostel not found" });
        }
        // req.flash("success", "Hostel deleted successfully!"); // Flash message for success
        res.redirect('/getHostel');
    } catch (error) {
        console.error("Error deleting hostel:", error);
        res.status(500).json({ message: "Internal Server Error" });
        // req.flash("error", "Something went wrong while deleting the hostel."); // Flash message for error
        res.redirect('/getHostel');
    }
};