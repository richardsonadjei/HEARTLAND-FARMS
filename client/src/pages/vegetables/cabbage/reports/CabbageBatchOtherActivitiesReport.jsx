import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const CabbageBatchOtherActivitiesRecords = () => {
  const defaultType = 'Cabbage';
  const [selectedType, setSelectedType] = useState(defaultType);
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [otherActivitiesRecord, setOtherActivitiesRecord] = useState(null);
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
      const response = await fetch(`/api/vege-other-activities-records/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Vegetable other activities record not found');
      }
      const data = await response.json();
      setOtherActivitiesRecord(data);
      setErrorMessage('');
    } catch (error) {
      setOtherActivitiesRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      // Make API call to update the other activities record with the edited data
      const response = await fetch(`/api/vege-other-activities-records/${otherActivitiesRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vegetable: otherActivitiesRecord.vegetable,
          batchNumber: otherActivitiesRecord.batchNumber,
          activityDetails: otherActivitiesRecord.activityDetails,
          activityDate: otherActivitiesRecord.activityDate,
          additionalDetails: otherActivitiesRecord.additionalDetails
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update other activities record');
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
      // Make API call to delete the other activities record
      const response = await fetch(`/api/vege-other-activities-records/${otherActivitiesRecord._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete other activities record');
      }
  
      // Close the delete modal and reset the other activities record
      toggleDeleteModal();
      setOtherActivitiesRecord(null);
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
      <h2 className="mt-4">Cabbage Batch Other Activities Records</h2>
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
        {otherActivitiesRecord && (
          <table className="table">
            <thead>
              <tr>
                <th>Vegetable</th>
                <th>Batch Number</th>
                <th>Activity Details</th>
                <th>Activity Date</th>
                <th>Additional Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{otherActivitiesRecord.vegetable}</td>
                <td>{otherActivitiesRecord.batchNumber}</td>
                <td>{otherActivitiesRecord.activityDetails}</td>
                <td>{new Date(otherActivitiesRecord.activityDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{otherActivitiesRecord.additionalDetails}</td>
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
        <ModalHeader toggle={toggleEditModal}>Edit Other Activities Record</ModalHeader>
        <ModalBody>
          {otherActivitiesRecord && (
            <Form>
              <FormGroup>
                <Label for="vegetable">Vegetable</Label>
                <Input type="text" name="vegetable" id="vegetable" value={otherActivitiesRecord.vegetable || ''} onChange={(e) => setOtherActivitiesRecord({ ...otherActivitiesRecord, vegetable: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="batchNumber">Batch Number</Label>
                <Input type="text" name="batchNumber" id="batchNumber" value={otherActivitiesRecord.batchNumber || ''} onChange={(e) => setOtherActivitiesRecord({ ...otherActivitiesRecord, batchNumber: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="activityDetails">Activity Details</Label>
                <Input type="text" name="activityDetails" id="activityDetails" value={otherActivitiesRecord.activityDetails || ''} onChange={(e) => setOtherActivitiesRecord({ ...otherActivitiesRecord, activityDetails: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="activityDate">Activity Date</Label>
                <Input type="date" name="activityDate" id="activityDate" value={otherActivitiesRecord.activityDate || ''} onChange={(e) => setOtherActivitiesRecord({ ...otherActivitiesRecord, activityDate: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="additionalDetails">Additional Details</Label>
                <Input type="textarea" name="additionalDetails" id="additionalDetails" value={otherActivitiesRecord.additionalDetails || ''} onChange={(e) => setOtherActivitiesRecord({ ...otherActivitiesRecord, additionalDetails: e.target.value })} />
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

export default CabbageBatchOtherActivitiesRecords;
