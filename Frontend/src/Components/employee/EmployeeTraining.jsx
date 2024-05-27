import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeTraining = () => {
  const [trainings, setTrainings] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/trainings`, { withCredentials: true })
      .then(response => {
        if (response.data.Status) {
          setTrainings(response.data.Result);
        } else {
          console.error('Error fetching trainings:', response.data.error);
        }
      })
      .catch(error => {
        console.error('There was an error fetching trainings!', error);
      });
  }, [id]);

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Training & Development</h4>
              <i className="bi bi-journal"></i>
            </div>
            <div className="card-body p-4">
              <ul className="list-group">
                {trainings.map(training => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={training.id}>
                    <div>
                      <h5 className="mb-1">{training.name}</h5>
                      <div><strong>Qualification:</strong> {training.qualification}</div>
                      <div><strong>Email:</strong> {training.email}</div>
                      <div><strong>Department:</strong> {training.department}</div>
                      <div><strong>Training Mode:</strong> {training.training}</div>
                    </div>
                  </li>
                ))}
              </ul>
              {trainings.length === 0 && (
                <div className="alert alert-warning text-center mt-3">
                  No Trainings Available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTraining;
