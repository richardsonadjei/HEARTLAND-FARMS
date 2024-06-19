import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';

const PoultryBirdSaleReport = () => {
  const defaultType = 'Poultry';
  const [birdSaleRecords, setBirdSaleRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchBirdSaleRecords();
  }, []);

  const fetchBirdSaleRecords = async () => {
    try {
      const response = await fetch(`/api/bird-sales?type=${defaultType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bird sale records');
      }
      const records = await response.json();
      setBirdSaleRecords(records);

      // Calculate the total amount
      const total = records.reduce((sum, record) => sum + record.totalAmount, 0);
      setTotalAmount(total);

      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container fluid>
      <h2 className="mt-4">Poultry Bird Sale Report</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Batch Number</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Batch Details</th>
              <th>Total Amount</th>
              <th>Additional Details</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(birdSaleRecords) && birdSaleRecords.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.type}</td>
                <td>{record.batchNumber}</td>
                <td>{new Date(record.date).toLocaleDateString('en-US')}</td>
                <td>{record.customerName}</td>
                <td>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Gender</th>
                        <th>Quantity</th>
                        <th>Price per Bird</th>
                        <th>Subtotal Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.batchDetails.map((batch, batchIndex) => (
                        <tr key={batchIndex}>
                          <td>{batch.gender}</td>
                          <td>{batch.quantity}</td>
                          <td>{batch.pricePerBird}</td>
                          <td>{batch.subTotalAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>{record.totalAmount}</td>
                <td>{record.additionalDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3">
          <h5>Total Amount: ₵{totalAmount.toFixed(2)}</h5>
        </div>
      </div>
    </Container>
  );
};

export default PoultryBirdSaleReport;
