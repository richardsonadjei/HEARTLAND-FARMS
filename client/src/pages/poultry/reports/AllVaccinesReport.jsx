import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';

const AllVaccinesReport = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState({});
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedStartAge, setUpdatedStartAge] = useState('');
  const [updatedEndAge, setUpdatedEndAge] = useState('');

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch('/api/all-vaccinations');
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

  const toggleModal = () => setModal(!modal);

  const handleUpdate = (medication) => {
    setSelectedMedication(medication);
    setUpdatedName(medication.name);
    setUpdatedDescription(medication.description);
    setUpdatedStartAge(medication.ageRangeStart);
    setUpdatedEndAge(medication.ageRangeEnd);
    toggleModal();
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(`/api/vaccinations/${selectedMedication._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedMedication._id,
          name: updatedName,
          description: updatedDescription,
          ageRangeStart: updatedStartAge,
          ageRangeEnd: updatedEndAge,
        }),
      });

      if (response.ok) {
        toggleModal();
        alert('Medication updated successfully!');
        window.location.reload();
      } else {
        console.error('Failed to update medication');
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (medicationId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this medication?');

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/vaccinations/${medicationId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Medication deleted successfully!');
          window.location.reload();
        } else {
          console.error('Failed to delete medication');
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    }
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
                        onClick={() => handleUpdate(medication)}
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
      {/* Update Medication Modal */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Medication</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ageRangeStart">Start Age</Label>
              <Input
                type="number"
                name="ageRangeStart"
                id="ageRangeStart"
                value={updatedStartAge}
                onChange={(e) => setUpdatedStartAge(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ageRangeEnd">End Age</Label>
              <Input
                type="number"
                name="ageRangeEnd"
                id="ageRangeEnd"
                value={updatedEndAge}
                onChange={(e) => setUpdatedEndAge(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateSubmit}>
            Update
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllVaccinesReport;
