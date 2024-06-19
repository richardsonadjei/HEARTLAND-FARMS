import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const MaizeBatchHarvestRecord = () => {
  const defaultType = 'Maize';
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [harvestRecord, setHarvestRecord] = useState(null);
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
      const response = await fetch(`/api/maize-batch-harvest-records?batchNumber=${batchNumber}&type=${defaultType}`);
      if (!response.ok) {
        throw new Error('Maize harvest record not found');
      }
      const data = await response.json();
      setHarvestRecord(data[0]);
      setErrorMessage('');
    } catch (error) {
      setHarvestRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/cash-crop-harvest-records/${harvestRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: harvestRecord.type,
          batchNumber: harvestRecord.batchNumber,
          date: harvestRecord.date,
          harvestedQuantity: harvestRecord.harvestedQuantity,
          harvestedSpace: harvestRecord.harvestedSpace,
          recordedBy: harvestRecord.recordedBy
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update harvest record');
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
      const response = await fetch(`/api/cash-crop-harvest-records/${harvestRecord._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete harvest record');
      }

      // Close the delete modal and reset the harvest record
      toggleDeleteModal();
      setHarvestRecord(null);
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
      <h2 className="mt-4">Maize Batch Harvest Record</h2>
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
      {harvestRecord && (
        <div className="mt-4" style={{ overflowX: 'auto', width: '100%' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Batch Number</th>
                <th>Date</th>
                <th>Harvested Quantity</th>
                <th>Harvested Space</th>
                <th>Recorded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{harvestRecord.type}</td>
                <td>{harvestRecord.batchNumber}</td>
                <td>{new Date(harvestRecord.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{harvestRecord.harvestedQuantity}</td>
                <td>{harvestRecord.harvestedSpace}</td>
                <td>{harvestRecord.recordedBy}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={toggleEditModal} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={toggleDeleteModal} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Edit Modal */}
          <Modal isOpen={editModal} toggle={toggleEditModal}>
            <ModalHeader toggle={toggleEditModal}>Edit Harvest Record</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="type">Type</Label>
                  <Input type="text" name="type" id="type" value={harvestRecord.type || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="batchNumber">Batch Number</Label>
                  <Input type="text" name="batchNumber" id="batchNumber" value={harvestRecord.batchNumber || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input type="text" name="date" id="date" value={new Date(harvestRecord.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="harvestedQuantity">Harvested Quantity</Label>
                  <Input type="text" name="harvestedQuantity" id="harvestedQuantity" value={harvestRecord.harvestedQuantity || ''} onChange={(e) => setHarvestRecord({ ...harvestRecord, harvestedQuantity: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="harvestedSpace">Harvested Space</Label>
                  <Input type="text" name="harvestedSpace" id="harvestedSpace" value={harvestRecord.harvestedSpace || ''} onChange={(e) => setHarvestRecord({ ...harvestRecord, harvestedSpace: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="recordedBy">Recorded By</Label>
                  <Input type="text" name="recordedBy" id="recordedBy" value={harvestRecord.recordedBy || ''} onChange={(e) => setHarvestRecord({ ...harvestRecord, recordedBy: e.target.value })} />
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

export default MaizeBatchHarvestRecord;
