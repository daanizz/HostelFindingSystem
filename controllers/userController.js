const getHomepage = (req, res) => {
    res.render('homepage'); // Renders homepage.ejs
};

const getSearchPage = (req, res) => {
    res.render('search'); // Renders search.ejs
};

const getAnnexPage = async (req, res) => {
    try {
        let userHasReservation = false;
        
        if (req.session.user) {
            const existingReservation = await Reservation.findOne({
                userId: req.session.user._id,
                hostelId: 101 // Annex hostel ID
            });
            userHasReservation = !!existingReservation;
        }

        res.render('annex', {
            user: req.session.user,
            hostelID: 101,
            userHasReservation: userHasReservation
        });
    } catch (error) {
        console.error('Error rendering annex page:', error);
        res.status(500).send('Internal Server Error');
    }
    // const hostelID = 101; // Replace with the actual hostelID for Annex Hostel
    // const user = req.user || null; // Get the logged-in user or set to null if not logged in
    // res.render('annex', { hostelID, user }); // Pass hostelID and user to the EJS template
};

const getTaibhaPage = (req, res) => {
    const hostelID = 456; // Replace with the actual hostelID for Taibha Hostel
    const user = req.user || null; // Get the logged-in user or set to null if not logged in
    res.render('taibha', { hostelID, user }); // Pass hostelID and user to the EJS template
};

const getMyReservesPage = (req, res) => {
    res.render('myReserves'); // Renders MyReservation.ejs
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
};