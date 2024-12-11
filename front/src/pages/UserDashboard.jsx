import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Typography, Container } from '@mui/material';
import './userdashboar.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user details from the backend (or use any existing API)
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token for authentication
        },
      });
      setUser(response.data);
    } catch (err) {
      setError('Error fetching user details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch user details after component mounts
    fetchUserDetails();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      <Container sx={{ textAlign: 'center', marginTop: 5 }}>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: 3 }}>
            Welcome to your Dashboard
          </Typography>

          {isLoading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : error ? (
            <Typography variant="h6" color="error">{error}</Typography>
          ) : (
            <Box>
              <Typography variant="h5">Hello, {user?.name || 'User'}!</Typography>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                Email: {user?.email || 'Not Available'}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                Role: {user?.role || 'User'}
              </Typography>

              {/* Button to navigate to profile page */}
              <Box sx={{ marginTop: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/profile')}
                >
                  Edit Profile
                </Button>
              </Box>

              {/* Button to view tasks */}
              <Box sx={{ marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/tasks')}
                >
                  View Tasks
                </Button>
              </Box>

              {/* Logout Button */}
              <Box sx={{ marginTop: 3 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          )}

          {/* Return to Home Button at the bottom */}
          <Box sx={{ marginTop: 5 }}>
            <Button
              variant="outlined"
              color="#00000"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default UserDashboard;
