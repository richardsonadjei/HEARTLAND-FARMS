import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';

const AllAnimalReport = () => {
  const defaultType = 'Pig';
  const [animalRecords, setAnimalRecords] = useState({
    births: [],
    medicalTreatments: [],
    mortalities: [],
    vaccinations: [],
    weights: [],
    expenses: []
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedAnimalId, setSelectedAnimalId] = useState(null);

  useEffect(() => {
    fetchAnimalRecords(defaultType);
  }, []);

  const fetchAnimalRecords = async (type) => {
    try {
      const response = await fetch(`/api/animal-records/${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch animal records');
      }
      const data = await response.json();
      setAnimalRecords(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  // Function to format date in the desired format
  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderBirthTable = (records) => (
    <div className="table-responsive mt-4">
      <h3 style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>Birth Records</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Animal ID</th>
            <th>Date of Birth</th>
            <th>Number of Kids</th>
            <th>Birth Details</th>
            <th>Notes</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {records.map((animal, index) => (
            <tr key={animal._id}>
              <td>{index + 1}</td>
              <td>{animal.type}</td>
              <td>{animal.animalId}</td>
              <td>{formatDate(animal.dateOfBirth)}</td>
              <td>{animal.numberOfKids}</td>
              <td>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Gender</th>
                      <th>Weight</th>
                      <th>Health Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {animal.birthDetails.map((detail, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{detail.gender}</td>
                        <td>{detail.weight}</td>
                        <td>{detail.healthStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td>{animal.notes}</td>
              <td>{formatDate(animal.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Function to render other tables for medical treatments, mortalities, vaccinations, weights, and expenses
  const renderTable = (records, recordType, columns) => (
    <div className="table-responsive mt-4">
      <h3 style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>{recordType.charAt(0).toUpperCase() + recordType.slice(1)}</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            {columns.map(col => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record._id}>
              <td>{index + 1}</td>
              {columns.map(col => (
                <td key={col}>{col === 'date' || col === 'dateRecorded' || col === 'dateAdministered' || col === 'nextDueDate' || col === 'treatmentDate' ? formatDate(record[col]) : record[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Container fluid>
  <h2 className="mt-4">All Animal Records</h2>
  {errorMessage && <p>{errorMessage}</p>}
  {renderBirthTable(animalRecords.births)}
  {/* Render other tables for medical treatments, mortalities, vaccinations, weights, and expenses */}
  {renderTable(animalRecords.medicalTreatments, 'medicalTreatments', ['type', 'animalId', 'treatmentType', 'treatmentDate', 'medicationAndDosage', 'veterinarian', 'notes'])}
  {renderTable(animalRecords.mortalities, 'mortalities', ['type', 'animalId', 'date', 'cause', 'notes'])}
  {renderTable(animalRecords.vaccinations, 'vaccinations', ['type', 'animalId', 'vaccineDetails', 'methodOfAdministration', 'dateAdministered',  'nextDueDate','administeredBy', 'notes'])}
  {renderTable(animalRecords.weights, 'weights', ['type', 'animalId', 'weight', 'dateRecorded', 'notes'])}
  {renderTable(animalRecords.expenses, 'expenses', ['date', 'category', 'type', 'identityNumber', 'additionalDetails', 'amount', 'recordedBy'])}
</Container>

  );
};

export default AllAnimalReport;
