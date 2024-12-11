import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Task.css';

const Task = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState([]); // State for notifications
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State to control notification panel visibility
  const [tasks, setTasks] = useState([]); // State to store user tasks
  const [newTask, setNewTask] = useState(''); // State to manage new task input
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');  // Retrieve token from localStorage

      if (!token) {
        setError('You must be logged in to view this page.');
        return;
      }

      try {
        // Fetch the user profile using the token in Authorization header
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in header
          },
        });

        setUserProfile(response.data); // Store profile data from backend
      } catch (err) {
        setError('Failed to fetch user profile.');
      }
    };

    fetchUserProfile();

    // Fetch notifications for the user (example API endpoint)
    const fetchNotifications = async () => {
      try {
        const notificationResponse = await axios.get('http://localhost:5000/api/notifications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotifications(notificationResponse.data); // Set notifications
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };

    fetchNotifications();

    // Fetch tasks for the user (example API endpoint)
    const fetchTasks = async () => {
      try {
        const taskResponse = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTasks(taskResponse.data); // Set tasks
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };

    fetchTasks();
  }, []); 

  // Function to toggle notification panel visibility
  const toggleNotificationPanel = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  // Handle new task submission
  const handleAddTask = async () => {
    if (!newTask) return; // Do nothing if the task input is empty

    try {
      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        { task: newTask },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTasks([...tasks, response.data]); // Add the new task to the tasks list
      setNewTask(''); // Clear the task input
    } catch (err) {
      console.error('Failed to add task:', err);
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
      <h2>User Profile</h2>
      <div className="profile-content">
        <div className="profile-left">
          {/* Displaying the user's photo */}
          {userProfile.photo ? (
            <img
              src={userProfile.photo} // Assuming photo is a URL or base64 string
              alt="User Profile"
              className="profile-photo"
            />
          ) : (
            <div className="profile-photo-placeholder">No Photo</div>
          )}
        </div>
        <div className="profile-right">
          <div className="profile-details">
            <p><strong>Name:</strong> {userProfile.name}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Role:</strong> {userProfile.role}</p>
            <p><strong>Location:</strong> {userProfile.location || 'Not provided'}</p>
            <p><strong>Joined:</strong> {new Date(userProfile.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="profile-actions">
            {/* Navigate to the Edit Profile page */}
            <button className="edit-btn" onClick={() => navigate('/edit-profile')}>
              Edit Profile
            </button>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem('token');
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>

          {/* Notification Icon and Panel */}
          <div className="notification-container">
            <button className="notification-icon" onClick={toggleNotificationPanel}>
              <span role="img" aria-label="bell">🔔</span> {/* Notification Bell */}
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

          {/* User Tasks Section */}
          <div className="tasks-container">
            <h3>Your Tasks</h3>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="task-input"
            />
            <button className="add-task-btn" onClick={handleAddTask}>
              Add Task
            </button>
            <ul className="task-list">
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <li key={index} className="task-item">
                    <p>{task.task}</p>
                  </li>
                ))
              ) : (
                <p>No tasks available.</p>
              )}
            </ul>
          </div>

          {/* Home Page Button */}
          <div className="home-btn-container">
            <button
              className="home-btn"
              onClick={() => navigate('/')} // Navigate to the homepage
            >
              Go to Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
