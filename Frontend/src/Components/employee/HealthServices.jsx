import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const HealthServices = () => {
  const [healthServices, setHealthServices] = useState([]);

  useEffect(() => {
    fetchHealthServices();
  }, []);

  const fetchHealthServices = () => {
    axios.get('http://localhost:3000/employee/healthservices', { withCredentials: true })
      .then(response => {
        console.log('Fetched health services response:', response.data);
        if (response.data.success) {
          setHealthServices(response.data.healthServices);
        } else {
          console.error('Error fetching health services:', response.data.error);
        }
      })
      .catch(error => {
        console.error('Error fetching health services:', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Health Services</h4>
              <i className="bi bi-heart-pulse-fill"></i>
            </div>
            <div className="card-body p-4">
              <ul className="list-group">
                {healthServices.map(service => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={service.id}>
                    <div>
                      <h5 className="mb-1">{service.serviceName}</h5>
                      <p>{service.description}</p>
                      <small>{new Date(service.serviceDate).toLocaleDateString()}</small>
                    </div>
                  </li>
                ))}
              </ul>
              {healthServices.length === 0 && (
                <div className="alert text-center mt-3">
                  No Health Services Available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthServices;

