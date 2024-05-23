import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    // Fetch admin data from API
    axios.get('http://localhost:3000/api/admin')
      .then(response => {
        setAdminData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching admin data!', error);
      });
  }, []);

  return (
    <div className="container px-5 mt-5">
      <h2 className="mt-5">Admin Profile</h2>
      {adminData ? (
        <div className="card mb-4">
          <div className="card-header">
            <h4>Admin Information</h4>
          </div>
          <div className="card-body">
            <p><strong>Name:</strong> {adminData.name}</p>
            <p><strong>Email:</strong> {adminData.email}</p>
            {/* Add more admin data fields here */}
          </div>
        </div>
      ) : (
        <p>Loading admin data...</p>
      )}
    </div>
  );
};

export default Profile;
