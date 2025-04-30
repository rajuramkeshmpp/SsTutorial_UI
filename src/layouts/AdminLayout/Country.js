import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Function to add a new country
  const addCountry = () => {
    debugger;
    axios.post("https://localhost:7160/api/Country/AddCountry", { id, name })
      .then((res) => {
        
        GetAllCountry();
        setShowModal(false); // Close the modal after adding the country
        setName(""); // Clear the input field
      })
      .catch((err) => {
        console.error("Error adding country:", err);
      });
  };


const GetAllCountry =()=>{
  axios.get("https://localhost:7160/api/Country/GetAllCountry")
      .then((res) => {
        console.log(res.data); // Log the response data
        setCountries(res.data);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
}

  // Fetch all countries on component mount
  useEffect(() => {
    GetAllCountry();
  }, []);

  return (
    <div>
      <h2>Manage Country</h2>
      <button
        className="add-country-button"
        onClick={() => setShowModal(true)} > + Add Country
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
          {countries.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td className="action-icons">
                <FaEye className="icon view-icon" title="View" />
                <FaEdit className="icon edit-icon" title="Edit" />
                <FaTrash className="icon delete-icon" title="Delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Country</h2>
            <form onSubmit={addCountry}>
              <label>Country Name</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter country name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-button">
                  Add Country
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)} // Close the modal
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Country;
