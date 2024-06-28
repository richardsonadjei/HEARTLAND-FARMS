import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';




import { Link } from 'react-router-dom';
import CustomSidebar from '../../SideBar';
import BirdTypeUnsortedEggsCard from './BirdTypeUnsortedEggsCardCollectedCard';
import BirdAgeCategoriesTable from './BirdAgeCategories';
import BirdsSummaryChart from './BirdSummaryReport';
import EggsStockTable from './EggsStock';


const TurkeyDashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedDashboard, setSelectedDashboard] = useState('BirdsFarm');

  useEffect(() => {
    setCurrentDate(formatDate(new Date()));
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="dashboard-container">
      <CustomSidebar setSelectedDashboard={setSelectedDashboard} />
      <Row className="mt-3 bird-buttons-row justify-content-center">
        <Col md="auto">
          <Link to="/birds-farm-dashboard" className="bird-link">
            <Button variant="primary" className="bird-button mx-2">
              Poultry
            </Button>
          </Link>
          <Link to="/duck-dashboard" className="bird-link">
            <Button variant="primary" className="bird-button mx-2">
              Duck
            </Button>
          </Link>
          <Link to="/guinea-fowl-dashboard" className="bird-link">
            <Button variant="primary" className="bird-button mx-2">
              Guinea Fowl
            </Button>
          </Link>
          <Link to="/turkey-dashboard" className="bird-link">
            <Button variant="primary" className="bird-button mx-2">
              Turkey
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={4}>
          <BirdTypeUnsortedEggsCard />
        </Col>
        {/* <Col md={8}>
          <SortedEggsCard currentDate={currentDate} />
        </Col> */}
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <BirdAgeCategoriesTable />
        </Col>
        <Col md={6}>
          <BirdsSummaryChart />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <EggsStockTable type="sorted" />
        </Col>
        <Col md={6}>
          <EggsStockTable type="unsorted" />
        </Col>
      </Row>
    </div>
  );
};

export default TurkeyDashboard;
