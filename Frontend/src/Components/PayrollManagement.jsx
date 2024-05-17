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
    axios.post('http://localhost:3000/api/payroll', {
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

  const handleUpdateSalary = () => {
    // Implement the logic to update the salary
    // You can use axios.put or axios.patch to update the salary on the server
    // Example:
    // axios.patch(`http://localhost:3000/api/payroll/${employeeId}`, { salaryAmount: newSalary })
    //   .then(response => {
    //     console.log('Salary updated successfully!', response.data);
    //   })
    //   .catch(error => {
    //     console.error('There was an error updating the salary!', error);
    //   });
    if (!employeeId || !salaryAmount) {
      console.error('Please enter both Employee ID and Salary Amount to update.');
      return;
    }

    axios.patch(`http://localhost:3000/api/payroll/${employeeId}`, { salaryAmount: salaryAmount })
      .then(response => {
        console.log('Salary updated successfully!', response.data);
        // Optionally, you can reset the salary input field after successful update
        setSalaryAmount('');
      })
      .catch(error => {
        console.error('There was an error updating the salary!', error);
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
          <input
            type="text"
            className="form-control"
            value={salaryAmount}
            onChange={handleSalaryAmountChange}
          />
          <button type="button" className="btn btn-primary mt-3" onClick={handleUpdateSalary}>Update</button>
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
