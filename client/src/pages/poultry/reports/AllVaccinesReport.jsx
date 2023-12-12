import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';

const AllVaccinesReport = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch('/api/all-vaccines');
        if (response.ok) {
          const data = await response.json();
          setMedications(data);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error fetching medications:', error);
        alert('Error fetching medications');
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  const handleUpdate = (id) => {
    // Implement the logic to handle the update based on the ID
    console.log(`Updating medication with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implement the logic to handle the delete based on the ID
    console.log(`Deleting medication with ID: ${id}`);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2 className="text-white mb-4">Vaccination Chart</h2>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Start Age</th>
                <th>End Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                medications.map((medication, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{medication.name}</td>
                    <td>{medication.description}</td>
                    <td>{medication.ageRangeStart}</td>
                    <td>{medication.ageRangeEnd}</td>
                    <td>
                      <IoPencilSharp
                        className="mr-2"
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => handleUpdate(medication._id)}
                      />
                      <IoTrashBinSharp
                        style={{ cursor: 'pointer', color: 'red' }}
                        onClick={() => handleDelete(medication._id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AllVaccinesReport;
