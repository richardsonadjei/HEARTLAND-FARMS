import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllBirdExpenseReport = () => {
  const [expenses, setExpenses] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editedDate, setEditedDate] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedType, setEditedType] = useState('');
  const [editedBatchNumber, setEditedBatchNumber] = useState('');
  const [editedAdditionalDetails, setEditedAdditionalDetails] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-bird-expenses');
      if (!response.ok) {
        throw new Error('Failed to fetch bird farm expenses');
      }
      const data = await response.json();
      setExpenses(data);
      calculateTotalAmount(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setEditedDate(expense.date ? new Date(expense.date).toISOString().split('T')[0] : '');
    setEditedCategory(expense.category);
    setEditedType(expense.type);
    setEditedBatchNumber(expense.batchNumber);
    setEditedAdditionalDetails(expense.additionalDetails);
    setEditedAmount(expense.amount);
    toggleModal();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
  
    if (!confirmDelete) {
      return;
    }
  
    try {
      const response = await fetch(`/api/bird-farm-expenses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete bird farm expense');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/bird-farm-expenses/${selectedExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: editedDate,
          category: editedCategory,
          type: editedType,
          batchNumber: editedBatchNumber,
          additionalDetails: editedAdditionalDetails,
          amount: editedAmount,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update bird farm expense');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const calculateTotalAmount = (data) => {
    const total = data.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    setTotalAmount(total);
  };

  return (
    <Container>
      <h1>All Bird Farm Expenses</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Batch Number</th>
            <th>Additional Details</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense._id}>
              <th scope="row">{index + 1}</th>
              <td>{formatDate(expense.date)}</td>
              <td>{expense.category}</td>
              <td>{expense.type}</td>
              <td>{expense.batchNumber ? expense.batchNumber : 'Not Applicable'}</td>
              <td>{expense.additionalDetails}</td>
              <td>{expense.amount}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(expense)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => handleDelete(expense._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <strong>Total Amount: </strong>{totalAmount.toFixed(2)}
      </div>
      {/* Edit Expense Modal */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Bird Farm Expense</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="editedDate">Date</Label>
              <Input
                type="date"
                id="editedDate"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedCategory">Category</Label>
              <Input
                type="text"
                id="editedCategory"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedType">Type</Label>
              <Input
                type="text"
                id="editedType"
                value={editedType}
                onChange={(e) => setEditedType(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedBatchNumber">Batch Number</Label>
              <Input
                type="text"
                id="editedBatchNumber"
                value={editedBatchNumber}
                onChange={(e) => setEditedBatchNumber(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedAdditionalDetails">Additional Details</Label>
              <Input
                type="text"
                id="editedAdditionalDetails"
                value={editedAdditionalDetails}
                onChange={(e) => setEditedAdditionalDetails(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedAmount">Amount</Label>
              <Input
                type="number"
                id="editedAmount"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
                min="0"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>Save</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllBirdExpenseReport;

