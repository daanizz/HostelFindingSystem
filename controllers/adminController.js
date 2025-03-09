const User = require('../models/Hostel');

exports.addHostel = async (req,res) => {
    const {hostelID,hostelname,monthlyRent,facilities,location,numberOfRooms,ContactNumber} =req.body;
    const hostel= new Hostel({hostelID,hostelname,monthlyRent,facilities,location,numberOfRooms,ContactNumber});
    await hostel.save();
    res.redirect('/manageHostels');
};