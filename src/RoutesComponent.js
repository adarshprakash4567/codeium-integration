// RoutesComponent.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'
import Signup from './components/Auth/SignUp'
import PageNotFound from './components/PageNotFound';
import EditUser from './components/common/ EditUser';
import Dashboard from './pages/Admin/Dashboard'
import UserDashboard from './pages/ Member/Home'
import ProtectedOutletComponent from './ProtectedOutletComponent';
import ProtectedRoute from './ProtectedRoute';
import { getRoleById } from './utils/roles';


const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

            
            <Route path="/admin" element={<ProtectedOutletComponent />}>
       <Route path="/admin/dashboard" 
       
       element={
         <ProtectedRoute
           element={<Dashboard />}
           allowedRoles={[getRoleById(1)]}
         />
       }
       />
       <Route path="/admin/edit-user/:id" element={<EditUser />} />
     </Route>
     <Route path="/user" element={<ProtectedOutletComponent />}>
       <Route path="/user/dashboard" 
       
       element={
         <ProtectedRoute
           element={<UserDashboard />}
           allowedRoles={[getRoleById(0)]}
         />
       } />
         <Route path="/user/edit-user/:id" 
       
       element={
         <ProtectedRoute
           element={<EditUser />}
           allowedRoles={[getRoleById(0)]}
         />
       } />
     </Route> 

{/* ------------------------------------------------------------------------- */}

      {/* <Route path="/admin" element={<ProtectedOutletComponent />}>
        <Route path="/admin/dashboard" 
        
        element={
          <ProtectedRoute
            element={<Dashboard />}
            allowedRoles={['admin']}
          />
        }
        />
        <Route path="/admin/edit-user/:id" element={<EditUser />} />
      </Route>
      <Route path="/user" element={<ProtectedOutletComponent />}>
        <Route path="/user/dashboard" 
        
        element={
          <ProtectedRoute
            element={<UserDashboard />}
            allowedRoles={['user']}
          />
        } />
          <Route path="/user/edit-user/:id" 
        
        element={
          <ProtectedRoute
            element={<EditUser />}
            allowedRoles={['user']}
          />
        } />
      </Route> */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

// export default RoutesComponent;
export default RoutesComponent;



