import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const CassavaSeasonalPlantingReport = () => {
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [selectedBatchNumber, setSelectedBatchNumber] = useState(null);
  const [cassavaPlantings, setCassavaPlantings] = useState([]);
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

  const handleFetchCassavaPlantings = async () => {
    try {
      const response = await fetch(`/api/view-all-plantings/${selectedBatchNumber.value}`);
      const data = await response.json();
      setCassavaPlantings(data.cassavaPlantings);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching cassava plantings:', error.message);
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
              <Button color="primary" onClick={handleFetchCassavaPlantings}>
                Fetch Cassava Plantings
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      {showReport && (
        <Row>
          <Col>
            <h2 className="my-3 text-center">Cassava Seasonal Planting Report</h2>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Area Planted</th>
                    <th>Cassava Variety</th>
                    <th>Expected Maturity Date</th> {/* Adjust the column based on your data structure */}
                    <th>Location</th>
                    <th>Recorded By</th>
                  </tr>
                </thead>
                <tbody>
                  {cassavaPlantings.map((planting, index) => (
                    <tr key={planting._id}>
                      <td>{index + 1}</td>
                      <td>{formatDateToDisplay(planting.date)}</td>
                      <td>{planting.areaPlanted}</td>
                      <td>{planting.cassavaVariety}</td>
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

export default CassavaSeasonalPlantingReport;
