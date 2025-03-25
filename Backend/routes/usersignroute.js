const express = require('express');
const {
  signupstudent,
  signupteacher,
  teacherLogin,
  studentLogin,
} = require('../controllers/user-controller');
const router = express.Router();

router.post('/signup-student', signupstudent);
router.post('/signup-teacher', signupteacher);
router.post('/login-student', studentLogin);
router.post('/login-teacher', teacherLogin);

module.exports = router;
