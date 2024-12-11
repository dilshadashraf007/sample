import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './userfeedback.css';  // Make sure to add any additional CSS in this file

const UserFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!token) {
      setErrorMessage('You need to be logged in to submit feedback.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/feedbacks', 
        { message: feedback }, 
        { 
          headers: { Authorization: `Bearer ${token}` } // Send token in header
        }
      );
      setSuccessMessage('Thank you for your feedback!');
      setErrorMessage('');
      setFeedback('');
    } catch (err) {
      setErrorMessage('Failed to submit feedback. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleReturnHome = () => {
    navigate('/');  // Navigates back to homepage
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4, padding: 4, backgroundColor: '#f9fafb', borderRadius: 4 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          We Value Your Feedback
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          Help us improve! Please share your thoughts with us.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Your Feedback"
          multiline
          rows={6}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          variant="outlined"
          fullWidth
          required
          sx={{
            marginBottom: 2,
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px',  // Rounded corners for input
            }
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              borderRadius: 4,
              '&:hover': {
                backgroundColor: '#3b8bf2',
              }
            }}
          >
            Submit Feedback
          </Button>
          <Button
  variant="outlined"
  color="primary"  // Changed to 'primary' for more emphasis
  onClick={handleReturnHome}
  sx={{
    paddingX: 4,
    paddingY: 1.5,
    borderRadius: 4,
    fontWeight: 'bold',
    fontSize: '16px',
    borderColor: '#3b8bf2',  // Custom border color
    color: '#000000',  // Button text color
    '&:hover': {
      backgroundColor: '#0c0202', // Button background on hover
      color: '#3EB489',  // Change text color to white on hover
      borderColor: '#2c78d4', // Darker border color on hover
      boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',  // Add shadow effect
    },
  }}
>
  Return to Homepage
</Button>

        </Box>
      </form>

      {/* Success and Error Messages */}
      {successMessage && (
        <Alert severity="success" sx={{ marginTop: 2, borderRadius: 2 }}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ marginTop: 2, borderRadius: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </Container>
  );
};

export default UserFeedback;
