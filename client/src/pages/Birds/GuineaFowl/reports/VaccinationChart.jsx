import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const VaccinationChart = () => {
  const [vaccinationCharts, setVaccinationCharts] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [editedDrugName, setEditedDrugName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedAgeRangeStart, setEditedAgeRangeStart] = useState('');
  const [editedAgeRangeEnd, setEditedAgeRangeEnd] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-vaccination-chart');
      if (!response.ok) {
        throw new Error('Failed to fetch vaccination charts');
      }
      const data = await response.json();
      setVaccinationCharts(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (chart) => {
    setSelectedChart(chart);
    setEditedDrugName(chart.drugName);
    setEditedDescription(chart.description);
    setEditedAgeRangeStart(chart.ageRangeStart);
    setEditedAgeRangeEnd(chart.ageRangeEnd);
    toggleModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/vaccination-chart/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete vaccination chart');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/vaccination-chart/${selectedChart._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ drugName: editedDrugName, description: editedDescription, ageRangeStart: editedAgeRangeStart, ageRangeEnd: editedAgeRangeEnd }),
      });
      if (!response.ok) {
        throw new Error('Failed to update vaccination chart');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <h1>All Vaccination Charts</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Drug Name</th>
            <th>Start Day</th>
            <th>End Day</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vaccinationCharts.map((chart, index) => (
            <tr key={chart._id}>
              <th scope="row">{index + 1}</th>
              <td>{chart.drugName}</td>
              <td>{chart.ageRangeStart}</td>
              <td>{chart.ageRangeEnd}</td>
              <td>{chart.description}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }} onClick={() => handleEdit(chart)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(chart._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Vaccination Chart</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="editedDrugName">Drug Name</Label>
              <Input
                type="text"
                id="editedDrugName"
                value={editedDrugName}
                onChange={(e) => setEditedDrugName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedDescription">Description</Label>
              <Input
                type="textarea"
                id="editedDescription"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedAgeRangeStart">Start Day</Label>
              <Input
                type="number"
                id="editedAgeRangeStart"
                value={editedAgeRangeStart}
                onChange={(e) => setEditedAgeRangeStart(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedAgeRangeEnd">Start End</Label>
              <Input
                type="number"
                id="editedAgeRangeEnd"
                value={editedAgeRangeEnd}
                onChange={(e) => setEditedAgeRangeEnd(e.target.value)}
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>Save</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default VaccinationChart;