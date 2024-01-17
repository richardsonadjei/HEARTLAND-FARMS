import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const PigCrossingReport = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });

  const [pigCrossings, setPigCrossings] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/pig-crossings-by-period?startDate=${formData.startDate}&endDate=${formData.endDate}`);
      if (response.ok) {
        const data = await response.json();
        setPigCrossings(data);
        setShowReport(true);
      } else {
        console.error('Failed to fetch pig crossings data');
      }
    } catch (error) {
      console.error('An unexpected error occurred while fetching pig crossings data');
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ size: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit} className="pig-crossing-report-form">
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate" className="text-white">Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="endDate" className="text-white">End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">Generate Report</Button>
          </Form>

          {showReport && (
            <div className="mt-5">
              <h2 className="text-white">Pig Crossing Report</h2>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Sow Identity Number</th>
                    <th>Boar Breed</th>
                    <th>Expected Delivery Date</th> {/* New column for expectedDayOfDelivery */}
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {pigCrossings.map((crossing, index) => (
                    <tr key={crossing._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{new Date(crossing.date).toLocaleDateString()}</td>
                      <td>{crossing.sowIdentityNumber}</td>
                      <td>{crossing.boarBreed}</td>
                      <td>{new Date(crossing.expectedDayOfDelivery).toLocaleDateString()}</td> {/* New cell for expectedDayOfDelivery */}
                      <td>{crossing.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PigCrossingReport;
