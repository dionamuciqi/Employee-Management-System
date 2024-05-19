import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const EditTrainers = () => {
    const {id} = useParams()
    const [trainers, setTrainers] = useState({
        name: "",
        qualification: "",
        email: "",
        address: "",
        department_id: "",
    });
    const [department, setDepartment] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/auth/department')
        .then(result => {
            if(result.data.Status){
                setDepartment(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/trainers/' +id)
        .then(result => {
            setTrainers({
                ...trainers,
                name: result.data.Result[0].name,
                qualification: result.data.Result[0].name,
                email: result.data.Result[0].email,
				address: result.data.Result[0].address,
                department_id: result.data.Result[0].department_id,
			
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_trainers/'+id, trainers)
        .then(result => {
            if(result.data.Status){
                 navigate('/dashboard/trainers')
            }else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border">
            <h3 className="text-center">Edit Trainers</h3>
            <form className="row g-1" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="inputName" className="form-label">
                        Name
                    </label>
                    <input
          type="text"
          className="form-control rounded-0"
          id="inputName"
          placeholder="Enter Name"
          value={trainers.name}
          onChange={(e) => setTrainers({...trainers, name: e.target.value})
          }
        />
        </div>

        <div className="col-12">
                    <label htmlFor="inputQualification" className="form-label">
                        Qualification
                    </label>
                    <input
          type="text"
          className="form-control rounded-0"
          id="inputQualification"
          placeholder="Enter qualification"
          value={trainers.qualification}
          onChange={(e) => setTrainers({...trainers, qualification: e.target.value})
          }
        />
        </div>

        <div className="col-12">
        <label htmlFor="inputEmail4" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control rounded-0"
          id="inputEmail4"
          placeholder="Enter Email"
          autoComplete="off"
          value={trainers.email}
          onChange={(e) =>
            setTrainers({...trainers, email: e.target.value})
          }
        />
      </div>
    
      <div className="col-12">
        <label htmlFor="inputAddress" className="form-label">
          Address
        </label>
        <input
          type="text"
          className="form-control rounded-0"
          id="inputAddress"
          placeholder="1234 Main St"
          autoComplete="off"
          value={trainers.address}
          onChange={(e) =>
            setTrainers({...trainers, address: e.target.value})
          }
        />
        </div>
        <div className="col-12">
        <label htmlFor="department" className="form-label">
          Department
        </label>
        <select name="department" id="department" className="form-select"
        onChange={(e) =>
            setTrainers({...trainers, department_id: e.target.value})
          }>
            {department.map((c) => {
                return <option key={c.id} value={c.id}>{c.name}</option>
            })}
        </select>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary w-100">
          Edit Trainers
        </button>
      </div>
    </form>
  </div>
</div>
    )
}

export default EditTrainers