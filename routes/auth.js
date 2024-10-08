const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');

// ... (previous code)

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    // Send welcome email
    await sendEmail(
      email,
      'Welcome to Psychometric Testing SaaS',
      `Hello ${name},\n\nWelcome to our Psychometric Testing platform. We're excited to have you on board!`
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    await sendEmail(
      email,
      'Password Reset Request',
      `To reset your password, please click on this link: ${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.json({ msg: 'Password reset email sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    await sendEmail(
      user.email,
      'Password Reset Successful',
      'Your password has been successfully reset.'
    );

    res.json({ msg: 'Password reset successful' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: 'Invalid or expired token' });
  }
});

module.exports = router;