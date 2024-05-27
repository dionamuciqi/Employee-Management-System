import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import profileImage from '/Images/photo.png';

const AdminProfile = () => {
    const [admin, setAdmin] = useState("");
    const getCookieValue = (name) => (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    );

    useEffect(() => {
        setAdmin(getCookieValue('email'));
    }, []);

    return (
        <div className="container px-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <div className="card">
                        <img src={profileImage} className="card-img-top rounded-circle" alt="Profile Picture"/>
                        <div className="card-body">
                        <div className="row justify-content-center mt-3">
                          <div className="col-md-6 text-center">
                            <div className='d-flex justify-content-center flex-column align-items-center'>
                              <div className='d-flex align-items-center flex-column mt-3'>
                                <h3>Email: {decodeURIComponent(admin)}</h3>
                              </div>
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

export default AdminProfile;
