import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignTrainerMenu = () => {
  const [employees, setEmployees] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState('');
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

    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/trainers');
        if (response.data.Status) {
          setTrainers(response.data.Result);
        } else {
          console.error(response.data.Error);
        }
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchEmployees();
    fetchTrainers();
  }, []);

  const handleAssignTrainer = async () => {
    try {
      const response = await axios.post('http://localhost:3000/admin/assign_trainer', {
        employee_id: selectedEmployee,
        trainer_id: selectedTrainer,
      });
      if (response.data.Status) {
        alert('Trainer assigned successfully');
        navigate('/dashboard');
      } else {
        console.error(response.data.Error);
      }
    } catch (error) {
      console.error('Error assigning trainer:', error);
    }
  };

  return (
    <div>
      <h2>Assign Trainer to Employee</h2>
      <div>
        <select onChange={(e) => setSelectedEmployee(e.target.value)}>
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedTrainer(e.target.value)}>
          <option value="">Select Trainer</option>
          {trainers.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name}
            </option>
          ))}
        </select>
        <button onClick={handleAssignTrainer}>Assign Trainer</button>
      </div>
    </div>
  );
};

export default AssignTrainerMenu;
