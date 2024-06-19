import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const BatchFertilizerApplication = () => {
  const defaultType = 'Pepper';
  const [selectedType, setSelectedType] = useState(defaultType);
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
      const response = await fetch(`/api/vege-fertilizer-applicaion/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Fertilizer record not found');
      }
      const data = await response.json();
      setFertilizerRecord(data);
      setErrorMessage('');
    } catch (error) {
      setFertilizerRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      // Make API call to update the fertilizer record with the edited data
      const response = await fetch(`/api/vege-fertilizer-applications/${fertilizerRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vegetable: fertilizerRecord.vegetable,
          variety: fertilizerRecord.variety,
          batchNumber: fertilizerRecord.batchNumber,
          quantityApplied: fertilizerRecord.quantityApplied,
          applicationDate: fertilizerRecord.applicationDate,
          additionalDetails: fertilizerRecord.additionalDetails
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update fertilizer record');
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
      // Make API call to delete the fertilizer record
      const response = await fetch(`/api/vege-fertilizer-applications/${fertilizerRecord._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete fertilizer record');
      }
  
      // Close the delete modal and reset the fertilizer record
      toggleDeleteModal();
      setFertilizerRecord(null);
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
      <h2 className="mt-4">Batch Fertilizer Application Report</h2>
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
        {fertilizerRecord && (
          <table className="table">
            <thead>
              <tr>
                <th>Vegetable</th>
                <th>Variety</th>
                <th>Batch Number</th>
                <th>Quantity Applied</th>
                <th>Application Date</th>
                <th>Additional Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{fertilizerRecord.vegetable}</td>
                <td>{fertilizerRecord.variety}</td>
                <td>{fertilizerRecord.batchNumber}</td>
                <td>{fertilizerRecord.quantityApplied}</td>
                <td>{new Date(fertilizerRecord.applicationDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{fertilizerRecord.additionalDetails}</td>
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
        <ModalHeader toggle={toggleEditModal}>Edit Fertilizer Record</ModalHeader>
        <ModalBody>
  {fertilizerRecord && (
    <Form>
      <FormGroup>
        <Label for="vegetable">Vegetable</Label>
        <Input type="text" name="vegetable" id="vegetable" value={fertilizerRecord.vegetable || ''} onChange={(e) => setFertilizerRecord({ ...fertilizerRecord, vegetable: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="variety">Variety</Label>
        <Input type="text" name="variety" id="variety" value={fertilizerRecord.variety || ''} onChange={(e) => setFertilizerRecord({ ...fertilizerRecord, variety: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="batchNumber">Batch Number</Label>
        <Input type="text" name="batchNumber" id="batchNumber" value={fertilizerRecord.batchNumber || ''} onChange={(e) => setFertilizerRecord({ ...fertilizerRecord, batchNumber: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="quantityApplied">Quantity Applied</Label>
        <Input type="number" name="quantityApplied" id="quantityApplied" value={fertilizerRecord.quantityApplied || ''} onChange={(e) => setFertilizerRecord({ ...fertilizerRecord, quantityApplied: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="applicationDate">Application Date</Label>
        <Input type="date" name="applicationDate" id="applicationDate" value={fertilizerRecord.applicationDate || ''} onChange={(e) => setFertilizerRecord({ ...fertilizerRecord, applicationDate: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="additionalDetails">Additional Details</Label>
        <Input type="textarea" name="additionalDetails" id="additionalDetails" value={fertilizerRecord.additionalDetails || ''} onChange={(e) => setFertilizerRecord({ ...fertilizerRecord, additionalDetails: e.target.value })} />
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

export default BatchFertilizerApplication;
