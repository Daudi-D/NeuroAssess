const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const Test = require('../models/Test');
const User = require('../models/User');
const auth = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');

// ... (previous code)

// @route   GET api/results/trend
// @desc    Get user's performance trend
// @access  Private
router.get('/trend', auth, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id })
      .sort({ date: 1 })
      .populate('test', 'title');

    const trend = results.map(result => ({
      date: result.date,
      score: result.score,
      testTitle: result.test.title
    }));

    res.json(trend);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;