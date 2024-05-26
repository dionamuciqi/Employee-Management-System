import { useState, useEffect } from 'react';
import axios from 'axios';

const Payroll = () => {
  const [payroll, setPayroll] = useState([]);

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = () => {
    axios.get('http://localhost:3000/employee/payroll')
      .then(response => {
        console.log('Fetched payroll response:', response.data);
        if (response.data.success) {
          setPayroll(response.data.payroll);
        } else {
          console.error('Error fetching payroll:', response.data.error);
        }
      })
      .catch(error => {
        console.error('Error fetching payroll:', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Payroll Information</h4>
              <i className="bi bi-cash"></i>
            </div>
            <div className="card-body p-4">
              <ul className="list-group">
                {payroll.map(item => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                    <div>
                         <h5 className="mb-1">Employee ID: {item.employeeId}</h5>
                         <p className="mb-1">Salary Amount: ${item.salaryAmount}</p>
                         <p className="mb-1">Payment Date: {item.paymentDate}</p>
                     </div>
                  </li>
                ))}
              </ul>
              {payroll.length === 0 && (
                <div className="alert text-center mt-3">
                  No Payroll Information Available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Payroll;
