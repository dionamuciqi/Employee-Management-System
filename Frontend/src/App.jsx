import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/admin/Login'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Dashboard from './Components/admin/Dashboard'
import Home from './Components/admin/Home'
import Employee from './Components/employee/Employee'
import Category from './Components/admin/Category'
import Department from './Components/admin/Department'
import Profile from './Components/admin/Profile'
import AddCategory from './Components/admin/AddCategory'
import AddDepartment from './Components/admin/AddDepartment'
import AddEmployee from './Components/admin/AddEmployee'
import AddTrainers from './Components/admin/AddTrainers'
import Trainers from './Components/admin/Trainers'
import EmployeeTraining from './Components/EmployeeTraining'
import EditEmployee from './Components/admin/EditEmployee'
import EditTrainers from './Components/admin/EditTrainers'
import Start from './Components/admin/Start'
import EmployeeLogin from './Components/employee/EmployeeLogin'
import EmployeeDashboard from './Components/employee/EmployeeDashboard'
import PrivateRoute from './Components/admin/PrivateRoute'
import AttendanceManagement from './Components/admin/AttendanceManagement'
import LeaveManagement from './Components/admin/LeaveManagement'
import NotificationsandAnnouncements from './Components/admin/NotificationsandAnnouncements'
import PayrollManagement from './Components/admin/PayrollManagement'
import EmployeeNews from './Components/employee/EmployeeNews'
import Certifications from './Components/employee/Certifications'
import CertificationsManagement from './Components/admin/CertificationsManagement'
import EmployeeHelpSupport from './Components/employee/EmployeeHelpSupport'
import AdminSupportRequests from './Components/admin/AdminSupportRequests'


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Start />}></Route>
          <Route path='/adminlogin' element={<Login />}></Route>
         
          <Route path='/employee_login' element={<EmployeeLogin />}></Route>
          <Route path='/employeedashboard' element={
          <PrivateRoute>
          <EmployeeDashboard />
          </PrivateRoute>}>
          <Route path='/employeedashboard/employeetraining' element={<EmployeeTraining/>} />
          <Route path='/employeedashboard/employeenews' element={<EmployeeNews />} />
          <Route path='/employeedashboard/certifications' element={<Certifications />} />
          <Route path='/employeedashboard/employeehelpsupport' element={<EmployeeHelpSupport />} />
          </Route>
          <Route path='/dashboard' element={
          <PrivateRoute>           
            <Dashboard />
          </PrivateRoute>}>   
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/employee' element={<Employee />}></Route>
          <Route path='/dashboard/trainers' element={<Trainers />}></Route>
          <Route path='/dashboard/attendancemanagement' element={<AttendanceManagement />}></Route>
          <Route path='/dashboard/notificationsandannouncements' element={<NotificationsandAnnouncements />}></Route>
          <Route path='/dashboard/payrollmanagement' element={<PayrollManagement />}></Route>
          <Route path='/dashboard/leavemanagement' element={<LeaveManagement />}></Route>
          <Route path='/dashboard/certificationsmanagement' element={<CertificationsManagement />}></Route>
          <Route path='/dashboard/category' element={<Category />}></Route>
          <Route path='/dashboard/department' element={<Department />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/adminsupportrequests' element={<AdminSupportRequests />}></Route>
          <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
          <Route path='/dashboard/add_department' element={<AddDepartment />}></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
          <Route path='/dashboard/add_trainers' element={<AddTrainers />}></Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
          <Route path='/dashboard/edit_trainers/:id' element={<EditTrainers />}></Route>

          </Route>
      </Routes>
    </BrowserRouter>
  )
}
  

export default App