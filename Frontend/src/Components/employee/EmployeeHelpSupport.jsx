import { useState } from 'react';
import axios from 'axios';

const HelpAndSupportForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    email: '',
    title: '',
    description: '',
    priority: 'Medium',
    startDate: '',
    endDate: '',
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      documents: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    axios.post('http://localhost:3000/help-support', formDataToSend)
      .then(response => {
        console.log('Form submitted successfully:', response.data);
        alert('Form submitted successfully');
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              <h4 className="mb-0">Help & Support Form</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="department" 
                    name="department" 
                    value={formData.department} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
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
                  <label htmlFor="priority">Priority</label>
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
                  <label htmlFor="startDate">Start Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="startDate" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="endDate" 
                    name="endDate" 
                    value={formData.endDate} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="documents">Documents</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    id="documents" 
                    name="documents" 
                    onChange={handleFileChange} 
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
