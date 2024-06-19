import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, FormGroup, Label, Input, Form } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AllCabbageExpenses = () => {
  const [cabbageExpenses, setCabbageExpenses] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    getAllCabbageExpenses();
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const getAllCabbageExpenses = async () => {
    try {
      const response = await fetch('/api/cabbage-expense-records');
      if (!response.ok) {
        throw new Error('Failed to fetch cabbage expense records');
      }
      const data = await response.json();
      setCabbageExpenses(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    toggleEditModal();
  };
  
  const handleDelete = (expense) => {
    setSelectedExpense(expense);
    toggleDeleteModal();
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/update-expense-record//${selectedExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedExpense)
      });
  
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
  
      
      toggleEditModal();
      // Optionally, you can fetch all cabbage expense records again to refresh the data
      getAllCabbageExpenses();
    } catch (error) {
      console.error(error.message);
      // Handle error
    }
  };
  
  const handleDeleteExpense = async () => {
    try {
      const response = await fetch(`/api/delete-expense-record/${selectedExpense._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
  
     
      toggleDeleteModal();
      // Optionally, you can fetch all cabbage expense records again to refresh the data
      getAllCabbageExpenses();
    } catch (error) {
      console.error(error.message);
      // Handle error
    }
  };
  
  
  return (
    <Container>
      <h2 className="mt-4">All Cabbage Expense Records</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Vegetable</th>
              <th>Batch Number</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cabbageExpenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.category}</td>
                <td>{expense.vegetable}</td>
                <td>{expense.batchNumber}</td>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.createdAt).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={() => handleEdit(expense)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={() => handleDelete(expense)} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Expense Record</ModalHeader>
        <ModalBody>
          {selectedExpense && (
            <Form>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input type="text" name="category" id="category" value={selectedExpense.category || ''} onChange={(e) => setSelectedExpense({ ...selectedExpense, category: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="vegetable">Vegetable</Label>
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
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveChanges}>Save Changes</Button>
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
          <Button color="danger" onClick={handleDeleteExpense}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllCabbageExpenses;
