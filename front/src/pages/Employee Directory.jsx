import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Employee Directory.css'; // Add your CSS file for styling

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee data from the server
    axios.get('http://localhost:5000/api/employees')
      .then(response => {
        setEmployees(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employee data', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading employee data...</p>;
  }

  return (
    <div className="employee-directory-container">
      <h2>Employee Directory</h2>

      <div className="employee-list">
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          employees.map(employee => (
            <div className="employee-card" key={employee._id}>
              <h3>{employee.name}</h3>
              <p><strong>Role:</strong> {employee.role}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Phone:</strong> {employee.phone}</p>
            </div>
          ))
        )}
      </div>

      <button onClick={() => navigate('/add-employee')} className="add-employee-btn">
        Add Employee
      </button>

      {/* Return to Home Button */}
      <button onClick={() => navigate('/')} className="return-home-btn">
        Return to Home
      </button>
    </div>
  );
};

export default EmployeeDirectory;
