import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';

const BirdMortalityReport = () => {
  const defaultType = 'Turkey';
  const [birdMortalityRecords, setBirdMortalityRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBirdMortalityRecords();
  }, []);

  const fetchBirdMortalityRecords = async () => {
    try {
      const response = await fetch(`/api/bird-mortality?type=${defaultType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bird mortality records');
      }
      const records = await response.json();
      setBirdMortalityRecords(records);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  // Calculate total number of male and female deaths
  const totalMaleDeaths = birdMortalityRecords.reduce((total, record) => {
    return total + record.batchDetails.reduce((acc, batch) => {
      return acc + (batch.gender === 'male' ? batch.quantity : 0);
    }, 0);
  }, 0);

  const totalFemaleDeaths = birdMortalityRecords.reduce((total, record) => {
    return total + record.batchDetails.reduce((acc, batch) => {
      return acc + (batch.gender === 'female' ? batch.quantity : 0);
    }, 0);
  }, 0);

  return (
    <Container fluid>
      <h2 className="mt-4">Mortality Report</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Batch Number</th>
              <th>Mortality Date</th>
              <th>Cause of Death</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(birdMortalityRecords) && birdMortalityRecords.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.type}</td>
                <td>{record.batchNumber}</td>
                <td>{new Date(record.mortalityDate).toLocaleDateString('en-US')}</td>
                <td>{record.causeOfDeath}</td>
                <td>{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Report Table */}
      <div className="mt-4">
        <h3>Summary Report</h3>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Gender</th>
              <th>Total Deaths</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Male</td>
              <td>{totalMaleDeaths}</td>
            </tr>
            <tr>
              <td>Female</td>
              <td>{totalFemaleDeaths}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default BirdMortalityReport;
