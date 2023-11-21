import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';

const BirdsAdditionHistory = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [birdAdditions, setBirdAdditions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch BirdAddition records within the specified date range
      const response = await fetch(`/api/add-birds-history?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();

      if (data && Array.isArray(data.data) && data.data.length > 0) {
        setBirdAdditions(data.data);
        setErrorMessage('');
      } else {
        setBirdAdditions([]);
        setErrorMessage('Unexpected response format or empty data');
      }
    } catch (error) {
      setBirdAdditions([]);
      setErrorMessage('Internal Server Error');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold mb-4">Bird Addition History</h1>
      <Form onSubmit={handleSubmit} className="mx-auto max-w-md">
        <FormGroup className="mb-4">
          <Label for="startDate" className="block text-gray-700 text-sm font-bold mb-2">
            Start Date
          </Label>
          <Input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
          />
        </FormGroup>
        <FormGroup className="mb-4">
          <Label for="endDate" className="block text-gray-700 text-sm font-bold mb-2">
            End Date
          </Label>
          <Input
            type="date"
            name="endDate"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
          />
        </FormGroup>
        <Button
          color="primary"
          type="submit"
          className="bg-blue-50 hover:bg-blue-100 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Filter Additions
        </Button>
      </Form>

      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

      {birdAdditions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Addition History</h2>
          <Table striped className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Batch Number</th>
                <th className="px-4 py-2">New Quantity</th>
                <th className="px-4 py-2">Added Quantity</th>
                <th className="px-4 py-2">Added By</th>
                <th className="px-4 py-2">Added At</th>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(JSON.stringify(birdAdditions)).map((addition) => (
                <tr key={addition._id}>
                  <td className="border px-4 py-2">{addition.batchNumber}</td>
                  <td className="border px-4 py-2">{addition.newQuantity}</td>
                  <td className="border px-4 py-2">{addition.addedQuantity}</td>
                  <td className="border px-4 py-2">{addition.addedBy}</td>
                  <td className="border px-4 py-2">{new Date(addition.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BirdsAdditionHistory;
