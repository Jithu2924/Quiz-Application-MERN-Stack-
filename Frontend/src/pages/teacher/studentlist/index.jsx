import './studentlist.css';
import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/list/students', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const res = await axios.get('/score');

        setScores(res.data);
        setStudents(response.data);
      } catch (err) {
        setError('Failed to fetch student data');
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="student-list-container">
      <div className="student-list-main">
        <h1 className="student-list-title">📋 Student List</h1>

        {error ? (
          <p className="error-message">{error}</p>
        ) : students.length > 0 ? (
          <table className="student-table">
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Name</th>
                <th>Attended Quizzes</th>
                <th>Scores</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={student._id}>
                  <td>{i + 1}</td>
                  <td>
                    {student.fname} {student.lname}
                  </td>
                  <td>
                    {scores.some(s => s.studentId === student._id)
                      ? scores.map(s =>
                          s.studentId === student._id ? (
                            <p key={s._id}>{s.category}</p>
                          ) : null
                        )
                      : 0}
                  </td>
                  <td>
                    {scores.some(s => s.studentId === student._id) ? (
                      scores.map(s =>
                        s.studentId === student._id ? (
                          <p key={s.studentId}>
                            {s.score}/{s.maxscore}
                          </p>
                        ) : null
                      )
                    ) : (
                      <>-</>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students found for your institute.</p>
        )}
      </div>
    </div>
  );
};

export default StudentList;
