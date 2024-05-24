import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Assuming you might want to use params in the future

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const { id } = useParams(); // Using useParams to demonstrate consistency, even if it's not used here

  useEffect(() => {
    fetchCertifications();
  }, [id]);

  const fetchCertifications = () => {
    axios.get('http://localhost:3000/employee/certifications')
      .then(response => {
        console.log('Fetched certifications response:', response.data);
        if (response.data.success) { // Assuming the response has a success field
          setCertifications(response.data.certifications); // Assuming the data structure is { certifications: [...] }
        } else {
          console.error('Error fetching certifications:', response.data.error);
        }
      })
      .catch(error => {
        console.error('Error fetching certifications:', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Certifications List</h4>
              <i className="bi bi-award-fill"></i> {/* Bootstrap icon for certification */}
            </div>
            <div className="card-body p-4">
              <ul className="list-group">
                {certifications.map(cert => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={cert.id}>
                    <div>
                      <h5 className="mb-1">{cert.certificationName}</h5>
                    </div>
                  </li>
                ))}
              </ul>
              {certifications.length === 0 && (
                <div className="alert text-center mt-3">
                  No certifications available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Certifications;
