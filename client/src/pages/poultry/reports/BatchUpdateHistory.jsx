import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';

const BatchUpdateHistory = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [batchUpdates, setBatchUpdates] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch BatchUpdate records within the specified date range
      const response = await fetch(`/api/update-history?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
     

      if (Array.isArray(data) && data.length > 0) {
        console.log(data);
        setBatchUpdates(data);
        setErrorMessage('');
      } else {
        setBatchUpdates([]);
        setErrorMessage('Unexpected response format');
      }
    } catch (error) {
      
      setBatchUpdates([]);
      setErrorMessage('Internal Server Error');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold mb-4">Batch Update History</h1>
      <Form onSubmit={handleSubmit} className="mb-3">
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
          Filter Updates
        </Button>
      </Form>

      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

     
      {batchUpdates.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Update History</h2>
          <Table striped className="table-auto">
            <thead>
              <tr>
              <th className="px-4 py-2">Update Date</th>
                <th className="px-4 py-2">Batch Number</th>
                <th className="px-4 py-2">Previous Quantity</th>
                <th className="px-4 py-2">New Quantity</th>
                <th className="px-4 py-2">Updated By</th>
                
              </tr>
            </thead>
            <tbody>
              {batchUpdates.map((update) => (
                <tr key={update._id}>
                  <td className="border px-4 py-2">
                    {new Date(update.updatedAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="border px-4 py-2">{update.batchNumber}</td>
                  <td className="border px-4 py-2">{update.previousQuantity}</td>
                  <td className="border px-4 py-2">{update.newQuantity}</td>
                  <td className="border px-4 py-2">{update.updatedBy}</td>
                  
                </tr>
              ))}
      </tbody>
    </Table>
  </div>
)}
    </div>
  );
};

export default BatchUpdateHistory;
