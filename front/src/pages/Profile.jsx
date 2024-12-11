import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [workType, setWorkType] = useState('work-from-home');
  const [workDate, setWorkDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
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
        setUserProfile(response.data);
        setAttendanceStatus(response.data.attendance || 'Not provided');
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to fetch user profile.');
      }
    };

    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const notificationResponse = await axios.get('http://localhost:5000/api/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(notificationResponse.data);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };

    fetchUserProfile();
    fetchNotifications();
  }, []);

  const toggleNotificationPanel = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleWorkTypeChange = (e) => {
    setWorkType(e.target.value);
  };

  const handleWorkDateChange = (e) => {
    setWorkDate(e.target.value);
  };

  const handleAttendanceChange = (e) => {
    setAttendanceStatus(e.target.value);
  };

  const handleSubmitWorkType = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to update your work type.');
      setIsLoading(false);
      return;
    }

    if (!workDate) {
      setError('Please select a date.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/update-work-type',
        { workType, workDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage('Work type updated successfully!');
    } catch (err) {
      console.error('Error updating work type:', err);
      setError('Failed to update work type.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to update your attendance.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/update-attendance',
        { attendanceStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage('Attendance updated successfully!');
    } catch (err) {
      console.error('Error updating attendance:', err);
      setError('Failed to update attendance.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!userProfile) {
    return <p className="loading-text">Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-content">
          <div className="profile-left">
            {userProfile.photo ? (
              <img src={userProfile.photo} alt="User Profile" className="profile-photo" />
            ) : (
              <div className="profile-photo-placeholder">No Photo</div>
            )}
          </div>
          <div className="profile-right">
            <div className="profile-details">
              <p><strong>Name:</strong> {userProfile.data.name}</p>
              <p><strong>Email:</strong> {userProfile.data.email}</p>
              <p><strong>Role:</strong> {userProfile.data.role}</p>
              <p><strong>Location:</strong> {userProfile.location || 'Not provided'}</p>
              <p><strong>Joined:</strong> {new Date(userProfile.createdAt).toLocaleDateString()}</p>
              <p><strong>Attendance:</strong> {attendanceStatus}</p>
              <p><strong>Work Type:</strong> {userProfile.workType || 'Not provided'}</p>
            </div>

            <div className="profile-actions">
              <button className="edit-btn" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
              <button className="logout-btn" onClick={() => {
                localStorage.removeItem('token');
                window.location.reload();
              }}>Logout</button>
            </div>
<br></br>
<br></br>
            <div className="attendance-section">
              <h3>Update Attendance</h3>
              <form onSubmit={handleAttendanceSubmit}>
                <div className="form-group">
                  <label>Attendance Status:</label>
                  
                  <select value={attendanceStatus} onChange={handleAttendanceChange} required>
                    <br></br>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="sick-leave">Sick Leave</option>
                  </select>
                </div>

                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Updating Attendance...' : 'Update Attendance'}
                </button>
              </form>

              {successMessage && <p className="success">{successMessage}</p>}
            </div>

            <div className="work-type-section">
              <h3>Set Work Type for a Specific Date</h3>
              <form onSubmit={handleSubmitWorkType}>
                <div className="form-group">
                  <label>Select Date:</label>
                  <input
                    type="date"
                    value={workDate}
                    onChange={handleWorkDateChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Work Type:</label>
                  <select value={workType} onChange={handleWorkTypeChange} required>
                    <option value="work-from-home">Work from Home</option>
                    <option value="work-from-office">Work from Office</option>
                  </select>
                </div>

                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Updating Work Type...' : 'Update Work Type'}
                </button>
              </form>

              {successMessage && <p className="success">{successMessage}</p>}
            </div>

            {/* Notification Panel */}
            <div className="notification-container">
              <button className="notification-icon" onClick={toggleNotificationPanel}>
                <span role="img" aria-label="bell">🔔</span>
              </button>

              {isNotificationOpen && (
                <div className="notification-panel">
                  <h4>Notifications</h4>
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications.map((notification, index) => (
                        <li key={index}>
                          <p>{notification.message}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No notifications available.</p>
                  )}
                </div>
              )}
            </div>

            <div className="home-btn-container">
              <button className="home-btn" onClick={() => navigate('/')}>Go to Home Page</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
