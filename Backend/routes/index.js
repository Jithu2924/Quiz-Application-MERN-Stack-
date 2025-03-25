const express = require('express');

const router = express.Router();

const questionroute = require('./questionroute');
const leaderboardroute = require('./leaderboardroute');
const usersignroute = require('./usersignroute');
const teacherQuestionRoute = require('./teacherquestionroute');
const categoryRoute = require('./categoryroute');
const instituteRoute = require('./instituteroute');
const listRoute = require('./listroute');
const scoreRoute = require('./scoreroute');

router.use('/questions', questionroute);
router.use('/leaderboard', leaderboardroute);
router.use('/user', usersignroute);
router.use('/institute', instituteRoute);

router.use('/teacherquestions', teacherQuestionRoute);
router.use('/categories', categoryRoute);
router.use('/list', listRoute);
router.use('/score', scoreRoute);

module.exports = router;
