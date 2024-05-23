
import { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationsAndAnnouncements = () => {
  const [announcement, setAnnouncement] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [readStatus, setReadStatus] = useState('all');

  useEffect(() => {
    // Fetch notifications from API
    axios.get('http://localhost:3000/api/notifications')
      .then(response => {
        setNotifications(response.data);
        setFilteredNotifications(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching notifications!', error);
      });
  }, []);

  // Handle announcement input change
  const handleAnnouncementChange = (e) => {
    setAnnouncement(e.target.value);
  };

  // Handle form submission for new announcement
  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/announcements', {
      announcement: announcement
    })
    .then(response => {
      console.log('Announcement submitted successfully!', response.data);
      setAnnouncement('');
      setNotifications(prevNotifications => [...prevNotifications, response.data]);
      setFilteredNotifications(prevNotifications => [...prevNotifications, response.data]);
    })
    .catch(error => {
      console.error('There was an error submitting announcement!', error);
    });
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterNotifications(e.target.value, readStatus);
  };

  // Handle read status change
  const handleReadStatusChange = (e) => {
    setReadStatus(e.target.value);
    filterNotifications(searchTerm, e.target.value);
  };

  // Filter notifications based on search term and read status
  const filterNotifications = (term, status) => {
    let filtered = notifications.filter(notification => {
      if (status === 'all' || notification.status === status) {
        return notification.message.toLowerCase().includes(term.toLowerCase());
      }
      return false;
    });
    setFilteredNotifications(filtered);
  };

  // Mark notification as read or unread
  const toggleReadStatus = (notificationId) => {
    const updatedNotifications = notifications.map(notification => {
      if (notification.id === notificationId) {
        notification.status = notification.status === 'read' ? 'unread' : 'read';
      }
      return notification;
    });
    setNotifications(updatedNotifications);
    filterNotifications(searchTerm, readStatus);
  };

  // Delete notification
  const deleteNotification = (notificationId) => {
    axios.delete(`http://localhost:3000/api/notifications/${notificationId}`)
      .then(response => {
        console.log('Notification deleted successfully!', response.data);
        const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
        setNotifications(updatedNotifications);
        filterNotifications(searchTerm, readStatus);
      })
      .catch(error => {
        console.error('There was an error deleting notification!', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12 mb-3">
          <div className="card text-black bg-light">
            <div className="card-header">New Announcement</div>
            <div className="card-body">
              <form onSubmit={handleAnnouncementSubmit}>
                <div className="mb-3">
                  <label htmlFor="announcementTextarea" className="form-label">Enter your announcement:</label>
                  <textarea
                    className="form-control"
                    id="announcementTextarea"
                    rows="5"
                    value={announcement}
                    onChange={handleAnnouncementChange}
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card text-dark bg-light">
            <div className="card-header">Notifications</div>
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
                  <li className={`list-group-item ${notification.status === 'read' ? 'list-group-item-light' : ''}`} key={notification.id}>
                    <span>{notification.message}</span>
                    <div className="float-end">
                      <button className="btn btn-sm btn-primary me-2" onClick={() => toggleReadStatus(notification.id)}>
                        {notification.status === 'read' ? 'Mark as Unread' : 'Mark as Read'}
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteNotification(notification.id)}>Delete</button>
                    </div>
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

export default NotificationsAndAnnouncements;
