const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Local Strategy for username/password login
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Use email as the username field
  async (email, password, done) => {
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      // Compare the input password with the hashed password from the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      // If the user is found and the password matches, return the user
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});



module.exports = passport;