import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const BirdBatchMortalityReport = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [batchMortalities, setBatchMortalities] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [batchOptions, setBatchOptions] = useState([]);

  useEffect(() => {
    fetchBatchOptions();
  }, []);

  const fetchBatchOptions = async () => {
    try {
      const response = await fetch('/api/all-batchesNoDates');
      if (!response.ok) {
        throw new Error('Error fetching batch options');
      }
      const data = await response.json();
      const options = data.data.map((batch) => ({
        value: batch.batchNumber,
        label: `${batch.batchNumber} - Stock: ${batch.quantity}`,
        quantity: parseInt(batch.quantity, 10) || 0,
      }));
      setBatchOptions(options);
    } catch (error) {
      console.error('Error fetching batch options:', error.message);
    }
  };

  const fetchBatchMortalities = async () => {
    try {
     
      const response = await fetch(`/api/view-batch-mortality/${batchNumber}`); // Include batchNumber in the URL
      if (!response.ok) {
        throw new Error('Error fetching batch mortalities');
      }
      const data = await response.json();
      setBatchMortalities(data.data);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching batch mortalities:', error.message);
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

  const renderReportTable = () => {
    let count = 1;
    return (
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Quantity</th>
            <th>Cause</th>
            <th>Recorded By</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {batchMortalities.map((mortality) => (
            <tr key={mortality._id}>
              <td>{count++}</td>
              <td>{mortality.quantity}</td>
              <td>{mortality.cause}</td>
              <td>{mortality.recordedBy}</td>
              <td>{new Date(mortality.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderSummaryTable = () => {
    const totalQuantity = batchMortalities.reduce((sum, mortality) => sum + mortality.quantity, 0);
    return (
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Total Quantity</th>
            <th>Total Records</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalQuantity}</td>
            <td>{batchMortalities.length}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h2 className="mb-4 text-center">Batch Mortality Report</h2>
          <Form>
            <FormGroup row>
              <Label for="batchNumber" sm={3} className="text-white">
                Batch Number:
              </Label>
              <Col sm={6}>
                <Select
                  id="batchNumber"
                  name="batchNumber"
                  value={batchOptions.find((opt) => opt.value === batchNumber)}
                  onChange={(selectedOption) => setBatchNumber(selectedOption.value)}
                  options={batchOptions}
                  isSearchable
                  styles={customStyles}
                />
              </Col>
              <Col sm={3}>
                <Button onClick={fetchBatchMortalities} color="primary">
                  Generate Report
                </Button>
              </Col>
            </FormGroup>
          </Form>

          {showReport && (
            <>
              <h3 className="mt-4">Mortality Details</h3>
              {renderReportTable()}

              <h3 className="mt-4">Summary</h3>
              {renderSummaryTable()}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BirdBatchMortalityReport;