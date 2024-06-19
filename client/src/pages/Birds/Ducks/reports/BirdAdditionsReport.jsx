import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import Select from 'react-select';

const AllBirdAdditionsReport = () => {
  const defaultType = 'Duck'; // Default type for initial fetch
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [selectedBatchNumber, setSelectedBatchNumber] = useState('');
  const [records, setRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showTable, setShowTable] = useState(false); // State to control table visibility

  useEffect(() => {
    fetchBatchNumbers();
  }, []);

  useEffect(() => {
    if (selectedBatchNumber !== '') {
      fetchAllBirdAdditions(selectedBatchNumber);
    }
  }, [selectedBatchNumber]);

  const fetchBatchNumbers = async () => {
    try {
      const response = await fetch(`/api/all-bird-type-batches?type=${defaultType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch batch numbers');
      }
      const batches = await response.json();
      const options = batches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber }));
      setBatchNumberOptions(options);
    } catch (error) {
      console.error(error.message);
      setErrorMessage('Failed to fetch batch numbers');
    }
  };

  const fetchAllBirdAdditions = async (batchNumber) => {
    try {
      const response = await fetch(`/api/records/${defaultType}/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bird addition records');
      }
      const data = await response.json();
      setRecords(data);
      setShowTable(true); // Display the table after successful fetch
    } catch (error) {
      console.error(error.message);
      setErrorMessage('Failed to fetch bird addition records');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch data for selected batch number
    fetchAllBirdAdditions(selectedBatchNumber);
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">All Bird Additions Report</h1>
      <Row>
        <Col>
          <form onSubmit={handleSubmit}>
            <Select
              options={batchNumberOptions}
              onChange={(selectedOption) => setSelectedBatchNumber(selectedOption.value)}
              value={batchNumberOptions.find((option) => option.value === selectedBatchNumber)}
              placeholder="Select Batch Number"
              isSearchable
              className="mb-3"
            />
            <Button color="primary" type="submit">Fetch Bird Additions</Button>
          </form>
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
          {showTable && (
            <Table className="mt-3">
              <thead>
                <tr>
                  <th>Batch Number</th>
                  <th>Bird Details</th>
                  <th>Added At</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record._id}>
                    <td>{record.batchNumber}</td>
                    <td>
                      <Table>
                        <thead>
                          <tr>
                            <th>Gender</th>
                            <th>Quantity</th>
                            <th>Health Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.birdAdditions.map((bird, index) => (
                            <tr key={index}>
                              <td>{bird.gender}</td>
                              <td>{bird.quantity}</td>
                              <td>{bird.healthStatus}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </td>
                    <td>{new Date(record.birdAdditions[0].addedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AllBirdAdditionsReport;
