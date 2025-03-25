import './result.css';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Leaderboard from '../Leaderboard';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, category, count } = location.state || {};
  const username = localStorage.getItem('username');
  const scorepost = () => {
    axios.post('http://localhost:8000/leaderboard', {
      username,
      score,
      category,
    });
  };

  const gohome = () => {
    scorepost();
    navigate('/');
  };
  const lboard = () => {
    scorepost();
    navigate('/leaderboard');
  };
  return (
    <div className="result-body">
      <div className="result-container">
        <h1>Quiz Completed!</h1>
        <div className="result-details">
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Score:</strong> {score}/{count}
          </p>
        </div>
        <div className="result-buttons">
          <button onClick={gohome}>Go to Home</button>
          <button onClick={lboard}>View Leaderboard</button>
        </div>
      </div>
    </div>
  );
};

export default Result;
