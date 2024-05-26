import { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationsAndAnnouncements = () => {
  const [announcement, setAnnouncement] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch all notifications when the component mounts
    axios.get('http://localhost:3000/auth/announcements')
      .then(response => {
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

  const handleAnnouncementChange = (e) => {
    setAnnouncement(e.target.value);
  };

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    if (!announcement.trim()) {
      console.error('Announcement cannot be empty');
      return;
    }
    const requestData = {
      message: announcement,
    };
    console.log('Sending request data:', requestData);

    axios.post('http://localhost:3000/auth/announcements', requestData)
      .then(response => {
        if (response.data.success) {
          console.log('Announcement submitted successfully!', response.data.notification);
          setAnnouncement('');
          setNotifications(prevNotifications => [...prevNotifications, response.data.notification]);
        } else {
          console.error('Error submitting announcement:', response.data.error);
        }
      })
      .catch(error => {
        console.error('There was an error submitting announcement!', error);
      });
  };

  const handleClearAll = () => {
    axios.delete('http://localhost:3000/auth/clearnotifications')
      .then(response => {
        if (response.data.success) {
          console.log('Notifications cleared successfully!');
          setNotifications([]);
        } else {
          console.error('Error clearing notifications:', response.data.error);
        }
      })
      .catch(error => {
        console.error('There was an error clearing notifications!', error);
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
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>Announcements</span>
              <button className="btn btn-danger" onClick={handleClearAll}>Clear All</button>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {notifications.map(notification => (
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

export default NotificationsAndAnnouncements;