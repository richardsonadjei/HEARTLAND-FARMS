import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const SowCrossingReport = () => {
  const [formData, setFormData] = useState({
    sowIdentityNumber: '',
  });

  const [batchCrossings, setBatchCrossings] = useState([]);
  const [showReport, setShowReport] = useState(false);
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
      const response = await fetch(`/api/pig-crossings/${formData.sowIdentityNumber}`);
      if (response.ok) {
        const data = await response.json();
  
        if (Array.isArray(data)) {
          setBatchCrossings(data);
          setShowReport(true);
        } else if (typeof data === 'object') {  // Handle the case when a single object is received
          setBatchCrossings([data]);  // Convert the single object to an array
          setShowReport(true);
        } else {
          console.error('Invalid data structure received');
        }
      } else {
        console.error('Failed to fetch batch crossings data');
      }
    } catch (error) {
      console.error('An unexpected error occurred while fetching batch crossings data');
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
          <Form onSubmit={handleSubmit} className="batch-crossing-report-form">
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

          {showReport && (
            <div className="mt-5">
              <h2 className="text-white">Sow Crossing Report</h2>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Sow Identity Number</th>
                    <th>Boar Breed</th>
                    <th>Expected Delivery Date</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {batchCrossings.map((crossing, index) => (
                    <tr key={crossing._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{new Date(crossing.date).toLocaleDateString()}</td>
                      <td>{crossing.sowIdentityNumber}</td>
                      <td>{crossing.boarBreed}</td>
                      <td>{new Date(crossing.expectedDayOfDelivery).toLocaleDateString()}</td>
                      <td>{crossing.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SowCrossingReport;
