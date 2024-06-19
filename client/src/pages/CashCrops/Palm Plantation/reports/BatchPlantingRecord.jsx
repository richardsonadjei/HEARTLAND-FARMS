import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const PalmBatchPlantingRecord = () => {
  const defaultType = 'Palm';
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [plantingRecord, setPlantingRecord] = useState(null);
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
      const response = await fetch(`/api/cash-crop-planting?batchNumber=${batchNumber}&type=${defaultType}`);
      if (!response.ok) {
        throw new Error('Palm planting record not found');
      }
      const data = await response.json();
      setPlantingRecord(data[0]);
      setErrorMessage('');
    } catch (error) {
      setPlantingRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/edit-cash-crop-plantings/${plantingRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: plantingRecord.type,
          batchNumber: plantingRecord.batchNumber,
          datePlanted: plantingRecord.datePlanted,
          areaPlanted: plantingRecord.areaPlanted,
          expectedMaturityDate: plantingRecord.expectedMaturityDate,
          recordedBy: plantingRecord.recordedBy
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update planting record');
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
      const response = await fetch(`/api/delete-cash-crop-plantings/${plantingRecord._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete planting record');
      }

      // Close the delete modal and reset the planting record
      toggleDeleteModal();
      setPlantingRecord(null);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const fetchBatchOptions = async (type) => {
    try {
      const response = await fetch(`/api/cashcrop-batches/${type}`);
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
      <h2 className="mt-4">Batch Planting Record</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="batchNumber">Select Batch Number:</Label>
          <Select
            id="batchNumber"
            options={batchOptions}
            value={{ value: batchNumber, label: batchNumber }}
            onChange={(selectedOption) => setBatchNumber(selectedOption.value)}
            isSearchable
            placeholder="Select Batch Number"
          />
        </FormGroup>
        <Button type="submit" color="primary">Submit</Button>
      </Form>
      {errorMessage && <p>{errorMessage}</p>}
      {plantingRecord && (
        <div className="mt-4" style={{ overflowX: 'auto', width: '100%' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Batch Number</th>
                <th>Date Planted</th>
                <th>Area Planted</th>
                <th>Expected Maturity Date</th>
                <th>Recorded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{plantingRecord.type}</td>
                <td>{plantingRecord.batchNumber}</td>
                <td>{new Date(plantingRecord.datePlanted).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{plantingRecord.areaPlanted}</td>
                <td>{plantingRecord.expectedMaturityDate}</td>
                <td>{plantingRecord.recordedBy}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={toggleEditModal} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={toggleDeleteModal} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Edit Modal */}
          <Modal isOpen={editModal} toggle={toggleEditModal}>
            <ModalHeader toggle={toggleEditModal}>Edit Planting Record</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="type">Type</Label>
                  <Input type="text" name="type" id="type" value={plantingRecord.type || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="batchNumber">Batch Number</Label>
                  <Input type="text" name="batchNumber" id="batchNumber" value={plantingRecord.batchNumber || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="datePlanted">Date Planted</Label>
                  <Input type="text" name="datePlanted" id="datePlanted" value={new Date(plantingRecord.datePlanted).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="areaPlanted">Area Planted</Label>
                  <Input type="text" name="areaPlanted" id="areaPlanted" value={plantingRecord.areaPlanted || ''} onChange={(e) => setPlantingRecord({ ...plantingRecord, areaPlanted: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="expectedMaturityDate">Expected Maturity Date</Label>
                  <Input type="text" name="expectedMaturityDate" id="expectedMaturityDate" value={plantingRecord.expectedMaturityDate || ''} onChange={(e) => setPlantingRecord({ ...plantingRecord, expectedMaturityDate: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="recordedBy">Recorded By</Label>
                  <Input type="text" name="recordedBy" id="recordedBy" value={plantingRecord.recordedBy || ''} onChange={(e) => setPlantingRecord({ ...plantingRecord, recordedBy: e.target.value })} />
                </FormGroup>
              </Form>
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
        </div>
      )}
    </Container>
  );
};

export default PalmBatchPlantingRecord;
