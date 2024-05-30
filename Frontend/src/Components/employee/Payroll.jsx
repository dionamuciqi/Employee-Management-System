import { useState, useEffect } from 'react';
import axios from 'axios';

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = () => {
    axios.get('http://localhost:3000/employee/payrolls', { withCredentials: true })
      .then(response => {
        console.log('Fetched payrolls response:', response.data);
        if (response.data.success) {
          setPayrolls(response.data.payrolls);
        } else {
          console.error('Error fetching payrolls:', response.data.error);
        }
      })
      .catch(error => {
        console.error('Error fetching payrolls:', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Payroll List</h4>
              <i className="bi bi-gift-fill"></i>
            </div>
            <div className="card-body p-4">
              <ul className="list-group">
                {payrolls.map(payroll => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={payroll.id}>
                    <div>
                      <h5 className="mb-1">Amount: {payroll.amount}</h5>
                    </div>
                  </li>
                ))}
              </ul>
              {payrolls.length === 0 && (
                <div className="alert text-center mt-3">
                  No Payroll Available.
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
