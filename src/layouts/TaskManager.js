import axios from 'axios';

import React, { useEffect, useState } from 'react';
import '../App.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    taskName: '',
    taskDescription: '',
    userId: '',
    statusId: ''
  });

  useEffect(() => {
    axios.get('https://localhost:7160/api/TaskManger/GetAllTaskList')
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching task list:", err));
  }, []);
  useEffect(() => {
    axios.get('https://localhost:7160/api/Status/GetAllStatus')
      .then((res) => {
        setStatuses(res.data);
      });   
  }, []);
  useEffect(() => {
    axios.get('https://localhost:7160/api/Users/GetAllUsers')
      .then((res) => setUsers(res.data));
  }, []);

   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setNewTask((prev) => ({
      ...prev,
       [name]: value
     }));
   };

   const handleAddTask = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7160/api/TaskManger/AddTask', newTask)
      .then(() => {
        axios.get('https://localhost:7160/api/TaskManger/GetAllTaskList')
          .then((res) => setTasks(res.data)); // refresh the task list
        setShowModal(false);
        setNewTask({ taskName: '', taskDescription: '', userId: '', statusId: '' });
      })
      .catch((err) => console.error("Failed to add task", err));
  };
  return (
    <div>
      <div className="add-task-container">
        <button className="add-task-button" onClick={() => setShowModal(true)}>+ Add Task</button>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>User</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.taskName}</td>
              <td>{task.firstName}</td>
              <td className={`status-cell ${task.statusName?.toLowerCase().replace(/\s/g, "")}`}>{task.statusName}</td>
              <td>
                <button className="edit-button">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <form onSubmit={handleAddTask}>
              <label>Task Name</label>
              <input
                type="text"
                name="taskName"
                value={newTask.taskName}
                onChange={handleInputChange}
                placeholder="Enter task name"
                required
              />

              <label>Task Description</label>
              <input
                type="text"
                name="taskDescription"
                value={newTask.taskDescription}
                onChange={handleInputChange}
                placeholder="Enter description"
              />

              <label>User</label>
              <select
                name="userId"
                value={newTask.userId}
                onChange={handleInputChange}
                required
              >
                 <option value="" disabled>Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.firstname}</option>
                ))}
              </select>

              <label>Status</label>
              <select
                name="statusId"
                value={newTask.statusId}
                onChange={handleInputChange}
                required
              >
                 <option value="" disabled>Select Status</option>
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>{status.statusName}</option>
                ))}
              </select>

              <div className="modal-buttons">
                <button type="submit" className="submit-button">Add</button>
                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
