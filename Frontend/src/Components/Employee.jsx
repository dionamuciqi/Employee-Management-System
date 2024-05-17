import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee , setEmployee] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
    .then(result => {
        if(result.data.Status){
            setEmployee(result.data.Result);
        } else {
            alert(result.data.Error)
        }
    }).catch(err => console.log(err))

  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/' +id)
    .then(result => {
      if(result.data.Status) {
         navigate('/dashboard/employee')
      }else {
        alert(result.data.Error)
      }
    })
  }

  return (
    <div className="container px-5 mt-5">
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="card-title">Employee List</h4>
        </div>
        <div className="card-body">
          <Link to="/dashboard/add_employee" className="btn btn-success mt-4">
            Add Employee
          </Link>
          <div className="mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employee.map(e => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>
                      <img src={`http://localhost:3000/Images/` + e.image} className="employee_image" alt={e.name} />
                    </td>
                    <td>{e.email}</td>
                    <td>{e.address}</td>
                    <td>{e.salary}</td>
                    <td>
                      <Link to={`/dashboard/edit_employee/`+e.id} className="btn btn-info btn-sm me-2"> Edit </Link>
                      <button className="btn btn-warning btn-sm" onClick={() => handleDelete(e.id)}> Delete </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
