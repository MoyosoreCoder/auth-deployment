const mongoose = require('mongoose');
//defining user schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // ✅ Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'], // ✅ Ensures valid email
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10,15}$/, 'Please enter a valid phone number'], // ✅ 10-15 digit numbers
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // ✅ Ensures password security
      trim: true,
    },
    pin: {
      type: String, // ✅ Stored as a STRING to store hashed PIN
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true } // ✅ Adds createdAt & updatedAt fields
);

// ✅ Export User Model
const User = mongoose.model('User', UserSchema);
module.exports = User;
