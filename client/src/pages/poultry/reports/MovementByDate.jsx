import React, { useState, useEffect } from 'react';
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const MovementByDate = () => {
  const [movements, setMovements] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch movement data from the server when the component mounts
    // Disabled auto-fetching on mount to allow manual filtering
    // fetchMovements();
  }, []);

  const fetchMovements = async () => {
    try {
      // Replace the URL with the actual endpoint to fetch movements within a period
      const response = await fetch(`/api/date-movements?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();

      if (data.success) {
        setMovements(data.data);
      } else {
        console.error('Error fetching movements:', data.error);
      }
    } catch (error) {
      console.error('Error fetching movements:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch movements within the specified date range
    fetchMovements();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Movements History Report</h2>
      <Form onSubmit={handleSubmit} className="mb-3 d-flex justify-content-center">
        <FormGroup className="mr-2">
          <Label for="startDate">Start Date</Label>
          <Input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ width: '200px' }} // Adjust the width as needed
          />
        </FormGroup>
        <FormGroup className="mr-2">
          <Label for="endDate">End Date</Label>
          <Input
            type="date"
            name="endDate"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ width: '200px' }} // Adjust the width as needed
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Filter Movements
        </Button>
      </Form>

      {movements.length > 0 && (
        <Table striped className="mx-auto">
          <thead>
            <tr>
              <th>Batch Number</th>
              <th>Breed</th>
              <th>From Farm Section</th>
              <th>To Farm Section</th>
              <th>Quantity</th>
              <th>Moved By</th>
              <th>Movement Reason</th>
              <th>Movement Date</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td>{movement.batchNumber}</td>
                <td>{movement.breed}</td>
                <td>{movement.fromFarmSection}</td>
                <td>{movement.toFarmSection}</td>
                <td>{movement.quantity}</td>
                <td>{movement.movementBy}</td>
                <td>{movement.movementReason}</td>
                <td>{new Date(movement.movementDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default MovementByDate;
