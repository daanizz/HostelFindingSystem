const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      console.log('Before Hashing Password:', this.password); // Log the password before hashing
      this.password = await bcrypt.hash(this.password, 10); // Ensure 10 salt rounds
      console.log('After Hashing Password:', this.password); // Log the hashed password
    }
    next();
  });

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema , 'users');