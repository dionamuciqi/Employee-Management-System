import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeMeeting = () => {
  const [meetings, setMeetings] = useState([]);
  const { emid } = useParams(); // Use 'id' to get the employee ID
  // This line is valid if the employee ID is in the URL

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/meetings`)
      .then(response => {
        if (response.data.Status) {
          setMeetings(response.data.Result);
        }
      })
      .catch(error => {
        console.error('There was an error fetching meetings!', error);
      });
  }, [emid]);

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString();
  };

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card text-dark bg-light">
            <div className="card-header">Meetings ahead</div>
            <div className="card-body">
              <ul className="list-group">
                {meetings.map(meeting => (
                  <li className="list-group-item" key={meeting.mid}>
                    <div><strong>Meeting Topic:</strong> {meeting.topic}</div>
                    <div><strong>Details:</strong> {meeting.details}</div>
                    <div><strong>Date of meet:</strong> {formatDate(meeting.meeting_date)}</div>
                    <div><strong>Meeting mode:</strong> {meeting.meeting}</div>
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

export default EmployeeMeeting;
