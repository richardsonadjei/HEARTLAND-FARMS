import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

const formatDateToLocal = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
    return formattedDate;
  };
  
const MaizeSeasonReport = () => {
  const [maizeSeasons, setMaizeSeasons] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchMaizeSeasons = async () => {
      try {
        const response = await fetch('/api/all-maize-seasons');
        const data = await response.json();
        setMaizeSeasons(data.maizeSeasons);
        setShowReport(true);
      } catch (error) {
        console.error('Error fetching maize seasons:', error.message);
      }
    };

    fetchMaizeSeasons();
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  return (
    <Container className="my-4">
      {showReport && (
        <Row>
          <Col>
            <h2 className="my-3 text-center">Maize Season Report</h2>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Season Number</th>
                    <th>Start Date</th>
                    <th>Expected Date of Harvest</th>
                    <th>Additional Information</th>
                   
                   
                  </tr>
                </thead>
                <tbody>
                  {maizeSeasons.map((season, index) => (
                    <tr key={season._id}>
                      <td>{index + 1}</td>
                      <td>{season.batchNumber}</td>
                      <td>{formatDateToLocal(season.startDate)}</td>
                      <td>{season.endDate}</td>
                      <td>{season.additionalDetails}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MaizeSeasonReport;
