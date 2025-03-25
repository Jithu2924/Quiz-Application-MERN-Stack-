const express = require('express');
const Score = require('../Db/models/ScoreSchema');
const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    await Score.create(req.body);
    res.status(200).json({ message: 'added' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const score = await Score.find();
    res.status(200).json(score);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
