import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AllFarmExpenses = () => {
  const [farmExpenses, setFarmExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [modal, setModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editedExpenseCategory, setEditedExpenseCategory] = useState('');
  const [editedFarmCategory, setEditedFarmCategory] = useState('');
  const [editedType, setEditedType] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedRecordedBy, setEditedRecordedBy] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotalAmount();
  }, [farmExpenses]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/farm-expenses');
      if (!response.ok) {
        throw new Error('Failed to fetch farm expenses');
      }
      const data = await response.json();
      setFarmExpenses(data);
    } catch (error) {
      console.error(error.message);
      setError('Failed to fetch farm expenses. Please try again later.');
    }
  };

  const calculateTotalAmount = () => {
    const total = farmExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalAmount(total);
  };

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      // Clear edited fields when closing modal
      setEditedExpenseCategory('');
      setEditedFarmCategory('');
      setEditedType('');
      setEditedAmount('');
      setEditedDescription('');
      setEditedRecordedBy('');
      setSelectedExpense(null);
    }
    setError(null);
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setEditedExpenseCategory(expense.expenseCategory);
    setEditedFarmCategory(expense.farmCategory);
    setEditedType(expense.type || '');
    setEditedAmount(expense.amount);
    setEditedDescription(expense.description || '');
    setEditedRecordedBy(expense.recordedBy);
    setModal(true); // Open the modal
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/farm-expenses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete farm expense');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
      setError('Failed to delete farm expense. Please try again later.');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/farm-expenses/${selectedExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expenseCategory: editedExpenseCategory,
          farmCategory: editedFarmCategory,
          type: editedType,
          amount: editedAmount,
          description: editedDescription,
          recordedBy: editedRecordedBy,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update farm expense');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
      setError('Failed to update farm expense. Please try again later.');
    }
  };

  const exportToExcel = () => {
    /* Convert farmExpenses data to Excel format */
    const worksheet = XLSX.utils.json_to_sheet(farmExpenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FarmExpenses');
    
    /* Generate XLSX file and prompt to download */
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelBlob, 'farm_expenses.xlsx');
  };

  return (
    <Container>
      <h1>All Farm Expenses</h1>
      {error && <p className="text-danger">{error}</p>}
      <h2 style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
  Total Amount: Ghc{totalAmount.toFixed(2)}
</h2>

      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Expense Category</th>
            <th>Farm Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Recorded By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmExpenses.map((expense, index) => (
            <tr key={expense._id}>
              <th scope="row">{index + 1}</th>
              <td>{format(new Date(expense.date), 'EEEE, do MMMM yyyy')}</td>
              <td>{expense.expenseCategory}</td>
              <td>{expense.farmCategory}</td>
              <td>{expense.type || '-'}</td>
              <td>{expense.amount}</td>
              <td>{expense.description || '-'}</td>
              <td>{expense.recordedBy}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(expense)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => handleDelete(expense._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button color="success" onClick={exportToExcel}>Export to Excel</Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Farm Expense</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="editedExpenseCategory">Expense Category</Label>
              <Input
                type="text"
                id="editedExpenseCategory"
                value={editedExpenseCategory}
                onChange={(e) => setEditedExpenseCategory(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedFarmCategory">Farm Category</Label>
              <Input
                type="select"
                id="editedFarmCategory"
                value={editedFarmCategory}
                onChange={(e) => setEditedFarmCategory(e.target.value)}
              >
                <option value="CashCrop">Cash Crop</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Farm-Animals">Farm Animals</option>
                <option value="Birds">Birds</option>
              </Input>
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
              <Label for="editedAmount">Amount</Label>
              <Input
                type="number"
                id="editedAmount"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedDescription">Description</Label>
              <Input
                type="textarea"
                id="editedDescription"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedRecordedBy">Recorded By</Label>
              <Input
                type="text"
                id="editedRecordedBy"
                value={editedRecordedBy}
                onChange={(e) => setEditedRecordedBy(e.target.value)}
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

export default AllFarmExpenses;
