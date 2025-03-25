import './login.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const Login = ({ logged }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('/user/login-student', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.name);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('id', response.data.userId);
      const instituteCode = response.data.code;
      if (instituteCode) {
        const res = await axios.get(`/institute/${instituteCode}`);
        localStorage.setItem('code', instituteCode);
        localStorage.setItem('institute', res.data);
      } else {
        localStorage.setItem('institute', 'Guest');
      }
      logged();
      navigate('/studentdashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-section">
      <div className="login-container">
        <h2>Login as a Student</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <Link to="/signup" className="accountnot">
          Don't have an account? Create one
        </Link>
        <Link to="/teacherlogin" className="accountnot">
          Teacher Login
        </Link>
      </div>
    </div>
  );
};

export default Login;
