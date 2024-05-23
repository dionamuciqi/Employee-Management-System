import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3000/verify')
        .then(result => {
            if(result.data.Status) {
                if(result.data.role === "admin") {
                    navigate('/dashboard')
                } else {
                    navigate('/employeedashboard')
                }
            }
        }).catch(err => console.log(err))
    }, [navigate])
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="p-4 rounded w-50 border loginForm">
                <h2 className="text-center mb-4">Login As</h2>
                <div className="d-flex justify-content-around">
                    <button type="button" className="btn btn-primary btn-lg px-4 py-3 custom-btn" onClick={() => {navigate('/employee_login')}}>
                        <i className="bi bi-person me-2"></i>Employee
                    </button>
                    <button type="button" className="btn btn-success btn-lg px-4 py-3 custom-btn" onClick={() => {navigate('/adminlogin')}}>
                        <i className="bi bi-shield-lock me-2"></i>Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Start;