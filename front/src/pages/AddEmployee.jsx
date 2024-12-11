import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css';  // Add your own CSS for styling

const AddEmployee = () => {
  const navigate = useNavigate();  // Initialize navigate hook
  const [employeeData, setEmployeeData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validate required fields
    const { name, email, phone, role } = employeeData;
    if (!name || !email || !phone || !role) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:5000/api/employees', employeeData);
      setSuccess('Employee added successfully!');
      setTimeout(() => navigate('/employee-directory'), 2000);  // Redirect to Employee Directory
    } catch (err) {
      setError('Error adding employee: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle return to home
  const handleReturnHome = () => {
    navigate('/');  // Redirect to the home page
  };

  return (
    <div className="add-employee-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            required
            placeholder="Enter employee name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            required
            placeholder="Enter employee email"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={employeeData.phone}
            onChange={handleChange}
            required
            placeholder="Enter employee phone"
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={employeeData.role}
            onChange={handleChange}
            required
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding Employee...' : 'Add Employee'}
        </button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>

      {/* Button to return to the home page */}
      <button className="return-home-btn" onClick={handleReturnHome}>
        Return to Home
      </button>
    </div>
  );
};

export default AddEmployee;
