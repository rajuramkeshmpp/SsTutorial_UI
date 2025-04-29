import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';

import Home from './Home';
import About from './About';

import Register from './Register';
import Login from './Login';
<<<<<<< HEAD
import StudentLayout from './layouts/StudentLayout/StudentLayout';
import TeacherLayout from './layouts/TeacherLayout/TeacherLayout';
import AssignRole from './layouts/AdminLayout/AssignRole';
import HRLayout from './layouts/HRLayout/HRLayout';

import TaskManager from './layouts/AdminLayout/TaskManager';
import Country from './layouts/AdminLayout/Country';
import District from './layouts/AdminLayout/District';
import State from './layouts/AdminLayout/State';
=======
import StudentLayout from './layouts/StudentLayout';
import TeacherLayout from './layouts/TeacherLayout';
import AssignRole from './layouts/AssignRole';
import HRLayout from './layouts/HRLayout';
import TaskManager from './layouts/TaskManager';
import Role from './layouts/Role';
import Country from './layouts/Country';
>>>>>>> d7c871fe46edb7d6e7a3d0a7608f4ad5e2abd456


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
<<<<<<< HEAD
          <Route path="country" element={<Country/>} />
          <Route path="district" element={<District/>} />
          <Route path="state" element={<State/>} />
          
         
=======
          <Route path="role" element={<Role/>} />
          <Route path="country" element={<Country/>} />
>>>>>>> d7c871fe46edb7d6e7a3d0a7608f4ad5e2abd456
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
