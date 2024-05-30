import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      axios.post('http://localhost:3000/employee/employee_login', values)
        .then(result => {
          if (result.data.loginStatus) {
            localStorage.setItem("valid", true);
            navigate('/employeedashboard/employeeprofile');
          } else {
            setError(result.data.Error);
          }
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
    }
  });

  const handleBackToStart = () => {
    navigate('/'); 
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage position-relative'>
      <div className='p-3 rounded w-25 border loginForm'>
        <div className='text-warning'>
          {error && error}
        </div>
        <h2 className='textlogin'>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder='Enter Email'
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`form-control rounded-0 ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              autoComplete='off'
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              placeholder='Enter Password'
              name='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`form-control rounded-0 ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="invalid-feedback">{formik.errors.password}</div>
            ) : null}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0 mb-2' disabled={formik.isSubmitting}>
            Log in
          </button>
        </form>
        <button
          className='btn btn-outline-primary rounded-0 position-absolute top-0 start-0 mt-3 ms-3 d-flex align-items-center backButton'
          onClick={handleBackToStart}
        >
          <i className="bi bi-arrow-left me-1"></i>
        </button>
        <a href="/ForgotPassword" className="forgot-password-link">Forgot your password?</a>
      </div>
    </div>
  );
}

export default EmployeeLogin;
