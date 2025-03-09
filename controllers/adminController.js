const User = require('../models/Hostel');

exports.addHostel = async (req,res) => {
    const {hostelID,hostelname,monthlyRent,facilities,location,numberOfRooms,ContactNumber} =req.body;
    const hostel= new Hostel({hostelID,hostelname,monthlyRent,facilities,location,numberOfRooms,ContactNumber});
    await hostel.save();
    res.redirect('/getHostel');
};//upto here is a confirmed code for adding the hostel into database and redirecting to hostel management page.

exports.getHostel = async(req,res) => {
    try {
        const hostels = await Hostel.find({}); // Fetch all hostels from DB
        res.render('manageHostels', { hostels }); // Render `manageHostels.ejs` with data
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching hostels");
    }
};