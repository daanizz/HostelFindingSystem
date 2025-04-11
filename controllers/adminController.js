const Hostel = require('../models/Hostel');
const Reservation = require('../models/Reservation');
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

// exports.addHostel = async (req, res) => {
//     try {
//         const { hostelID, hostelname, monthlyRent, facilities, location, numberOfRooms, ContactNumber } = req.body;
//         const hostel = new Hostel({ hostelID, hostelname, monthlyRent, facilities, location, numberOfRooms, ContactNumber });
//         if (!hostelID || !hostelname || !monthlyRent || !facilities || !location || !numberOfRooms || !ContactNumber) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
//         await hostel.save();
//         res.redirect('/admin/getHostel');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error adding hostel");
//     }
// };//upto here is a confirmed code for adding the hostel into database and redirecting to hostel management page.

// exports.addHostel = async (req, res) => {

//     upload.array('hostelImages', 10)(req, res, async (err) => { // Adjust the field name and limit as necessary

//         if (err) {

//             // Clean up any uploaded files if error occurs

//             if (req.files && req.files.length > 0) {

//                 req.files.forEach(file => {

//                     fs.unlinkSync(file.path);

//                 });

//             }

//             return res.status(400).render('admin/addHostel', { 

//                 error: err.message,

//                 formData: req.body

//             });

//         }


//         try {

//             if (!req.files || req.files.length < 3) {

//                 throw new Error('At least 3 images are required');

//             }


//             const imagePaths = req.files.map(file => 

//                 `/uploads/hostels/${path.basename(file.path)}`

//             );


//             const newHostel = new Hostel({

//                 hostelID: req.body.hostelID,

//                 hostelname: req.body.hostelname,

//                 monthlyRent: req.body.monthlyRent,

//                 facilities: req.body.facilities.split(',').map(item => item.trim()),

//                 location: req.body.location,

//                 ContactNumber: req.body.ContactNumber,

//                 numberOfRooms: req.body.numberOfRooms,

//                 availableRooms: req.body.availableRooms,

//                 images: imagePaths,

//                 description: req.body.description,

//                 amenities: req.body.amenities.split(',').map(item => item.trim())

//             });


//             await newHostel.save();

//             req.session.adminAlert = { type: 'success', message: 'Hostel added successfully!' };

//             res.redirect('/admin/getHostel');

//         } catch (error) {

//             // Clean up uploaded files on error

//             if (req.files && req.files.length > 0) {

//                 req.files.forEach(file => {

//                     fs.unlinkSync(file.path);

//                 });

//             }

            

//             res.status(400).render('admin/addHostel', { 

//                 error: error.message,

//                 formData: req.body

//             });

//         }

//     });

// };

exports.addHostel = async (req, res) => {
    try {
        if (!req.files || req.files.length < 3) {
            throw new Error('At least 3 images are required');
        }

        const imagePaths = req.files.map(file => 
            `/uploads/hostels/${path.basename(file.path)}`
        );

        const newHostel = new Hostel({
            hostelID: req.body.hostelID,
            hostelname: req.body.hostelname,
            monthlyRent: req.body.monthlyRent,
            facilities: req.body.facilities.split(',').map(item => item.trim()),
            location: req.body.location,
            ContactNumber: req.body.ContactNumber,
            numberOfRooms: req.body.numberOfRooms,
            availableRooms: req.body.availableRooms,
            images: imagePaths,
            description: req.body.description,
            amenities: req.body.amenities.split(',').map(item => item.trim())
        });

        await newHostel.save();

        req.session.adminAlert = { type: 'success', message: 'Hostel added successfully!' };

        res.redirect('/admin/getHostel');
    } catch (error) {
        // Clean up uploaded files on error
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                fs.unlinkSync(file.path);
            });
        }

        res.status(400).render('admin/addHostel', { 
            error: error.message,
            formData: req.body
        });
    }
};

exports.getHostel = async(req,res) => {
    try {
        const hostels = await Hostel.find({}); // Fetch all hostels from DB
        res.render('admin/manageHostels', { hostels }); // Render `manageHostels.ejs` with data
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching hostels");
    }
};

// exports.deleteHostel = async (req, res) => {
//     try {
//         const deletedHostel = await Hostel.findByIdAndDelete(req.params.id);
//         if (!deletedHostel) {
//             return res.status(404).json({ message: "Hostel not found" });
//         }
//         // req.flash("success", "Hostel deleted successfully!"); // Flash message for success
//         res.redirect('/admin/getHostel');
//     } catch (error) {
//         console.error("Error deleting hostel:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//         // req.flash("error", "Something went wrong while deleting the hostel."); // Flash message for error
//         res.redirect('/getHostel');
//     }
// };

exports.deleteHostel = async (req, res) => {
    try {
        // Find the hostel first to get image paths
        const hostel = await Hostel.findById(req.params.id);
        if (!hostel) {
            // req.flash('error', 'Hostel not found');
            return res.redirect('/admin/getHostel');
        }

        // Delete associated images from filesystem
        hostel.images.forEach(imagePath => {
            try {
                // Remove the leading slash to create proper relative path
                const relativePath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
                const fullPath = path.join(__dirname, '../public', relativePath);
                
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                    console.log(`Deleted image: ${fullPath}`);
                }
            } catch (err) {
                console.error(`Error deleting image ${imagePath}:`, err);
                // Continue with deletion even if image deletion fails
            }
        });

        // Delete the hostel from database
        const deletedHostel = await Hostel.findByIdAndDelete(req.params.id);
        
        if (!deletedHostel) {
            // req.flash('error', 'Hostel not found');
            return res.redirect('/admin/getHostel');
        }

        // req.flash('success', 'Hostel deleted successfully!');
        res.redirect('/admin/getHostel');
    } catch (error) {
        console.error('Error deleting hostel:', error);
        // req.flash('error', 'Failed to delete hostel');
        res.redirect('/admin/getHostel');
    }
};

exports.updateStatus = async (req, res) => {
    const { reservationID, status, hostelId } = req.body;
    try {
        // Update reservation status
        await Reservation.updateOne({ reservationID }, { status });

        if (status === 'confirmed') {
            // Find hostel by numeric ID
            console.log('Searching for hostel with ID:', hostelId);
            
            const hostel = await Hostel.findOne({ 
                hostelID: Number(hostelId) 
            });

            console.log('Found hostel:', hostel); 

            if (!hostel) {
                return res.status(404).send("No Hostel found");
            }

            if (hostel.numberOfRooms <= 0) {
                return res.status(400).send("No rooms available");
            }

            // Decrement room count
            hostel.numberOfRooms -= 1;
            await hostel.save();
        }
        return res.redirect('/admin/getReserves');
    }
        catch (error) {
        res.status(500).send('Error updating status: ' + error.message);
        res.redirect('/admin/getReserves'); 
    }
};


exports.deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        const { hostelId } = req.body;

        const hostel = await Hostel.findOne({ 
            hostelID: Number(hostelId) 
        });

        if (hostel) {
            hostel.numberOfRooms += 1;
            await hostel.save();
        }

        res.redirect('/admin/getReserves');
    } catch (error) {
        console.error("Error deleting reservation:", error);
        res.status(500).json({ message: "Internal Server Error" });
        res.redirect('/admin/getReserves');
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