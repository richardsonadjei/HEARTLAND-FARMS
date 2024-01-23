import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const BatchDewormingReport = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [batchOptions, setBatchOptions] = useState([]);
  const [dewormings, setDewormings] = useState([]);

  useEffect(() => {
    // Fetch batch numbers when the component mounts
    fetchBatchNumbers();
  }, []);
  
  const fetchBatchNumbers = async () => {
    try {
      const batchResponse = await fetch('/api/all-batchesNoDates');
      if (!batchResponse.ok) {
        throw new Error('Error fetching batch numbers');
      }
      const batchData = await batchResponse.json();
  
      // Check if the data.data.batches property exists and is an array
      if (batchData && batchData.data && batchData.data.batches && Array.isArray(batchData.data.batches)) {
        const formattedBatchOptions = batchData.data.batches.map((batch) => ({
          value: batch.batchNumber,
          label: batch.batchNumber,
        }));
        setBatchOptions(formattedBatchOptions);
      } else {
        setBatchOptions([]);
      }
    } catch (error) {
      console.error('Error fetching batch numbers:', error.message);
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/deworming/batch/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Error fetching deworming data');
      }

      const responseData = await response.json();
      // Convert dates to local dates
      const formattedDewormings = responseData.data.map((deworming) => ({
        ...deworming,
        dewormingDate: new Date(deworming.dewormingDate).toLocaleDateString(),
      }));
      setDewormings(formattedDewormings);
    } catch (error) {
      console.error('Error fetching deworming data:', error.message);
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'blue' : 'white',
    }),
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h2 className="text-white mb-4">Batch Deworming Report</h2>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchNumber" className="text-white">
                    Select Batch Number
                  </Label>
                  <Select
                    id="batchNumber"
                    name="batchNumber"
                    value={{ value: batchNumber, label: batchNumber }}
                    onChange={(selectedOption) => setBatchNumber(selectedOption.value)}
                    options={batchOptions}
                    placeholder="Select Batch Number"
                    isSearchable
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Button type="submit" color="primary">
                  Generate Report
                </Button>
              </Col>
            </Row>
          </Form>

          {dewormings.length > 0 && (
            <>
              <h3 className="text-white mt-4 mb-2">Deworming Details</h3>
              <Table responsive className="table-shadow">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Dewormer Name</th>
                    <th>Dewormed By</th>
                    {/* Add more columns based on your Deworming model */}
                  </tr>
                </thead>
                <tbody>
                  {dewormings.map((deworming, index) => (
                    <tr key={deworming._id}>
                      <td>{index + 1}</td>
                      <td>{deworming.dewormingDate}</td>
                      <td>{deworming.dewormerName}</td>
                      <td>{deworming.dewormedBy}</td>
                      {/* Add more cells based on your Deworming model */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BatchDewormingReport;
