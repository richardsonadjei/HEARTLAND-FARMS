import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input, FormGroup } from 'reactstrap';
import Select from 'react-select';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import { format } from 'date-fns';

const BirdBatchExpenseReport = () => {
  const defaultType = 'Turkey';
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [selectedBatchNumber, setSelectedBatchNumber] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    fetchBatchNumbers();
  }, []);

  useEffect(() => {
    if (selectedBatchNumber) {
      fetchExpenses();
    }
  }, [selectedBatchNumber]);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchBatchNumbers = async () => {
    try {
      const response = await fetch(`/api/all-bird-type-batches?type=${defaultType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch batch numbers');
      }
      const batches = await response.json();
      const options = batches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber }));
      setBatchNumberOptions(options);
    } catch (error) {
      console.error(error.message);
      setErrorMessage('Failed to fetch batch numbers');
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`/api/all-bird-expenses/${defaultType}/${selectedBatchNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch poultry expenses');
      }
      const data = await response.json();
      setExpenses(data);
      calculateSummary(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const calculateSummary = (expenses) => {
    const summary = expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      acc.total += amount;
      return acc;
    }, { total: 0 });

    setSummary(summary);
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    toggleEditModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete poultry expense');
      }
      fetchExpenses();
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/expenses/${selectedExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedExpense),
      });
      if (!response.ok) {
        throw new Error('Failed to update poultry expense');
      }
      toggleEditModal();
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'EEEE do MMMM yyyy');
  };

  return (
    <Container fluid>
      <h2 className="mt-4">Batch Expense Report</h2>
      {errorMessage && <p>{errorMessage}</p>}

      <FormGroup>
        <Label for="batchNumber">Select Batch Number</Label>
        <Select
          id="batchNumber"
          options={batchNumberOptions}
          onChange={(selectedOption) => setSelectedBatchNumber(selectedOption.value)}
          isSearchable
          placeholder="Search and select a batch number"
        />
      </FormGroup>

      {expenses.length > 0 ? (
        <>
          <div className="table-responsive">
            <Table bordered striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Batch Number</th>
                  <th>Additional Details</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={expense._id}>
                    <td>{index + 1}</td>
                    <td>{formatDate(expense.date)}</td>
                    <td>{expense.category}</td>
                    <td>{expense.batchNumber ? expense.batchNumber : 'Not Applicable'}</td>
                    <td>{expense.additionalDetails}</td>
                    <td>{expense.amount}</td>
                    <td>
                      <RiEdit2Line color="blue" size={24} onClick={() => handleEdit(expense)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                      <RiDeleteBin6Line color="red" size={24} onClick={() => {
                        setSelectedExpense(expense);
                        toggleDeleteModal();
                      }} style={{ cursor: 'pointer' }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <h3>Summary Report</h3>
          <div className="table-responsive">
            <Table bordered striped>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(summary).map((category) => (
                  category !== 'total' && (
                    <tr key={category}>
                      <td>{category}</td>
                      <td>{summary[category]}</td>
                    </tr>
                  )
                ))}
                <tr>
                  <td><strong>Overall Total</strong></td>
                  <td><strong>{summary.total}</strong></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        <p>No poultry expenses available for the selected batch number</p>
      )}

      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Poultry Expense</ModalHeader>
        {selectedExpense && (
          <ModalBody>
            <FormGroup>
              <Label for="editedDate">Date</Label>
              <Input
                type="date"
                id="editedDate"
                value={selectedExpense.date}
                onChange={(e) => setSelectedExpense({ ...selectedExpense, date: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedCategory">Category</Label>
              <Input
                type="text"
                id="editedCategory"
                value={selectedExpense.category}
                onChange={(e) => setSelectedExpense({ ...selectedExpense, category: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedType">Type</Label>
              <Input
                type="text"
                id="editedType"
                value={selectedExpense.type}
                onChange={(e) => setSelectedExpense({ ...selectedExpense, type: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedBatchNumber">Batch Number</Label>
              <Input
                type="text"
                id="editedBatchNumber"
                value={selectedExpense.batchNumber}
                onChange={(e) => setSelectedExpense({ ...selectedExpense, batchNumber: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedAdditionalDetails">Additional Details</Label>
              <Input
                type="text"
                id="editedAdditionalDetails"
                value={selectedExpense.additionalDetails}
                onChange={(e) => setSelectedExpense({ ...selectedExpense, additionalDetails: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedAmount">Amount</Label>
              <Input
                type="number"
                id="editedAmount"
                value={selectedExpense.amount}
                onChange={(e) => setSelectedExpense({ ...selectedExpense, amount: e.target.value })}
                min="0"
              />
            </FormGroup>
          </ModalBody>
        )}
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>Save</Button>
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this poultry expense?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(selectedExpense._id)}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default BirdBatchExpenseReport;
