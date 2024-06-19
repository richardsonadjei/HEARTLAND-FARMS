import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const CarrotBatchNurseryReport = () => {
  const defaultType = 'Carrot';
  const [selectedType, setSelectedType] = useState(defaultType);
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [nurseryRecord, setNurseryRecord] = useState(null);
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
      const response = await fetch(`/api/nursery-records/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Vegetable nursery record not found');
      }
      const data = await response.json();
      setNurseryRecord(data);
      setErrorMessage('');
    } catch (error) {
      setNurseryRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      // Make API call to update the nursery record with the edited data
      const response = await fetch(`/api/vege-nursing-records/${nurseryRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vegetable: nurseryRecord.vegetable,
          variety: nurseryRecord.variety,
          batchNumber: nurseryRecord.batchNumber,
          quantityNursed: nurseryRecord.quantityNursed,
          startDate: nurseryRecord.startDate,
          expectedTransplantingDate: nurseryRecord.expectedTransplantingDate,
          additionalDetails: nurseryRecord.additionalDetails
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update nursery record');
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
      // Make API call to delete the nursery record
      const response = await fetch(`/api/vege-nursing-records/${nurseryRecord._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete nursery record');
      }
  
      // Close the delete modal and reset the nursery record
      toggleDeleteModal();
      setNurseryRecord(null);
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
      <h2 className="mt-4">Batch Nursery Report</h2>
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
        {nurseryRecord && (
          <table className="table">
            <thead>
              <tr>
                <th>Vegetable</th>
                <th>Variety</th>
                <th>Batch Number</th>
                <th>Quantity Nursed</th>
                <th>Start Date</th>
                <th>Expected Transplanting Date</th>
                <th>Additional Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{nurseryRecord.vegetable}</td>
                <td>{nurseryRecord.variety}</td>
                <td>{nurseryRecord.batchNumber}</td>
                <td>{nurseryRecord.quantityNursed}</td>
                <td>{new Date(nurseryRecord.startDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{new Date(nurseryRecord.expectedTransplantingDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{nurseryRecord.additionalDetails}</td>
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
        <ModalHeader toggle={toggleEditModal}>Edit Nursery Record</ModalHeader>
        <ModalBody>
  {nurseryRecord && (
    <Form>
      <FormGroup>
        <Label for="vegetable">Vegetable</Label>
        <Input type="text" name="vegetable" id="vegetable" value={nurseryRecord.vegetable || ''} onChange={(e) => setNurseryRecord({ ...nurseryRecord, vegetable: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="variety">Variety</Label>
        <Input type="text" name="variety" id="variety" value={nurseryRecord.variety || ''} onChange={(e) => setNurseryRecord({ ...nurseryRecord, variety: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="batchNumber">Batch Number</Label>
        <Input type="text" name="batchNumber" id="batchNumber" value={nurseryRecord.batchNumber || ''} onChange={(e) => setNurseryRecord({ ...nurseryRecord, batchNumber: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="quantityNursed">Quantity Nursed</Label>
        <Input type="number" name="quantityNursed" id="quantityNursed" value={nurseryRecord.quantityNursed || ''} onChange={(e) => setNurseryRecord({ ...nurseryRecord, quantityNursed: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="startDate">Start Date</Label>
        <Input type="date" name="startDate" id="startDate" value={nurseryRecord.startDate || ''} onChange={(e) => setNurseryRecord({ ...nurseryRecord, startDate: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="expectedTransplantingDate">Expected Transplanting Date</Label>
        <Input type="date" name="expectedTransplantingDate" id="expectedTransplantingDate" value={nurseryRecord.expectedTransplantingDate || ''} onChange={(e) => setNurseryRecord({ ...nurseryRecord, expectedTransplantingDate: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="additionalDetails">Additional Details</Label>
        <Input type="textarea" name="additionalDetails" id="additionalDetails" value={nurseryRecord.additionalDetails || ''} onChange={(e) => setNurseryRecord({ ...nurseryRecord, additionalDetails: e.target.value })} />
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

export default CarrotBatchNurseryReport;
