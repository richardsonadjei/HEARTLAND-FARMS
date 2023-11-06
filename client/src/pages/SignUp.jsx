import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    telephoneNumber: '',
    ghanaCardNumber: '',
    bankBranch: '',
    nextOfKinName: '',
    nextOfKinContact: '',
    nextOfKinGhanaCardNumber: '',
    witnessName: '',
    witnessContact: '',
    role: 'employee',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('User created successfully!');
        window.location.href = '/sign-in';
      } else {
        alert('Failed to create user. Please try again.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
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

        {/* Email */}
        <div className="mb-3">
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

        {/* Password */}
        <div className="mb-3">
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

        {/* Telephone Number */}
        <div className="mb-3">
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

        {/* Ghana Card Number */}
        <div className="mb-3">
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
        <div className="mb-3">
        <label htmlFor="bank" className="form-label">
          Bank
        </label>
        <input
          type="text"
          className="form-control"
          id="bank"
          name="bank"
          value={formData.bank}
          onChange={handleChange}
          required
        />
      </div>

      {/* Bank Account Number */}
      <div className="mb-3">
        <label htmlFor="bankAccountNumber" className="form-label">
          Bank Account Number
        </label>
        <input
          type="text"
          className="form-control"
          id="bankAccountNumber"
          name="bankAccountNumber"
          value={formData.bankAccountNumber}
          onChange={handleChange}
          required
        />
      </div>
        {/* Bank Branch */}
        <div className="mb-3">
          <label htmlFor="bankBranch" className="form-label">
            Bank Branch
          </label>
          <input
            type="text"
            className="form-control"
            id="bankBranch"
            name="bankBranch"
            value={formData.bankBranch}
            onChange={handleChange}
            required
          />
        </div>

       
<div className="mb-3">
  <label htmlFor="nextOfKinName" className="form-label">
    Next of Kin Name
  </label>
  <input
    type="text"
    className="form-control"
    id="nextOfKinName"
    name="nextOfKinName" // <-- Update this to match the schema field name
    value={formData.nextOfKinName}
    onChange={handleChange}
    required
  />
</div>


<div className="mb-3">
  <label htmlFor="nextOfKinContact" className="form-label">
    Next of Kin Contact
  </label>
  <input
    type="text"
    className="form-control"
    id="nextOfKinContact"
    name="nextOfKinContact" // <-- Update this to match the schema field name
    value={formData.nextOfKinContact}
    onChange={handleChange}
    required
  />
</div>


<div className="mb-3">
  <label htmlFor="nextOfKinGhanaCardNumber" className="form-label">
    Next of Kin Ghana Card Number
  </label>
  <input
    type="text"
    className="form-control"
    id="nextOfKinGhanaCardNumber"
    name="nextOfKinGhanaCardNumber" // <-- Update this to match the schema field name
    value={formData.nextOfKinGhanaCardNumber}
    onChange={handleChange}
    required
  />
</div>


        {/* Witness Name */}
        <div className="mb-3">
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

        {/* Witness Contact */}
        <div className="mb-3">
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

        {/* Role */}
        <div className="mb-3">
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

        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        {/* Paragraph with SignIn link */}
        <p className="mt-3">
          Already have an account? <Link to="/sign-in" className="btn btn-link">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
