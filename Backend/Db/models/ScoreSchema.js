const { Schema, model } = require('mongoose');

const ScoreSchema = Schema({
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: String, required: true },
  maxscore: { type: String, required: true },
  category: { type: String },
  instituteCode: { type: String },
});
const Score = model('studentscore', ScoreSchema);

module.exports = Score;
