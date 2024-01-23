import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'reactstrap';

const AllFeedCategories = () => {
  const [feedCategories, setFeedCategories] = useState([]);

  useEffect(() => {
    // Fetch all feed categories when the component mounts
    fetch('/api/all-feed-category')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Update the state with the fetched feed categories
          setFeedCategories(data.data);
        } else {
          console.error('Error fetching feed categories:', data.error);
        }
      })
      .catch(error => console.error('Error fetching feed categories:', error));
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <Container>
      <h2>All Feed Categories</h2>
      {feedCategories.length > 0 ? (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {feedCategories.map((category, index) => (
              <tr key={category._id}>
                <th scope="row">{index + 1}</th>
                <td>{category.name}</td>
                <td>{category.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No feed categories available.</p>
      )}
      <Button color="primary" onClick={() => window.location.href = '/poultry-getting-started'}>
        Go back to Poultry Dashboard
      </Button>
    </Container>
  );
};

export default AllFeedCategories;
