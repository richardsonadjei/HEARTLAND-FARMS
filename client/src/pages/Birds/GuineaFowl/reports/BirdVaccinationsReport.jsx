import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';

const BirdVaccinationReport = () => {
  const defaultType = 'Guinea Fowl';
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchVaccinationRecords();
  }, []);

  const fetchVaccinationRecords = async () => {
    try {
      const response = await fetch(`/api/all-bird-type-vaccinations?type=${defaultType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch vaccination records');
      }
      const records = await response.json();
      setVaccinationRecords(records);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container fluid>
      <h2 className="mt-4">Vaccination Report</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="table-responsive">
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

export default BirdVaccinationReport;
