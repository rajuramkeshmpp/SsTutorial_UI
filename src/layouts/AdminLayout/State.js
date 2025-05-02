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
      countryId: parseInt(countryId),
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

  return (
    <div>
      <button className="add-country-button" onClick={() => setShowModal(true)}>
        + Add State
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>CountryName</th>
            <th>StateName</th>
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
                  onClick={() => {
                    setName(s.name);
                    setCountryId(countries.find((c) => c.name === s.countryName)?.id || "");
                    setEditingId(s.id);
                    setShowModal(true);
                  }}
                />
                <FaEye
                  className="icon view-icon"
                  title="View"
                  onClick={() => {
                    setViewState(s); // Set the state to be viewed
                    setShowModal(true); // Open the modal
                  }}
                />
                <FaTrash
                  className="icon delete-icon"
                  title="Delete"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this state?")) {
                      axios
                        .delete(`https://localhost:7160/api/State/DeleteState/${s.id}`)
                        .then(() => {
                          console.log("State deleted successfully.");
                          GetAllState(); // Refresh the table
                        })
                        .catch((err) => {
                          console.error("Error deleting state:", err);
                        });
                    }
                  }}
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
              <label>State Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter state name"
                required
              />

              <div className="modal-buttons">
                <button type="submit" className="submit-button">
                  {editingId ? "Update State" : "Add State"}
                </button>
                <button type="button" onClick={resetForm} className="cancel-button">
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
