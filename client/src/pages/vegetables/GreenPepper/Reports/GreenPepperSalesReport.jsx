import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const GreenPepperBatchIncome = () => {
  const defaultType = 'Green Pepper'; // Corrected default type
  const [selectedType, setSelectedType] = useState(defaultType);
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [incomeRecord, setIncomeRecord] = useState(null);
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
      const response = await fetch(`/api/vege-income-records/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Vegetable income record not found');
      }
      const data = await response.json();
      setIncomeRecord(data);
      setErrorMessage('');
    } catch (error) {
      setIncomeRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      // Make API call to update the income record with the edited data
      const response = await fetch(`/api/income-records/${incomeRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          batchNumber: incomeRecord.batchNumber,
          vegetable: incomeRecord.vegetable,
          quantitySold: incomeRecord.quantitySold,
          pricePerBag: incomeRecord.pricePerBag,
          totalIncome: incomeRecord.totalIncome,
          additionalInformation: incomeRecord.additionalInformation
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update income record');
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
      // Make API call to delete the income record
      const response = await fetch(`/api/income-records/${incomeRecord._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete income record');
      }

      // Close the delete modal and reset the income record
      toggleDeleteModal();
      setIncomeRecord(null);
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
      <h2 className="mt-4">Green Pepper Batch Income</h2>
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
      {incomeRecord && (
        <div className="mt-4">
          <h4>Income Record Details</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Vegetable</th>
                <th>Quantity Sold</th>
                <th>Price Per Bag</th>
                <th>Total Income</th>
                <th>Additional Information</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{incomeRecord.batchNumber}</td>
                <td>{incomeRecord.vegetable}</td>
                <td>{incomeRecord.quantitySold}</td>
                <td>{incomeRecord.pricePerBag}</td>
                <td>{incomeRecord.totalIncome}</td>
                <td>{incomeRecord.additionalInformation}</td>
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
        <ModalHeader toggle={toggleEditModal}>Edit Income Record</ModalHeader>
        <Modal isOpen={editModal} toggle={toggleEditModal}>
  <ModalHeader toggle={toggleEditModal}>Edit Income Record</ModalHeader>
  {incomeRecord && ( // Add this conditional rendering
    <ModalBody>
      <Form>
        <FormGroup>
          <Label for="vegetable">Vegetable</Label>
          <Input type="text" name="vegetable" id="vegetable" value={incomeRecord.vegetable || ''} onChange={(e) => setIncomeRecord({ ...incomeRecord, vegetable: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="quantitySold">Quantity Sold</Label>
          <Input type="number" name="quantitySold" id="quantitySold" value={incomeRecord.quantitySold || ''} onChange={(e) => setIncomeRecord({ ...incomeRecord, quantitySold: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="pricePerBag">Price Per Bag</Label>
          <Input type="number" name="pricePerBag" id="pricePerBag" value={incomeRecord.pricePerBag || ''} onChange={(e) => setIncomeRecord({ ...incomeRecord, pricePerBag: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="totalIncome">Total Income</Label>
          <Input type="number" name="totalIncome" id="totalIncome" value={incomeRecord.totalIncome || ''} onChange={(e) => setIncomeRecord({ ...incomeRecord, totalIncome: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="additionalInformation">Additional Information</Label>
          <Input type="textarea" name="additionalInformation" id="additionalInformation" value={incomeRecord.additionalInformation || ''} onChange={(e) => setIncomeRecord({ ...incomeRecord, additionalInformation: e.target.value })} />
        </FormGroup>
      </Form>
    </ModalBody>
  )}
  <ModalFooter>
    <Button color="primary" onClick={handleEdit}>Save Changes</Button>
    <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
  </ModalFooter>
</Modal>

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

export default GreenPepperBatchIncome;
