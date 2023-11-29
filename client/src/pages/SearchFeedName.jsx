import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

const SearchFeedName = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipTarget, setTooltipTarget] = useState(null);

  useEffect(() => {
    // Function to fetch data from the server based on the search term
    const fetchData = async () => {
      try {
        // You need to replace the API endpoint with the actual endpoint to fetch feed names
        const response = await fetch(`/api/search-feed-name?search=${searchTerm}`);
        const data = await response.json();
        setSearchResults(data); // Assuming the API returns an array of matching feed names
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data only if the search term is not empty
    if (searchTerm !== '') {
      fetchData();
    } else {
      setSearchResults([]); // Clear search results if the search term is empty
    }
  }, [searchTerm]); // Trigger useEffect when the search term changes

  const toggleTooltip = (text, target) => {
    setTooltipText(text);
    setTooltipTarget(target);
    setTooltipOpen(!tooltipOpen);
  };

  // Function to convert UTC date to local date string
  const convertToLocalDate = (utcDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(utcDate).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <FormGroup>
              <Label for="searchInput">Search Available Feeds:</Label>
              <Input
                type="text"
                id="searchInput"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul>
            {searchResults.map((result) => (
              <li key={result._id}>
                <Link
                  to={`/view-feed/${result._id}`}
                  className="feed-link"
                  id={`tooltip-${result._id}`}
                  onMouseOver={() =>
                    toggleTooltip(
                      `Quantity in Stock: ${result.quantityInStock}\nManufacture Date: ${convertToLocalDate(
                        result.manufactureDate
                      )}\nExpiry Date: ${convertToLocalDate(result.expiryDate)}`,
                      result._id
                    )
                  }
                  onMouseOut={() => toggleTooltip('', null)}
                >
                  {result.feedName}
                </Link>
                <Tooltip
                  placement="right"
                  isOpen={tooltipOpen && tooltipTarget === result._id}
                  target={`tooltip-${result._id}`}
                >
                  {tooltipText}
                </Tooltip>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchFeedName;
