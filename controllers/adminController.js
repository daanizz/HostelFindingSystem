const Hostel = require('../models/Hostel');
const Reservation = require('../models/Reservation');

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

exports.updateStatus = async (req, res) => {
    const { reservationID, status } = req.body;
    try {
        await Reservation.updateOne({ reservationID }, { status });
        res.redirect('/getReserves'); // Redirect back to the same page to reflect changes
    } catch (error) {
        res.status(500).send('Error updating status: ' + error.message);
        res.redirect('/getReserves'); 
    }
};



exports.deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        // req.flash("success", "Hostel deleted successfully!"); // Flash message for success
        res.redirect('/getReserves');
    } catch (error) {
        console.error("Error deleting hostel:", error);
        res.status(500).json({ message: "Internal Server Error" });
        // req.flash("error", "Something went wrong while deleting the hostel."); // Flash message for error
        res.redirect('/getReserves');
    }
};


exports.getReserves = async(req,res) => {
    try {
        const reserves = await Reservation.find({}); // Fetch all Reservaton from DB
        res.render('admin/manageReserves', { reserves }); // Render `manageReserves.ejs` with data
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching hostels");
    }
};