import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styles for the calendar
import './Calendar.css'; // Custom styles for the calendar component

const CompanyCalendar = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]); // State to store events

  // Example event data, this can come from an API or database
  const eventData = [
    { date: new Date(2024, 10, 25), title: 'Company Meeting' },
    { date: new Date(2024, 10, 26), title: 'Client Call' },
    { date: new Date(2024, 11, 5), title: 'Team Building Activity' },
    { date: new Date(2024, 11, 12), title: 'End of Year Review' },
  ];

  useEffect(() => {
    // Simulate fetching data from API
    setEvents(eventData); 
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Check if the selected date has an event
  const isDateEvent = (date) => {
    return events.some((event) => event.date.toDateString() === date.toDateString());
  };

  // Function to handle navigating back to the homepage
  const handleReturnHome = () => {
    navigate('/'); // Navigates to the home page
  };

  // Format the selected date to display full day, date, month, and year
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long', // Day of the week (e.g., "Monday")
      year: 'numeric', // Full year (e.g., "2024")
      month: 'long', // Full month name (e.g., "November")
      day: 'numeric', // Day of the month (e.g., "25")
    });
  };

  return (
    <div className="calendar-container">
      <h2>Company Calendar</h2>
      
      {/* Calendar component */}
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileClassName={({ date }) => isDateEvent(date) ? 'event-day' : ''} // Apply 'event-day' class to dates with events
        next2Label={null} // Disables the next 2 months button for more control
        prev2Label={null} // Disables the previous 2 months button for more control
      />
      
      {/* Display the selected date in full format */}
      <p>Selected Date: {formatDate(date)}</p>

      {/* Display events for the selected day */}
      <div className="event-list">
        <h3>Events for the Day</h3>
        {events.filter(event => event.date.toDateString() === date.toDateString()).map((event, index) => (
          <div key={index} className="event">
            <p>{event.title}</p>
          </div>
        ))}
      </div>

    
      <button onClick={handleReturnHome} className="return-home-btn">Return to Home</button>
      
    </div>
  );
};

export default CompanyCalendar;
