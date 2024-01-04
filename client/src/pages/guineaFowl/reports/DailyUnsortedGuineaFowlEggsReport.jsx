import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const DailyUnsortedGuineaFowlEggReport = () => {
  const [date, setDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [summaryData, setSummaryData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the report data for the specified date
      const response = await fetch(`/api/view-daily-unsorted-guinea-fowl-eggs?date=${date}`);
      const data = await response.json();

      if (!response.ok) {
        // Handle the case where fetching the data failed
        console.error('Error fetching daily unsorted egg report data:', data.message);
        return;
      }

      // Process the data and update state
      setReportData(data.data);

      // Calculate summary data (for example, total quantity and crates)
      const farmSectionTotals = {}; // Store subtotals for each farm section
      let overallTotalCrates = 0;
      let overallTotalLooseEggs = 0;

      data.data.forEach((egg) => {
        // Calculate total crates and loose eggs separately
        const totalCrates = egg.crates;
        const totalLooseEggs = egg.looseEggs;

        // Calculate subtotals for each farm section
        if (!farmSectionTotals[egg.farmSection]) {
          farmSectionTotals[egg.farmSection] = { crates: totalCrates, looseEggs: totalLooseEggs };
        } else {
          farmSectionTotals[egg.farmSection].crates += totalCrates;
          farmSectionTotals[egg.farmSection].looseEggs += totalLooseEggs;
        }

        // Calculate total crates and loose eggs
        overallTotalCrates += totalCrates;
        overallTotalLooseEggs += totalLooseEggs;
      });

      // Convert excess loose eggs to crates
      const excessLooseEggsToCrates = Math.floor(overallTotalLooseEggs / 30);
      overallTotalCrates += excessLooseEggsToCrates;
      overallTotalLooseEggs %= 30;

      setSummaryData({
        farmSectionTotals,
        overallTotalCrates,
        overallTotalLooseEggs,
      });
    } catch (error) {
      console.error('Error fetching daily unsorted egg report:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(timeString).toLocaleTimeString(undefined, options);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={{ color: 'white' }}>Daily Unsorted Egg Report</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="date" style={{ color: 'white' }}>Select Date:</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Generate Report</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      {reportData.length > 0 && (
        <>
          <Row>
            <Col>
              <h3 style={{ color: 'white', marginTop: '20px' }}>Egg Report for {formatDate(date)}</h3>
              <div className="table-responsive">
                <table className="table table-bordered table-striped" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
                  <thead style={{ background: '#007BFF', color: 'white' }}>
                    <tr>
                      <th>#</th>
                      <th>Crates</th>
                      <th>Loose Eggs</th>
                      <th>Farm Section</th>
                      <th>Grading</th>
                      <th>Picked By</th>
                      <th>Picked At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((egg, index) => (
                      <tr key={egg._id}>
                        <td>{index + 1}</td>
                        <td>{egg.crates}</td>
                        <td>{egg.looseEggs}</td>
                        <td>{egg.farmSection}</td>
                        <td>{egg.grading}</td>
                        <td>{egg.pickedBy}</td>
                        <td>{formatTime(egg.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <h3 style={{ color: 'white', marginTop: '20px' }}>Summary Report</h3>
              <div className="table-responsive">
                <table className="table table-bordered table-striped" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
                  <thead style={{ background: '#007BFF', color: 'white' }}>
                    <tr>
                      <th>Farm Section</th>
                      <th>Total Crates</th>
                      <th>Total Loose Eggs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(summaryData.farmSectionTotals).map(([farmSection, totals]) => (
                      <tr key={farmSection}>
                        <td>{farmSection}</td>
                        <td>{totals.crates}</td>
                        <td>{totals.looseEggs}</td>
                      </tr>
                    ))}
                    <tr style={{ fontWeight: 'bold' }}>
                      <td>Overall Total</td>
                      <td>{summaryData.overallTotalCrates}</td>
                      <td>{summaryData.overallTotalLooseEggs}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default DailyUnsortedGuineaFowlEggReport;
