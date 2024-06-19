import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const AllBeforeExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const toggleModal = (expense) => {
    setSelectedExpense(expense);
    setModal(!modal);
  };

  useEffect(() => {
    // Fetch all BeforeStartExpenses entries
    const fetchExpenses = async () => {
      try {
        const response = await fetch('/api/all-before-start-expenses');
        if (!response.ok) {
          throw new Error('Error fetching BeforeStartExpenses');
        }

        const data = await response.json();
        // Sort expenses by date in ascending order
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setExpenses(data);
      } catch (error) {
        console.error(error);
        // Handle error fetching BeforeStartExpenses
      }
    };

    fetchExpenses();
  }, []);

  const getTotalAmountSpent = () => {
    return expenses.reduce((total, expense) => total + expense.amountSpent, 0);
  };

  const handleUpdateFormChange = (fieldName, value) => {
    setSelectedExpense((prevExpense) => ({
      ...prevExpense,
      [fieldName]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/update-before-start-expense/${selectedExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedExpense),
      });

      if (!response.ok) {
        throw new Error('Error updating expense');
      }

      // Update local state with the updated expense
      const updatedExpenses = expenses.map((expense) =>
        expense._id === selectedExpense._id ? selectedExpense : expense
      );
      setExpenses(updatedExpenses);

      // Close the modal
      setModal(false);
    } catch (error) {
      console.error(error);
      // Handle error updating expense
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      const response = await fetch(`/api/delete-before-start-expense/${expenseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting expense');
      }

      // Remove the deleted expense from the local state
      const updatedExpenses = expenses.filter((expense) => expense._id !== expenseId);
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error(error);
      // Handle error deleting expense
    }
  };
  return (
    <div>
      <div className="text-center mb-4">
        <strong style={{ fontSize: '1.5em', color: 'blue' }}>
          Total Amount Spent: Ghc {getTotalAmountSpent()}
        </strong>
      </div>
      <Table responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount Spent</th>
            <th>Recorded By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense._id}>
              <td>{index + 1}</td>
              <td>
                {new Date(expense.date).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>{expense.amountSpent}</td>
              <td>{expense.recordedBy}</td>
              <td>
                <BsPencilSquare
                  onClick={() => toggleModal(expense)}
                  className="mr-2"
                  style={{ cursor: 'pointer', color: 'blue' }}
                />
                <BsTrash
                  onClick={() => handleDelete(expense._id)}
                  style={{ cursor: 'pointer', color: 'red' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Update Expense</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="date">Date:</Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={selectedExpense ? selectedExpense.date : ''}
                onChange={(e) => handleUpdateFormChange('date', e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category:</Label>
              <Input
                type="text"
                name="category"
                id="category"
                value={selectedExpense ? selectedExpense.category : ''}
                onChange={(e) => handleUpdateFormChange('category', e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description:</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={selectedExpense ? selectedExpense.description : ''}
                onChange={(e) => handleUpdateFormChange('description', e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="amountSpent">Amount Spent:</Label>
              <Input
                type="number"
                name="amountSpent"
                id="amountSpent"
                value={selectedExpense ? selectedExpense.amountSpent : ''}
                onChange={(e) => handleUpdateFormChange('amountSpent', e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="recordedBy">Recorded By:</Label>
              <Input
                type="text"
                name="recordedBy"
                id="recordedBy"
                value={selectedExpense ? selectedExpense.recordedBy : ''}
                onChange={(e) => handleUpdateFormChange('recordedBy', e.target.value)}
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AllBeforeExpenses;
