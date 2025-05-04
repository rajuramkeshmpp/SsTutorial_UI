import React, { useState } from 'react';
import '../../App.css'; // Ensure your CSS is imported

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    state: '',
    district: '',
    experience: '',
    salary: '',
    keyskills: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prevData => ({ ...prevData, image: files[0] }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated profile:', formData);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card form-card col-md-8 col-sm-10 col-12 p-4 shadow">
        <h3 className="text-center mb-4">Edit Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Country</label>
              <select name="country" className="form-select" value={formData.country} onChange={handleChange} required>
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">State</label>
              <select name="state" className="form-select" value={formData.state} onChange={handleChange} required>
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="California">California</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">District</label>
              <select name="district" className="form-select" value={formData.district} onChange={handleChange} required>
                <option value="">Select District</option>
                <option value="Mumbai">Mumbai</option>
                <option value="San Francisco">San Francisco</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Experience (Years)</label>
              <input type="number" name="experience" className="form-control" value={formData.experience} onChange={handleChange} required />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Salary (INR)</label>
              <input type="number" name="salary" className="form-control" value={formData.salary} onChange={handleChange} required />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Key Skills</label>
              <input type="text" name="keyskills" className="form-control" value={formData.keyskills} onChange={handleChange} required />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Upload Image</label>
              <input type="file" name="image" className="form-control" onChange={handleChange} accept="image/*" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
