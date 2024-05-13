import { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState(null)
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true)
          navigate('/dashboard')
        } else {
          setError(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }

  const handleBackToStart = () => {
    navigate('/') // Ndryshoni këtu për të kthyer në faqen fillestare
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage position-relative'>
      <div className='p-3 rounded w-25 border loginForm'>
        <div className='text-warning'>
          {error && error}
        </div>
        <h2 className='textlogin'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder='Enter Email' name='email'
              onChange={e => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' autoComplete='off' />
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter Password' name='password'
              onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
        </form>
        <button className='btn btn-outline-primary rounded-0 position-absolute top-0 start-0 mt-3 ms-3 d-flex align-items-center backButton' onClick={handleBackToStart}>
          <i className="bi bi-arrow-left me-1"></i>
        </button>
        <a href="/ForgotPassword" className="forgot-password-link">Forgot your password?</a>
      </div>
    </div>
  )
}

export default Login
