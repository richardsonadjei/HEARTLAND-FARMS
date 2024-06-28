import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userName: '',
    phoneNumber: '',
    role: 'employee',
    category: [],
    dateOfBirth: '',
    department: null,
    position: null,
    hireDate: '',
    salary: '',
  });

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Fetch departments from API
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments');
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        // Sort departments alphabetically by name
        const sortedDepartments = data.sort((a, b) => a.name.localeCompare(b.name));
        setDepartments(sortedDepartments);
      } catch (error) {
        console.error('Error fetching departments:', error.message);
      }
    };

    // Fetch positions from API
    const fetchPositions = async () => {
      try {
        const response = await fetch('/api/positions');
        if (!response.ok) {
          throw new Error('Failed to fetch positions');
        }
        const data = await response.json();
        // Sort positions alphabetically by title
        const sortedPositions = data.sort((a, b) => a.title.localeCompare(b.title));
        setPositions(sortedPositions);
      } catch (error) {
        console.error('Error fetching positions:', error.message);
      }
    };

    fetchDepartments();
    fetchPositions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    // Extract the value from selectedOption
    const selectedValue = selectedOption ? selectedOption.value : null;
    // Update formData with the selected value
    setFormData({ ...formData, [name]: selectedValue });
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
        console.error('Failed to create user:', errorData.error);
        alert(`Failed to create user. Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register New Employee</h2>
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
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
        </div>

        <div className="row mb-3">
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
          <div className="col-md-6">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
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
              <option value="finance">Finance</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <Select
              options={[
                { value: 'birds', label: 'Birds' },
                { value: 'animal', label: 'Animal' },
                { value: 'crop', label: 'Crop' },
                { value: 'hatchery', label: 'Hatchery' },
              ]}
              id="category"
              name="category"
              value={formData.category.map(cat => ({ value: cat, label: cat }))}
              onChange={(selectedOptions) => setFormData({ ...formData, category: selectedOptions.map(option => option.value) })}
              isMulti
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <Select
              options={departments.map(dept => ({ value: dept.name, label: dept.name }))}
              id="department"
              name="department"
              value={formData.department ? { value: formData.department, label: formData.department } : null}
              onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'department' })}
              isClearable
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="position" className="form-label">
              Position
            </label>
            <Select
              options={positions.map(pos => ({ value: pos.title, label: pos.title }))}
              id="position"
              name="position"
              value={formData.position ? { value: formData.position, label: formData.position } : null}
              onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'position' })}
              isClearable
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="hireDate" className="form-label">
              Hire Date
            </label>
            <input
              type="date"
              className="form-control"
              id="hireDate"
              name="hireDate"
              value={formData.hireDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
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
