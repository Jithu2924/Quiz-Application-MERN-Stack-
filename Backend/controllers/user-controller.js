const studentSignUp = require('../Db/models/StudentSignUpSchema');
const teacherSignUp = require('../Db/models/TeacherSignUpSchema');
const institute = require('../Db/models/InstituteSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.signupstudent = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      password,
      confirmpassword,
      instituteCode,
      isGuest,
    } = req.body;
    const user = await studentSignUp.findOne({ email: email });
    const inst = await institute.findOne({ instituteCode: instituteCode });
    if (user) {
      return res.status(400).json({ message: 'Email already Exists' });
    }
    if (password != confirmpassword) {
      return res.status(400).json({ message: 'Password doesnt match' });
    }
    if (!inst && instituteCode) {
      return res.status(400).json({ message: 'Institute code doesnt match' });
    }
    const hashedPassword = await bcrypt.hash(password, 2);

    const saveUser = await studentSignUp.create({
      fname,
      lname,
      email,
      role: isGuest ? 'guest' : 'student',
      instituteCode,
      password: hashedPassword,
    });

    return res.status(200).json({ message: 'Student Signup Successful' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports.signupteacher = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      password,
      confirmpassword,
      instituteName,
      instituteCode,
    } = req.body;
    const user = await teacherSignUp.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already Exists' });
    }
    if (password != confirmpassword) {
      return res.status(400).json({ message: 'Password doesnt match' });
    }

    const hashedPassword = await bcrypt.hash(password, 2);
    const saveteacher = await teacherSignUp.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      instituteCode,
      role: 'teacher',
    });
    const saveinstitute = await institute.create({
      instituteCode,
      instituteName,
    });
    return res.status(200).json({ message: 'Teacher Signup Successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

module.exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await studentSignUp.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Email or password incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email or password incorrect' });
    }
    const key = process.env.JWT_SECRET;

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        code: user.instituteCode,
      },
      key,
      {
        expiresIn: '7d',
      }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id,
      name: user.fname,
      code: user.instituteCode,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await teacherSignUp.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Email or password incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email or password incorrect' });
    }

    const key = process.env.JWT_SECRET;

    const token = jwt.sign(
      { userId: user._id, role: 'teacher', code: user.instituteCode },
      key,
      {
        expiresIn: '7d',
      }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      name: user.fname,
      code: user.instituteCode,
      role: 'teacher',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
