import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BenefitsManagement = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [amount, setAmount] = useState('');
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    // Load benefits from localStorage when the component mounts
    const storedBenefits = JSON.parse(localStorage.getItem('benefits')) || [];
    setBenefits(storedBenefits);

    // Fetch benefits from the server when the component mounts
    axios.get('http://localhost:3000/auth/benefits')
      .then(response => {
        console.log('Fetched benefits:', response.data);
        setBenefits(response.data.benefits);
        // Store benefits data in localStorage
        localStorage.setItem('benefits', JSON.stringify(response.data.benefits));
      })
      .catch(error => {
        console.error('There was an error fetching the benefits data!', error);
      });
  }, []);

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAddBenefit = (e) => {
    e.preventDefault();
    if (!employeeId.trim() || !amount.trim()) {
      console.error('Employee ID and Amount cannot be empty!');
      return;
    }

    const newBenefit = {
      employeeId: employeeId,
      amount: amount
    };

    console.log('Sending request data:', newBenefit);

    axios.post('http://localhost:3000/auth/benefits', newBenefit)
      .then(response => {
        console.log('Response from server:', response.data);
        setBenefits(prevBenefits => [...prevBenefits, response.data.benefit]);
        setEmployeeId('');
        setAmount('');
        console.log('Benefit added successfully!');

        // Update localStorage with the new benefits data
        const updatedBenefits = [...benefits, response.data.benefit];
        localStorage.setItem('benefits', JSON.stringify(updatedBenefits));
      })
      .catch(error => {
        console.error('There was an error adding the benefit!', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="card mb-4">
        <div className="card-header">
          <h4>Add Benefit</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddBenefit}>
            <div className="mb-3">
              <label htmlFor="employeeId" className="form-label">Employee ID</label>
              <input
                type="text"
                className="form-control"
                id="employeeId"
                value={employeeId}
                onChange={handleEmployeeIdChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Benefit</button>
          </form>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4>Benefits</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {benefits.map(benefit => (
              <li className="list-group-item" key={benefit.id}>
                <span>Employee ID: {benefit.employeeId}, Amount: {benefit.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BenefitsManagement;
