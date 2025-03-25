import './signup.css';
import { useState } from 'react';
import axios from '../../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmpassword: '',
    instituteCode: '',
    isGuest: false,
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.isGuest && !formData.instituteCode) {
      toast.error('Institute Code is required for student signup.');
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      await axios.post('/user/signup-student', formData);
      toast.success('Successfully Signed Up!');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="login-section">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="signup-container">
        <h2>Sign Up as a Student</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            value={formData.fname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={formData.lname}
            onChange={handleChange}
            required
          />
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
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
          {!formData.isGuest && (
            <input
              type="text"
              name="instituteCode"
              placeholder="Institute Code"
              value={formData.instituteCode}
              onChange={handleChange}
              required
            />
          )}
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isGuest"
              checked={formData.isGuest}
              onChange={handleChange}
            />
            Sign up as a Guest
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <Link to="/login" className="accountnot">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
