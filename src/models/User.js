const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, 'Please enter a firstName'] },
    lastName: { type: String, required: [true, 'Please enter a lastName'] },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Please enter a password'],
      minlength: 8,
    },
    role: { type: String, enum: ['admin', 'administrator'], default: 'admin' },
    otp: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);
