const express = require('express');
const Leaderboard = require('../Db/models/LeaderboardSchema.js');

const router = express();

router.post('/', async (req, res) => {
  try {
    const response = await Leaderboard.create(req.body);
    return res.json({ message: 'Score saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const topScores = await Leaderboard.find({ category: category })
      .sort({ score: -1, createdAt: 1 })
      .limit(10);
    res.json(topScores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
