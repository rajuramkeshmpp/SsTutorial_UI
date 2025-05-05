import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false); // new state for view mode

  // Fetch all roles on component mount
  useEffect(() => {
    GetAllRole();
  }, []);

  const GetAllRole = () => {
    axios
      .get("https://localhost:7160/api/Role/GetAll")
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => {
        console.error("Error fetching roles:", err);
      });
  };

  const addOrUpdateRole = (e) => {
    e.preventDefault();

    const url = isEditing
      ? `https://localhost:7160/api/Role/UpdateRole/${id}`
      : "https://localhost:7160/api/Role/AddRole";

    const method = isEditing ? axios.put : axios.post;

    method(url, { id, name })
      .then(() => {
        GetAllRole();
        setShowModal(false);
        setName("");
        setId(0);
        setIsEditing(false);
        setIsViewing(false);
      })
      .catch((err) => {
        console.error("Error saving role:", err);
      });
  };

  const deleteRole = (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      axios.delete(`https://localhost:7160/api/Role/DeleteRole/${roleId}`)
        .then(() => {
          GetAllRole();
        })
        .catch((err) => {
          console.error("Error deleting role:", err);
        });
    }
  };

  const viewRole = (role) => {
    setId(role.id);
    setName(role.name);
    setIsEditing(false);
    setIsViewing(true);
    setShowModal(true);
  };

  const editRole = (role) => {
    setId(role.id);
    setName(role.name);
    setIsEditing(true);
    setIsViewing(false);
    setShowModal(true);
  };

  return (
    <div>
      <h2>Manage Role</h2>
      <button
        className="add-role-button"
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
          setIsViewing(false);
          setName("");
          setId(0);
        }}
      >
        + Add Role
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td className="action-icons">
                <FaEye
                  className="icon view-icon"
                  title="View"
                  onClick={() => viewRole(c)}
                />
                <FaEdit
                  className="icon edit-icon"
                  title="Edit"
                  onClick={() => editRole(c)}
                />
                <FaTrash
                  className="icon delete-icon"
                  title="Delete"
                  onClick={() => deleteRole(c.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit/View */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              {isViewing
                ? "View Role"
                : isEditing
                ? "Edit Role"
                : "Add New Role"}
            </h2>
            <form onSubmit={addOrUpdateRole}>
              <label>Role Name</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter role name"
                onChange={(e) => setName(e.target.value)}
                readOnly={isViewing}
                required
              />
              <div className="modal-buttons">
                {!isViewing && (
                  <button type="submit" className="submit-button">
                    {isEditing ? "Update Role" : "Add Role"}
                  </button>
                )}
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowModal(false);
                    setName("");
                    setId(0);
                    setIsEditing(false);
                    setIsViewing(false);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Role;
