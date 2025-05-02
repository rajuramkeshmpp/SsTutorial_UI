import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const District = () => {
  const [districts, setDistricts] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [districtName, setDistrictName] = useState("");
  const [stateId, setStateId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [viewDistrict, setViewDistrict] = useState(null); // Track the district to view

  useEffect(() => {
    GetAllDistricts();
    GetAllStates();
    GetAllCountry();
  }, []);

  const GetAllDistricts = () => {
    axios
      .get("https://localhost:7160/api/District/GetAllDistricts")
      .then((res) => setDistricts(res.data))
      .catch((err) => console.error("Error fetching districts:", err));
  };

  const GetAllStates = () => {
    axios
      .get("https://localhost:7160/api/State/GetAllStates")
      .then((res) => setStates(res.data))
      .catch((err) => console.error("Error fetching states:", err));
  };

  const GetAllCountry = () => {
    axios
      .get("https://localhost:7160/api/Country/GetAllCountry")
      .then((res) => {
        setCountries(res.data);
        setLoadingCountries(false);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setLoadingCountries(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const districtData = {
      name: districtName,
      stateId: parseInt(stateId),
      countryId: parseInt(countryId),
    };

    if (editingId) {
      axios
        .put(`https://localhost:7160/api/District/UpdateDistrict/${editingId}`, districtData)
        .then((res) => {
          console.log("District updated:", res.data);
          resetForm();
          GetAllDistricts();
        })
        .catch((err) => console.error("Error updating district:", err));
    } else {
      axios
        .post("https://localhost:7160/api/District/AddDistrict", districtData)
        .then((res) => {
          console.log("District added:", res.data);
          resetForm();
          GetAllDistricts();
        })
        .catch((err) => console.error("Error adding district:", err));
    }
  };

  const resetForm = () => {
    setDistrictName("");
    setStateId("");
    setCountryId("");
    setEditingId(null);
    setViewDistrict(null); // Reset view state when modal is closed
    setShowModal(false);
  };

  const handleDelete = (districtId) => {
    if (window.confirm("Are you sure you want to delete this district?")) {
      axios
        .delete(`https://localhost:7160/api/District/DeleteDistrict/${districtId}`)
        .then(() => {
          console.log("District deleted successfully.");
          GetAllDistricts();
        })
        .catch((err) => console.error("Error deleting district:", err));
    }
  };

  const handleEdit = (district) => {
    console.log("Editing district:", district);
    setDistrictName(district.name || "");
    setStateId(district.stateId ? district.stateId.toString() : "");
    setCountryId(district.countryId ? district.countryId.toString() : "");
    setEditingId(district.id || null);
    setViewDistrict(null); // Reset view state for editing
    setShowModal(true);
  };

  const handleView = (district) => {
    setDistrictName(district.name || "");
    setStateId(district.stateId ? district.stateId.toString() : "");
    setCountryId(district.countryId ? district.countryId.toString() : "");
    setViewDistrict(district); // Set the district to be viewed
    setEditingId(null); // Reset editing state
    setShowModal(true); // Open the modal
  };

  const isFormValid = () => {
    return districtName.trim() !== "" && stateId !== "" && countryId !== "";
  };

  return (
    <div>
      <button
        className="add-district-button"
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
      >
        + Add District
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Country Name</th>
            <th>State Name</th>
            <th>District Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.countryName}</td>
              <td>{d.stateName}</td>
              <td>{d.name}</td>
              <td className="action-icons">
                <FaEdit
                  className="icon edit-icon"
                  title="Edit"
                  onClick={() => handleEdit(d)}
                />
                <FaEye
                  className="icon view-icon"
                  title="View"
                  onClick={() => handleView(d)} // Handle view action
                />
                <FaTrash
                  className="icon delete-icon"
                  title="Delete"
                  onClick={() => handleDelete(d.id)}
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
              {viewDistrict
                ? "View District"
                : editingId
                ? "Edit District"
                : "Add New District"}
            </h2>

            {/* View Mode */}
            {viewDistrict ? (
              <div>
                <p><strong>District Name:</strong> {viewDistrict.name}</p>
                <p><strong>State Name:</strong> {viewDistrict.stateName}</p>
                <p><strong>Country Name:</strong> {viewDistrict.countryName}</p>
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            ) : (
              // Add/Edit Form
              <form onSubmit={handleSubmit}>
                <label>District Name</label>
                <input
                  type="text"
                  value={districtName}
                  onChange={(e) => setDistrictName(e.target.value)}
                  placeholder="Enter district name"
                  required
                  readOnly={!!viewDistrict} // Disable editing in view mode
                />

                <label>Select State</label>
                <select
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value)}
                  required
                  disabled={!!viewDistrict} // Disable select in view mode
                >
                  <option value="" disabled>-- Select State --</option>
                  {states.map((s) => (
                    <option key={s.id} value={s.id.toString()}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <label>Select Country</label>
                <select
                  value={countryId}
                  onChange={(e) => setCountryId(e.target.value)}
                  required
                  disabled={!!viewDistrict} // Disable select in view mode
                >
                  <option value="" disabled>-- Select Country --</option>
                  {loadingCountries ? (
                    <option disabled>Loading countries...</option>
                  ) : (
                    countries.map((c) => (
                      <option key={c.id} value={c.id.toString()}>
                        {c.name}
                      </option>
                    ))
                  )}
                </select>

                <div className="modal-buttons">
                  {!viewDistrict && (
                    <button type="submit" disabled={!isFormValid()}>
                      {editingId ? "Update District" : "Add District"}
                    </button>
                  )}
                  <button type="button" onClick={resetForm}>
                    {viewDistrict ? "Close" : "Cancel"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default District;
