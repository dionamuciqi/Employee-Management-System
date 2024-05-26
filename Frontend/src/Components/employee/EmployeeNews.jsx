import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const EmployeeNews = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/employee/announcements') 
      .then(response => {
        console.log('Fetched notifications response:', response.data);
        if (response.data.success) { 
          setNotifications(response.data.notifications); 
        } else {
          console.error('Error fetching notifications:', response.data.error);
        }
      })
      .catch(error => {
        console.error('There was an error fetching notifications!', error);
      });
  }, []);

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Notifications</h4>
              <i className="bi bi-bell-fill"></i> {}
            </div>
            <div className="card-body p-4">
              <ul className="list-group">
                {notifications.map(notification => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={notification.id}>
                    <div>
                      <h5 className="mb-1">{notification.message}</h5>
                      <small className="text-muted">{moment(notification.created_at).format('LLLL')}</small>
                    </div>
                  </li>
                ))}
              </ul>
              {notifications.length === 0 && (
                <div className="alert text-center mt-3">
                  No notifications available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeNews;