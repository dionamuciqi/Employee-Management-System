import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PayrollManagement = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleSalaryAmountChange = (e) => {
    setSalaryAmount(e.target.value);
  };

  const handlePaymentDateChange = (e) => {
    setPaymentDate(e.target.value);
  };

  const handlePayrollSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/payroll', {
      employeeId: employeeId,
      salaryAmount: salaryAmount,
      paymentDate: paymentDate
    })
    .then(response => {
      console.log('Payroll submitted successfully!', response.data);
      // Reset form fields after successful submission
      setEmployeeId('');
      setSalaryAmount('');
      setPaymentDate('');
    })
    .catch(error => {
      console.error('There was an error submitting payroll!', error);
    });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="card mb-4">
        <div className="card-header">
          <h4>Employee ID</h4>
        </div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            value={employeeId}
            onChange={handleEmployeeIdChange}
          />
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <h4>Salary Amount</h4>
        </div>
        <div className="card-body">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={salaryAmount}
              onChange={handleSalaryAmountChange}
            />
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <h4>Payment Date</h4>
        </div>
        <div className="card-body">
          <input
            type="date"
            className="form-control"
            value={paymentDate}
            onChange={handlePaymentDateChange}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handlePayrollSubmit}>Submit</button>
    </div>
  );
};

export default PayrollManagement;