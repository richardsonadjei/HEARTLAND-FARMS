import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const BatchHarvestingRecords = () => {
  const defaultType = 'Lettuce';
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [harvestingRecord, setHarvestingRecord] = useState(null);
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
      const response = await fetch(`/api/harvesting-records/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Harvesting record not found');
      }
      const data = await response.json();
      setHarvestingRecord(data);
      setErrorMessage('');
    } catch (error) {
      setHarvestingRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      // Make API call to update the harvesting record with the edited data
      const response = await fetch(`/api/harvesting-records/${harvestingRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vegetable: harvestingRecord.vegetable,
          batchNumber: harvestingRecord.batchNumber,
          quantityHarvested: harvestingRecord.quantityHarvested,
          harvestDate: harvestingRecord.harvestDate,
          additionalDetails: harvestingRecord.additionalDetails
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update harvesting record');
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
      // Make API call to delete the harvesting record
      const response = await fetch(`/api/harvesting-records/${harvestingRecord._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete harvesting record');
      }
  
      // Close the delete modal and reset the harvesting record
      toggleDeleteModal();
      setHarvestingRecord(null);
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
      <h2 className="mt-4">Batch Harvesting Records</h2>
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
        {harvestingRecord && (
          <table className="table">
            <thead>
              <tr>
                <th>Vegetable</th>
                <th>Batch Number</th>
                <th>Quantity Harvested</th>
                <th>Harvest Date</th>
                <th>Additional Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{harvestingRecord.vegetable}</td>
                <td>{harvestingRecord.batchNumber}</td>
                <td>{harvestingRecord.quantityHarvested}</td>
                <td>{new Date(harvestingRecord.harvestDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{harvestingRecord.additionalDetails}</td>
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
        <ModalHeader toggle={toggleEditModal}>Edit Harvesting Record</ModalHeader>
        <ModalBody>
          {harvestingRecord && (
            <Form>
              <FormGroup>
                <Label for="vegetable">Vegetable</Label>
                <Input type="text" name="vegetable" id="vegetable" value={harvestingRecord.vegetable || ''} disabled />
              </FormGroup>
              <FormGroup>
                <Label for="batchNumber">Batch Number</Label>
                <Input type="text" name="batchNumber" id="batchNumber" value={harvestingRecord.batchNumber || ''} disabled />
              </FormGroup>
              <FormGroup>
                <Label for="quantityHarvested">Quantity Harvested</Label>
                <Input type="number" name="quantityHarvested" id="quantityHarvested" value={harvestingRecord.quantityHarvested || ''} onChange={(e) => setHarvestingRecord({ ...harvestingRecord, quantityHarvested: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="harvestDate">Harvest Date</Label>
                <Input type="date" name="harvestDate" id="harvestDate" value={harvestingRecord.harvestDate || ''} onChange={(e) => setHarvestingRecord({ ...harvestingRecord, harvestDate: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="additionalDetails">Additional Details</Label>
                <Input type="textarea" name="additionalDetails" id="additionalDetails" value={harvestingRecord.additionalDetails || ''} onChange={(e) => setHarvestingRecord({ ...harvestingRecord, additionalDetails: e.target.value })} />
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

export default BatchHarvestingRecords;
