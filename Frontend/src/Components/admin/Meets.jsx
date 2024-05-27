import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Meets = () => {
  const [meets, setMeets] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('http://localhost:3000/auth/meets')
      .then(result => {
        debugger;
        if (result.data.Status) {
          setMeets(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (mid) => {
    debugger;
    axios.delete(`http://localhost:3000/auth/delete_meets/`+mid)
      .then(result => {
        if (result.data.Status) {
          setMeets(prevMeets => prevMeets.filter(meet => meet.mid !== mid));
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
          <h4 className="card-title">Meetings List</h4>
        </div>
        <div className="card-body">
          <Link to="/dashboard/add_meets" className="btn btn-success mt-4">
            Add Meetings
          </Link>
          <div className="mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Details</th>
                  <th>Meetings on</th>
                  <th>Meeting mode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {meets.map(meet => (
                  <tr key={meet.mid}>
                    <td>{meet.topic}</td>
                    <td>{meet.details}</td>
                    <td>{meet.meeting_date}</td>
                    <td>{meet.meeting_mode}</td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => handleDelete(meet.mid)}>Delete</button>
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

export default Meets;