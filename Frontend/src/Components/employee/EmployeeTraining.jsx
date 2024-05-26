import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeTraining = () => {
  const [trainings, setTrainings] = useState([]);
  const { id } = useParams(); // Përdorim 'id' për të marrë ID-në e punonjësit
//Ky rresht vlen nese eshte ne url id e punetorit
//Po ne rastin e juv e keni ne JWT qe eshte ma mire
  useEffect(() => {
    axios.get(`http://localhost:3000/employee/trainings`)
      .then(response => {
        if (response.data.Status) {
          setTrainings(response.data.Result);
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
          <div className="card text-dark bg-light">
            <div className="card-header">Training & Development</div>
            <div className="card-body">
              <ul className="list-group">
                {trainings.map(training => (
                  <li className="list-group-item" key={training.id}>
                    <div><strong>Trainer Name:</strong> {training.name}</div>
                    <div><strong>Qualification:</strong> {training.qualification}</div>
                    <div><strong>Email:</strong> {training.email}</div>
                    <div><strong>Department:</strong> {training.name}</div>
                    <div><strong>Training Mode:</strong> {training.training }</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTraining;
