import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userName: '',
    telephoneNumber: '',
    ghanaCardNumber: '',
    witnessName: '',
    witnessContact: '',
    role: 'employee',
    category: 'poultry',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message);
        window.location.href = '/sign-in';
      } else {
        const errorData = await response.json();
        console.error('Failed to create user:', errorData.error); // Log the actual error
        alert(`Failed to create user. Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="userName" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="telephoneNumber" className="form-label">
              Telephone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="telephoneNumber"
              name="telephoneNumber"
              value={formData.telephoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="ghanaCardNumber" className="form-label">
              Ghana Card Number
            </label>
            <input
              type="text"
              className="form-control"
              id="ghanaCardNumber"
              name="ghanaCardNumber"
              value={formData.ghanaCardNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="witnessName" className="form-label">
              Witness Name
            </label>
            <input
              type="text"
              className="form-control"
              id="witnessName"
              name="witnessName"
              value={formData.witnessName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="witnessContact" className="form-label">
              Witness Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="witnessContact"
              name="witnessContact"
              value={formData.witnessContact}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="all">All</option>
              <option value="poultry">Poultry</option>
              <option value="animal">Animal</option>
              <option value="crop">Crop</option>
              <option value="hatchery">Hatchery</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
