import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const BatchPestAndWeedControl = () => {
  const defaultType = 'Cucumber'; // Assuming default type is Cabbage
  const [selectedType, setSelectedType] = useState(defaultType);
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [record, setRecord] = useState(null);
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
      const response = await fetch(`/api/vege-pest-and-weed-control/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Pest and weed control record not found');
      }
      const data = await response.json();
      setRecord(data);
      setErrorMessage('');
    } catch (error) {
      setRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      // Make API call to update the record with the edited data
      const response = await fetch(`/api/pest-and-weed-control/${record._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...record
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update record');
      }
  
      // Close the edit modal after successful update
      toggleEditModal();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
  const handleDelete = async () => {
    try {
      // Make API call to delete the record
      const response = await fetch(`/api/pest-and-weed-control/${record._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete record');
      }
  
      // Close the delete modal and reset the record
      toggleDeleteModal();
      setRecord(null);
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
      <h2 className="mt-4">Pest and Weed Control Report</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="batchNumber">Select Batch Number:</Label>
          <Input type="select" name="batchNumber" id="batchNumber" value={batchNumber} onChange={handleInputChange}>
            <option value="">Select Batch Number</option>
            {batchOptions.map((batch) => (
              <option key={batch.value} value={batch.value}>{batch.label}</option>
            ))}
          </Input>
        </FormGroup>
        <Button color="primary" type="submit">Submit</Button>
      </Form>
      {errorMessage && <p>{errorMessage}</p>}
      {record && (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Vegetable</th>
                <th>Batch Number</th>
                <th>Pest and Weed Control Details</th>
                <th>Quantity Applied</th>
                <th>Application Date</th>
                <th>Additional Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{record.vegetable}</td>
                <td>{record.batchNumber}</td>
                <td>{record.pestAndWeedControlDetails}</td>
                <td>{record.quantityApplied}</td>
                <td>{new Date(record.applicationDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>

                <td>{record.additionalDetails}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={toggleEditModal} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={toggleDeleteModal} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Pest and Weed Control Record</ModalHeader>
        <ModalBody>
          {record && (
           <Form>
           <FormGroup>
             <Label for="pestAndWeedControlDetails">Pest and Weed Control Details</Label>
             <Input
               type="textarea"
               name="pestAndWeedControlDetails"
               id="pestAndWeedControlDetails"
               value={record.pestAndWeedControlDetails || ''}
               onChange={(e) => setRecord({ ...record, pestAndWeedControlDetails: e.target.value })}
             />
           </FormGroup>
           <FormGroup>
             <Label for="quantityApplied">Quantity Applied</Label>
             <Input
               type="text"
               name="quantityApplied"
               id="quantityApplied"
               value={record.quantityApplied || ''}
               onChange={(e) => setRecord({ ...record, quantityApplied: e.target.value })}
             />
           </FormGroup>
           <FormGroup>
             <Label for="applicationDate">Application Date</Label>
             <Input
               type="date"
               name="applicationDate"
               id="applicationDate"
               value={record.applicationDate || ''}
               onChange={(e) => setRecord({ ...record, applicationDate: e.target.value })}
             />
           </FormGroup>
           <FormGroup>
             <Label for="additionalDetails">Additional Details</Label>
             <Input
               type="textarea"
               name="additionalDetails"
               id="additionalDetails"
               value={record.additionalDetails || ''}
               onChange={(e) => setRecord({ ...record, additionalDetails: e.target.value })}
             />
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

export default BatchPestAndWeedControl;
