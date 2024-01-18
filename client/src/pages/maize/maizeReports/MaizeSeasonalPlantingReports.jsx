import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const MaizeSeasonalPlantingReport = () => {
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [selectedBatchNumber, setSelectedBatchNumber] = useState(null);
  const [maizePlantings, setMaizePlantings] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchMaizeSeasons = async () => {
      try {
        const response = await fetch('/api/all-maize-seasons');
        const data = await response.json();

        const options = data.maizeSeasons.map((season) => ({
          value: season.batchNumber,
          label: season.batchNumber,
        }));

        setBatchNumberOptions(options);
      } catch (error) {
        console.error('Error fetching maize seasons:', error.message);
      }
    };

    fetchMaizeSeasons();
  }, []);

  const handleFetchMaizePlantings = async () => {
    try {
      const response = await fetch(`/api/view-maize-planted/${selectedBatchNumber.value}`);
      const data = await response.json();
      setMaizePlantings(data.maizePlantings);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching maize plantings:', error.message);
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
              <Button color="primary" onClick={handleFetchMaizePlantings}>
                Fetch Maize Plantings
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      {showReport && (
        <Row>
          <Col>
            <h2 className="my-3 text-center">Maize Seasonal Planting Report</h2>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Area Planted</th>
                    <th>Maize Variety</th>
                    <th>Expected Maturity Date</th> {/* New column for expected maturity date */}
                    <th>Location</th>
                    <th>Recorded By</th>
                  
                  </tr>
                </thead>
                <tbody>
                  {maizePlantings.map((planting, index) => (
                    <tr key={planting._id}>
                      <td>{index + 1}</td>
                      <td>{formatDateToDisplay(planting.date)}</td>
                      <td>{planting.areaPlanted}</td>
                      <td>{planting.maizeVariety}</td>
                      <td>{planting.expectedMaturityDate}</td> {/* Render expected maturity date */}
                      <td>{planting.location}</td>
                      <td>{planting.recordedBy}</td>
                     
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

export default MaizeSeasonalPlantingReport;