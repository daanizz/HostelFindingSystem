const Reservation=require('../models/Reservation');
const Hostel = require('../models/Hostel');


// exports.reserve= async (req,res) => {
//     try{
//         if (!req.session.user) {
//             return res.redirect('/login?returnTo=/annex');
//             // return res.status(401).send('Please login to make a reservation');
//         }

//         const reservationID = Math.floor(100000 + Math.random() * 900000);

//         const newres = new Reservation({
//             reservationID: reservationID,
//             userId: req.session.user._id,
//             hostelId: req.body.hostelId, 
//             reservationdate: new Date(),
//             status: "pending"
//         });

//         await newres.save();

//         req.session.reservationAlert = 'Reservation created successfully!';
//         res.redirect('/annex');
//         }
//         catch (error) {
//             console.error('Reservation error:', error);
//             if (error.code === 11000 && error.keyPattern.userId && error.keyPattern.hostelId) {
//                 req.session.reservationAlert = 'You already have a reservation for Annex hostel!';
//             } else {
//                 req.session.reservationAlert = 'Error creating reservation. Please try again.';
//             }
//             res.redirect('/annex');
//             // res.status(500).send('Error creating reservation');
//         }
//     }

//     exports.reserve = async (req, res) => {
//     try {
//         if (!req.session.user) {
//             return res.redirect('/login?returnTo=' + encodeURIComponent(req.originalUrl));
//         }

//         // First get the hostel to ensure it exists
//         const hostel = await Hostel.findOne({ hostelID: req.body.hostelId });
//         if (!hostel) {
//             return res.send('<script>alert("Hostel not found!"); window.location.href = "/hostel/' + req.body.hostelId + '";</script>');
//         }

//         // Check for existing reservation
//         const existingReservation = await Reservation.findOne({
//             userId: req.session.user._id,
//             hostelId: req.body.hostelId
//         });

//         if (existingReservation) {
//             if (existingReservation.status === 'pending' || existingReservation.status === 'confirmed') {
//                 return res.send('<script>alert("Reservation not possible - you already have an active reservation for this hostel!"); window.location.href = "/hostel/' + req.body.hostelId + '";</script>');
//             }
//             // If status is cancelled, allow new reservation
//         }

//         const reservationID = Math.floor(100000 + Math.random() * 900000);

//         const newres = new Reservation({
//             reservationID: reservationID,
//             userId: req.session.user._id,
//             hostelId: req.body.hostelId,
//             hostelName: hostel.hostelname, // Store hostel name for reference
//             reservationdate: new Date(),
//             status: "pending"
//         });

//         await newres.save();

//         return res.send('<script>alert("Your reservation is made and is pending!"); window.location.href = "/hostel/' + req.body.hostelId + '";</script>');
//     } catch (error) {
//         console.error('Reservation error:', error);
//         if (error.code === 11000 && error.keyPattern.userId && error.keyPattern.hostelId) {
//             return res.send('<script>alert("You already have a reservation for this hostel!"); window.location.href = "/hostel/' + req.body.hostelId + '";</script>');
//         }
//         return res.send('<script>alert("Error creating reservation. Please try again."); window.location.href = "/hostel/' + req.body.hostelId + '";</script>');
//     }
// }

// exports.reserve = async (req, res) => {
//     try {
//         if (!req.session.user) {
//             return res.redirect('/login?returnTo=' + encodeURIComponent(req.originalUrl));
//             res.redirect('/annex');
//         }

//         // First get the hostel to ensure it exists
//         const hostel = await Hostel.findOne({ hostelID: req.body.hostelId });
//         if (!hostel) {
//             return res.send('<script>alert("Hostel not found!"); window.location.href = "/hostel/' + req.body.hostelId + '";</script>');
//         }

//         // Check for existing reservation
//         const existingReservation = await Reservation.findOne({
//             userId: req.session.user._id,
//             hostelId: req.body.hostelId
//         });

//         if (existingReservation) {
//             if (existingReservation.status === 'pending' || existingReservation.status === 'confirmed') {
//                 return res.send('<script>alert("Reservation not possible - you already have an active reservation for this hostel!"); window.location.href = "/hostel/' + req.body.hostelId + '";</script>');
//                 res.redirect('/annex');
//             }
//             // res.redirect('/annex');
//             // If status is cancelled, allow new reservation
//         }

//         const reservationID = Math.floor(100000 + Math.random() * 900000);

//         const newres = new Reservation({
//             reservationID: reservationID,
//             userId: req.session.user._id,
//             hostelId: req.body.hostelId,
//             hostelName: hostel.hostelname, // Store hostel name for reference
//             reservationdate: new Date(),
//             status: "pending"
//         });

