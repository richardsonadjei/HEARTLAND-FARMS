import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const FarmSectionReport = () => {
  // State variables
  const [farmSections, setFarmSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    // Fetch farm section names from /api/all-sections
    fetch('/api/all-sections')
      .then(response => response.json())
      .then(data => {
        // Transform data into options expected by React Select
        const options = data.map(section => ({ value: section.sectionName, label: section.sectionName }));
        setFarmSections(options);
      })
      .catch(error => console.error('Error fetching farm sections:', error));
  }, []);

  const handleSubmit = () => {
    // Perform fetch for the report data based on the selected section
    if (selectedSection) {
      fetch(`/api/batches/${selectedSection.value}`)
        .then(response => response.json())
        .then(data => setReportData(data.data)) // Updated this line to use data.data
        .catch(error => console.error('Error fetching report data:', error));
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'blue' : 'white',
    }),
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={{ color: 'white' }}>Farm Section Report</h2>
          <Form>
            <FormGroup>
              <Label for="sectionSelect" style={{ color: 'white' }}>Select Farm Section:</Label>
              <Select
                id="sectionSelect"
                value={selectedSection}
                onChange={value => setSelectedSection(value)}
                options={farmSections}
                placeholder="Select Farm Section"
                styles={customStyles}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" onClick={handleSubmit}>Generate Report</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      {reportData.length > 0 && (
        <Row>
          <Col>
            <div className="table-responsive">
              <table className="table table-bordered table-striped" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Batch Number</th>
                    <th>Quantity</th>
                    <th>Breed</th>
                    <th>Current Age</th>
                    <th>Color</th>
                    <th>Arrival Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((batch, index) => (
                    <tr key={batch._id}>
                      <td>{index + 1}</td>
                      <td>{batch.batchNumber}</td>
                      <td>{batch.quantity}</td>
                      <td>{batch.breed}</td>
                      <td>{batch.currentAge}</td>
                      <td>{batch.color}</td>
                      <td>{formatDate(batch.arrivalDate)}</td> {/* Use formatDate for the date column */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default FarmSectionReport;
