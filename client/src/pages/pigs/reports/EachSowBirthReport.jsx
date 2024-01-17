import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const EachSowBirthReport = () => {
  const [formData, setFormData] = useState({
    sowIdentityNumber: '',
  });

  const [sowBirth, setSowBirth] = useState(null);

  const [sowOptions, setSowOptions] = useState([]);

  useEffect(() => {
    // Fetch sow identity numbers for the dropdown
    const fetchSowIdentityNumbers = async () => {
      try {
        const response = await fetch('/api/all-sow-stock');
        if (response.ok) {
          const data = await response.json();
          const options = data.pigStocks.map((sow) => ({
            value: sow.identityNumber,
            label: sow.identityNumber,
          }));
          setSowOptions(options);
        } else {
          console.error('Failed to fetch sow identity numbers');
        }
      } catch (error) {
        console.error('An unexpected error occurred while fetching sow identity numbers');
      }
    };

    fetchSowIdentityNumbers();
  }, []);

  const handleChange = (selectedOption) => {
    setFormData({ ...formData, sowIdentityNumber: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/get-sow-birth-by-identity-number/${formData.sowIdentityNumber}`);
      if (response.ok) {
        const data = await response.json();

        if (data) {
          setSowBirth(data);
        } else {
          console.error('Invalid data structure received');
        }
      } else {
        console.error('Failed to fetch sow birth data');
      }
    } catch (error) {
      console.error('An unexpected error occurred while fetching sow birth data');
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#d3d3d3' : 'white',
      color: state.isFocused ? 'black' : 'black',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ size: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit} className="sow-birth-report-form">
            <FormGroup>
              <Label for="sowIdentityNumber" className="text-white">Sow Identity Number</Label>
              <Select
                id="sowIdentityNumber"
                name="sowIdentityNumber"
                options={sowOptions}
                value={{ value: formData.sowIdentityNumber, label: formData.sowIdentityNumber }}
                onChange={handleChange}
                placeholder="Select Sow Identity Number"
                styles={customStyles}
              />
            </FormGroup>
            <Button color="primary" type="submit">Generate Report</Button>
          </Form>

          {sowBirth && (
            <div className="mt-5">
              <h2 className="text-white">Sow Birth Report</h2>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Sow Identity Number</th>
                    <th>Date of Birth</th>
                    <th>Number of Male Piglets</th>
                    <th>Number of Female Piglets</th>
                    <th>Total Number of Piglets</th>
                    <th>Recorded By</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={sowBirth._id}>
                    <td>{sowBirth.sowIdentityNumber}</td>
                    <td>{new Date(sowBirth.dateOfBirth).toLocaleDateString()}</td>
                    <td>{sowBirth.numberOfMalePiglets}</td>
                    <td>{sowBirth.numberOfFemalePiglets}</td>
                    <td>{sowBirth.totalNumberOfPiglets}</td>
                    <td>{sowBirth.recordedBy}</td>
                    <td>{new Date(sowBirth.createdAt).toLocaleString()}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EachSowBirthReport;
