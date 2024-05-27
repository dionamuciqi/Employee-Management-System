import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignMeetMenu = () => {
  const [employees, setEmployees] = useState([]);
  const [meets, setMeets] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMeet, setSelectedMeet] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/employee');
        if (response.data.Status) {
          setEmployees(response.data.Result);
        } else {
          console.error(response.data.Error);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchMeets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/meets');
        if (response.data.Status) {
          setMeets(response.data.Result);
        } else {
          console.error(response.data.Error);
        }
      } catch (error) {
        console.error('Error fetching meets:', error);
      }
    };

    fetchEmployees();
    fetchMeets();
  }, []);

  const handleAssignMeet = async () => {
    try {
      const response = await axios.post('http://localhost:3000/admin/assign_meet', {
        employee_id: selectedEmployee,
        meet_id: selectedMeet,
      });
      if (response.data.Status) {
        alert('Meet assigned successfully');
        navigate('/dashboard');
      } else {
        console.error(response.data.Error);
      }
    } catch (error) {
      console.error('Error assigning meet:', error);
    }
  };

  return (
    <div>
      <h2>Assign Meet to Employee</h2>
      <div>
        <select onChange={(e) => setSelectedEmployee(e.target.value)}>
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedMeet(e.target.value)}>
          <option value="">Select Meet</option>
          {meets.map((meet) => (
            <option key={meet.mid} value={meet.mid}>
              {meet.topic}
            </option>
          ))}
        </select>
        <button onClick={handleAssignMeet}>Assign Meet</button>
      </div>
    </div>
  );
};

export default AssignMeetMenu;