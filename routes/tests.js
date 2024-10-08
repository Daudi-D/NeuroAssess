const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// @route   POST api/tests
// @desc    Create a new test
// @access  Private (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, description, questions, category, timeLimit } = req.body;

    const newTest = new Test({
      title,
      description,
      questions,
      category,
      timeLimit,
      createdBy: req.user.id
    });

    const test = await newTest.save();

    res.json(test);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tests
// @desc    Get all tests (with pagination)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const total = await Test.countDocuments();
    const tests = await Test.find()
      .sort({ date: -1 })
      .limit(limit)
      .skip(startIndex);

    res.json({
      tests,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalTests: total
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tests/:id
// @desc    Get test by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ msg: 'Test not found' });
    }

    res.json(test);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Test not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tests/:id
// @desc    Update a test
// @access  Private (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { title, description, questions, category, timeLimit } = req.body;

    let test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ msg: 'Test not found' });
    }

    test.title = title;
    test.description = description;
    test.questions = questions;
    test.category = category;
    test.timeLimit = timeLimit;

    await test.save();

    res.json(test);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Test not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/tests/:id
// @desc    Delete a test
// @access  Private (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ msg: 'Test not found' });
    }

    await test.remove();

    res.json({ msg: 'Test removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Test not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;