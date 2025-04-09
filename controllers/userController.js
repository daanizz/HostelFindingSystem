const getHomepage = (req, res) => {
    res.render('homepage'); // Renders homepage.ejs
};

const getSearchPage = (req, res) => {
    res.render('search'); // Renders search.ejs
};

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

const getMyReservesPage = (req, res) => {
    const user = req.user || null;
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