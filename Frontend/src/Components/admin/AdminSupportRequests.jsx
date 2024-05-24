import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminSupportRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/admin/support-requests')
      .then(response => {
        console.log('Fetched support requests:', response.data);
        if (response.data.success) {
          setRequests(response.data.support_requests);
        } else {
          console.error('Error fetching support requests:', response.data.error);
        }
      })
      .catch(error => {
        console.error('There was an error fetching support requests!', error);
      });
  }, []);

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              <h4 className="mb-0">Support Requests</h4>
            </div>
            <div className="card-body p-4">
              <ul className="list-group">
                {requests.map(request => (
                  <li className="list-group-item" key={request.id}>
                    <h5>{request.title}</h5>
                    <p>{request.description}</p>
                    <p><strong>Priority:</strong> {request.priority}</p>
                    <p><strong>Status:</strong> {request.status}</p>
                    <p><strong>Created At:</strong> {new Date(request.created_at).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(request.updated_at).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
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
