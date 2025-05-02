import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const State = () => {
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [editingId, setEditingId] = useState(null); // null means "add" mode
  const [viewState, setViewState] = useState(null); // Track the state to be viewed

  useEffect(() => {
    GetAllState();
    GetAllCountry();
  }, []);

  const GetAllState = () => {
    axios
      .get("https://localhost:7160/api/State/GetAllStates")
      .then((res) => {
        setStates(res.data);
      })
      .catch((err) => {
        console.error("Error fetching states:", err);
      });
  };

  const GetAllCountry = () => {
    axios
      .get("https://localhost:7160/api/Country/GetAllCountry")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stateData = {
      name,
      countryId: parseInt(countryId), // Ensure the countryId is an integer
    };

    if (editingId) {
      // Update existing state
      axios
        .put(`https://localhost:7160/api/State/UpdateState/${editingId}`, stateData)
        .then((res) => {
          console.log("State updated:", res.data);
          resetForm();
          GetAllState();
        })
        .catch((err) => {
          console.error("Error updating state:", err);
        });
    } else {
      // Add new state
      axios
        .post("https://localhost:7160/api/State/AddState", stateData)
        .then((res) => {
          console.log("State added:", res.data);
          resetForm();
          GetAllState();
        })
        .catch((err) => {
          console.error("Error adding state:", err);
        });
    }
  };

  const resetForm = () => {
    setName("");
    setCountryId("");
    setEditingId(null);
    setShowModal(false);
    setViewState(null); // Reset view state when modal is closed
  };

  const handleDelete = (stateId) => {
    if (window.confirm("Are you sure you want to delete this state?")) {
      axios
        .delete(`https://localhost:7160/api/State/DeleteState/${stateId}`)
        .then(() => {
          console.log("State deleted successfully.");
          GetAllState(); // Refresh the table after deletion
        })
        .catch((err) => {
          console.error("Error deleting state:", err);
        });
    }
  };

  const handleEdit = (state) => {
    setName(state.name);
    setCountryId(countries.find((c) => c.name === state.countryName)?.id || "");
    setEditingId(state.id);
    setShowModal(true);
  };

  const handleView = (state) => {
    setViewState(state); // Set the state to be viewed
    setShowModal(true); // Open the modal
  };

  const isFormValid = () => {
    return name.trim() !== "" && countryId !== "";
  };

  return (
    <div>
      <button className="add-country-button" onClick={() => setShowModal(true)}>
        + Add State
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Country Name</th>
            <th>State Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {states.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.countryName}</td>
              <td>{s.name}</td>
              <td className="action-icons">
                <FaEdit
                  className="icon edit-icon"
                  title="Edit"
                  onClick={() => handleEdit(s)}
                />
                <FaEye
                  className="icon view-icon"
                  title="View"
                  onClick={() => handleView(s)}
                />
                <FaTrash
                  className="icon delete-icon"
                  title="Delete"
                  onClick={() => handleDelete(s.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (viewState ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>View State</h2>
            <p><strong>State Name:</strong> {viewState.name}</p>
            <p><strong>Country Name:</strong> {viewState.countryName}</p>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingId ? "Edit State" : "Add New State"}</h2>
            <form onSubmit={handleSubmit}>
              <label>State Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter state name"
                required
              />

              <label>Select Country</label>
              <select
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Select Country --
                </option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="modal-buttons">
                <button type="submit" disabled={!isFormValid()}>
                  {editingId ? "Update State" : "Add State"}
                </button>
                <button type="button" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default State;
