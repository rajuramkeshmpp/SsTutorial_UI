import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

function District () {
   const [states, setStates] = useState([]);
   const [countries, setCountries] = useState([]);
   const [districts, setDistricts] = useState([]);

    useEffect(() => {
      GetAllDistrict();
       
     }, []);

     const GetAllDistrict = () => {
      axios
        .get("https://localhost:7160/api/District/GetAllDistrict")
        .then((res) => {
          setDistricts(res.data);
        })
        .catch((err) => {
          console.error("Error fetching districts:", err);
        });
    };
  
   


    return (
      <div>
        <h2>Manage District</h2>
         <button className="add-country-button"> + Add District </button>
         <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>CountryName</th>
                    <th>StateName</th>
                    <th>DistrictName</th>
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
                        <FaEye
                          className="icon view-icon"
                          title="View"
                          
                        />
                        <FaEdit
                          className="icon edit-icon"
                          title="Edit"
                         
                        />
                        <FaTrash
                          className="icon delete-icon"
                          title="Delete"
                         
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        
      </div>
     );
    };
    
    export default District;