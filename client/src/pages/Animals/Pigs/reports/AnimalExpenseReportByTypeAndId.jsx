import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
import Select from 'react-select'; // Import react-select for searchable dropdown


const defaultType = 'Pig'; // Default type

const ExpensesByTypeAndIdentityNumber = () => {
  const [identityNumberOptions, setIdentityNumberOptions] = useState([]); // State for identity number options
  const [selectedIdentityNumber, setSelectedIdentityNumber] = useState(null); // State for selected identity number
  const [expenses, setExpenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    fetchIdentityNumbers(); // Fetch identity numbers when component mounts
    fetchExpenses(); // Fetch expenses when component mounts
  }, []); 

  const fetchIdentityNumbers = async () => {
    try {
      const response = await fetch(`/api/all-identity-numbers/${defaultType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch identity numbers');
      }
      const data = await response.json();
      const options = data.map((identity) => ({ value: identity, label: identity }));
      setIdentityNumberOptions(options);
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch identity numbers');
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`/api/expenses-type-identity?type=${defaultType}&identityNumber=${selectedIdentityNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      setExpenses(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch expenses');
    }
  };

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    toggleEditModal();
  };

  const handleDelete = async (expense) => {
    try {
      const response = await fetch(`/api/expenses/${expense._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
      setExpenses(expenses.filter((e) => e._id !== expense._id));
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to delete expense');
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/expenses/${selectedExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedExpense),
      });

      if (!response.ok) {
        throw new Error('Failed to update expense data');
      }

      const updatedExpense = await response.json();

      const updatedExpenses = expenses.map((expense) =>
        expense._id === updatedExpense._id ? updatedExpense : expense
      );
      setExpenses(updatedExpenses);

      toggleEditModal();
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to save changes');
    }
  };

  const handleIdentityNumberChange = (selectedOption) => {
    setSelectedIdentityNumber(selectedOption.value);
  };

  return (
    <Container fluid>
      <h2 className="mt-4">Expenses for Type: {defaultType}</h2>
      <div className="mb-4">
        <label htmlFor="identityNumberSelect">Select Identity Number:</label>
        <Select
          id="identityNumberSelect"
          options={identityNumberOptions}
          onChange={handleIdentityNumberChange}
          value={identityNumberOptions.find((option) => option.value === selectedIdentityNumber)}
          placeholder="Select Identity Number"
          isSearchable
        />
        <Button className="ml-3" color="primary" onClick={fetchExpenses}>
          Fetch Expenses
        </Button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Category</th>
            <th>Additional Details</th>
            <th>Amount</th>
            <th>Recorded By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense._id}>
              <td>{index + 1}</td>
              <td>{new Date(expense.date).toLocaleDateString('en-US')}</td>
              <td>{expense.category}</td>
              <td>{expense.additionalDetails}</td>
              <td>{expense.amount}</td>
              <td>{expense.recordedBy}</td>
              <td>
                <RiPencilLine
                  color="blue"
                  size={24}
                  onClick={() => handleEdit(expense)}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                />
                <RiDeleteBinLine
                  color="red"
                  size={24}
                  onClick={() => handleDelete(expense)}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Expense</ModalHeader>
        {selectedExpense && (
          <form>
            <div className="form-group">
              <label htmlFor="editDate">Date</label>
              <input
                type="date"
                className="form-control"
                id="editDate"
                value={selectedExpense.date}
                onChange={(e) =>
                  setSelectedExpense({ ...selectedExpense, date: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="editCategory">Category</label>
              <input
                type="text"
                className="form-control"
                id="editCategory"
                value={selectedExpense.category}
                onChange={(e) =>
                  setSelectedExpense({ ...selectedExpense, category: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="editAdditionalDetails">Additional Details</label>
              <textarea
                className="form-control"
                id="editAdditionalDetails"
                rows="3"
                value={selectedExpense.additionalDetails}
                onChange={(e) =>
                  setSelectedExpense({
                    ...selectedExpense,
                    additionalDetails: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="editAmount">Amount</label>
              <input
                type="number"
                className="form-control"
                id="editAmount"
                value={selectedExpense.amount}
                onChange={(e) =>
                  setSelectedExpense({ ...selectedExpense, amount: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="editRecordedBy">Recorded By</label>
              <input
                type="text"
                className="form-control"
                id="editRecordedBy"
                value={selectedExpense.recordedBy}
                onChange={(e) =>
                  setSelectedExpense({ ...selectedExpense, recordedBy: e.target.value })
                }
              />
            </div>
          </form>
        )}
        <ModalFooter>
          <Button color="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button color="secondary" onClick={toggleEditModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this record?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(selectedExpense)}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default ExpensesByTypeAndIdentityNumber;
