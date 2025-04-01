const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express app
const app = express();
// Import routes
const authRoute = require('./routes/authRoutes');
const adminRoute = require('./routes/adminRoutes');
const userRoute = require('./routes/userRoute'); // Import userRoute
const session = require('express-session');
const MongoStore = require('connect-mongo');

const cors = require('cors'); // Import cors

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend domain
  credentials: true // Allow cookies to be sent
}));

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));
// // Connect to MongoDB
// connectDB();

// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Use MongoDB as the session store
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

app.use((req, res, next) => {
  res.locals.reservationAlert = req.session.reservationAlert;
  delete req.session.reservationAlert;
  next();
});

// Middleware to populate req.user for authenticated requests
app.use((req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user; // Populate req.user from session
  }
  next();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Specify the views directory

// Mount routes
app.use('/', authRoute); // Mount authRoute at the root
app.use('/admin', adminRoute); // Mount adminRoute at /admin
app.use('/', userRoute); // Mount userRoute at the root
app.use('/reviews', require('./routes/reviewRoutes'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open your browser and visit: http://localhost:${PORT}`);
});