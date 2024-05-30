import { useState, useEffect } from 'react';
import axios from 'axios';

const Benefits = () => {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = () => {
    axios.get('http://localhost:3000/employee/benefits', { withCredentials: true })
      .then(response => {
        console.log('Fetched benefits response:', response.data);
        if (response.data.success) {
          setBenefits(response.data.benefits);
        } else {
          console.error('Error fetching benefits:', response.data.error);
        }
      })
      .catch(error => {
        console.error('Error fetching benefits:', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Benefits List</h4>
              <i className="bi bi-gift-fill"></i>
            </div>
            <div className="card-body p-4">
              <ul className="list-group">
                {benefits.map(benefit => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={benefit.id}>
                    <div>
                      <h5 className="mb-1"> Bonuses <h6>{benefit.amount}%</h6></h5>
                    </div>
                  </li>
                ))}
              </ul>
              {benefits.length === 0 && (
                <div className="alert text-center mt-3">
                  No Benefits Available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
