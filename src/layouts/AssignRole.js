import axios from 'axios';
import React, { useState } from 'react';

function AssignRole = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const AddRoleToUser = ()=>{

    axios.post('', { email, role })
    .then((res) => {
      console.log('Add successful', res.data);
      // maybe store token, navigate, etc.
    })
    .catch((err) => {
      console.error('not Added', err);
    });
  }
  return (
    <div style={{
      maxWidth: '400px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#f2f5f9',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '25px',
        color: '#333'
      }}>Assign Role</h3>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label htmlFor="email" style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Email</label>
          <select
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">Select Email</option>
            <option value="user1@example.com">user1@example.com</option>
            <option value="user2@example.com">user2@example.com</option>
            <option value="user3@example.com">user3@example.com</option>
          </select>
        </div>

        <div>
          <label htmlFor="role" style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        <button  onClick={AssignRole}
          type="button"
          style={{
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}
          
        >
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignRole;
