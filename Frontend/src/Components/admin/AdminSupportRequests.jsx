import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const AdminSupportRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/support-requests', { withCredentials: true })
      .then(response => {
        console.log('Fetched support requests:', response.data);
        if (response.data.success) {
          setRequests(response.data.help_requests);
        } else {
          console.error('Error fetching support requests:', response.data.error);
        }
      })
      .catch(error => {
        console.error('There was an error fetching support requests!', error);
      });
  }, []);

  const handleClearRequests = () => {
    axios.delete('http://localhost:3000/auth/clearall')
      .then(response => {
        if (response.data.success) {
          setRequests([]);
          console.log('Support requests cleared successfully');
        } else {
          console.error('Error clearing support requests:', response.data.error);
        }
      })
      .catch(error => {
        console.error('There was an error clearing support requests!', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header text-black d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Support Requests</h4>
              <button className="btn btn-danger" onClick={handleClearRequests}>Clear Requests</button>
            </div>
            <div className="card-body p-4">
              <div className="list-group">
                {requests.map(request => (
                  <div key={request.id} className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      <p className="mb-1"><strong>Employee: </strong>{request.name}</p>
                      <small>{<small><strong>{moment(request.startDate).format('YYYY-MM-DD')}</strong></small>}</small>
                    </div>
                    <p><strong>Phone Number: </strong>{request.phoneNumber}</p>
                    <p className="mb-1"><strong>Their Problem: </strong>{request.description}</p>
                    <small><strong>Priority of Problem: </strong>{request.priority}</small>
                  </div>
                ))}
              </div>
              {requests.length === 0 && (
                <div className="alert text-center mt-3">
                  No support requests available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSupportRequests;