import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminFeedback.css';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch feedbacks from the API
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('/api/feedbacks'); // Replace with your API endpoint
        setFeedbacks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load feedbacks. Please try again later.');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/feedbacks/${id}`); // Replace with your delete API endpoint
      setFeedbacks(feedbacks.filter(feedback => feedback.id !== id)); // Remove deleted feedback
    } catch (err) {
      alert('Failed to delete feedback. Please try again.');
    }
  };

  return (
    <div className="admin-feedback-container">
      <h1>Admin Feedback</h1>

      {loading && <p>Loading feedbacks...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && feedbacks.length === 0 && <p>No feedback available.</p>}

      {!loading && feedbacks.length > 0 && (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Feedback</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
                <td>{feedback.user}</td>
                <td>{feedback.message}</td>
                <td>{new Date(feedback.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(feedback.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminFeedback;
