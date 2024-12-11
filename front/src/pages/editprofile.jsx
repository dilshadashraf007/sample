import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css'; // Import your custom CSS

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee', // Default role, can be updated by the user
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(true); // Allow editing by default

  useEffect(() => {
    // Fetch user profile data when component is mounted
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!token) {
        setError('You must be logged in to view this page.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          password: '', // Password should not be pre-filled for security
        });
      } catch (err) {
        setError('Failed to fetch user profile.');
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array ensures this only runs once when component mounts

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true); // Start loading state

    const { name, email, password, role } = formData;

    // Validation
    if (!name || !email) {
      setError('Name and Email are required');
      setIsLoading(false); // End loading state
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/users/profile', 
        { name, email, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess('Profile updated successfully!');
      setIsEditable(false);  // Disable editing after successful update
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  const handleCancel = () => {
    setIsEditable(false); // Cancel edit mode and reset to non-editable
  };

  const handleReturnHome = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditable} // Disable input when not editable
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
            disabled={!isEditable} // Disable input when not editable
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
            disabled={!isEditable} // Disable input when not editable
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={!isEditable} // Disable input when not editable
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-actions">
          {isEditable ? (
            <>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Profile'}
              </button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button type="button" onClick={() => setIsEditable(true)}>Edit Profile</button>
          )}
        </div>
      </form>

      {/* Return to Home Button */}
      <div className="home-btn-container">
        <button
          type="button"
          className="home-btn"
          onClick={handleReturnHome} // Navigate to home page
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
