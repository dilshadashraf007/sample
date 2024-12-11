import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Logout = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      // Clear the token or session data (can be extended for other session cleanup if needed)
      localStorage.removeItem('token');
      setMessage('You have been successfully logged out.');
      setTimeout(() => {
        navigate('/'); // Redirect to home after logout
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setMessage('Logout failed. Please try again.');
    }
  };

  useEffect(() => {
    handleLogout(); // Call handleLogout immediately when component is loaded
  }, []);

  // Handle return to home directly if user does not want to wait for auto-logout
  const handleReturnHome = () => {
    navigate('/'); // Navigate to home page directly
  };

  return (
    <div className="logout-container">
      <h2>Logging Out...</h2>
      {message && <p>{message}</p>}
      
      {/* Return to Home button */}
      <button onClick={handleReturnHome} className="return-home-button">
        Return to Home
      </button>
    </div>
  );
};

export default Logout;
