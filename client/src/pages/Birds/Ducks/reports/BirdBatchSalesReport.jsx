import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Button } from 'reactstrap';
import Select from 'react-select';

const BirdBatchSalesReport = () => {
  const defaultType = 'Duck';
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [selectedBatchNumber, setSelectedBatchNumber] = useState('');
  const [birdSaleRecords, setBirdSaleRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchBatchNumbers();
  }, []);

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

  const handleBatchNumberChange = (selectedOption) => {
    setSelectedBatchNumber(selectedOption.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/batch-sales-records?type=${defaultType}&batchNumber=${selectedBatchNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch batch sales records');
      }
      const records = await response.json();
      setBirdSaleRecords(records);
      setErrorMessage('');

      // Calculate total amount
      const total = records.reduce((sum, record) => sum + record.totalAmount, 0);
      setTotalAmount(total);
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch batch sales records');
    }
  };

  return (
    <Container fluid>
      <h2 className="mt-4">Batch Sales Report</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="batchNumber">Select Batch Number:</Label>
          <Select
            id="batchNumber"
            options={batchNumberOptions}
            onChange={handleBatchNumberChange}
            isSearchable
            placeholder="Select Batch Number"
          />
        </FormGroup>
        <Button color="primary" type="submit">Fetch Sales</Button>
      </Form>
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Batch Number</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Batch Details</th>
              <th>Total Amount</th>
              <th>Additional Details</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(birdSaleRecords) && birdSaleRecords.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.type}</td>
                <td>{record.batchNumber}</td>
                <td>{new Date(record.date).toLocaleDateString('en-US')}</td>
                <td>{record.customerName}</td>
                <td>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Gender</th>
                        <th>Quantity</th>
                        <th>Price per Bird</th>
                        <th>Subtotal Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.batchDetails.map((batch, batchIndex) => (
                        <tr key={batchIndex}>
                          <td>{batch.gender}</td>
                          <td>{batch.quantity}</td>
                          <td>{batch.pricePerBird}</td>
                          <td>{batch.subTotalAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>{record.totalAmount}</td>
                <td>{record.additionalDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3">
  <h5>Total Amount: Gh₵{totalAmount.toFixed(2)}</h5>
</div>

      </div>
    </Container>
  );
};

export default BirdBatchSalesReport;
