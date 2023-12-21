import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table, Card, CardBody } from 'reactstrap';
import Select from 'react-select';

const MortalityBatchReport = () => {
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [mortalities, setMortalities] = useState([]);
  const [showReport, setShowReport] = useState(false);

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

  const fetchMortalitiesByBatch = async () => {
    try {
      const response = await fetch(`/api/view-mortalities-by-batch/${selectedBatch}`);
      if (!response.ok) {
        throw new Error('Error fetching mortalities');
      }
      const responseData = await response.json();

      if (responseData && responseData.data && Array.isArray(responseData.data)) {
        setMortalities(responseData.data);
        setShowReport(true);
      } else {
        setMortalities([]);
        setShowReport(false);
      }
    } catch (error) {
      console.error('Error fetching mortalities:', error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderSummaryReport = () => {
    const batchCounts = {};

    mortalities.forEach((mortality) => {
      if (batchCounts[mortality.batchNumber]) {
        batchCounts[mortality.batchNumber] += mortality.count;
      } else {
        batchCounts[mortality.batchNumber] = mortality.count;
      }
    });

    return (
      <Card className="mt-4">
        <CardBody>
          <h5 className="mb-4">Summary Report</h5>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Total Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(batchCounts).map(([batchNumber, totalCount]) => (
                <tr key={batchNumber}>
                  <td>{batchNumber}</td>
                  <td>{totalCount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <h2 className="text-white">Mortality Batch Report</h2>
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
                    value={batchNumbers.find((option) => option.value === selectedBatch)}
                    onChange={(selectedOption) => setSelectedBatch(selectedOption.value)}
                    options={batchNumbers}
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
                <h5 className="mb-4">Mortality Details</h5>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Batch Number</th>
                      <th>Count</th>
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
                        <td>{mortality.count}</td>
                        <td>{mortality.cause}</td>
                        <td>{mortality.notes}</td>
                        <td>{mortality.recordedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {renderSummaryReport()}
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MortalityBatchReport;
