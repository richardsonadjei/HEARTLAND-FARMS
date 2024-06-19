import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const CassavaBatchPestAndDiseaseControlRecord = () => {
  const defaultType = 'Cassava';
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [pestAndDiseaseRecord, setPestAndDiseaseRecord] = useState(null);
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
      const response = await fetch(`/api/cassava-batch-pest-disease-controls?batchNumber=${batchNumber}&type=${defaultType}`);
      if (!response.ok) {
        throw new Error('Maize pest and disease control record not found');
      }
      const data = await response.json();
      setPestAndDiseaseRecord(data[0]);
      setErrorMessage('');
    } catch (error) {
      setPestAndDiseaseRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/pest-disease-control/${pestAndDiseaseRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: pestAndDiseaseRecord.type,
          batchNumber: pestAndDiseaseRecord.batchNumber,
          date: pestAndDiseaseRecord.date,
          pestOrDiseaseName: pestAndDiseaseRecord.pestOrDiseaseName,
          controlMethod: pestAndDiseaseRecord.controlMethod,
          controlAgentUsed: pestAndDiseaseRecord.controlAgentUsed,
          quantityUsed: pestAndDiseaseRecord.quantityUsed,
          spaceAffected: pestAndDiseaseRecord.spaceAffected,
          applicationMethod: pestAndDiseaseRecord.applicationMethod,
          recordedBy: pestAndDiseaseRecord.recordedBy
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update pest and disease control record');
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
      const response = await fetch(`/api/pest-disease-control/${pestAndDiseaseRecord._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete pest and disease control record');
      }

      // Close the delete modal and reset the pest and disease control record
      toggleDeleteModal();
      setPestAndDiseaseRecord(null);
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
      <h2 className="mt-4">Cassava Batch Pest and Disease Control Record</h2>
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
      {pestAndDiseaseRecord && (
        <div className="mt-4" style={{ overflowX: 'auto', width: '100%' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Batch Number</th>
                <th>Date</th>
                <th>Pest/Disease Name</th>
                <th>Control Method</th>
                <th>Control Agent Used</th>
                <th>Quantity Used</th>
                <th>Space Affected</th>
                <th>Application Method</th>
                <th>Recorded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{pestAndDiseaseRecord.type}</td>
                <td>{pestAndDiseaseRecord.batchNumber}</td>
                <td>{new Date(pestAndDiseaseRecord.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{pestAndDiseaseRecord.pestOrDiseaseName}</td>
                <td>{pestAndDiseaseRecord.controlMethod}</td>
                <td>{pestAndDiseaseRecord.controlAgentUsed}</td>
                <td>{pestAndDiseaseRecord.quantityUsed}</td>
                <td>{pestAndDiseaseRecord.spaceAffected}</td>
                <td>{pestAndDiseaseRecord.applicationMethod}</td>
                <td>{pestAndDiseaseRecord.recordedBy}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={toggleEditModal} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={toggleDeleteModal} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Edit Modal */}
          <Modal isOpen={editModal} toggle={toggleEditModal}>
            <ModalHeader toggle={toggleEditModal}>Edit Pest and Disease Control Record</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="type">Type</Label>
                  <Input type="text" name="type" id="type" value={pestAndDiseaseRecord.type || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="batchNumber">Batch Number</Label>
                  <Input type="text" name="batchNumber" id="batchNumber" value={pestAndDiseaseRecord.batchNumber || ''} readOnly />
</FormGroup>
<FormGroup>
  <Label for="date">Date</Label>
  <Input type="text" name="date" id="date" value={new Date(pestAndDiseaseRecord.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} readOnly />
</FormGroup>
<FormGroup>
  <Label for="pestOrDiseaseName">Pest/Disease Name</Label>
  <Input type="text" name="pestOrDiseaseName" id="pestOrDiseaseName" value={pestAndDiseaseRecord.pestOrDiseaseName || ''} onChange={(e) => setPestAndDiseaseRecord({ ...pestAndDiseaseRecord, pestOrDiseaseName: e.target.value })} />
</FormGroup>
<FormGroup>
  <Label for="controlMethod">Control Method</Label>
  <Input type="text" name="controlMethod" id="controlMethod" value={pestAndDiseaseRecord.controlMethod || ''} onChange={(e) => setPestAndDiseaseRecord({ ...pestAndDiseaseRecord, controlMethod: e.target.value })} />
</FormGroup>
<FormGroup>
  <Label for="controlAgentUsed">Control Agent Used</Label>
  <Input type="text" name="controlAgentUsed" id="controlAgentUsed" value={pestAndDiseaseRecord.controlAgentUsed || ''} onChange={(e) => setPestAndDiseaseRecord({ ...pestAndDiseaseRecord, controlAgentUsed: e.target.value })} />
</FormGroup>
<FormGroup>
  <Label for="quantityUsed">Quantity Used</Label>
  <Input type="text" name="quantityUsed" id="quantityUsed" value={pestAndDiseaseRecord.quantityUsed || ''} onChange={(e) => setPestAndDiseaseRecord({ ...pestAndDiseaseRecord, quantityUsed: e.target.value })} />
</FormGroup>
<FormGroup>
  <Label for="spaceAffected">Space Affected</Label>
  <Input type="text" name="spaceAffected" id="spaceAffected" value={pestAndDiseaseRecord.spaceAffected || ''} onChange={(e) => setPestAndDiseaseRecord({ ...pestAndDiseaseRecord, spaceAffected: e.target.value })} />
</FormGroup>
<FormGroup>
  <Label for="applicationMethod">Application Method</Label>
  <Input type="select" name="applicationMethod" id="applicationMethod" value={pestAndDiseaseRecord.applicationMethod || ''} onChange={(e) => setPestAndDiseaseRecord({ ...pestAndDiseaseRecord, applicationMethod: e.target.value })}>
    <option value="Spraying">Spraying</option>
    <option value="Drenching">Drenching</option>
    <option value="Fumigation">Fumigation</option>
  </Input>
</FormGroup>
<FormGroup>
  <Label for="recordedBy">Recorded By</Label>
  <Input type="text" name="recordedBy" id="recordedBy" value={pestAndDiseaseRecord.recordedBy || ''} onChange={(e) => setPestAndDiseaseRecord({ ...pestAndDiseaseRecord, recordedBy: e.target.value })} />
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

export default CassavaBatchPestAndDiseaseControlRecord;
