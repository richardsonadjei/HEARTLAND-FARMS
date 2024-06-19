import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const CassavaBatchWeedicideApplicationRecord = () => {
  const defaultType = 'Cassava';
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [weedicideRecord, setWeedicideRecord] = useState(null);
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
      const response = await fetch(`/api/cassava-batch-weedicide-applications?batchNumber=${batchNumber}&type=${defaultType}`);
      if (!response.ok) {
        throw new Error('Cassava weedicide application record not found');
      }
      const data = await response.json();
      setWeedicideRecord(data[0]);
      setErrorMessage('');
    } catch (error) {
      setWeedicideRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/cash-crop-weedicide-applications/${weedicideRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: weedicideRecord.type,
          batchNumber: weedicideRecord.batchNumber,
          date: weedicideRecord.date,
          weedicideName: weedicideRecord.weedicideName,
          weedicideDescription: weedicideRecord.weedicideDescription,
          spaceApplied: weedicideRecord.spaceApplied,
          applicationMethod: weedicideRecord.applicationMethod,
          quantityApplied: weedicideRecord.quantityApplied,
          recordedBy: weedicideRecord.recordedBy
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update weedicide application record');
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
      const response = await fetch(`/api/cash-crop-weedicide-applications/${weedicideRecord._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete weedicide application record');
      }

      // Close the delete modal and reset the weedicide application record
      toggleDeleteModal();
      setWeedicideRecord(null);
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
      <h2 className="mt-4">Cassava Batch Weedicide Application Record</h2>
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
      {weedicideRecord && (
        <div className="mt-4" style={{ overflowX: 'auto', width: '100%' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Batch Number</th>
                <th>Date</th>
                <th>Weedicide Name</th>
                <th>Weedicide Description</th>
                <th>Space Applied</th>
                <th>Application Method</th>
                <th>Quantity Applied</th>
                <th>Recorded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <
              tr>
                <td>{weedicideRecord.type}</td>
                <td>{weedicideRecord.batchNumber}</td>
                <td>{new Date(weedicideRecord.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{weedicideRecord.weedicideName}</td>
                <td>{weedicideRecord.weedicideDescription}</td>
                <td>{weedicideRecord.spaceApplied}</td>
                <td>{weedicideRecord.applicationMethod}</td>
                <td>{weedicideRecord.quantityApplied}</td>
                <td>{weedicideRecord.recordedBy}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={toggleEditModal} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={toggleDeleteModal} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Edit Modal */}
          <Modal isOpen={editModal} toggle={toggleEditModal}>
            <ModalHeader toggle={toggleEditModal}>Edit Weedicide Application Record</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="type">Type</Label>
                  <Input type="text" name="type" id="type" value={weedicideRecord.type || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="batchNumber">Batch Number</Label>
                  <Input type="text" name="batchNumber" id="batchNumber" value={weedicideRecord.batchNumber || ''} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input type="text" name="date" id="date" value={new Date(weedicideRecord.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label for="weedicideName">Weedicide Name</Label>
                  <Input type="text" name="weedicideName" id="weedicideName" value={weedicideRecord.weedicideName || ''} onChange={(e) => setWeedicideRecord({ ...weedicideRecord, weedicideName: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="weedicideDescription">Weedicide Description</Label>
                  <Input type="text" name="weedicideDescription" id="weedicideDescription" value={weedicideRecord.weedicideDescription || ''} onChange={(e) => setWeedicideRecord({ ...weedicideRecord, weedicideDescription: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="spaceApplied">Space Applied</Label>
                  <Input type="text" name="spaceApplied" id="spaceApplied" value={weedicideRecord.spaceApplied || ''} onChange={(e) => setWeedicideRecord({ ...weedicideRecord, spaceApplied: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="applicationMethod">Application Method</Label>
                  <Input type="select" name="applicationMethod" id="applicationMethod" value={weedicideRecord.applicationMethod || ''} onChange={(e) => setWeedicideRecord({ ...weedicideRecord, applicationMethod: e.target.value })}>
                    <option value="Spraying">Spraying</option>
                    <option value="Drenching">Drenching</option>
                    <option value="Fumigation">Fumigation</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="quantityApplied">Quantity Applied</Label>
                  <Input type="text" name="quantityApplied" id="quantityApplied" value={weedicideRecord.quantityApplied || ''} onChange={(e) => setWeedicideRecord({ ...weedicideRecord, quantityApplied: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="recordedBy">Recorded By</Label>
                  <Input type="text" name="recordedBy" id="recordedBy" value={weedicideRecord.recordedBy || ''} onChange={(e) => setWeedicideRecord({ ...weedicideRecord, recordedBy: e.target.value })} />
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

export default CassavaBatchWeedicideApplicationRecord;
