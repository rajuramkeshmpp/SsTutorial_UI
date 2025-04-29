import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const Country = () => {
const [countries, setCountries]=useState([]);
const [showModal, setShowModal] = useState(false);
const [name, setName] = useState("");
const addCountry = () =>{
    axios.post('https://localhost:7160/api/Countries/AddCountry',{name})
    .then((res) => {getAllCountry()});
    setShowModal(false);
    setName("");
    };
const getAllCountry = () =>{
    axios.get('https://localhost:7160/api/Countries/GetAllCountry')
    .then((res) => setCountries(res.data));
};
useEffect(() => {
    getAllCountry();
  }, []);
  return (
 <div>
 <button className="add-task-button" onClick={() => setShowModal(true)}>+ Add Country</button>
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
            <h2>Add New Country</h2>
            <form onSubmit={addCountry}>
              <label>Country Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="countryName"
                placeholder="Enter country name"
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-button">Add Country</button>
              </div>
            </form>
          </div>
        </div>
      )}
     </div>
  );
};

export default Country;
