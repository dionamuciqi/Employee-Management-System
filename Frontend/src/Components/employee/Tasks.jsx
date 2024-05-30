import { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:3000/employee/tasks', { withCredentials: true })
      .then(response => {
        console.log('Fetched tasks response:', response.data);
        if (response.data.success) {
          setTasks(response.data.tasks);
        } else {
          console.error('Error fetching tasks:', response.data.error);
        }
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Tasks List</h4>
              <i className="bi bi-list-task"></i>
            </div>
            <div className="card-body p-4">
              <ul className="list-group">
                {tasks.map(task => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
                    <div>
                      <h5 className="mb-1">Work Order: {task.description}</h5>
                    </div>
                  </li>
                ))}
              </ul>
              {tasks.length === 0 && (
                <div className="alert text-center mt-3">
                  No Tasks Available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
