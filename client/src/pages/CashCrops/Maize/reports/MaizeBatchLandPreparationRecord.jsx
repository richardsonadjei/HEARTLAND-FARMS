import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const MaizeBatchLandPreparationRecord = () => {
  const defaultType = 'Maize';
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [landPreparationRecord, setLandPreparationRecord] = useState(null);
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
      const response = await fetch(`/api/maize-batch-land-preparations?batchNumber=${batchNumber}&cashCrop=${defaultType}`);
      if (!response.ok) {
        throw new Error('Maize land preparation record not found');
      }
      const data = await response.json();
      setLandPreparationRecord(data[0]);
      setErrorMessage('');
    } catch (error) {
      setLandPreparationRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/update-cashcrop-landpreparation-by-id/${landPreparationRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cashCrop: landPreparationRecord.cashCrop,
          batchNumber: landPreparationRecord.batchNumber,
          date: landPreparationRecord.date,
          location: landPreparationRecord.location,
          areaCleared: landPreparationRecord.areaCleared,
          machineryUsed: landPreparationRecord.machineryUsed,
          recordedBy: landPreparationRecord.recordedBy
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update land preparation record');
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
      const response = await fetch(`/api/delete-cashcrop-landpreparation-by-id/${landPreparationRecord._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete land preparation record');
      }

      // Close the delete modal and reset the land preparation record
      toggleDeleteModal();
      setLandPreparationRecord(null);
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
      <h2 className="mt-4">Maize Batch Land Preparation Record</h2>
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
      {landPreparationRecord && (
        <div className="mt-4" style={{ overflowX: 'auto', width: '100%' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Cash Crop</th>
                <th>Batch Number</th>
                <th>Date</th>
                <th>Location</th>
                <th>Area Cleared</th>
                <th>Machinery Used</th>
                <th>Recorded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{landPreparationRecord.cashCrop}</td>
                <td>{landPreparationRecord.batchNumber}</td>
                <td>{new Date(landPreparationRecord.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{landPreparationRecord.location}</td>
                <td>{landPreparationRecord.areaCleared}</td>
                <td>{landPreparationRecord.machineryUsed}</td>
                <td>{landPreparationRecord.recordedBy}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={toggleEditModal} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={toggleDeleteModal} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Edit Modal */}
          <Modal isOpen={editModal} toggle={toggleEditModal}>
            <ModalHeader toggle={toggleEditModal}>Edit Land Preparation Record</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="cashCrop">Cash Crop</Label>
                  <Input type="text" name="cashCrop" id="cashCrop" value={landPreparationRecord.cashCrop || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="batchNumber">Batch Number</Label>
                  <Input type="text" name="batchNumber" id="batchNumber" value={landPreparationRecord.batchNumber || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input type="text" name="date" id="date" value={new Date(landPreparationRecord.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="location">Location</Label>
                  <Input type="text" name="location" id="location" value={landPreparationRecord.location || ''} onChange={(e) => setLandPreparationRecord({ ...landPreparationRecord, location: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="areaCleared">Area Cleared</Label>
                  <Input type="text" name="areaCleared" id="areaCleared" value={landPreparationRecord.areaCleared || ''} onChange={(e) => setLandPreparationRecord({ ...landPreparationRecord, areaCleared: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="machineryUsed">Machinery Used</Label>
                  <Input type="text" name="machineryUsed" id="machineryUsed" value={landPreparationRecord.machineryUsed || ''} onChange={(e) => setLandPreparationRecord({ ...landPreparationRecord, machineryUsed: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="recordedBy">Recorded By</Label>
                  <Input type="text" name="recordedBy" id="recordedBy" value={landPreparationRecord.recordedBy || ''} onChange={(e) => setLandPreparationRecord({ ...landPreparationRecord, recordedBy: e.target.value })} />
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

export default MaizeBatchLandPreparationRecord;
