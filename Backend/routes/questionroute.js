const express = require('express');
const Question = require('../Db/models/QuizSchema');

const router = express.Router();

router.get('/bycategory/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const questions = await Question.find({ category: category });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get questions' });
  }
});

router.get('/creator', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get questions' });
  }
});
router.post('/creator', async (req, res) => {
  try {
    const questions = await Question.create(req.body);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get questions' });
  }
});
router.patch('/creator/:id', async (req, res) => {
  try {
    const questions = await Question.findByIdAndUpdate(req.params.id, req.body);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get questions' });
  }
});
router.delete('/creator/:id', async (req, res) => {
  try {
    const questions = await Question.findByIdAndDelete(req.params.id);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get questions' });
  }
});

router.post('/submit', async (req, res) => {
  try {
    const { username, answers, category } = req.body;

    let score = 0;

    for (const answer of answers) {
      const question = await Question.findById(answer.questionid);
      if (question && question.correctanswer === answer.selectedoption) {
        score++;
      }
    }

    res.json({ username, score, category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to calculate score' });
  }
});

module.exports = router;
