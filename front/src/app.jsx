import React from 'react';

import { useAuth } from './context/AuthContext';
const PrivateRoutes = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
}
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter , Routes, Route } from 'react-router-dom';  
import Home from './pages/Home.jsx';
import SignUp from './components/auth/Signup.jsx';
import Login from './components/auth/login.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import AdminFeedback from './pages/AdminFeedback.jsx';
import UserFeedback from './pages/userFeedback.jsx';
import EmployeeDirectory from './pages/Employee Directory';
import Logout from './pages/Logout.jsx';
import Task from'./pages/Task.jsx';
import CompanyCalendar from './pages/company calender.jsx';
import AddEmployee from './pages/AddEmployee';
import EditProfile from './pages/editprofile';
 
import ProtectedRoute from './pages/ProtectedRoute';
import Profile from './pages/Profile.jsx';
function App() {
  return (
    <BrowserRouter  >
  <Routes>
  <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adminfeedback" element={< AdminFeedback />} /> 
        <Route path="/company calendar" element={<CompanyCalendar />} /> 
        <Route path="/employee directory" element={<EmployeeDirectory  />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit-profile" element={<EditProfile />} /> 

        <Route path="/userfeedback" element={<UserFeedback />} /> 
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/task" element={<Task/>} />
        <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
    
    </Routes>
    </BrowserRouter>
  );
}


export default App;
