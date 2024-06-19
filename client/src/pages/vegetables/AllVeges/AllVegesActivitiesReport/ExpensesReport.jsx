import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllVegeExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editedDate, setEditedDate] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedVegetable, setEditedVegetable] = useState('');
  const [editedBatchNumber, setEditedBatchNumber] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedAmount, setEditedAmount] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-vege-expenses');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetable expenses');
      }
      const data = await response.json();
      setExpenses(data);
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
    setEditedVegetable(expense.vegetable);
    setEditedBatchNumber(expense.batchNumber);
    setEditedDescription(expense.description);
    setEditedAmount(expense.amount);
    toggleModal();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
  
    if (!confirmDelete) {
      return;
    }
  
    try {
      const response = await fetch(`/api/delete-expense-record/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete vegetable expense');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/update-expense-record/${selectedExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: editedDate,
          category: editedCategory,
          vegetable: editedVegetable,
          batchNumber: editedBatchNumber,
          description: editedDescription,
          amount: editedAmount,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update vegetable expense');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const groupExpensesByVegetable = (expenses) => {
    return expenses.reduce((groups, expense) => {
      const vegetable = expense.vegetable || 'Uncategorized';
      if (!groups[vegetable]) {
        groups[vegetable] = [];
      }
      groups[vegetable].push(expense);
      return groups;
    }, {});
  };

  const calculateCategoryTotals = (expenses) => {
    return expenses.reduce((totals, expense) => {
      const category = expense.category || 'Uncategorized';
      if (!totals[category]) {
        totals[category] = 0;
      }
      totals[category] += parseFloat(expense.amount);
      return totals;
    }, {});
  };

  const calculateOverallTotal = (totals) => {
    return Object.values(totals).reduce((sum, amount) => sum + amount, 0);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Sort expenses by date
  const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));

  const groupedExpenses = groupExpensesByVegetable(sortedExpenses);
  const categoryTotals = calculateCategoryTotals(sortedExpenses);
  const overallTotal = calculateOverallTotal(categoryTotals);

  // Sort category totals by amount in descending order
  const sortedCategoryTotals = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a);

  return (
    <Container>
      <h1>All Vegetable Expenses</h1>
      {Object.keys(groupedExpenses).map((vegetable) => (
        <div key={vegetable}>
          <h2 style={{ textAlign: 'center', color: 'blue' }}>{vegetable}</h2>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Category</th>
                <th>Batch Number</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedExpenses[vegetable].map((expense, index) => (
                <tr key={expense._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{formatDate(expense.date)}</td>
                  <td>{expense.category}</td>
                  <td>{expense.batchNumber}</td>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>
                    <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(expense)} />
                    <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => handleDelete(expense._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
      <h2 style={{ textAlign: 'center', color: 'green' }}>Summary Report</h2>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedCategoryTotals.map(([category, total]) => (
            <tr key={category}>
              <td>{category}</td>
              <td>{total.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td><strong>Overall Total</strong></td>
            <td><strong>{overallTotal.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Vegetable Expense</ModalHeader>
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
              <Label for="editedVegetable">Vegetable</Label>
              <Input
                type="text"
                id="editedVegetable"
                value={editedVegetable}
                onChange={(e) => setEditedVegetable(e.target.value)}
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
              <Label for="editedDescription">Description</Label>
              <textarea
                id="editedDescription"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="form-control"
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

export default AllVegeExpenses;
