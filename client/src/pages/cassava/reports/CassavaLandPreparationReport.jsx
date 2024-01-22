import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const CassavaSeasonalLandPreparationReport = () => {
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [selectedBatchNumber, setSelectedBatchNumber] = useState(null);
  const [landPreparations, setLandPreparations] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchCassavaSeasons = async () => {
      try {
        const response = await fetch('/api/all-cassava-seasons');
        const data = await response.json();

        const options = data.cassavaSeasons.map((season) => ({
          value: season.batchNumber,
          label: season.batchNumber,
        }));

        setBatchNumberOptions(options);
      } catch (error) {
        console.error('Error fetching cassava seasons:', error.message);
      }
    };

    fetchCassavaSeasons();
  }, []);

  const handleFetchLandPreparations = async () => {
    try {
      const response = await fetch(`/api/view-all-cassava-land-preparations/${selectedBatchNumber.value}`);
      const data = await response.json();
  
      console.log('Fetched land preparations data:', data);
  
      setLandPreparations(data.cassavaLandPreparationRecords); // Update this line
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching land preparations:', error.message);
    }
  };
  
  

  const formatDateToDisplay = (dateString) => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
    <Container className="my-4">
      <Row>
        <Col>
          <Form>
            <FormGroup>
              <Label for="batchNumber">Batch Number:</Label>
              <Select
                id="batchNumber"
                options={batchNumberOptions}
                value={selectedBatchNumber}
                onChange={(selectedOption) => setSelectedBatchNumber(selectedOption)}
                isSearchable
                placeholder="Select Batch Number"
                styles={customStyles}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" onClick={handleFetchLandPreparations}>
                Fetch Land Preparations
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      {showReport && landPreparations && Array.isArray(landPreparations) && landPreparations.length > 0 && (
  <Row>
    <Col>
      <h2 className="my-3 text-center">Cassava Seasonal Land Preparation Report</h2>
      <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Area Cleared</th>
                    <th>Machinery Used</th>
                    <th>Recorded By</th>
                  </tr>
                </thead>
                <tbody>
                  {landPreparations.map((preparation, index) => (
                    <tr key={preparation._id}>
                      <td>{index + 1}</td>
                      <td>{formatDateToDisplay(preparation.date)}</td>
                      <td>{preparation.location}</td>
                      <td>{preparation.areaCleared}</td>
                      <td>{preparation.machineryUsed}</td>
                      <td>{preparation.recordedBy}</td>
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

export default CassavaSeasonalLandPreparationReport;
