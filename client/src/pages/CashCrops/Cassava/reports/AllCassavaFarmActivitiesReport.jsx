import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Form, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';

const CassavaAllFarmActivitiesReport = () => {
  const defaultType = 'Cassava';
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [reportData, setReportData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchBatchOptions = async (type) => {
    try {
      const response = await fetch(`/api/cashcrop-batches/${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch batch numbers');
      }
      const batches = await response.json();
      setBatchOptions(batches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber })));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchBatchOptions(defaultType);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/all-cassava-batch-farm-activities-records/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Cash Crop batch records');
      }
      const data = await response.json();
      setReportData(data);
      setErrorMessage('');
    } catch (error) {
      setReportData(null);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Cash Crop All Activities Report</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for="batchNumber" sm={2}>Select Batch Number:</Label>
          <Col sm={8}>
            <Select
              id="batchNumber"
              options={batchOptions}
              value={batchOptions.find(option => option.value === batchNumber) || null}
              onChange={(selectedOption) => setBatchNumber(selectedOption.value)}
              isSearchable
              placeholder="Select Batch Number"
            />
          </Col>
          <Col sm={2}>
            <Button type="submit" color="primary">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      {errorMessage && <p>{errorMessage}</p>}
      {reportData && reportData.landPreparationRecords && reportData.landPreparationRecords.length > 0 && (
        <div className="table-responsive">
          <h3>Land Preparation Records</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Cash Crop</th>
                <th>Batch Number</th>
                <th>Date</th>
                <th>Location</th>
                <th>Area Cleared</th>
                <th>Machinery Used</th>
                <th>Recorded By</th>
              </tr>
            </thead>
            <tbody>
              {reportData.landPreparationRecords.map((record, index) => (
                <tr key={`land-preparation-${index}`}>
                  <td>{record.cashCrop}</td>
                  <td>{record.batchNumber}</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{record.location}</td>
                  <td>{record.areaCleared}</td>
                  <td>{record.machineryUsed}</td>
                  <td>{record.recordedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

{reportData && reportData.plantingRecords && reportData.plantingRecords.length > 0 && (
  <div className="table-responsive">
    <h3>Planting Records</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Cash Crop</th>
          <th>Batch Number</th>
          <th>Date Planted</th>
          <th>Area Planted</th>
          <th>Expected Maturity Date</th>
          <th>Recorded By</th>
        </tr>
      </thead>
      <tbody>
        {reportData.plantingRecords.map((record, index) => (
          <tr key={`planting-${index}`}>
            <td>{record.type}</td>
            <td>{record.batchNumber}</td>
            <td>{new Date(record.datePlanted).toLocaleDateString()}</td>
            <td>{record.areaPlanted}</td>
            <td>{record.expectedMaturityDate}</td>
            <td>{record.recordedBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


{reportData && reportData.manualWeedingRecords && reportData.manualWeedingRecords.length > 0 && (
  <div className="table-responsive">
    <h3>Manual Weeding Records</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Cash Crop</th>
          <th>Batch Number</th>
          <th>Date</th>
          <th>Space Weeded</th>
          <th>Recorded By</th>
        </tr>
      </thead>
      <tbody>
        {reportData.manualWeedingRecords.map((record, index) => (
          <tr key={`manual-weeding-${index}`}>
            <td>{record.type}</td>
            <td>{record.batchNumber}</td>
            <td>{new Date(record.date).toLocaleDateString()}</td>
            <td>{record.spaceWeeded}</td>
            <td>{record.recordedBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


{reportData && reportData.weedicideApplicationRecords && reportData.weedicideApplicationRecords.length > 0 && (
  <div className="table-responsive">
    <h3>Weedicide Application Records</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Cash Crop</th>
          <th>Batch Number</th>
          <th>Date</th>
          <th>Weedicide Name</th>
          <th>Weedicide Description</th>
          <th>Space Applied</th>
          <th>Application Method</th>
          <th>Quantity Applied</th>
          <th>Recorded By</th>
        </tr>
      </thead>
      <tbody>
        {reportData.weedicideApplicationRecords.map((record, index) => (
          <tr key={`weedicide-application-${index}`}>
            <td>{record.type}</td>
            <td>{record.batchNumber}</td>
            <td>{new Date(record.date).toLocaleDateString()}</td>
            <td>{record.weedicideName}</td>
            <td>{record.weedicideDescription}</td>
            <td>{record.spaceApplied}</td>
            <td>{record.applicationMethod}</td>
            <td>{record.quantityApplied}</td>
            <td>{record.recordedBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{reportData && reportData.pestAndDiseaseControlRecords && reportData.pestAndDiseaseControlRecords.length > 0 && (
  <div className="table-responsive">
    <h3>Pest and Disease Control Records</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Cash Crop</th>
          <th>Batch Number</th>
          <th>Date</th>
          <th>Pest or Disease Name</th>
          <th>Control Method</th>
          <th>Control Agent Used</th>
          <th>Quantity Used</th>
          <th>Space Affected</th>
          <th>Application Method</th>
          <th>Recorded By</th>
        </tr>
      </thead>
      <tbody>
        {reportData.pestAndDiseaseControlRecords.map((record, index) => (
          <tr key={`pest-and-disease-control-${index}`}>
            <td>{record.type}</td>
            <td>{record.batchNumber}</td>
            <td>{new Date(record.date).toLocaleDateString()}</td>
            <td>{record.pestOrDiseaseName}</td>
            <td>{record.controlMethod}</td>
            <td>{record.controlAgentUsed}</td>
            <td>{record.quantityUsed}</td>
            <td>{record.spaceAffected}</td>
            <td>{record.applicationMethod}</td>
            <td>{record.recordedBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


{reportData && reportData.harvestRecords && reportData.harvestRecords.length > 0 && (
  <div className="table-responsive">
    <h3>Harvest Records</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Cash Crop</th>
          <th>Batch Number</th>
          <th>Date</th>
          <th>Harvested Quantity</th>
          <th>Harvested Space</th>
          <th>Recorded By</th>
        </tr>
      </thead>
      <tbody>
        {reportData.harvestRecords.map((record, index) => (
          <tr key={`harvest-${index}`}>
            <td>{record.type}</td>
            <td>{record.batchNumber}</td>
            <td>{new Date(record.date).toLocaleDateString()}</td>
            <td>{record.harvestedQuantity}</td>
            <td>{record.harvestedSpace}</td>
            <td>{record.recordedBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


    </Container>
  );
};

export default CassavaAllFarmActivitiesReport;
