import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Button } from 'reactstrap';
import Select from 'react-select';

const BirdBatchVaccinationRecord = () => {
  const defaultType = 'Guinea Fowl';
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [selectedBatchNumber, setSelectedBatchNumber] = useState('');
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await fetch(`/api/bird-batch-vaccination-records?type=${defaultType}&batchNumber=${selectedBatchNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch vaccination records');
      }
      const records = await response.json();
      setVaccinationRecords(records);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch vaccination records');
    }
  };

  return (
    <Container fluid>
      <h2 className="mt-4">Batch Vaccination Record</h2>
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
        <Button color="primary" type="submit">Fetch Vaccination Records</Button>
      </Form>
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Batch Number</th>
              <th>Vaccination Date</th>
              <th>Vaccine Name</th>
              <th>Dosage</th>
              <th>Administration Method</th>
              <th>Comments</th>
              <th>Additional Details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(vaccinationRecords) && vaccinationRecords.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.type}</td>
                <td>{record.batchNumber}</td>
                <td>{new Date(record.vaccinationDate).toLocaleDateString('en-US')}</td>
                <td>{record.vaccineName}</td>
                <td>{record.dosage}</td>
                <td>{record.administrationMethod}</td>
                <td>{record.comments}</td>
                <td>{record.additionalDetails}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default BirdBatchVaccinationRecord;
