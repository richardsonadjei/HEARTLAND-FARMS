import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const AllGuineaFowlReport = () => {
  const [guineaFowls, setGuineaFowls] = useState([]);
  const [summaryReport, setSummaryReport] = useState({});
  const [farmSectionSummary, setFarmSectionSummary] = useState({});
  const [ageSummary, setAgeSummary] = useState({});

  useEffect(() => {
    fetchGuineaFowls();
  }, []);

  const fetchGuineaFowls = async () => {
    try {
      const response = await fetch('/api/all-guinea-fowl');
      if (!response.ok) {
        throw new Error('Error fetching Guinea Fowl data');
      }
      const guineaFowlsData = await response.json();
      setGuineaFowls(guineaFowlsData);

      // Generate and set the summary reports
      const totalQuantity = guineaFowlsData.reduce((total, fowl) => total + fowl.quantity, 0);
      setSummaryReport({ totalQuantity });

      const farmSectionSummaryData = generateFarmSectionSummary(guineaFowlsData);
      setFarmSectionSummary(farmSectionSummaryData);

      const ageSummaryData = generateAgeSummary(guineaFowlsData);
      setAgeSummary(ageSummaryData);
    } catch (error) {
      console.error('Error fetching Guinea Fowl data:', error.message);
    }
  };

  const generateFarmSectionSummary = (data) => {
    const farmSectionSummaryData = data.reduce((summary, fowl) => {
      const { farmSection, quantity } = fowl;
      summary[farmSection] = (summary[farmSection] || 0) + quantity;
      return summary;
    }, {});
    return farmSectionSummaryData;
  };

  const generateAgeSummary = (data) => {
    const ageSummaryData = data.reduce((summary, fowl) => {
      const { currentAge, quantity } = fowl;
      summary[currentAge] = (summary[currentAge] || 0) + quantity;
      return summary;
    }, {});
    return ageSummaryData;
  };

  return (
    <Container>
      <Row>
        <Col sm="12">
          <h2 className="mb-4 text-center">All Guinea Fowl Report</h2>

          {/* General Report */}
          <Table responsive className="mb-4" bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Batch Number</th>
                <th>Quantity</th>
                <th>Farm Section</th>
                <th>Current Age</th>
                {/* Add more columns if needed */}
              </tr>
            </thead>
            <tbody>
              {guineaFowls.map((fowl, index) => (
                <tr key={fowl._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{fowl.batchNumber}</td>
                  <td>{fowl.quantity}</td>
                  <td>{fowl.farmSection}</td>
                  <td>{fowl.currentAge}</td>
                  {/* Add more columns if needed */}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Farm Section Summary */}
          <h4 className="mb-3">Farm Section Summary</h4>
          <Table bordered>
            <thead>
              <tr>
                <th>Farm Section</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(farmSectionSummary).map(([farmSection, totalQuantity]) => (
                <tr key={farmSection}>
                  <td>{farmSection}</td>
                  <td>{totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Age Summary */}
          <h4 className="mb-3">Age Summary</h4>
          <Table bordered>
            <thead>
              <tr>
                <th>Current Age</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ageSummary).map(([currentAge, totalQuantity]) => (
                <tr key={currentAge}>
                  <td>{currentAge}</td>
                  <td>{totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AllGuineaFowlReport;
