// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import '../style.css'; // Import the CSS file

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      })
      .catch(err => console.error("There was an error during logout!", err));
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-2 col-xl-3 px-sm-3 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/employeedashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline"></span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/employeedashboard/employeeprofile"
                  className={`nav-link px-0 align-middle text-white ${isActive('/employeedashboard/employeeprofile')}`}
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/certifications"
                  className={`nav-link px-0 align-middle text-white ${isActive('/employeedashboard/certifications')}`}
                >
                  <i className="fs-4 bi-award ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Certifications</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/employeetraining"
                  className={`nav-link px-0 align-middle text-white ${isActive('/employeedashboard/employeetraining')}`}
                >
                  <i className="fs-4 bi-journal-text ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Training & Development
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/employetimeattendance"
                  className={`nav-link px-0 align-middle text-white ${isActive('/employeedashboard/employetimeattendance')}`}
                >
                  <i className="fs-4 bi-clock-history ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Time & Attendance
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/myleaves"
                  className={`nav-link px-0 align-middle text-white ${isActive('/employeedashboard/myleaves')}`}
                >
                  <i className="fs-4 bi-calendar3 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">My Leaves</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/payroll"
                  className={`nav-link px-0 align-middle text-white ${isActive('/employeedashboard/payroll')}`}
                >
                  <i className="fs-4 bi-cash ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Payroll</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/healthservices"
                  className={`nav-link px-0 align-middle text-white ${isActive('/employeedashboard/healthservices')}`}
                >
                  <i className="fs-4 bi-heart-pulse ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Service of Health</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/employeeperformancereviews"
                  className={`nav-link px-0 align-middle text-white ${isActive('/employeedashboard/employeeperformancereviews')}`}
                >
                  <i className="fs-4 bi-journal-text ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Performance Reviews
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/benefits"
                  className={`nav-link px-0 align-middle text-white ${isActive('/employeedashboard/benefits')}`}
                >
                  <i className="fs-4 bi-gift ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Benefits</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/employeenews"
                  className={`nav-link px-0 align-middle text-white ${isActive('/employeedashboard/employeenews')}`}
                >
                  <i className="fs-4 bi-newspaper ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Company News & Updates
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/employeehelpsupport"
                  className={`nav-link px-0 align-middle text-white ${isActive('/employeedashboard/employeehelpsupport')}`}
                >
                  <i className="fs-4 bi-question-circle ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Help & Support
                  </span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
          </div>
        </div>
      </div>
  );
};

export default EmployeeDashboard;
