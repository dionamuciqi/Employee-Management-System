import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('http://localhost:3000/auth/trainers')
      .then(result => {
        if (result.data.Status) {
          setTrainers(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_trainers/${id}`)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/trainers');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container px-5 mt-5">
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="card-title">Trainers List</h4>
        </div>
        <div className="card-body">
          <Link to="/dashboard/add_trainers" className="btn btn-success mt-4">
            Add Trainers
          </Link>
          <div className="mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qualification</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {trainers.map(trainer => (
                  <tr key={trainer.id}>
                    <td>{trainer.name}</td>
                    <td>{trainer.qualification}</td>
                    <td>{trainer.email}</td>
                    <td>{trainer.address}</td>
                    <td>
                      <Link to={`/dashboard/edit_trainers/${trainer.id}`} className="btn btn-info btn-sm me-2">Edit</Link>
                      <button className="btn btn-warning btn-sm" onClick={() => handleDelete(trainer.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainers;
