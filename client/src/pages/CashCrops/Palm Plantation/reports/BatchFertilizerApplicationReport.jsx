import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const BatchFertilizerApplicationRecord = () => {
  const defaultType = 'Palm';
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [fertilizerRecord, setFertilizerRecord] = useState(null);
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
      const response = await fetch(`/api/fertilizer/${batchNumber}/${defaultType}`);
      if (!response.ok) {
        throw new Error('Fertilizer application record not found');
      }
      const data = await response.json();
      setFertilizerRecord(data[0]);
      setErrorMessage('');
    } catch (error) {
      setFertilizerRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/update-fertilizer-application/${fertilizerRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: fertilizerRecord.type,
          batchNumber: fertilizerRecord.batchNumber,
          date: fertilizerRecord.date,
          spaceApplied: fertilizerRecord.spaceApplied,
          fertilizerName: fertilizerRecord.fertilizerName,
          fertilizerDescription: fertilizerRecord.fertilizerDescription,
          applicationMethod: fertilizerRecord.applicationMethod,
          amountApplied: fertilizerRecord.amountApplied,
          recordedBy: fertilizerRecord.recordedBy
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update fertilizer application record');
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
      const response = await fetch(`/api/delete-fertilizer-application/${fertilizerRecord._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete fertilizer application record');
      }

      // Close the delete modal and reset the fertilizer application record
      toggleDeleteModal();
      setFertilizerRecord(null);
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
      <h2 className="mt-4">Batch Fertilizer Application Record</h2>
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
      {fertilizerRecord && (
        <div className="mt-4" style={{ overflowX: 'auto', width: '100%' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Batch Number</th>
                <th>Date</th>
                <th>Fertilizer Name</th>
                <th>Fertilizer Description</th>
                <th>Space Applied</th>
                <th>Application Method</th>
                <th>Amount Applied</th>
                <th>Recorded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{fertilizerRecord.type}</td>
                <td>{fertilizerRecord.batchNumber}</td>
                <td>{new Date(fertilizerRecord.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{fertilizerRecord.fertilizerName}</td>
                <td>{fertilizerRecord.fertilizerDescription}</td>
                <td>{fertilizerRecord.spaceApplied}</td>
                <td>{fertilizerRecord.applicationMethod}</td>
                <td>{fertilizerRecord.amountApplied}</td>
                <td>{fertilizerRecord.recordedBy}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={toggleEditModal} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={toggleDeleteModal} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Edit Modal */}
          <Modal isOpen={editModal} toggle={toggleEditModal}>
            <ModalHeader toggle={toggleEditModal}>Edit Fertilizer Application Record</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="type">Type</Label>
                  <Input type="text" name="type" id="type" value={fertilizerRecord.type || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="batchNumber">Batch Number</Label>
                  <Input type="text" name="batchNumber" id="batchNumber" value={fertilizerRecord.batchNumber || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input type="text" name="date" id="date" value={new Date(fertilizerRecord.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric',month: 'long', year: 'numeric' })} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="fertilizerName">Fertilizer Name</Label>
                  <Input type="text" name="fertilizerName" id="fertilizerName" value={fertilizerRecord.fertilizerName || ''} onChange={(e) => setFertilizerRecord({ ...fertilizerRecord, fertilizerName: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="fertilizerDescription">Fertilizer Description</Label>
                  <Input type="text" name="fertilizerDescription" id="fertilizerDescription" value={fertilizerRecord.fertilizerDescription || ''} onChange={(e) => setFertilizerRecord({ ...fertilizerRecord, fertilizerDescription: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="spaceApplied">Space Applied</Label>
                  <Input type="text" name="spaceApplied" id="spaceApplied" value={fertilizerRecord.spaceApplied || ''} onChange={(e) => setFertilizerRecord({ ...fertilizerRecord, spaceApplied: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="applicationMethod">Application Method</Label>
                  <Input type="select" name="applicationMethod" id="applicationMethod" value={fertilizerRecord.applicationMethod || ''} onChange={(e) => setFertilizerRecord({ ...fertilizerRecord, applicationMethod: e.target.value })}>
                    <option value="Spraying">Spraying</option>
                    <option value="Broadcasting">Broadcasting</option>
                    <option value="Drip">Drip</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="amountApplied">Amount Applied</Label>
                  <Input type="text" name="amountApplied" id="amountApplied" value={fertilizerRecord.amountApplied || ''} onChange={(e) => setFertilizerRecord({ ...fertilizerRecord, amountApplied: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="recordedBy">Recorded By</Label>
                  <Input type="text" name="recordedBy" id="recordedBy" value={fertilizerRecord.recordedBy || ''} onChange={(e) => setFertilizerRecord({ ...fertilizerRecord, recordedBy: e.target.value })} />
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

export default BatchFertilizerApplicationRecord;

