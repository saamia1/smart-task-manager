import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './CalendarPannel.css'; 

function CalendarPanel({ onDateSelect }) {
  const [date, setDate] = useState(new Date());

  const handleChange = (newDate) => {
    setDate(newDate);
    onDateSelect(newDate);
  };

  return (
    <div className="calendar-panel-container">
      
      <div className="calendar-wrapper">
        <Calendar 
          onChange={handleChange} 
          value={date}
          className="custom-calendar"
        />
      </div>
    </div>
  );
}

export default CalendarPanel;