//         await newres.save();
//         res.redirect('/annex');
//         return res.send('<script>alert("Your reservation is made and is pending!"); window.location.href = "/hostel/' + req.body.hostelId + '";</script>');
//     } catch (error) {
//         console.error('Reservation error:', error);
//         if (error.code === 11000 && error.keyPattern.userId && error.keyPattern.hostelId) {
//             res.redirect('/annex');
//             return res.send('<script>alert("You already have a reservation for this hostel!"); window.location.href = "/hostel/' + req.body.hostelId + '";</script>');
//         }
//         res.redirect('/annex');
//         return res.send('<script>alert("Error creating reservation. Please try again."); window.location.href = "/hostel/' + req.body.hostelId + '";</script>');
//     }
// }

// exports.reserve = async (req, res) => {
//     try {
//         if (!req.session.user) {
//             req.session.alertMessage = "Please login first!";
//             return res.redirect(`/hostel/${req.body.hostelId}`);
//         }

//         const hostel = await Hostel.findOne({ hostelID: req.body.hostelId });
//         if (!hostel) {
//             req.session.alertMessage = "Hostel not found!";
//             return res.redirect(`/hostel/${req.body.hostelId}`);
//         }

//         const existingReservation = await Reservation.findOne({
//             userId: req.session.user._id,
//             hostelId: req.body.hostelId,
//             status: { $in: ['pending', 'confirmed'] }
//         });

//         if (existingReservation) {
//             req.session.alertMessage = "You already have an active reservation for this hostel!";
//             return res.redirect(`/hostel/${req.body.hostelId}`);
//         }

//         const newres = new Reservation({
//             reservationID: Math.floor(100000 + Math.random() * 900000),
//             userId: req.session.user._id,
//             hostelId: req.body.hostelId,
//             hostelName: hostel.hostelname,
//             reservationdate: new Date(),
//             status: "pending"
//         });

//         await newres.save();
//         req.session.alertMessage = "Reservation created successfully!";
//         return res.redirect(`/hostel/${req.body.hostelId}`);
        
//     } catch (error) {
//         console.error('Reservation error:', error);
//         req.session.alertMessage = error.code === 11000 
//             ? "You already have a reservation for this hostel!" 
//             : "Error creating reservation. Please try again.";
//         return res.redirect(`/hostel/${req.body.hostelId}`);
//     }
// }

exports.reserve = async (req, res) => {
    try {
        if (!req.session.user) {
            req.session.alertMessage = "Please login first!";
            return res.redirect(`/hostel/${req.body.hostelId}`);
        }

        const hostel = await Hostel.findOne({ hostelID: req.body.hostelId });
        if (!hostel) {
            req.session.alertMessage = "Hostel not found!";
            return res.redirect(`/hostel/${req.body.hostelId}`);
        }

        // Check for existing ACTIVE reservation (pending or confirmed)
        const activeReservation = await Reservation.findOne({
            userId: req.session.user._id,
            hostelId: req.body.hostelId,
            status: { $in: ['pending', 'confirmed'] }
        });

        if (activeReservation) {
            req.session.alertMessage = "You already have an active reservation for this hostel!";
            return res.redirect(`/hostel/${req.body.hostelId}`);
        }

        // If we get here, either:
        // 1. No reservation exists, or
        // 2. Only cancelled reservations exist

        const reservationID = Math.floor(100000 + Math.random() * 900000);

        const newres = new Reservation({
            reservationID: reservationID,
            userId: req.session.user._id,
            hostelId: req.body.hostelId,
            hostelName: hostel.hostelname,
            reservationdate: new Date(),
            status: "pending"
        });

        await newres.save();
        req.session.alertMessage = "Reservation created successfully!";
        return res.redirect(`/hostel/${req.body.hostelId}`);
        
    } catch (error) {
        console.error('Reservation error:', error);
        if (error.code === 11000) {
            // Handle case where unique constraint fails
            // This might happen if cancelled reservation exists
            // First check if the existing reservation is cancelled
            const existing = await Reservation.findOne({
                userId: req.session.user._id,
                hostelId: req.body.hostelId
            });
            
            if (existing && existing.status === 'cancelled') {
                // Update the cancelled reservation instead of creating new
                existing.status = 'pending';
                existing.reservationdate = new Date();
                await existing.save();
                
                req.session.alertMessage = "Reservation re-activated successfully!";
                return res.redirect(`/hostel/${req.body.hostelId}`);
            } else {
                req.session.alertMessage = "You already have a reservation for this hostel!";
            }
        } else {
            req.session.alertMessage = "Error creating reservation. Please try again.";
        }
        return res.redirect(`/hostel/${req.body.hostelId}`);
    }
}