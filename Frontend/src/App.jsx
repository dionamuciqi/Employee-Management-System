import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Department from './Components/Department';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddDepartment from './Components/AddDepartment';
import AddEmployee from './Components/AddEmployee';
import AddTrainers from './Components/AddTrainers';
import Trainers from './Components/Trainers';
import EditEmployee from './Components/EditEmployee';
import EditTrainers from './Components/EditTrainers';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDashboard from './Components/EmployeeDashboard';
import PrivateRoute from './Components/PrivateRoute'; 
import AttendanceManagement from './Components/AttendanceManagement';
import LeaveManagement from './Components/LeaveManagement';
import PayrollManagement from './Components/PayrollManagement';
import NotificationsAndAnnouncements from './Components/NotificationsandAnnouncements';
import EmployeeNews from './Components/EmployeeNews';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/employee_login' element={<EmployeeLogin />}></Route>
        <Route path='/employeedashboard' element={
          <PrivateRoute isAdminRoute={false}>
            <EmployeeDashboard />
          </PrivateRoute>
        }>
          <Route path='/employeedashboard/employeenews' element={<EmployeeNews />} />
        </Route>
        <Route path='/dashboard' element={
          <PrivateRoute isAdminRoute={true}>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/employee' element={<Employee />}></Route>
          <Route path='/dashboard/trainers' element={<Trainers />}></Route>
          <Route path='/dashboard/attendancemanagement' element={<AttendanceManagement />}></Route>
          <Route path='/dashboard/payrollmanagement' element={<PayrollManagement />}></Route>
          <Route path='/dashboard/leavemanagement' element={<LeaveManagement />}></Route>
          <Route path='/dashboard/notificationsandannouncements' element={<NotificationsAndAnnouncements />}></Route>
          <Route path='/dashboard/category' element={<Category />}></Route>
          <Route path='/dashboard/department' element={<Department />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
          <Route path='/dashboard/add_department' element={<AddDepartment />}></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
          <Route path='/dashboard/add_trainers' element={<AddTrainers />}></Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
          <Route path='/dashboard/edit_trainers/:id' element={<EditTrainers />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
