import { useState } from 'react';
import axios from 'axios';
import '../style.css';

const EmployeeForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/auth/employee_forgot_password', { email })
            .then(response => setMessage(response.data.message))
            .catch(error => {
                if (error.response) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage("Error sending reset link");
                }
            });
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-form">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit">Send Reset Link</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default EmployeeForgotPassword;