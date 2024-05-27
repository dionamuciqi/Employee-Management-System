import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TasksManagement = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

    // Fetch tasks from the server when the component mounts
    axios.get('http://localhost:3000/auth/tasks')
      .then(response => {
        console.log('Fetched tasks:', response.data);
        setTasks(response.data.tasks);
        // Store tasks data in localStorage
        localStorage.setItem('tasks', JSON.stringify(response.data.tasks));
      })
      .catch(error => {
        console.error('There was an error fetching the tasks data!', error);
      });
  }, []);

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!employeeId.trim() || !taskDescription.trim()) {
      console.error('Employee ID and Task Description cannot be empty!');
      return;
    }

    const newTask = {
      employeeId: employeeId,
      description: taskDescription
    };

    console.log('Sending request data:', newTask);

    axios.post('http://localhost:3000/auth/tasks', newTask)
      .then(response => {
        console.log('Response from server:', response.data);
        setTasks(prevTasks => [...prevTasks, response.data.task]);
        setEmployeeId('');
        setTaskDescription('');
        console.log('Task added successfully!');

        // Update localStorage with the new tasks data
        const updatedTasks = [...tasks, response.data.task];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      })
      .catch(error => {
        console.error('There was an error adding the task!', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="card mb-4">
        <div className="card-header">
          <h4>Add Task</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddTask}>
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
              <label htmlFor="taskDescription" className="form-label">Task Description</label>
              <input
                type="text"
                className="form-control"
                id="taskDescription"
                value={taskDescription}
                onChange={handleTaskDescriptionChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Task</button>
          </form>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4>Tasks</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {tasks.map(task => (
              <li className="list-group-item" key={task.id}>
                <span>Employee ID: {task.employeeId}, Task: {task.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TasksManagement;
