import './studentscore.css';
import axios from '../../../utils/axios';
import { useLocation, useNavigate } from 'react-router-dom';

const StudentScore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, category, count } = location.state || {};
  const username = localStorage.getItem('username');
  const studentId = localStorage.getItem('id');
  const instituteCode = localStorage.getItem('code');

  const scorepost = () => {
    axios.post('/score/add', {
      name: username,
      score,
      maxscore: count,
      category,
      studentId,
      instituteCode,
    });
  };

  const gohome = () => {
    scorepost();
    navigate('/studentdashboard');
  };

  return (
    <div className="scorePage-body">
      <div className="scorePage-container">
        <h1>Quiz Completed!</h1>
        <div className="scorePage-details">
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
        <div className="scorePage-buttons">
          <button onClick={gohome}>Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default StudentScore;
