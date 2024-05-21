import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeNews = () => {
  const [notifications, setNotifications] = useState([]);
  const { id } = useParams(); // Përdorim 'id' në vend të 'employee_id'
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [readStatus, setReadStatus] = useState('all');

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/news/${id}`)
      .then(response => {
        setNotifications(response.data.notifications);
        setFilteredNotifications(response.data.notifications);
      })
      .catch(error => {
        console.error('There was an error fetching notifications!', error);
      });
  }, [id]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterNotifications(e.target.value, readStatus);
  };

  const handleReadStatusChange = (e) => {
    setReadStatus(e.target.value);
    filterNotifications(searchTerm, e.target.value);
  };

  const filterNotifications = (term, status) => {
    const filtered = notifications.filter(notification => {
      if (status === 'all' || notification.status === status) {
        return notification.message.toLowerCase().includes(term.toLowerCase());
      }
      return false;
    });
    setFilteredNotifications(filtered);
  };

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card text-dark bg-light">
            <div className="card-header">Company News & Updates</div>
            <div className="card-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search notifications"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <select className="form-select mt-2" value={readStatus} onChange={handleReadStatusChange}>
                  <option value="all">All</option>
                  <option value="read">Read</option>
                  <option value="unread">Unread</option>
                </select>
              </div>
              <ul className="list-group">
                {filteredNotifications.map(notification => (
                  <li className="list-group-item" key={notification.id}>
                    <span>{notification.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeNews;
