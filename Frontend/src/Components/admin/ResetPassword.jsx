import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/auth/reset_password', { token, newPassword: password })
            .then(response => {
                setMessage(response.data.message);
                if (response.data.success) {
                    setTimeout(() => navigate('/'), 3000); // Redirect to login after 3 seconds
                }
            })
            .catch(error => {
                if (error.response) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage("Error resetting password");
                }
            });
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-form">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>New Password:</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
