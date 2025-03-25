const { Schema, model } = require('mongoose');

const QuizSchema = Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctanswer: { type: String, required: true },
  category: { type: String, default: 'G K' },
});
const Question = model('questions', QuizSchema);

module.exports = Question;
