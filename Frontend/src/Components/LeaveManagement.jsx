import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LeaveManagement = () => {
  const [leaveList, setLeaveList] = useState([]);
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch leave list from API
    axios.get(`http://localhost:3000/api/leave`)
      .then(response => {
        setLeaveList(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the leave data!', error);
      });
  }, []);

  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleAddLeave = () => {
    axios.post('http://localhost:3000/api/leave', {
      leaveType: leaveType,
      startDate: startDate,
      endDate: endDate
    })
      .then(response => {
        setLeaveList([...leaveList, response.data]);
        setLeaveType('');
        setStartDate('');
        setEndDate('');
      })
      .catch(error => {
        console.error('There was an error adding the leave!', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <h1 className="mt-5"></h1>
      <div className="card mb-4">
        <div className="card-header">
          <h4>Add Leave</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="leaveType" className="form-label">Leave Type</label>
            <input
              type="text"
              className="form-control"
              id="leaveType"
              value={leaveType}
              onChange={handleLeaveTypeChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleAddLeave}>Add Leave</button>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <h4>Leave List</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {leaveList.map(leave => (
              <li className="list-group-item" key={leave.id}>
                Type: {leave.leaveType} | Start Date: {leave.startDate} | End Date: {leave.endDate}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
