import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Category from './pages/Category';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';
import Signup from './pages/signup';
import Login from './pages/login';
import { checkToken } from './utils/check-token';
import PrivateRoute from './components/PrivateRoute';
import StudentDashboard from './pages/studentdashboard';
import TeacherLogin from './pages/teacherlogin';
import TeacherDashboard from './pages/teacherDashboard';
import StudentList from './pages/teacher/studentlist';
import CategoryManagement from './pages/teacher/questioncategory';
import QuestionManagement from './pages/teacher/teacherquestion';
import TeacherSignup from './pages/teachersignup';
import StudentQuestion from './pages/student/studentquestion';
import StudentScore from './pages/student/studentscore';

const App = () => {
  const [count, setcount] = useState(0);
  const onclick = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    setcount(count + 1);
  };
  const loginhandle = () => {
    setcount(count + 1);
  };
  return (
    <>
      <nav>
        <div className="nav-box">
          <img src="/logoname.png" alt="Quizly Logo" />
          <div className="nav-items">
            <Link className="nav-link" to={'/'}>
              Home
            </Link>

            <Link className="nav-link" to={'/leaderboard'}>
              LeaderBoard
            </Link>
            {checkToken() ? (
              localStorage.getItem('role') == 'teacher' ? (
                <Link className="nav-link" to={'/teacherdashboard'}>
                  DashBoard
                </Link>
              ) : (
                <Link className="nav-link" to={'/studentdashboard'}>
                  DashBoard
                </Link>
              )
            ) : (
              <></>
            )}
            {checkToken() ? (
              <Link className="nav-link-btn" onClick={onclick} to={'/'}>
                Logout
              </Link>
            ) : (
              <Link className="nav-link-btn" to={'/login'}>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login logged={loginhandle} />} />
        <Route path="/teacher-signup" element={<TeacherSignup />} />
        <Route
          path="/teacherlogin"
          element={<TeacherLogin logged={loginhandle} />}
        />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/category" element={<Category />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/results" element={<Result />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/studentlist" element={<StudentList />} />
          <Route path="/teachercategory" element={<CategoryManagement />} />
          <Route
            path="/studentquestion/:category"
            element={<StudentQuestion />}
          />
          <Route path="/studentscore" element={<StudentScore />} />

          <Route
            path="/teacherquestion/:category"
            element={<QuestionManagement />}
          />
        </Route>

        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
};

export default App;
