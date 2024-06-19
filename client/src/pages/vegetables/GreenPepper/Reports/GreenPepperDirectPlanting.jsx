import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const GreenPepperDirectPlanting = () => {
  const defaultType = 'Green Pepper';
  const [selectedType, setSelectedType] = useState(defaultType);
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [directPlantingRecord, setDirectPlantingRecord] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    fetchBatchOptions(defaultType);
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleInputChange = (e) => {
    setBatchNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/cabbage-direct-planting/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Cabbage direct planting record not found');
      }
      const data = await response.json();
      setDirectPlantingRecord(data);
      setErrorMessage('');
    } catch (error) {
      setDirectPlantingRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      // Make API call to update the direct planting record with the edited data
      const response = await fetch(`/api/vege-direct-plantings/${directPlantingRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vegetable: directPlantingRecord.vegetable,
          batchNumber: directPlantingRecord.batchNumber,
          quantityDirectPlanted: directPlantingRecord.quantityDirectPlanted,
          plantingDate: directPlantingRecord.plantingDate,
          expectedHarvestDate: directPlantingRecord.expectedHarvestDate,
          numberOfBeds: directPlantingRecord.numberOfBeds,
          additionalDetails: directPlantingRecord.additionalDetails
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update direct planting record');
      }
  
      // Close the edit modal and update the record
      toggleEditModal();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
  const handleDelete = async () => {
    try {
      // Make API call to delete the direct planting record
      const response = await fetch(`/api/vege-direct-plantings/${directPlantingRecord._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete direct planting record');
      }
  
      // Close the delete modal and reset the direct planting record
      toggleDeleteModal();
      setDirectPlantingRecord(null);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  

  const fetchBatchOptions = async (type) => {
    try {
      const response = await fetch(`/api/all-batches/${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch batch numbers');
      }
      const batches = await response.json();
      const options = batches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber }));
      setBatchOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Spring Onions Direct Planting Report</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for="batchNumber" sm={2}>Select Batch Number:</Label>
          <Col sm={8}>
            <Select
              id="batchNumber"
              options={batchOptions}
              value={{ value: batchNumber, label: batchNumber }}
              onChange={(selectedOption) => setBatchNumber(selectedOption.value)}
              isSearchable
              placeholder="Select Batch Number"
            />
          </Col>
          <Col sm={2}>
            <Button type="submit" color="primary">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="table-responsive">
        {directPlantingRecord && (
          <table className="table">
            <thead>
              <tr>
                <th>Vegetable</th>
                <th>Batch Number</th>
                <th>Quantity Direct Planted</th>
                <th>Planting Date</th>
                <th>Expected Harvest Date</th>
                <th>Number of Beds</th>
                <th>Additional Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{directPlantingRecord.vegetable}</td>
                <td>{directPlantingRecord.batchNumber}</td>
                <td>{directPlantingRecord.quantityDirectPlanted}</td>
                <td>{new Date(directPlantingRecord.plantingDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{new Date(directPlantingRecord.expectedHarvestDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{directPlantingRecord.numberOfBeds}</td>
                <td>{directPlantingRecord.additionalDetails}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={toggleEditModal} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={toggleDeleteModal} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Direct Planting Record</ModalHeader>
        <ModalBody>
          {directPlantingRecord && (
            <Form>
              <FormGroup>
                <Label for="vegetable">Vegetable</Label>
                <Input type="text" name="vegetable" id="vegetable" value={directPlantingRecord.vegetable || ''} readOnly />
              </FormGroup>
              <FormGroup>
                <Label for="batchNumber">Batch Number</Label>
                <Input type="text" name="batchNumber" id="batchNumber" value={directPlantingRecord.batchNumber || ''} readOnly />
              </FormGroup>
              <FormGroup>
                <Label for="quantityDirectPlanted">Quantity Direct Planted</Label>
                <Input type="number" name="quantityDirectPlanted" id="quantityDirectPlanted" value={directPlantingRecord.quantityDirectPlanted || ''} onChange={(e) => setDirectPlantingRecord({ ...directPlantingRecord, quantityDirectPlanted: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="plantingDate">Planting Date</Label>
                <Input type="date" name="plantingDate" id="plantingDate" value={directPlantingRecord.plantingDate || ''} onChange={(e) => setDirectPlantingRecord({ ...directPlantingRecord, plantingDate: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="expectedHarvestDate">Expected Harvest Date</Label>
                <Input type="date" name="expectedHarvestDate" id="expectedHarvestDate" value={directPlantingRecord.expectedHarvestDate || ''} onChange={(e) => setDirectPlantingRecord({ ...directPlantingRecord, expectedHarvestDate: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="numberOfBeds">Number of Beds</Label>
                <Input type="number" name="numberOfBeds" id="numberOfBeds" value={directPlantingRecord.numberOfBeds || ''} onChange={(e) => setDirectPlantingRecord({ ...directPlantingRecord, numberOfBeds: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="additionalDetails">Additional Details</Label>
                <Input type="textarea" name="additionalDetails" id="additionalDetails" value={directPlantingRecord.additionalDetails || ''} onChange={(e) => setDirectPlantingRecord({ ...directPlantingRecord, additionalDetails: e.target.value })} />
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEdit}>Save Changes</Button>
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this record?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default GreenPepperDirectPlanting ;
