const User = require('../models/User');
// const adminController = require('../controllers/adminController');
const bcrypt = require('bcryptjs');

// Login controller
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('Incorrect user');
//       return res.redirect('/login'); // Stay on login page
//     }

//     // Log the stored hash and input password
//     console.log('Stored Hash:', user.password);
//     console.log('Input Password:', password);

//     // Compare the input password with the hashed password from the database
//     const isMatch = await bcrypt.compare(password, user.password);

//     console.log('Password Match:', isMatch);  // Add this line to debug

//     if (!isMatch) {
//       console.log('Incorrect password');
//       return res.redirect('/login'); // Stay on login page
//     }

//     // Set user information in the session
//     req.session.user = {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin
//     };
//     req.session.save(err => {
//       if (err) {
//         console.error('Session save error:', err);
//         return res.status(500).send('Login failed');
//       }
//       // res.redirect('/login');
//     });

//     console.log('Session after login:', req.session); // Debug session

//     if (user.isAdmin) {
//       const users = await User.find({});
//       return res.redirect('/admin/dashboard');
//     }

//     res.render('homepage');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    };

    // Explicitly save session
    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Login failed' });
      }
      
      // Return JSON response for both API and form submissions
      if (req.xhr || req.headers.accept.includes('application/json')) {
        return res.json({ 
          success: true, 
          user: req.session.user,
          redirect: user.isAdmin ? '/admin/dashboard' : '/homepage'
        });
      } else {
        if (user.isAdmin) {
          return res.redirect('/admin/dashboard');
        }
        return res.redirect('/homepage');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// Sign up controller
exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send('User already exists');
    }

    // Create and save user (no need to hash the password here, it's done automatically in the schema)
    const user = new User({
      name,
      email,
      password  // plain password, it will be hashed in the schema
    });
    await user.save();

    console.log("Record inserted successfully");
    res.redirect('/'); // Redirect to login page
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};