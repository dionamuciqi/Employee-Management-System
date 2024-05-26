import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const HealthServicesManagement = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [description, setDescription] = useState('');
  const [healthServices, setHealthServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/healthservices')
      .then(response => {
        setHealthServices(response.data.healthServices);
      })
      .catch(error => console.error('There was an error fetching the health services data!', error));
  }, []);

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleServiceNameChange = (e) => {
    setServiceName(e.target.value);
  };

  const handleServiceDateChange = (e) => {
    setServiceDate(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddHealthService = (e) => {
    e.preventDefault();
    if (!employeeId.trim() || !serviceName.trim() || !serviceDate.trim()) {
      console.error('Employee ID, Service Name, and Service Date cannot be empty!');
      return;
    }

    const newHealthService = {
      employeeId,
      serviceName,
      serviceDate,
      description
    };

    axios.post('http://localhost:3000/auth/healthservices', newHealthService)
      .then(response => {
        setHealthServices(prevHealthServices => [...prevHealthServices, response.data.healthService]);
        setEmployeeId('');
        setServiceName('');
        setServiceDate('');
        setDescription('');
      })
      .catch(error => {
        console.error('There was an error adding the health service!', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="card mb-4">
        <div className="card-header">
          <h4>Add Health Service</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddHealthService}>
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
              <label htmlFor="serviceName" className="form-label">Service Name</label>
              <input
                type="text"
                className="form-control"
                id="serviceName"
                value={serviceName}
                onChange={handleServiceNameChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="serviceDate" className="form-label">Service Date</label>
              <input
                type="date"
                className="form-control"
                id="serviceDate"
                value={serviceDate}
                onChange={handleServiceDateChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add Health Service</button>
          </form>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4>Health Services</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {healthServices.map(service => (
              <li className="list-group-item" key={service.id}>
                <span>{service.serviceName} (Employee ID: {service.employeeId}, Date: {service.serviceDate})</span>
                <p>{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HealthServicesManagement;