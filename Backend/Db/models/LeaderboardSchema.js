const { Schema, model } = require('mongoose');

const LeaderboardSchema = Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Leaderboard = model('Leaderboard', LeaderboardSchema);
module.exports = Leaderboard;
