const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, school_id } = req.body;
    const UserCount = await User.countDocuments();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    const role = UserCount === 0 ? 'administrator' : 'admin';

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      school_id,
      otp,
      role,
      isVerified: false,
    });

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Email sending part (optional)
    // const htmlContent = ... (baca file + replace otp)

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      otp,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect password' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: 'User already verified' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: 'User already verified' });
    }

    const newOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    user.otp = newOtp;
    await user.save();

    // Send email if configured
    // const htmlContent = ...

    return res.status(200).json({
      success: true,
      message: 'OTP resent successfully',
      otp: newOtp, // For demo purposes, show OTP (remove in production)
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Forget password & reset password bisa disesuaikan mirip pola di atas (pakai email + link reset + update password)

module.exports = {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
};
