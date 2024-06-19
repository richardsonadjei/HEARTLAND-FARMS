import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';

const CabbageAllActivitiesReport = () => {
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [reportData, setReportData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBatchOptions();
  }, []);

  const handleInputChange = (e) => {
    setBatchNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/cabbage-batch-farm-activities-records/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Cabbage batch records');
      }
      const data = await response.json();
      setReportData(data);
      setErrorMessage('');
    } catch (error) {
      setReportData(null);
      setErrorMessage(error.message);
    }
  };

  const fetchBatchOptions = async () => {
    try {
      const response = await fetch(`/api/all-batches/Cabbage`);
      if (!response.ok) {
        throw new Error('Failed to fetch batch numbers');
      }
      const batches = await response.json();
      const options = batches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber }));
      setBatchOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Cabbage All Activities Report</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for="batchNumber" sm={2}>Select Batch Number:</Label>
          <Col sm={8}>
            <Select
              id="batchNumber"
              options={batchOptions}
              value={{ value: batchNumber, label: batchNumber }}
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
      {reportData && reportData.nursingRecords && reportData.nursingRecords.length > 0 && (
  <div className="table-responsive">
    <h3>Nursing Records</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Vegetable</th>
          <th>Variety</th>
          <th>Batch Number</th>
          <th>Quantity Nursed</th>
          <th>Start Date</th>
          <th>Expected Transplanting Date</th>
          <th>Additional Details</th>
        </tr>
      </thead>
      <tbody>
        {reportData.nursingRecords.map((record, index) => (
          <tr key={`nursing-${index}`}>
            <td>{record.vegetable}</td>
            <td>{record.variety}</td>
            <td>{record.batchNumber}</td>
            <td>{record.quantityNursed}</td>
            <td>{new Date(record.startDate).toLocaleDateString()}</td>
            <td>{new Date(record.expectedTransplantingDate).toLocaleDateString()}</td>
            <td>{record.additionalDetails}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{reportData && reportData.transplantingRecords && reportData.transplantingRecords.length > 0 && (
  <div className="table-responsive">
    <h3>Transplanting Records</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Vegetable</th>
          <th>Batch Number</th>
          <th>Quantity Transplanted</th>
          <th>Transplanting Date</th>
          <th>Expected Harvest Date</th>
          <th>Number of Beds</th>
          <th>Additional Details</th>
        </tr>
      </thead>
      <tbody>
        {reportData.transplantingRecords.map((record, index) => (
          <tr key={`transplanting-${index}`}>
            <td>{record.vegetable}</td>
            <td>{record.batchNumber}</td>
            <td>{record.quantityTransplanted}</td>
            <td>{new Date(record.transplantingDate).toLocaleDateString()}</td>
            <td>{new Date(record.expectedHarvestDate).toLocaleDateString()}</td>
            <td>{record.numberOfBeds}</td>
            <td>{record.additionalDetails}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{reportData && reportData.directPlantingRecords && reportData.directPlantingRecords.length > 0 && (
  <div className="table-responsive">
    <h3>Direct Planting Records</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Vegetable</th>
          <th>Batch Number</th>
          <th>Quantity Direct Planted</th>
          <th>Planting Date</th>
          <th>Expected Harvest Date</th>
          <th>Number of Beds</th>
          <th>Additional Details</th>
        </tr>
      </thead>
      <tbody>
        {reportData.directPlantingRecords.map((record, index) => (
          <tr key={`direct-planting-${index}`}>
            <td>{record.vegetable}</td>
            <td>{record.batchNumber}</td>
            <td>{record.quantityDirectPlanted}</td>
            <td>{new Date(record.plantingDate).toLocaleDateString()}</td>
            <td>{new Date(record.expectedHarvestDate).toLocaleDateString()}</td>
            <td>{record.numberOfBeds}</td>
            <td>{record.additionalDetails}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{reportData && reportData.fertilizerRecords && reportData.fertilizerRecords.length > 0 &&(
  <div className="table-responsive">
    <h3>Fertilizer Records</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Vegetable</th>
          <th>Batch Number</th>
          <th>Fertilizer Details</th>
          <th>Quantity Applied</th>
          <th>Application Date</th>
          <th>Additional Details</th>
        </tr>
      </thead>
      <tbody>
        {reportData.fertilizerRecords.map((record, index) => (
          <tr key={`fertilizer-${index}`}>
            <td>{record.vegetable}</td>
            <td>{record.batchNumber}</td>
            <td>{record.fertilizerDetails}</td>
            <td>{record.quantityApplied}</td>
            <td>{new Date(record.applicationDate).toLocaleDateString()}</td>
            <td>{record.additionalDetails}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{reportData && reportData.pestControlRecords && reportData.pestControlRecords.length > 0 &&  (
  <div className="table-responsive">
    <h3>Pest Control Records</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Vegetable</th>
          <th>Batch Number</th>
          <th>Pest and Weed Control Details</th>
          <th>Quantity Applied</th>
          <th>Application Date</th>
          <th>Additional Details</th>
        </tr>
      </thead>
      <tbody>
        {reportData.pestControlRecords.map((record, index) => (
          <tr key={`pest-control-${index}`}>
            <td>{record.vegetable}</td>
            <td>{record.batchNumber}</td>
            <td>{record.pestAndWeedControlDetails}</td>
            <td>{record.quantityApplied}</td>
            <td>{new Date(record.applicationDate).toLocaleDateString()}</td>
            <td>{record.additionalDetails}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{reportData && reportData.otherActivitiesRecords && reportData.otherActivitiesRecords.length > 0 &&(
  <div className="table-responsive">
    <h3>Other Activities Records</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Vegetable</th>
          <th>Batch Number</th>
          <th>Activity Details</th>
          <th>Activity Date</th>
          <th>Additional Details</th>
        </tr>
      </thead>
      <tbody>
        {reportData.otherActivitiesRecords.map((record, index) => (
          <tr key={`other-activities-${index}`}>
            <td>{record.vegetable}</td>
            <td>{record.batchNumber}</td>
            <td>{record.activityDetails}</td>
            <td>{new Date(record.activityDate).toLocaleDateString()}</td>
            <td>{record.additionalDetails}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{reportData && reportData.harvestingRecords && reportData.harvestingRecords.length > 0 && (
  <div className="table-responsive">
    <h3>Harvesting Records</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Vegetable</th>
          <th>Batch Number</th>
          <th>Quantity Harvested</th>
          <th>Harvest Date</th>
          <th>Additional Details</th>
        </tr>
      </thead>
      <tbody>
        {reportData.harvestingRecords.map((record, index) => (
          <tr key={`harvesting-${index}`}>
            <td>{record.vegetable}</td>
            <td>{record.batchNumber}</td>
            <td>{record.quantityHarvested}</td>
            <td>{new Date(record.harvestDate).toLocaleDateString()}</td>
            <td>{record.additionalDetails}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}





    </Container>
  );
};

export default CabbageAllActivitiesReport;
