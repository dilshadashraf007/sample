import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './SingUp.css'; // Add your CSS file for styling

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee', // default role
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the sign-up form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true); // Start loading state

    const { name, email, password, role } = formData;

    // Validation
    if (!name || !email || !password) {
      setError('All fields are required');
      setIsLoading(false); // End loading state
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password, role });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>

        <div className="links">
          <p>Already have an account? <Link to="/login">Login</Link></p>
          <p> <Link to="/">Home Page</Link></p> {/* Home Page link */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
