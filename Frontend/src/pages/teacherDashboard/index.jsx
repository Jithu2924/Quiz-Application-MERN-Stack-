import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import './teacherdashboard.css';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/list/students', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStudents(response.data);
    } catch (err) {
      setError('Failed to fetch student data');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="teacher-dashboard-container">
      <div className="teacher-dashboard-main">
        <h1 className="teacher-dashboard-title">👨‍🏫 Teacher Dashboard</h1>

        <div className="teacher-dashboard-header">
          <h2>Welcome, {localStorage.getItem('teacherName')}</h2>
          <h3>
            {localStorage.getItem('code')} &#40;
            {localStorage.getItem('institute')}&#41;
          </h3>
          <p>Manage quizzes and track your students' progress!</p>
        </div>

        <div className="teacher-dashboard-cards">
          <section className="teacher-dashboard-card students">
            <h2>👩‍🎓 Students in Your Institute</h2>
            {students.length > 0 ? (
              <>
                <ul>
                  {students.map((student, i) => (
                    <li key={student._id}>
                      <strong>{i + 1}. </strong>
                      <strong>
                        {student.fname} {student.lname}
                      </strong>
                    </li>
                  ))}
                </ul>
                <p
                  onClick={() => {
                    navigate('/studentlist');
                  }}
                  className="view-more-btn"
                >
                  View All Students
                </p>
              </>
            ) : (
              <p>No students found for your institute.</p>
            )}
          </section>

          <section className="teacher-dashboard-card quizzes">
            <h2>📚 Manage Your Quizzes</h2>
            <p>Review and edit the quizzes you’ve created for students</p>
            <p>Classify quizzes into different categories</p>
            <p
              onClick={() => {
                navigate('/teachercategory');
              }}
              className="view-more-btn"
            >
              View All Quizzes
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
