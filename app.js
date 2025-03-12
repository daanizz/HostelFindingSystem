const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const adminRoute = require('./routes/adminRoutes');
const connectDB = require('./config/db');



dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views'); // Specify the views directory
app.use('/', adminRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open your browser and visit: http://localhost:${PORT}`);
});