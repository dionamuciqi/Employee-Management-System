import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LeaveManagement = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // Load leaves from localStorage when the component mounts
    const storedLeaves = JSON.parse(localStorage.getItem('leaves')) || [];
    setLeaves(storedLeaves);

    // Fetch leaves from the server when the component mounts
    axios.get('http://localhost:3000/auth/leaves')
      .then(response => {
        console.log('Fetched leaves:', response.data);
        setLeaves(response.data);
        // Store leaves data in localStorage
        localStorage.setItem('leaves', JSON.stringify(response.data));
      })
      .catch(error => {
        console.error('There was an error fetching the leaves data!', error);
      });
  }, []);

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleAddLeave = (e) => {
    e.preventDefault();
    if (!employeeId.trim() || !leaveType.trim() || !startDate.trim() || !endDate.trim()) {
      console.error('All fields are required!');
      return;
    }

    const newLeave = {
      employeeId: employeeId,
      leaveType: leaveType,
      startDate: startDate,
      endDate: endDate
    };

    console.log('Sending request data:', newLeave);

    axios.post('http://localhost:3000/auth/leaves', newLeave)
      .then(response => {
        console.log('Response from server:', response.data);
        setLeaves(prevLeaves => [...prevLeaves, response.data.leave]);
        setEmployeeId('');
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        console.log('Leave added successfully!');

        // Update localStorage with the new leaves data
        const updatedLeaves = [...leaves, response.data.leave];
        localStorage.setItem('leaves', JSON.stringify(updatedLeaves));
      })
      .catch(error => {
        console.error('There was an error adding the leave!', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="card mb-4">
        <div className="card-header">
          <h4>Add Leave</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddLeave}>
            <div className="mb-3">
              <label htmlFor="employeeId" className="form-label">Employee ID</label>
              <input
                type="text"
                className="form-control"
                id="employeeId"
                value={employeeId}
                onChange={handleEmployeeIdChange}
              />
            </div>
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
            <button type="submit" className="btn btn-primary">Add Leave</button>
          </form>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4>Leaves</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {leaves.map(leave => (
              <li className="list-group-item" key={leave.id}>
                <span>{leave.leaveType} (Employee ID: {leave.employeeId}, Start Date: {leave.startDate}, End Date: {leave.endDate})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
