// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if(result.data.Status) { 
          localStorage.removeItem("valid");
          navigate('/');
        }
      });
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-3 px-sm-3 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
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
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Employees</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/trainers"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-diagram-2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Trainers</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/department"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-briefcase ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Department</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/tasksmanagement"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-clock ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Task Management
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/leavemanagement"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-calendar3 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Leave Management</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/meets"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-calendar3 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Meets</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/certificationsmanagement"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-calendar3 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Certifications</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/payrollmanagement"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-currency-dollar ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Payroll Management</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/healthservicesmanagement"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-heart-pulse ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Health Service Management</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/notificationsandannouncements"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-bell ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Notifications & Announcements</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/adminsupportrequests"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Support Requests</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/benefitsmanagement"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Benefits</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/annualplans"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Annual Plans</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
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

export default Dashboard;
