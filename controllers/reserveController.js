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
        res.redirect('/annex');

        

        }
        catch (error) {
            console.error('Reservation error:', error);
            res.status(500).send('Error creating reservation');
        }
    }