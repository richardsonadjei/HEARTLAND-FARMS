import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table, Card, CardBody } from 'reactstrap';
import Select from 'react-select';

const GuineaFowlBatchMortalityReport = () => {
  const [batchOptions, setBatchOptions] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [mortalities, setMortalities] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchBatchNumbers = async () => {
      try {
        const response = await fetch('/api/all-guinea-fowl');
        if (response.ok) {
          const data = await response.json();
          // Map batch numbers to options format required by react-select
          const options = data.map((batch) => ({
            value: batch.batchNumber,
            label: `${batch.batchNumber} - Stock: ${batch.quantity}`,
          }));
          setBatchOptions(options);
        } else {
          console.error('Error fetching batch numbers');
        }
      } catch (error) {
        console.error('Error fetching batch numbers:', error);
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

  const fetchMortalitiesByBatch = async () => {
    try {
      const response = await fetch(`/api/guinea-fowl-batch-mortality/${selectedBatch}`);
      if (response.ok) {
        const responseData = await response.json();
        if (responseData && responseData.data && Array.isArray(responseData.data)) {
          setMortalities(responseData.data);
          setShowReport(true);
        } else {
          setMortalities([]);
          setShowReport(false);
        }
      } else {
        console.error('Error fetching mortalities');
      }
    } catch (error) {
      console.error('Error fetching mortalities:', error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <h2 className="text-white">Guinea Fowl Batch Mortality Report</h2>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchNumber" className="text-white">
                    Select Batch Number
                  </Label>
                  <Select
                    id="batchNumber"
                    name="batchNumber"
                    value={batchOptions.find((option) => option.value === selectedBatch)}
                    onChange={(selectedOption) => setSelectedBatch(selectedOption.value)}
                    options={batchOptions}
                    placeholder="Select Batch Number"
                    isSearchable
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Button type="button" color="primary" onClick={fetchMortalitiesByBatch}>
                    Generate Report
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>

          {showReport && (
            <Card className="mt-4">
              <CardBody>
                <h5 className="mb-4">{`${selectedBatch} Mortality Details`}</h5>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Batch Number</th>
                      <th>Quantity</th>
                      <th>Cause</th>
                      <th>Notes</th>
                      <th>Recorded By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mortalities.map((mortality, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(mortality.date)}</td>
                        <td>{mortality.batchNumber}</td>
                        <td>{mortality.quantity}</td>
                        <td>{mortality.cause}</td>
                        <td>{mortality.notes}</td>
                        <td>{mortality.recordedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GuineaFowlBatchMortalityReport;
