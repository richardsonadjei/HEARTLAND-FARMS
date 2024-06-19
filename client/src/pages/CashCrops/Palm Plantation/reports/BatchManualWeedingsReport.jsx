import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const BatchManualWeedingReport = () => {
  const defaultType = 'Palm';
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [weedingRecord, setWeedingRecord] = useState(null);
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
      const response = await fetch(`/api/cash-crop-manual-weeding/${batchNumber}/${defaultType}`);
      if (!response.ok) {
        throw new Error('Manual weeding record not found');
      }
      const data = await response.json();
      setWeedingRecord(data[0]);
      setErrorMessage('');
    } catch (error) {
      setWeedingRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/edit-cash-crop-manual-weeding/${weedingRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: weedingRecord.type,
          batchNumber: weedingRecord.batchNumber,
          date: weedingRecord.date,
          spaceWeeded: weedingRecord.spaceWeeded,
          recordedBy: weedingRecord.recordedBy
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update manual weeding record');
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
      const response = await fetch(`/api/delete-cash-crop-manual-weeding/${weedingRecord._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete manual weeding record');
      }

      // Close the delete modal and reset the manual weeding record
      toggleDeleteModal();
      setWeedingRecord(null);
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
      <h2 className="mt-4">Batch Manual Weeding Report</h2>
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
      {weedingRecord && (
        <div className="mt-4" style={{ overflowX: 'auto', width: '100%' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Batch Number</th>
                <th>Date</th>
                <th>Space Weeded</th>
                <th>Recorded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{weedingRecord.type}</td>
                <td>{weedingRecord.batchNumber}</td>
                <td>{new Date(weedingRecord.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{weedingRecord.spaceWeeded}</td>
                <td>{weedingRecord.recordedBy}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={toggleEditModal} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={toggleDeleteModal} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Edit Modal */}
          <Modal isOpen={editModal} toggle={toggleEditModal}>
            <ModalHeader toggle={toggleEditModal}>Edit Manual Weeding Record</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="type">Type</Label>
                  <Input type="text" name="type" id="type" value={weedingRecord.type || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="batchNumber">Batch Number</Label>
                  <Input type="text" name="batchNumber" id="batchNumber" value={weedingRecord.batchNumber || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input type="text" name="date" id="date" value={new Date(weedingRecord.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="spaceWeeded">Space Weeded</Label>
                  <Input type="text" name="spaceWeeded" id="spaceWeeded" value={weedingRecord.spaceWeeded || ''} onChange={(e) => setWeedingRecord({ ...weedingRecord, spaceWeeded: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="recordedBy">Recorded By</Label>
                  <Input
  type="text"
  name="recordedBy"
  id="recordedBy"
  value={weedingRecord.recordedBy || ''}
  onChange={(e) => setWeedingRecord({ ...weedingRecord, recordedBy: e.target.value })}
/>

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

export default BatchManualWeedingReport;
