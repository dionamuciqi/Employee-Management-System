import { useState } from 'react';
import axios from 'axios';

const HelpAndSupportForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    description: '',
    priority: 'Medium',
    startDate: '',
  });
  
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3000/employee/help-support', formData, {
      withCredentials: true,  
    })
    .then(response => {
      console.log('Form submitted successfully:', response.data);
      setFormData({
        email: '',
        name: '',
        description: '',
        priority: 'Medium',
        startDate: '',
      });
      setMessage('Message sent successfully');
    })
    .catch(error => {
      console.error('There was an error submitting the form!', error);
    });
  };
  
  

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          {message && <div className="alert alert-success m-4">{message}</div>}
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              <h4 className="mb-0">Help & Support Form</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="name" 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Your Phone Number</label>
                  <input 
                    type="tel"
                    className="form-control" 
                    id="phoneNumber" 
                    name="phoneNumber" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Where do you want to send this email?</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Tell us your problem!</label>
                  <textarea 
                    className="form-control" 
                    id="description" 
                    name="description" 
                    rows="4" 
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Priority of Problem</label>
                  <select 
                    className="form-control" 
                    id="priority" 
                    name="priority" 
                    value={formData.priority} 
                    onChange={handleChange}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="startDate" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleChange} 
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupportForm;