import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState({});
    const [trainers, setTrainers] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/employee/detail/${id}`)
            .then(result => {
                setEmployee(result.data[0]);
                return axios.get(`http://localhost:3000/employee_trainers/${id}`);
            })
            .then(result => {
                if (result.data.Status) {
                    setTrainers(result.data.Result);
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid");
                    navigate('/');
                }
            }).catch(err => console.log(err));
    };

    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Employee Management System</h4>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                <img src={`http://localhost:3000/Images/${employee.image}`} className='emp_det_image' alt='Employee' />
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3>Name: {employee.name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Salary: ${employee.salary}</h3>
                </div>
                <div>
                    <button className='btn btn-primary me-2'>Edit</button>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3>Trainers:</h3>
                    {trainers.map(trainer => (
                        <div key={trainer.id}>
                            <h4>{trainer.name}</h4>
                            <p>Qualification: {trainer.qualification}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
