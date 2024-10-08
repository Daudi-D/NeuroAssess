const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test'
  },
  score: {
    type: Number,
    required: true
  },
  answers: [{
    question: String,
    answer: Number
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', ResultSchema);