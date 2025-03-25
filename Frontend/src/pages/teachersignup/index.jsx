import { useState } from 'react';
import axios from '../../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherSignup = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmpassword: '',
    instituteName: '',
    instituteCode: '',
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.instituteName || !formData.instituteCode) {
      toast.error('Institute Name and Code are required.');
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      await axios.post('/user/signup-teacher', formData);
      toast.success('Successfully Signed Up! Redirecting...');
      setTimeout(() => {
        navigate('/teacherlogin');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Teacher Sign Up</h2>
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
        <input
          type="text"
          name="instituteName"
          placeholder="Institute Name"
          value={formData.instituteName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="instituteCode"
          placeholder="Institute Code"
          value={formData.instituteCode}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/teacherlogin" className="accountnot">
        Already have an account? Login
      </Link>
    </div>
  );
};

export default TeacherSignup;
