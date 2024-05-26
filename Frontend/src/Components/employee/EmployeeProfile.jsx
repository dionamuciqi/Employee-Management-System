import { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/employee/profile')
      .then(response => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch profile');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Profile</h2>
      {employee && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{employee.name}</h5>
            <p className="card-text"><strong>Email:</strong> {employee.email}</p>
            <p className="card-text"><strong>Salary:</strong> ${employee.salary}</p>
            <p className="card-text"><strong>Address:</strong> {employee.address}</p>
            {employee.image && <img src={employee.image} alt="Profile" className="img-thumbnail" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;
