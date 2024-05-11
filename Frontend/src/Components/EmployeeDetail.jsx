import React  from "react"
import { useParams } from "react-router-dom";

const EmployeeDetail = () => {
    const [employee, setEmplyoee] = useState([]);
    const{id} = useParams()
    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail' +id)
        .then(result => {
            setEmplyoee(result.data[0])
        })


        .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <div className="p-2 d-flex justify-content-center flex-column algin-items-center mt-3" >
                <img src={'http://localhost:3000/Images/' + employee.image} className = 'emp_det_image' />
                <div className='d-flex algin-items-center flex-column mt-5'>
                    <h3>Name: {employee.name} </h3>
                    <h3>Name: {employee.email} </h3>
                    <h3>Name: {employee.salary} </h3>
                </div>
            </div>
            <button className='btn btn-primary me-2'>Edit</button>
            <button className='btn btn-danger'>Logout</button>


        </div>
    )
}

export default EmployeeDetail