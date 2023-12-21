import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const BatchTreatmentReport = () => {
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchBatchNumbers = async () => {
      try {
        const batchResponse = await fetch('/api/all-batchesNoDates');
        if (!batchResponse.ok) {
          throw new Error('Error fetching batch numbers');
        }
        const batchData = await batchResponse.json();

        if (batchData && batchData.data && Array.isArray(batchData.data)) {
          const formattedBatchNumbers = batchData.data.map((batch) => ({
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

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'blue' : 'white',
    }),
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/bird-treatments/batch/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Error fetching batch treatments');
      }
      const responseData = await response.json();

      if (responseData && responseData.data && Array.isArray(responseData.data)) {
        // Process medications to extract names and dosages
        const processedData = responseData.data.map((record) => ({
          ...record,
          medications: (
            <Table>
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Dosage</th>
                </tr>
              </thead>
              <tbody>
                {record.medications.map((medication, index) => (
                  <tr key={index}>
                    <td>{medication.medication}</td>
                    <td>{medication.dosage}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ),
          treatmentDate: formatDate(record.treatmentDate),
        }));

        setReportData(processedData);
        setShowReport(true);
      } else {
        setReportData([]);
        setShowReport(false);
      }
    } catch (error) {
      console.error('Error fetching batch treatments:', error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <h2 className="text-white">Batch Treatment Report</h2>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchNumber" className="text-white">
                    Batch Number
                  </Label>
                  <Select
                    id="batchNumber"
                    name="batchNumber"
                    value={batchNumbers.find((option) => option.value === batchNumber)}
                    onChange={(selectedOption) => setBatchNumber(selectedOption.value)}
                    options={batchNumbers}
                    placeholder="Select Batch Number"
                    isSearchable
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button type="submit" color="primary">
                Generate Report
              </Button>
            </FormGroup>
          </Form>

          {showReport && (
            <Table responsive bordered className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Treatment Date</th>
                  <th>Batch Number</th>
                  <th>Diagnosis</th>
                  <th>Dosage Regimen</th>
                  <th>Notes</th>
                  <th>Treatment Done By</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((record, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{record.treatmentDate}</td>
                    <td>{record.batchNumber}</td>
                    <td>{record.diagnosis}</td>
                    <td>{record.medications}</td>
                    <td>{record.notes}</td>
                    <td>{record.treatmentDoneBy}</td>
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

export default BatchTreatmentReport;
