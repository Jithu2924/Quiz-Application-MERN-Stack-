import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import './studentdashboard.css';

const StudentDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCategories(response.data);
      const res = await axios.get('/score');
      setScores(res.data);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <h1 className="dashboard-title">📌 Student Dashboard</h1>

        <div className="dashboard-header">
          <h2>Welcome, {localStorage.getItem('username')}</h2>
          <h3>{localStorage.getItem('institute')}</h3>
          <p>Track your progress, take quizzes, and climb the leaderboard!</p>
        </div>

        <div className="dashboard-flex">
          <section className="dashboard-card quizzes">
            <h2>🔥 Available Common Quizzes</h2>
            <ul>
              <li>🔬 Science Quiz</li>
              <li>➗ Math Quiz</li>
              <li>🧠 General Knowledge</li>
              <Link to="/category" className="view-more">
                View all
              </Link>
            </ul>
          </section>

          <section className="dashboard-card leaderboard">
            <h2>🏆 Leaderboard</h2>
            <p>See the top 10 from each quiz category</p>
            <Link to="/leaderboard" className="view-more">
              View Full Leaderboard
            </Link>
          </section>
        </div>

        <div className="my-quizzes">
          <h2>📚 My Quizzes</h2>
          {categories.length > 0 ? (
            <ul>
              {categories.map(quiz => {
                const studentScore = scores.find(
                  s =>
                    s.category === quiz.category &&
                    s.studentId === localStorage.getItem('id')
                );

                return studentScore ? (
                  <li key={quiz._id} className="canclickbtn">
                    {quiz.category} ✅ - {studentScore.score}/
                    {studentScore.maxscore}
                  </li>
                ) : (
                  <li
                    className="cannotclickbtn"
                    key={quiz._id}
                    onClick={() => {
                      navigate('/studentquestion/' + quiz.category);
                    }}
                  >
                    {quiz.category}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No quizzes available from your institute.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
