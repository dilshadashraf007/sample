import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming you're adding a CSS file for styling

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true); // Start loading state

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // If login is successful, store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/Profile');  // Redirect to the dashboard (or any protected route)
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  // Function to navigate to the home page
  const handleGoHome = () => {
    navigate('/'); // Redirect to home page (or the route you want)
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Login'}
          </button>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>

        <div className="links">
          <a href="/forgot-password">Forgot Password?</a>
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>

        {/* Button to go back to Home Page */}
        <button className="go-home-btn" onClick={handleGoHome}>
          Return to Home Page
        </button>
      </div>
    </div>
  );
};

export default Login;
