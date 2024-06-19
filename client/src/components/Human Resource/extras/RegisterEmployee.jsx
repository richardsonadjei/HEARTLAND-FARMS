import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    department: '',
    position: '',
    hireDate: '',
    salary: ''
  });

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDepartmentChange = (selectedOption) => {
    setFormData({ ...formData, department: selectedOption.value });
  };

  const handlePositionChange = (selectedOption) => {
    setFormData({ ...formData, position: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to register employee');
      }
      
      setSuccessMessage('Employee registered successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error registering employee:', error.message);
      setErrorMessage('Failed to register employee');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000); // Clear error message after 3 seconds
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Register New Employee</h1>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="alert alert-danger">{errorMessage}</div>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="phoneNumber">Phone Number</Label>
              <Input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="dateOfBirth">Date of Birth</Label>
              <Input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="department">Department</Label>
              <Select
                id="department"
                name="department"
                value={departments.find(dep => dep.value === formData.department)} // Set initial selected value
                onChange={handleDepartmentChange}
                options={departments.map(dep => ({ value: dep.name, label: dep.name }))}
                placeholder="Select department..."
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="position">Position</Label>
              <Select
                id="position"
                name="position"
                value={positions.find(pos => pos.value === formData.position)} // Set initial selected value
                onChange={handlePositionChange}
                options={positions.map(pos => ({ value: pos.title , label: pos.title }))}
                placeholder="Select position..."
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="hireDate">Hire Date</Label>
              <Input
                type="date"
                id="hireDate"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="salary">Salary</Label>
              <Input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">Register Employee</Button>
      </Form>
    </Container>
  );
};

export default RegisterEmployee;
