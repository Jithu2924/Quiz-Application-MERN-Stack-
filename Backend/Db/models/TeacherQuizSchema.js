const { Schema, model } = require('mongoose');

const TeacherQuizSchema = Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctanswer: { type: String, required: true },
  category: { type: String, default: 'G K' },
  instituteCode: { type: String, required: true },
  createdBy: { type: String, required: true },
});
const Question = model('teacherquestions', TeacherQuizSchema);

module.exports = Question;
