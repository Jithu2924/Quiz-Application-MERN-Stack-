const express = require('express');
const Question = require('../Db/models/TeacherQuizSchema');
const checkToken = require('../middleware/check-token');
const router = express.Router();

router.post('/add/:category', checkToken, async (req, res) => {
  try {
    const { question, options, correctanswer } = req.body;
    if (!req.user || req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const newQuestion = new Question({
      question,
      options,
      correctanswer,
      category: req.params.category,
      instituteCode: req.user.code,
      createdBy: req.user.userId,
    });

    await newQuestion.save();
    res
      .status(201)
      .json({ message: 'Question added successfully', newQuestion });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my-questions/:category', checkToken, async (req, res) => {
  try {
    const questions = await Question.find({
      instituteCode: req.user.code,
      category: req.params.category,
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/score', async (req, res) => {
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

router.patch('/update/:id', checkToken, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.createdBy !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized teacher' });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/delete/:id', checkToken, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.createdBy !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await question.deleteOne();
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete('/deleteall/:category', checkToken, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const question = await Question.find({ category: req.params.category });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await Question.deleteMany({});
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
