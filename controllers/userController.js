const Reservation = require('../models/Reservation');
const Hostel = require('../models/Hostel'); // Fix typo if your file is Hostel.js

const getHomepage = (req, res) => {
    res.render('homepage'); // Renders homepage.ejs
};

const getSearchPage = async (req, res) => {
    try {

        // Fetch all hostels from the database

        const hostels = await Hostel.find({});

        const searchQuery = req.query.query || ''; // Get the search query from the request


        // Render the search page with hostel data and search query

        res.render('search', { 

            title: 'Find Hostels',

            hostels: hostels,

            searchQuery: searchQuery // Pass searchQuery to the view

        });

    } catch (error) {

        console.error('Error fetching hostels:', error);

        res.status(500).send('Server Error');

    }
    // res.render('search'); // Renders search.ejs
};


// In your searchController.js
const searchHostels = async (req, res) => {
    try {

        const searchQuery = req.query.query || '';

        let hostels;

        

        if (searchQuery) {

            hostels = await Hostel.find({

                $or: [

                    { hostelname: { $regex: searchQuery, $options: 'i' } },

                    { location: { $regex: searchQuery, $options: 'i' } },

                    { facilities: { $regex: searchQuery, $options: 'i' } }

                ]

            });

        } else {

            hostels = await Hostel.find({});

        }


        res.render('search', {

            hostels,

            searchQuery, // Pass searchQuery to the view

            user: req.user

        });

    } catch (error) {

        console.error('Search error:', error);

        res.status(500).render('error', { error: 'Search failed' });

    }
};

const getMyReservesPage = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        const userId = req.session.user._id;
        const reserves = await Reservation.find({ userId }).lean();
        const reservesWithHostel = await Promise.all(
            reserves.map(async (reserve) => {
                const hostel = await Hostel.findOne({ hostelID: reserve.hostelId });
                return { ...reserve, hostel };
            })
        );
        res.render('myReserves', { reserves: reservesWithHostel });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching reservations");
    }
};

// const cancelReservation = async (req, res) => {
//     try {
//         const { reservationId } = req.body;
//         // const userId = req.session.user._id;
//         const result = await Reservation.updateOne(
//             { reservationID: reservationId },
//             { status: 'cancelled' }
//         );
//         if (result.matchedCount === 0) {
//             res.render('myReserves', { reserves: reservesWithHostel });
//             res.status(500).send("reservation not found");
//         }
//         res.render('myReserves', { reserves: reservesWithHostel });
//         res.json({ success: true });
//     } catch (error) {
//         res.status(500).send("not matching");
//     }
// };

const cancelReservation = async (req, res) => {
    try {
        const { reservationID } = req.body; // Note: Make sure this matches your form field name
        
        if (!req.session.user) {
            return res.redirect('/login');
        }

        // Update the reservation status
        const result = await Reservation.updateOne(
            { reservationID: reservationID },
            { $set: { status: 'cancelled' } }
        );

        if (result.modifiedCount === 0) {
            // If no document was modified, the reservation might not exist
            const userId = req.session.user._id;
            const reserves = await Reservation.find({ userId }).lean();
            const reservesWithHostel = await getReservesWithHostel(reserves);
            return res.render('myReserves', { 
                reserves: reservesWithHostel,
                error: "Reservation not found or already cancelled"
            });
        }

        // Get updated reservations
        const userId = req.session.user._id;
        const reserves = await Reservation.find({ userId }).lean();
        const reservesWithHostel = await Promise.all(
            reserves.map(async (reserve) => {
                const hostel = await Hostel.findOne({ hostelID: reserve.hostelId });
                return { ...reserve, hostel };
            })
        );

        // Render the page with updated data
        res.render('myReserves', { reserves: reservesWithHostel });

    } catch (error) {
        console.error("Cancellation error:", error);
        
        // Try to render the page with whatever reservations we can get
        try {
            const userId = req.session.user._id;
            const reserves = await Reservation.find({ userId }).lean();
            const reservesWithHostel = await Promise.all(
                reserves.map(async (reserve) => {
                    const hostel = await Hostel.findOne({ hostelID: reserve.hostelId });
                    return { ...reserve, hostel };
                })
            );
            res.render('myReserves', { 
                reserves: reservesWithHostel,
                error: "An error occurred while cancelling the reservation"
            });
        } catch (fetchError) {
            res.status(500).render('myReserves', { 
                reserves: [],
                error: "An error occurred while cancelling and fetching reservations"
            });
        }
    }
};

// const cancelReservation = async (req, res) => {
//     console.log("Button clicked!");
//     try {
//         // Get parameters from URL instead of request body
//         const { hostelname, reservationID } = req.params;
        
//         // Verify the reservation exists and belongs to the user
//         const reservation = await Reservation.findOne({
//             reservationID: reservationID,
//             user: req.session.user._id // Assuming you have user authentication
//         }).populate('hostel');

//         if (!reservation) {
//             return res.status(404).json({ 
//                 success: false,
//                 message: "Reservation not found or not authorized" 
//             });
//         }

//         // Optional: Verify hostel name matches (extra security)
//         if (reservation.hostel.hostelname !== hostelname) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Reservation doesn't match the specified hostel"
//             });
//         }

//         // Update the reservation status
//         const result = await Reservation.updateOne(
//             { reservationID: reservationID },
//             { status: 'cancelled' }
//         );

//         if (result.matchedCount === 0) {
//             return res.status(404).json({ 
//                 success: false,
//                 message: "Failed to update reservation" 
//             });
//         }

//         // Successful response
//         res.json({ 
//             success: true,
//             message: `Reservation at ${hostelname} cancelled successfully`
//         });

//     } catch (error) {
//         console.error('Error cancelling reservation:', error);
//         res.status(500).json({ 
//             success: false,
//             message: error.message || "Internal server error" 
//         });
//     }
// };



const getAnnexPage = (req, res) => {
    const hostelID = 123; // Replace with the actual hostelID for Annex Hostel
    const user = req.user || null; // Get the logged-in user or set to null if not logged in
    res.render('annex', { hostelID, user }); // Pass hostelID and user to the EJS template
};

const getTaibhaPage = (req, res) => {
    const hostelID = 456; // Replace with the actual hostelID for Taibha Hostel
    const user = req.user || null; // Get the logged-in user or set to null if not logged in
    res.render('taibha', { hostelID, user }); // Pass hostelID and user to the EJS template
};



const getLoginPage = (req, res) => {
    res.render('login'); // Renders login.ejs
};

const getContactUsPage = (req, res) => {
    res.render('contactus'); // Renders contactus.ejs
};

module.exports = {
    getHomepage,
    getSearchPage,
    getAnnexPage,
    getTaibhaPage,
    getMyReservesPage,
    getLoginPage,
    getContactUsPage,
    searchHostels,
    cancelReservation
};