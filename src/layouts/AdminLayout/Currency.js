import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const Currency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrencyId, setCurrencyId] = useState('');
  const [amount, setAmount] = useState("");
  
  // Fetch all currencies on component mount
  useEffect(() => {
    GetAllCurrency();
  }, []);

  const GetAllCurrency = () => {
    axios
      .get("https://localhost:7160/api/Currency/GetAllCurrency")
      .then((res) => {
        setCurrencies(res.data);
      })
      .catch((err) => {
        console.error("Error fetching currencies:", err);
      });
  };
return (
    <div style={{maxWidth: '400px',margin: '40px auto',padding: '30px',backgroundColor: '#f2f5f9',borderRadius: '10px',boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',fontFamily: 'Arial, sans-serif'}}>
      <h3 style={{textAlign: 'center', marginBottom: '25px', color: '#333' }}>Currency</h3>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label htmlFor="currency" style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>From Currency</label>
          <select
            id="currency"
            value={selectedCurrencyId}
            onChange={(e) => setCurrencyId(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="" disabled>From Currency</option>
            {currencies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="currency" style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>To Currency</label>
          <select
            id="currency"
            value={selectedCurrencyId}
            onChange={(e) => setCurrencyId(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="" disabled>To Currency</option>
            {currencies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label>Enter Valid Amount</label>
              <input
                type="number"
                value={amount}
                placeholder="Enter Amount"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
      </div>
        <button type="button"  onClick={Currency} style={{ padding: '12px',backgroundColor: '#4CAF50', color: 'white',fontWeight: 'bold',border: 'none',borderRadius: '5px',cursor: 'pointer', transition: 'background 0.3s ease' }}>
          Convert Currency
        </button>
      </form>
    </div>
  );
};

export default Currency;