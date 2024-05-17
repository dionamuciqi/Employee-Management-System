import  { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [editDepartment, setEditDepartment] = useState({ id: null, name: '' });

  useEffect(() => {
    // Fetch departments from API
    axios.get('http://localhost:3000/api/departments')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the departments data!', error);
      });
  }, []);

  const handleAddDepartment = () => {
    axios.post('http://localhost:3000/api/departments', { name: newDepartment })
      .then(response => {
        setDepartments([...departments, response.data]);
        setNewDepartment('');
      })
      .catch(error => {
        console.error('There was an error adding the department!', error);
      });
  };

  const handleEditDepartment = (department) => {
    setEditDepartment(department);
  };

  const handleUpdateDepartment = () => {
    axios.put("http://localhost:3000/api/departments/${editDepartment.id}", { name: editDepartment.name })
      .then(response => {
        setDepartments(departments.map(dep => dep.id === editDepartment.id ? response.data : dep));
        setEditDepartment({ id: null, name: '' });
      })
      .catch(error => {
        console.error('There was an error updating the department!', error);
      });
  };

  const handleDeleteDepartment = (id) => {
    axios.delete("http://localhost:3000/api/departments/${id}")
      .then(() => {
        setDepartments(departments.filter(dep => dep.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the department!', error);
      });
  };

  return (
    <div className="container px-5 mt-5">
      <h1 className="mt-5"></h1>
      <div className="card mb-4">
        <div className="card-header">
          <h4>Add Department</h4>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Department Name"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleAddDepartment}>Add</button>
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <h4>Edit Department</h4>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Department Name"
              value={editDepartment.name}
              onChange={(e) => setEditDepartment({ ...editDepartment, name: e.target.value })}
            />
            <button className="btn btn-primary" onClick={handleUpdateDepartment}>Update</button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h4>Departments List</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {departments.map(department => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={department.id}>
                {department.name}
                <div>
                  <button className="btn btn-secondary me-2" onClick={() => handleEditDepartment(department)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteDepartment(department.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageDepartments;