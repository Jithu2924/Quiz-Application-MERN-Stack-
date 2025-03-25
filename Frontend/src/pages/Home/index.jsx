import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const signupbtn = () => {
    navigate('/signup');
  };
  return (
    <div className="home">
      <div className="home-body">
        <img className="idea-img" src="idea.png" alt="" />
        <h1>Welcome to Quizly</h1>
        <p>
          Discover the ultimate quiz experience! Challenge your knowledge across
          a wide range of topics and see how high you can score. Quizly is your
          gateway to fun, learning, and a bit of friendly competition!
        </p>

        <div className="signup-box">
          <button className="signup-btn" onClick={signupbtn}>
            Sign Up for free
          </button>
          <div className="teacher-btn">
            <span
              onClick={() => {
                navigate('/teacherlogin');
              }}
            >
              I'm a teacher
            </span>
          </div>
        </div>
      </div>

      <div className="home-category-ad">
        <div className="hideoverflow" aria-hidden="true">
          <div
            className="category-scroll"
            style={{ backgroundColor: '#9be7ff' }}
          >
            <h3 className="category-title">Science</h3>
            <img src="biologypic.jpg" className="category-image" />
            <p className="category-content">
              Test your knowledge the world of Science.
            </p>
          </div>

          <div
            className="category-scroll"
            style={{ backgroundColor: '#f3b0ff' }}
          >
            <h3 className="category-title">Challenges</h3>
            <img src="leaderboardpic.png" className="category-image" />
            <p className="category-content">
              Compete with friends and track progress.
            </p>
          </div>

          <div
            className="category-scroll"
            style={{ backgroundColor: '#2633b0' }}
          >
            <h3 className="category-title" style={{ color: 'white' }}>
              Create
            </h3>
            <img src="teachingpic.png" className="category-image" />
            <p className="category-content" style={{ color: 'white' }}>
              Teachers can help us to Create or update quiz questions.
            </p>
          </div>

          <div
            className="category-scroll"
            style={{ backgroundColor: '#ffcc99' }}
          >
            <h3 className="category-title">Practice Tests</h3>
            <img src="testpic.png" className="category-image" />
            <p className="category-content">
              Test your knowledge different category of quizzes.
            </p>
          </div>

          <div
            className="category-scroll"
            style={{ backgroundColor: '#a6e3a1' }}
          >
            <h3 className="category-title">User Friendly</h3>
            <img src="uxpic.png" className="category-image" />
            <p className="category-content">Providing a best user experience</p>
          </div>
        </div>
        <div className="hideoverflow">
          <div
            className="category-scroll"
            style={{ backgroundColor: '#9be7ff' }}
          >
            <h3 className="category-title">Science</h3>
            <img src="biologypic.jpg" className="category-image" />
            <p className="category-content">
              Test your knowledge the world of Science.
            </p>
          </div>

          <div
            className="category-scroll"
            style={{ backgroundColor: '#f3b0ff' }}
          >
            <h3 className="category-title">Challenges</h3>
            <img src="leaderboardpic.png" className="category-image" />
            <p className="category-content">
              Compete with friends and track progress.
            </p>
          </div>

          <div
            className="category-scroll"
            style={{ backgroundColor: '#2633b0' }}
          >
            <h3 className="category-title" style={{ color: 'white' }}>
              Create
            </h3>
            <img src="teachingpic.png" className="category-image" />
            <p className="category-content" style={{ color: 'white' }}>
              Teachers can help us to Create or update quiz questions.
            </p>
          </div>

          <div
            className="category-scroll"
            style={{ backgroundColor: '#ffcc99' }}
          >
            <h3 className="category-title">Practice Tests</h3>
            <img src="testpic.png" className="category-image" />
            <p className="category-content">
              Test your knowledge different category of quizzes.
            </p>
          </div>

          <div
            className="category-scroll"
            style={{ backgroundColor: '#a6e3a1' }}
          >
            <h3 className="category-title">User Friendly</h3>
            <img src="uxpic.png" className="category-image" />
            <p className="category-content">Providing a best user experience</p>
          </div>
        </div>
      </div>

      <div className="aboutus-area">
        <div className="about-us">
          <div className="aboutus-left">
            <h2>About Us</h2>
            <p>
              Quizly is dedicated to providing a fun and engaging platform where
              users can enhance their knowledge in various subjects. Whether
              you're a student, a teacher, or someone who loves challenges,
              Quizly offers quizzes and tests across multiple categories to
              cater to all.
            </p>
            <p>
              Join us today and become part of our growing community of quiz
              enthusiasts!
            </p>
          </div>
          <img src="aboutus.gif" alt="" />
        </div>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="howitwork-desp">
          <img src="howitworks.gif" alt="" />
          <ol>
            <li>Sign up to create an account.</li>
            <li>Browse through various categories to find your quiz.</li>
            <li>Test your knowledge and earn rewards.</li>
            <li>Track your progress and challenge your friends!</li>
          </ol>
        </div>
      </div>

      <div className="testimonials">
        <div className="test-1">
          <h2>What Our Users Say</h2>
          <div className="testimonial-item">
            <p>
              "Quizly helped me improve my knowledge while making learning fun!"
            </p>
            <p>- Sarah, Student</p>
          </div>
        </div>
        <div className="test-2">
          <div className="testimonial-item">
            <p>
              "I love the challenges! It's a great way to test my progress."
            </p>
            <p>- John, Students</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src="logo.png" alt="Quizly Logo" />
            <h2>Quizly</h2>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3>Explore</h3>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Categories</a>
                </li>
                <li>
                  <a href="#">Challenges</a>
                </li>
                <li>
                  <a href="#">Practice Tests</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Support</h3>
              <ul>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Connect With Us</h3>
              <div className="social-icons">
                <a href="#">
                  <img src="facebook.png" alt="Facebook" />
                </a>
                <a href="#">
                  <img src="twitter.png" alt="Twitter" />
                </a>
                <a href="#">
                  <img src="instagram.png" alt="Instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Quizly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
