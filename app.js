const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
// const flash = require('connect-flash');

// Initialize Express app
const app = express();


// Update these values with your actual production domain
const PRODUCTION_DOMAIN = 'your-actual-domain.com'; // Replace this!
const PRODUCTION_URL = `https://${PRODUCTION_DOMAIN}`;

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

// if (process.env.NODE_ENV === 'production') {
//   app.set('trust proxy', 1);
// }

// At the top of your app.js, after creating express app
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // Trust first proxy
  app.use((req, res, next) => {
    if (req.secure) {
      next();
    } else {
      res.redirect('https://' + req.headers.host + req.url);
    }
  });
}

// CORS configuration
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://yourdomain.com',
        'https://www.yourdomain.com',
        'https://yourapp.onrender.com' // Your Render URL
      ]
    : 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['set-cookie'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production' 
//     ? [PRODUCTION_URL, `https://www.${PRODUCTION_DOMAIN}`]
//     : 'http://localhost:3000',
//   credentials: true
// }));


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


// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ 
//     mongoUrl: process.env.MONGO_URI,
//     ttl: 14 * 24 * 60 * 60 // = 14 days
//   }),
//   cookie: { 
//     secure: process.env.NODE_ENV === 'production', // should be true in production
//     httpOnly: true,
//     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//     maxAge: 24 * 60 * 60 * 1000,
//     domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined
//   }
// }));

// Session middleware with explicit settings
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ 
//     mongoUrl: process.env.MONGO_URI,
//     ttl: 14 * 24 * 60 * 60
//   }),
//   cookie: { 
//     secure: process.env.NODE_ENV === 'production',
//     httpOnly: true,
//     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//     maxAge: 24 * 60 * 60 * 1000,
//     domain: process.env.NODE_ENV === 'production' ? PRODUCTION_DOMAIN : undefined
//   }
// }));

// Enhanced session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
    domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined,
    path: '/'
  },
  proxy: true // Trust the reverse proxy
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

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
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

app.use((req, res, next) => {
  console.log('Session Debug:', {
    sessionID: req.sessionID,
    session: req.session,
    cookies: req.headers.cookie,
    user: req.user
  });
  next();
});

// Routes
app.use('/', authRoute);
app.use('/admin', adminRoute);
app.use('/', userRoute);
app.use('/reviews', reviewRoutes);
app.use('/hostel', hostelRoute);

// Add this route for debugging
app.get('/session-check', (req, res) => {
  console.log('Session check:', req.session);
  res.json({
    sessionExists: !!req.session,
    user: req.session?.user,
    cookies: req.headers.cookie,
    headers: req.headers
  });
});


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