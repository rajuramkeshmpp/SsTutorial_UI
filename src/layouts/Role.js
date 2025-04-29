import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const Role = () => {
const [showModal, setShowModal] = useState(false);
const [roles, setRoles]=useState([{'id':1,'name':'Admin'}]);
useEffect(() => {
    axios.get('https://localhost:7160/api/Role/GetAll')
      .then((res) => setRoles(res.data));
  }, []);
    return (
  <div>
    <h1>Manage role</h1>
    <button className="add-task-button" onClick={() => setShowModal(true)}>+ Add Role</button>
    <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td className="action-icons">
                <FaEye className="icon view-icon" title="View"/>
                <FaEdit className="icon edit-icon" title="Edit"/>
                <FaTrash className="icon delete-icon" title="Delete"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Role</h2>
            <form>
              <label>Task Name</label>
              <input
                type="text"
                name="taskName"
                placeholder="Enter task name"
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-button">Add Role</button>
              </div>
            </form>
          </div>
        </div>
      )}
  </div>
 );
};

export default Role;
