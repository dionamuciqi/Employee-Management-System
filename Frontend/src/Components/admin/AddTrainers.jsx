import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTrainers = () => {
    const [trainers, setTrainers] = useState({
        name: '',
        qualification: '',
        email: '',
        address: '',
        department_id: '',
        training_mode: '',
        employee_id: '',
    });
    const [department, setDepartment] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/department')
            .then(result => {
                if (result.data.Status) {
                    setDepartment(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:3000/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    setEmployees(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainers(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_trainers', trainers)
            .then(result => {
                if (result.data.Status) {
                    // Rifresko listën e trajnerëve në komponentin Trainers
                    navigate('/dashboard/trainers');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add Trainers</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            name="name"
                            placeholder="Enter Name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputQualification" className="form-label">Qualification</label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputQualification"
                            name="qualification"
                            placeholder="Enter Qualification"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            name="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputAddress"
                            name="address"
                            placeholder="1234 Main St"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="department" className="form-label">Department</label>
                        <select
                            name="department_id"
                            id="department"
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option value="">Select Department</option>
                            {department.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="trainingMode" className="form-label">Training Mode</label>
                        <select
                            name="training_mode"
                            id="trainingMode"
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option value="">Select Training Mode</option>
                            <option value="1">Physical</option>
                            <option value="2">Online</option>
                            <option value="3">Physical & Online</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="employee" className="form-label">Employee</label>
                        <select
                            name="employee_id"
                            id="employee"
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option value="">Select Employee</option>
                            {employees.map(e => (
                                <option key={e.id} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">Add Trainers</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTrainers;
