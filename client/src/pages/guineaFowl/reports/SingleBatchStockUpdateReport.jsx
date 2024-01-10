import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const GuineaFowlSingleBatchUpdateHistory = () => {
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [selectedBatchNumber, setSelectedBatchNumber] = useState(null);
  const [batchUpdates, setBatchUpdates] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchBatchNumbers = async () => {
      try {
        const response = await fetch('/api/all-guinea-fowl');
        if (!response.ok) {
          throw new Error('Error fetching batch numbers');
        }
        const data = await response.json();

        if (data && Array.isArray(data)) {
          const formattedBatchNumbers = data.map((batch) => ({
            value: batch.batchNumber,
            label: batch.batchNumber,
          }));
          setBatchNumbers(formattedBatchNumbers);
        } else {
          setBatchNumbers([]);
        }
      } catch (error) {
        console.error('Error fetching batch numbers:', error.message);
      }
    };

    fetchBatchNumbers();
  }, []);

  const handleBatchNumberChange = (selectedOption) => {
    setSelectedBatchNumber(selectedOption);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedBatchNumber) {
        throw new Error('Please select a batch number');
      }

      const response = await fetch(`/api/single-guinea-fowl-batch-updates/${selectedBatchNumber.value}`);
      if (!response.ok) {
        throw new Error('Error fetching batch updates');
      }

      const data = await response.json();
      setBatchUpdates(data);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching batch updates:', error.message);
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
    <Container fluid>
      <Row className="mt-4">
        <Col xs="12" lg={{ size: 8, offset: 2 }}>
          <h2 className="text-center mb-4 text-white">Guinea Fowl Batch Update History</h2>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
            <Row className="mb-4">
              <Col md={12}>
                <Select
                  options={batchNumbers}
                  value={selectedBatchNumber}
                  onChange={handleBatchNumberChange}
                  placeholder="Select Batch Number"
                  isSearchable
                  styles={customStyles}
                />
              </Col>
            </Row>
            <Button onClick={handleSubmit} color="primary">View History</Button>
          </div>

          {showReport && (
  <div className="mt-4">
    <h3 className="text-center mb-4 text-white">{`Batch Update Records for Batch Number: ${selectedBatchNumber.label}`}</h3>
    <Table responsive bordered hover className="shadow-lg">
      <thead>
        <tr>
          <th>#</th>
          <th>Batch Number</th>
          <th>Previous Quantity</th>
          <th>New Quantity</th>
          <th>Quantity Added</th>
          <th>Updated By</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {batchUpdates.map((update, index) => (
          <tr key={update._id}>
            <td>{index + 1}</td>
            <td>{update.batchNumber}</td>
            <td>{update.previousQuantity}</td>
            <td>{update.newQuantity}</td>
            <td>{update.newQuantity - update.previousQuantity}</td>
            <td>{update.updatedBy}</td>
            <td>{new Date(update.updatedAt).toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</td>
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

export default GuineaFowlSingleBatchUpdateHistory;
