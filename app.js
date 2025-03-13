const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');


const authRoute = require('./routes/authRoutes');
const adminRoute = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views'); // Specify the views directory
app.use('/', authRoute);
app.use('/admin', adminRoute);
// app.use('/dashboard', adminRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open your browser and visit: http://localhost:${PORT}`);
});