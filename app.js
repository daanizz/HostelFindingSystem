const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
// const flash = require('connect-flash');

// Initialize Express app
const app = express();

// Import routes
const authRoute = require('./routes/authRoutes');
const hostelRoute = require('./routes/hostelRoutes');
const adminRoute = require('./routes/adminRoutes');
const userRoute = require('./routes/userRoute');
const reviewRoutes = require('./routes/reviewRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}


// CORS configuration
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com', 'https://www.your-frontend-domain.com']
    : 'http://localhost:3000',
  credentials: true
}));


// Load environment variables
dotenv.config();

// app.use(flash());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//   cookie: { 
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 24 * 60 * 60 * 1000
//   }
// }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60 // = 14 days
  }),
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // should be true in production
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
    domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined
  }
}));

// After session middleware
const passport = require('./config/auth');
app.use(passport.initialize());
app.use(passport.session());

// Then your routes



// Security middleware
app.use(helmet());
app.use(mongoSanitize());

// Custom middleware
app.use((req, res, next) => {
  res.locals.reservationAlert = req.session.reservationAlert;
  delete req.session.reservationAlert;
  next();
});

app.use((req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;
  }
  next();
});

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', authRoute);
app.use('/admin', adminRoute);
app.use('/', userRoute);
app.use('/reviews', reviewRoutes);
app.use('/hostel', hostelRoute);



// Add logout route directly to app
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Logout failed');
    }
    res.redirect('/login');
  });
});

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).render('error', { 
//     error: process.env.NODE_ENV === 'development' ? err : 'Something went wrong!' 
//   });
// });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open your browser and visit: http://localhost:${PORT}`);
});