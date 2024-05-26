import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/employee/leaves', { withCredentials: true })
      .then(response => {
        console.log('Fetched leaves response:', response.data);
        if (response.data.success) {
          setLeaves(response.data.leaves);
        } else {
          console.error('Error fetching leaves:', response.data.error);
        }
      })
      .catch(error => {
        console.error('Error fetching leaves:', error);
      });
  }, []);

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">My Leaves</h4>
              <i className="bi bi-calendar3"></i>
            </div>
            <div className="card-body p-4">
              <ul className="list-group">
                {leaves.map(leave => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={leave.id}>
                    <div>
                      <h5 className="mb-1">{leave.leaveType}</h5>
                      <p className="mb-0">From: {leave.startDate} To: {leave.endDate}</p>
                    </div>
                  </li>
                ))}
              </ul>
              {leaves.length === 0 && (
                <div className="alert text-center mt-3">
                  No Leaves Available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLeaves;
