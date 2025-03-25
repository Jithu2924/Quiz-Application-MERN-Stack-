const express = require('express');
const Category = require('../Db/models/CategorySchema');
const checkToken = require('../middleware/check-token');
const router = express.Router();

router.post('/add', checkToken, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { category } = req.body;
    const already = await Category.findOne({ category });
    if (already) {
      return res.status(403).json({ message: 'Category already exists' });
    }
    const newCategory = new Category({
      category,
      instituteCode: req.user.code,
    });

    await newCategory.save();
    res
      .status(201)
      .json({ message: 'Category added successfully', newCategory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/all', checkToken, async (req, res) => {
  try {
    const categories = await Category.find({ instituteCode: req.user.code });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/delete/:id', checkToken, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.deleteOne();
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
