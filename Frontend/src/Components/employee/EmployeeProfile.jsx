import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import profileImage from '/Images/photo.png';

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/employee/detail')
      .then(response => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch profile');
        setLoading(false);
      });
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="container px-5 mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6 text-center">
                <div className="card">
                    <img src={profileImage} className="card-img-top rounded-circle" alt="Profile Picture"/>
                    <div className="card-body">
                    <div className="row justify-content-center mt-1">
                      <div className="col-md-6 text-center">
                        <div className='d-flex justify-content-center flex-column align-items-center'>
                            <h4 className='flex '>Email: {decodeURIComponent(employee?.email)}</h4>
                          <h4>Emri: {employee?.name}</h4>
                          <h4>Adresa: {employee?.address}</h4>
                          <h4> Salary: {employee?.salary}$</h4>
                        </div>
                      </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
     );
};

export default EmployeeProfile;
