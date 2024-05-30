import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/admin/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/admin/Dashboard';
import Home from './Components/admin/Home';
import Employee from './Components/employee/Employee';
import Category from './Components/admin/Category';
import Department from './Components/admin/Department';
import Profile from './Components/admin/Profile';
import AddCategory from './Components/admin/AddCategory';
import AddDepartment from './Components/admin/AddDepartment';
import AddEmployee from './Components/admin/AddEmployee';
import AddTrainers from './Components/admin/AddTrainers';
import AddMeets from './Components/admin/AddMeets';
import Trainers from './Components/admin/Trainers';
import Meets from './Components/admin/Meets';
import EmployeeTraining from './Components/employee/EmployeeTraining';
import EmployeeMeeting from './Components/employee/EmployeeMeeting';
import EditEmployee from './Components/admin/EditEmployee';
import EditTrainers from './Components/admin/EditTrainers';
import Start from './Components/admin/Start';
import EmployeeLogin from './Components/employee/EmployeeLogin';
import EmployeeDashboard from './Components/employee/EmployeeDashboard';
import PrivateRoute from './Components/admin/PrivateRoute';
import TasksManagement from './Components/admin/TasksManagement';
import LeaveManagement from './Components/admin/LeaveManagement';
import NotificationsandAnnouncements from './Components/admin/NotificationsandAnnouncements';
import PayrollManagement from './Components/admin/PayrollManagement';
import EmployeeProfile from './Components/employee/EmployeeProfile';
import EmployeeNews from './Components/employee/EmployeeNews';
import Certifications from './Components/employee/Certifications';
import CertificationsManagement from './Components/admin/CertificationsManagement';
import EmployeeHelpSupport from './Components/employee/EmployeeHelpSupport';
import AdminSupportRequests from './Components/admin/AdminSupportRequests';
import Payroll from './Components/employee/Payroll';
import MyLeaves from './Components/employee/MyLeaves';
import HealthServices from './Components/employee/HealthServices';
import HealthServicesManagement from './Components/admin/HealthServicesManagement';
import BenefitsManagement from './Components/admin/BenefitsManagement';
import Benefits from './Components/employee/Benefits';
import Tasks from './Components/employee/Tasks';
import AnnualPlans from './Components/admin/AnnualPlans';
import EmployeeResetPassword from './Components/employee/EmployeeResetPassword';
import EmployeeForgotPassword from './Components/employee/EmployeeForgotPassword';
import ForgotPassword from './Components/admin/ForgotPassword';
import ResetPassword from './Components/admin/ResetPassword';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/adminlogin' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/reset_password' element={<ResetPassword />} />
          <Route path='/employee_login' element={<EmployeeLogin />} />
          <Route path='/employeeforgotpassword' element={<EmployeeForgotPassword />} />
          <Route path='/employeeresetpassword' element={<EmployeeResetPassword />} />
          <Route path='/employeedashboard' element={
            <PrivateRoute>
              <EmployeeDashboard />
            </PrivateRoute>
          }>
            <Route path='/employeedashboard/employeeprofile' element={<EmployeeProfile />} />
            <Route path='/employeedashboard/employeetraining' element={<EmployeeTraining />} />
            <Route path='/employeedashboard/employeemeeting' element={<EmployeeMeeting />} />
            <Route path='/employeedashboard/employeenews' element={<EmployeeNews />} />
            <Route path='/employeedashboard/certifications' element={<Certifications />} />
            <Route path='/employeedashboard/healthservices' element={<HealthServices />} />
            <Route path='/employeedashboard/myleaves' element={<MyLeaves />} />
            <Route path='/employeedashboard/employeehelpsupport' element={<EmployeeHelpSupport />} />
            <Route path='/employeedashboard/payroll' element={<Payroll />} />
            <Route path='/employeedashboard/benefits' element={<Benefits />} />
            <Route path='/employeedashboard/tasks' element={<Tasks />} />
          </Route>
          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
            <Route path='' element={<Home />} />
            <Route path='/dashboard/employee' element={<Employee />} />
            <Route path='/dashboard/trainers' element={<Trainers />} />
            <Route path='/dashboard/tasksmanagement' element={<TasksManagement />} />
            <Route path='/dashboard/meets' element={<Meets />} />
            <Route path='/dashboard/notificationsandannouncements' element={<NotificationsandAnnouncements />} />
            <Route path='/dashboard/payrollmanagement' element={<PayrollManagement />} />
            <Route path='/dashboard/healthservicesmanagement' element={<HealthServicesManagement />} />
            <Route path='/dashboard/leavemanagement' element={<LeaveManagement />} />
            <Route path='/dashboard/certificationsmanagement' element={<CertificationsManagement />} />
            <Route path='/dashboard/annualplans' element={<AnnualPlans />} />
            <Route path='/dashboard/category' element={<Category />} />
            <Route path='/dashboard/department' element={<Department />} />
            <Route path='/dashboard/benefitsmanagement' element={<BenefitsManagement />} />
            <Route path='/dashboard/profile' element={<Profile />} />
            <Route path='/dashboard/adminsupportrequests' element={<AdminSupportRequests />} />
            <Route path='/dashboard/add_category' element={<AddCategory />} />
            <Route path='/dashboard/add_department' element={<AddDepartment />} />
            <Route path='/dashboard/add_employee' element={<AddEmployee />} />
            <Route path='/dashboard/add_trainers' element={<AddTrainers />} />
            <Route path='/dashboard/add_meets' element={<AddMeets />} />
            <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />} />
            <Route path='/dashboard/edit_trainers/:id' element={<EditTrainers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
