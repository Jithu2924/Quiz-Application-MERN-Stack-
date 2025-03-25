const express = require('express');
const UserSignUp = require('../Db/models/StudentSignUpSchema');
const checktoken = require('../middleware/check-token');
const router = express.Router();

router.get('/students', checktoken, async (req, res) => {
  try {
    const response = await UserSignUp.find({ instituteCode: req.user.code });
    res.status(201).json(response);
  } catch (e) {
    res.status(500).json(e.message);
  }
});
module.exports = router;
