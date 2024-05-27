import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CertificationsManagement = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [certificationName, setCertificationName] = useState('');
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    // Load certifications from localStorage when the component mounts
    const storedCertifications = JSON.parse(localStorage.getItem('certifications')) || [];
    setCertifications(storedCertifications);

    // Fetch certifications from the server when the component mounts
    axios.get('http://localhost:3000/auth/certifications')
      .then(response => {
        console.log('Fetched certifications:', response.data);
        setCertifications(response.data);
        // Store certifications data in localStorage
        localStorage.setItem('certifications', JSON.stringify(response.data));
      })
      .catch(error => {
        console.error('There was an error fetching the certifications data!', error);
      });
  }, []);

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleCertificationNameChange = (e) => {
    setCertificationName(e.target.value);
  };

  const handleAddCertification = (e) => {
    e.preventDefault();
    if (!employeeId.trim() || !certificationName.trim()) {
      console.error('Employee ID and Certification Name cannot be empty!');
      return;
    }

    const newCertification = {
      employeeId: employeeId,
      certificationName: certificationName
    };

    console.log('Sending request data:', newCertification);

    axios.post('http://localhost:3000/auth/certifications', newCertification)
      .then(response => {
        console.log('Response from server:', response.data);
        setCertifications(prevCertifications => [...prevCertifications, response.data.certification]);
        setEmployeeId('');
        setCertificationName('');
        console.log('Certification added successfully!');

        // Update localStorage with the new certifications data
        const updatedCertifications = [...certifications, response.data.certification];
        localStorage.setItem('certifications', JSON.stringify(updatedCertifications));
      })
      .catch(error => {
        console.error('There was an error adding the certification!', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="card mb-4">
        <div className="card-header">
          <h4>Add Certification</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddCertification}>
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
              <label htmlFor="certificationName" className="form-label">Certification Name</label>
              <input
                type="text"
                className="form-control"
                id="certificationName"
                value={certificationName}
                onChange={handleCertificationNameChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Certification</button>
          </form>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4>Certifications</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {certifications.map(certification => (
              <li className="list-group-item" key={certification.id}>
                <span>{certification.certificationName} (Employee ID: {certification.employeeId})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CertificationsManagement;