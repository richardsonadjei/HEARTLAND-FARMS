import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AllDrugs = () => {
  const [medications, setMedications] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState({});
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDosage, setUpdatedDosage] = useState('');
  const [updatedUsageInstructions, setUpdatedUsageInstructions] = useState('');
  const [updatedWarnings, setUpdatedWarnings] = useState('');
  const [updatedPrecautions, setUpdatedPrecautions] = useState('');

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/all-drugs');
        if (response.ok) {
          const data = await response.json();
          setMedications(data);
        } else {
          console.error('Failed to fetch medications');
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (medication) => {
    setSelectedMedication(medication);
    setUpdatedName(medication.name);
    setUpdatedDosage(medication.dosage || '');
    setUpdatedUsageInstructions(medication.usageInstructions || '');
    setUpdatedWarnings(medication.warnings || '');
    setUpdatedPrecautions(medication.precautions || '');
    toggleModal();
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/medications/${selectedMedication._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedMedication._id,
          name: updatedName,
          dosage: updatedDosage,
          usageInstructions: updatedUsageInstructions,
          warnings: updatedWarnings,
          precautions: updatedPrecautions,
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
        const response = await fetch(`/api/delete-medications/${medicationId}`, {
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
      <Row>
        <Col>
          <h2 className="text-white mb-4">All Medications Report</h2>
          <Table responsive hover bordered className="shadow">
            <thead>
              <tr>
              <th>#</th>
                <th>Name</th>
                <th>Dosage</th>
                <th>Usage Instructions</th>
                <th>Warnings</th>
                <th>Precautions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {medications.map((medication, index) => (
                <tr key={medication._id}>
                   <td>{index + 1}</td>
                  <td>{medication.name}</td>
                  <td>{medication.dosage}</td>
                  <td>{medication.usageInstructions}</td>
                  <td>{medication.warnings}</td>
                  <td>{medication.precautions}</td>
                  <td>
                    <span className="mr-2" onClick={() => handleEdit(medication)}>
                      <FaEdit className="text-primary" />
                    </span>
                    <span onClick={() => handleDelete(medication._id)}>
                      <FaTrashAlt className="text-danger" />
                    </span>
                  </td>
                </tr>
              ))}
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
              <Label for="dosage">Dosage</Label>
              <Input
                type="text"
                name="dosage"
                id="dosage"
                value={updatedDosage}
                onChange={(e) => setUpdatedDosage(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="usageInstructions">Usage Instructions</Label>
              <Input
                type="text"
                name="usageInstructions"
                id="usageInstructions"
                value={updatedUsageInstructions}
                onChange={(e) => setUpdatedUsageInstructions(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="warnings">Warnings</Label>
              <Input
                type="text"
                name="warnings"
                id="warnings"
                value={updatedWarnings}
                onChange={(e) => setUpdatedWarnings(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="precautions">Precautions</Label>
              <Input
                type="text"
                name="precautions"
                id="precautions"
                value={updatedPrecautions}
                onChange={(e) => setUpdatedPrecautions(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
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

export default AllDrugs;
