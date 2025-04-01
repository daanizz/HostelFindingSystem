const Reservation=require('../models/Reservation');


exports.reserve= async (req,res) => {
    try{
        if (!req.session.user) {
            return res.redirect('/login?returnTo=/annex');
            // return res.status(401).send('Please login to make a reservation');
        }

        const reservationID = Math.floor(100000 + Math.random() * 900000);

        const newres = new Reservation({
            reservationID: reservationID,
            userId: req.session.user._id,
            hostelId: req.body.hostelId, 
            reservationdate: new Date(),
            status: "pending"
        });

        await newres.save();

        req.session.reservationAlert = 'Reservation created successfully!';
        res.redirect('/annex');
        }
        catch (error) {
            console.error('Reservation error:', error);
            if (error.code === 11000 && error.keyPattern.userId && error.keyPattern.hostelId) {
                req.session.reservationAlert = 'You already have a reservation for Annex hostel!';
            } else {
                req.session.reservationAlert = 'Error creating reservation. Please try again.';
            }
            res.redirect('/annex');
            // res.status(500).send('Error creating reservation');
        }
    }