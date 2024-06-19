import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const MaizeBatchExpense = () => {
  const defaultType = 'Maize';
  const [batchOptions, setBatchOptions] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [cashCropExpense, setCashCropExpense] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null); // Track the selected expense for editing or deleting

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
      const response = await fetch(`/api/cashcrop-expense-batch/${batchNumber}`);
      if (!response.ok) {
        throw new Error('Maize expense record not found');
      }
      const data = await response.json();
      setCashCropExpense([data]);
      setErrorMessage('');
    } catch (error) {
      setCashCropExpense([]);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      // Make API call to update the maize expense record with the edited data
      const response = await fetch(`/api/update-cashcrop-expense/${selectedExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedExpense) // Send the selected expense object as the body
      });
  
      if (!response.ok) {
        throw new Error('Failed to update maize expense record');
      }
  
      // Close the edit modal
      toggleEditModal();
  
      // Fetch all records again to refresh the data
      fetchAllRecords();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
  
  const handleDelete = async () => {
    try {
      // Make API call to delete the maize expense record
      const response = await fetch(`/api/delete-cashcrop-expense/${selectedExpense._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete maize expense record');
      }
  
      // Close the delete modal and reset the maize expense record
      toggleDeleteModal();
      setCashCropExpense([]);
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

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Container>
      <h2 className="mt-4">Maize Batch Expense Report</h2>
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
        {Array.isArray(cashCropExpense) && cashCropExpense.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Crop</th>
                <th>Batch Number</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cashCropExpense.map((expense, index) => (
                <tr key={expense._id}>
                  <td>{index + 1}</td>
                  <td>{expense.category}</td>
                  <td>{expense.vegetable}</td>
                  <td>{expense.batchNumber}</td>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>{formatDate(expense.createdAt)}</td>
                  <td>
                    <RiPencilLine color="blue" size={24} onClick={() => { setSelectedExpense(expense); toggleEditModal(); }} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <RiDeleteBinLine color="red" size={24} onClick={() => { setSelectedExpense(expense); toggleDeleteModal(); }} style={{ cursor: 'pointer' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!Array.isArray(cashCropExpense) || cashCropExpense.length === 0 && (
          <p>No maize batch expenses found.</p>
        )}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Maize Batch Expense</ModalHeader>
        <ModalBody>
          {selectedExpense && (
            <Form>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input type="text" name="category" id="category" value={selectedExpense.category || ''} onChange={(e) => setSelectedExpense({ ...selectedExpense, category: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="vegetable">Crop</Label>
                <Input type="text" name="vegetable" id="vegetable" value={selectedExpense.vegetable || ''} onChange={(e) => setSelectedExpense({ ...selectedExpense, vegetable: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="batchNumber">Batch Number</Label>
                <Input type="text" name="batchNumber" id="batchNumber" value={selectedExpense.batchNumber || ''} onChange={(e) => setSelectedExpense({ ...selectedExpense, batchNumber: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="text" name="description" id="description" value={selectedExpense.description || ''} onChange={(e) => setSelectedExpense({ ...selectedExpense, description: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Amount</Label>
                <Input type="number" name="amount" id="amount" value={selectedExpense.amount || ''} onChange={(e) => setSelectedExpense({ ...selectedExpense, amount: e.target.value })} />
              </FormGroup>
              {/* Add more fields if needed */}
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

export default MaizeBatchExpense;
