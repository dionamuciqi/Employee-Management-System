import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMeets = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [meets, setMeets] = useState({
        topic: '',
        details: '',
        meeting_date: '',
        meeting_mode: '', 
        employee_id: '',
    });
    //commit for branch
    const [employees, setEmployees] = useState([]);    
    const navigate = useNavigate();

    useEffect(() => {
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
        setMeets(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {

        axios.post('http://localhost:3000/auth/add_meets', meets)
            .then(result => {
                if (result.data.Status) {
                    // Rifresko listën e meetings në komponentin Meetings
                    navigate('/dashboard/meets');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add Meetings</h3>
                <form  className="row g-1" >
                    <div className="col-12">
                        <label htmlFor="inputTopic" className="form-label">Topic</label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputTopic"
                            name="topic"
                            placeholder="Enter Topic"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputDetails" className="form-label">Details</label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputDetails"
                            name="details"
                            placeholder="Enter Details"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputMeetingDate" className="form-label">Meeting Date</label>
                        <input
                            type="date"
                            className="form-control rounded-0"
                            id="inputMeetingDate"
                            name="meeting_date"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="meetingMode" className="form-label">Meeting Mode</label>
                        <select
                            name="meeting_mode"
                            id="meetingMode"
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option value="">Select Meeting Mode</option>
                            <option value="1">Physical</option>
                            <option value="2">Online</option>
                        </select>
                    </div>                    
                    <div className="col-12">
                        <label htmlFor="employeeId" className="form-label">Employee ID</label>
                        <select
                            name="employee_id"
                            id="employeeId"
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option value="">Select Employee</option>
                            {employees.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="button" onClick={()=>handleSubmit()} className="btn btn-primary w-100">Add Meetings</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddMeets;