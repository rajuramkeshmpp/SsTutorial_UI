import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';

import Home from './Home';
import About from './About';

import Register from './Register';
import Login from './Login';
import StudentLayout from './layouts/StudentLayout/StudentLayout';
import TeacherLayout from './layouts/TeacherLayout/TeacherLayout';
import AssignRole from './layouts/AdminLayout/AssignRole';
import HRLayout from './layouts/HRLayout/HRLayout';

import TaskManager from './layouts/AdminLayout/TaskManager';
import Country from './layouts/AdminLayout/Country';
import District from './layouts/AdminLayout/District';
import State from './layouts/AdminLayout/State';
import Role from './layouts/AdminLayout/Role';
import Currency from './layouts/AdminLayout/Currency';


function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />         
          <Route path="/register" element={<Register />} />          
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="assignrole" element={<AssignRole />} />
          <Route path="taskmanager" element={<TaskManager/>} />
          <Route path="role" element={<Role/>} />
          <Route path="country" element={<Country/>} />
          <Route path="district" element={<District/>} />
          <Route path="state" element={<State/>} />
          <Route path="currency" element={<Currency/>} />
          
         
        </Route>

         {/* Student Layout */}
        <Route path="/student" element={<StudentLayout />}>
         
        </Route>
         {/* Teacher Layout */}
         <Route path="/teacher" element={<TeacherLayout />}>
         
         </Route>
          {/* Teacher Layout */}
          <Route path="/hr" element={<HRLayout />}>
         
         </Route>

      </Routes>
    </Router>
  );
}

export default App;
