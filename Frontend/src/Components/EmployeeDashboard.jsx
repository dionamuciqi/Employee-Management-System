import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const EmployeeDashboard = () => {
  const [trainings, setTrainings] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();
  const { employeeId } = useParams();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/employee/trainings');
        if (response.data.Status) {
          setTrainings(response.data.Result);
        } else {
          console.error(response.data.Error);
        }
      } catch (error) {
        console.error("There was an error fetching the trainings!", error);
      }
    };

    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/auth/employee_trainers/${employeeId}`);
        if (response.data.Status) {
          setTrainers(response.data.Result);
        } else {
          console.error(response.data.Error);
        }
      } catch (error) {
        console.error("There was an error fetching the trainers!", error);
      }
    };

    fetchTrainings();
    fetchTrainers();
  }, [employeeId]);

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
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/employeecertifications"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-award ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Certifications</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/employeetraining"
                  className="nav-link px-0 align-middle text-white"
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
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-clock-history ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Time & Attendance
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/employeepayroll"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-cash ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Payroll</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/employeeperformancereviews"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-journal-text ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Performance Reviews
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/employeebenefits"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-gift ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Benefits</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employeedashboard/employeenewsupdates"
                  className="nav-link px-0 align-middle text-white"
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
                  className="nav-link px-0 align-middle text-white"
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
          <div className="px-3 py-3">
            <h3>Your Trainings</h3>
            <ul>
              {trainings.map(training => (
                <li key={training.id}>
                  {training.name} - {training.training_mode}
                </li>
              ))}
            </ul>
            <h3>Your Trainers</h3>
            {trainers.length > 0 ? (
              <ul>
                {trainers.map(trainer => (
                  <li key={trainer.id}>
                    {trainer.name} - {trainer.qualification}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No trainers assigned.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
