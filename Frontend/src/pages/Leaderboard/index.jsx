import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const lbcategoryselect = async cat => {
    setLoading(true);
    setSelectedCategory(cat);
    try {
      const response = await axios.get(
        `http://localhost:8000/leaderboard/${cat}`
      );
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lb-body">
      <div className="leaderboard-container">
        <h2>Leaderboard</h2>
        <div className="lb-category">
          <p
            className={selectedCategory == 'Biology' ? 'selected' : ''}
            onClick={() => lbcategoryselect('Biology')}
          >
            Biology
          </p>
          <p
            className={selectedCategory == 'Mathematics' ? 'selected' : ''}
            onClick={() => lbcategoryselect('Mathematics')}
          >
            Mathematics
          </p>
          <p
            className={selectedCategory == 'Physics' ? 'selected' : ''}
            onClick={() => lbcategoryselect('Physics')}
          >
            Physics
          </p>
          <p
            className={selectedCategory == 'Chemistry' ? 'selected' : ''}
            onClick={() => lbcategoryselect('Chemistry')}
          >
            Chemistry
          </p>
          <p
            className={selectedCategory == 'GeneralKnowledge' ? 'selected' : ''}
            onClick={() => lbcategoryselect('GeneralKnowledge')}
          >
            G. K
          </p>
        </div>

        {!selectedCategory && (
          <p className="placeholder-text">
            Please select a category to view the leaderboard.
          </p>
        )}

        {loading && <p className="loading-text">Loading...</p>}

        {!loading && selectedCategory && (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, index) => (
                  <tr key={entry._id || index}>
                    <td>{index + 1}</td>
                    <td>{entry.username}</td>
                    <td>{entry.score}</td>
                    <td>{entry.category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No data available for this category</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <button className="back-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
