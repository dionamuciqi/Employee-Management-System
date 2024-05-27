import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AttendanceManagement = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [lateEmployees, setLateEmployees] = useState([]);

  useEffect(() => {
    // Fetch attendance list from API
    axios.get(`http://localhost:3000/api/attendance?date=${selectedDate}`)
      .then(response => {
        setAttendanceList(response.data);
        // Filter late employees
        const lateEmployees = response.data.filter(employee => employee.status === 'late');
        setLateEmployees(lateEmployees);
      })
      .catch(error => {
        console.error('There was an error fetching the attendance data!', error);
      });
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="container px-5 mt-5">
      <h1 className="mt-5"></h1>
      <div className="card mb-4">
        <div className="card-header">
          <h4>Select Date</h4>
        </div>
        <div className="card-body">
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <h4>Attendance List</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {attendanceList.map(employee => (
              <li className={`list-group-item ${employee.status === 'late' ? 'list-group-item-warning' : ''}`} key={employee.id}>
                {employee.name} - {employee.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h4>Late Employees</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {lateEmployees.map(employee => (
              <li className="list-group-item list-group-item-warning" key={employee.id}>
                {employee.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
