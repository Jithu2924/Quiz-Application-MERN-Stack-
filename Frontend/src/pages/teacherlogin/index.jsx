import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const TeacherLogin = ({ logged }) => {
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
      const response = await axios.post('/user/login-teacher', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('teacherName', response.data.name);
      const res = await axios.get(`/institute/${response.data.code}`);
      localStorage.setItem('institute', res.data);
      localStorage.setItem('code', response.data.code);
      localStorage.setItem('role', response.data.role);
      logged();
      navigate('/teacherdashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login as a Teacher</h2>
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
      <Link to="/teacher-signup" className="accountnot">
        Don't have an account? Create one
      </Link>
      <Link to="/login" className="accountnot">
        Student Login
      </Link>
    </div>
  );
};

export default TeacherLogin;
