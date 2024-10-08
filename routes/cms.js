const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
const auth = require('../middleware/auth');

// @route   POST api/cms/tests
// @desc    Create or update a test (CMS functionality)
// @access  Private (Admin only)
router.post('/tests', auth, async (req, res) => {
  try {
    const { id, title, description, questions } = req.body;

    let test;

    if (id) {
      // Update existing test
      test = await Test.findByIdAndUpdate(id, {
        title,
        description,
        questions
      }, { new: true });
    } else {
      // Create new test
      test = new Test({
        title,
        description,
        questions,
        createdBy: req.user.id
      });
      await test.save();
    }

    res.json(test);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/cms/tests/:id
// @desc    Delete a test (CMS functionality)
// @access  Private (Admin only)
router.delete('/tests/:id', auth, async (req, res) => {
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