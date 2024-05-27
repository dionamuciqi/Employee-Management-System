import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskManagement = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

    // Fetch tasks from the server when the component mounts
    axios.get('http://localhost:3000/auth/tasks')
      .then(response => {
        console.log('Fetched tasks:', response.data);
        setTasks(response.data);
        // Store tasks data in localStorage
        localStorage.setItem('tasks', JSON.stringify(response.data));
      })
      .catch(error => {
        console.error('There was an error fetching the tasks data!', error);
      });
  }, []);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName.trim()) {
      console.error('Task name cannot be empty!');
      return;
    }

    const newTask = {
      taskName: taskName,
      completed: false
    };

    console.log('Sending request data:', newTask);

    axios.post('http://localhost:3000/auth/tasks', newTask)
      .then(response => {
        console.log('Response from server:', response.data);
        setTasks(prevTasks => [...prevTasks, response.data]);
        setTaskName('');
        console.log('Task added successfully!');

        // Update localStorage with the new tasks data
        const updatedTasks = [...tasks, response.data];
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
              <label htmlFor="taskName" className="form-label">Task Name</label>
              <input
                type="text"
                className="form-control"
                id="taskName"
                value={taskName}
                onChange={handleTaskNameChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Task</button>
          </form>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <h4>Tasks</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {tasks.map(task => (
              <li className="list-group-item" key={task.id}>
                <span>{task.taskName}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
