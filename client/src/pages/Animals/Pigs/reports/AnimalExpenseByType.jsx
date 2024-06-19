import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AllAnimalExpenseByTypeReport = () => {
  const defaultType = 'Pig';
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [animalExpenses, setAnimalExpenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      fetchAnimalExpenses(defaultType, startDate, endDate);
    }
  }, [startDate, endDate]);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchAnimalExpenses = async (type, startDate, endDate) => {
    try {
      const response = await fetch(`/api/expenses-type-period?type=${type}&startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch animal expenses');
      }
      const data = await response.json();
      setAnimalExpenses(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    toggleEditModal();
  };

  const handleDelete = async (expense) => {
    try {
      const response = await fetch(`/api/animal-types/${expense._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete animal expense');
      }
      setAnimalExpenses(animalExpenses.filter((e) => e._id !== expense._id));
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
      // Handle error message
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Implement logic to save changes in the edit modal
      // Assuming selectedExpense contains updated data
      const response = await fetch(`/api/animal-types/${selectedExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedExpense),
      });

      if (!response.ok) {
        throw new Error('Failed to update animal expense data');
      }

      // Assuming the response contains the updated expense data
      const updatedExpense = await response.json();

      // Update the local state with the updated expense data
      const updatedAnimalExpenses = animalExpenses.map(expense =>
        expense._id === updatedExpense._id ? updatedExpense : expense
      );
      setAnimalExpenses(updatedAnimalExpenses);

      // Close the edit modal after successful update
      toggleEditModal();
    } catch (error) {
      console.error(error);
      // Handle error if failed to save changes
    }
  };

  return (
    <Container fluid>
      <h2 className="mt-4">All Animal Expenses</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="mb-4">
        <label htmlFor="startDate" className="mr-3">Start Date: </label>
        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label htmlFor="endDate" className="ml-3 mr-3">End Date: </label>
        <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <Button className="ml-3" color="primary" onClick={() => fetchAnimalExpenses(defaultType, startDate, endDate)}>Filter</Button>
      </div>
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Category</th>
              <th>Identity Number</th>
              <th>Additional Details</th>
              <th>Amount</th>
              <th>Recorded By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {animalExpenses.map((expense, index) => (
              <tr key={expense._id}>
                <td>{index + 1}</td>
                <td>{new Date(expense.date).toLocaleDateString('en-US')}</td>
                <td>{expense.category}</td>
                <td>{expense.identityNumber}</td>
                <td>{expense.additionalDetails}</td>
                <td>{expense.amount}</td>
                <td>{expense.recordedBy}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={() => handleEdit(expense)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={() => handleDelete(expense)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Goat Expense</ModalHeader>
        {selectedExpense && (
          <form>
            <div className="form-group">
              <label htmlFor="editDate">Date</label>
              <input type="date" className="form-control" id="editDate" value={selectedExpense.date} onChange={(e) => setSelectedExpense({ ...selectedExpense, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editCategory">Category</label>
              <input type="text" className="form-control" id="editCategory" value={selectedExpense.category} onChange={(e) => setSelectedExpense({ ...selectedExpense, category: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editIdentityNumber">Identity Number</label>
              <input type="text" className="form-control" id="editIdentityNumber" value={selectedExpense.identityNumber} onChange={(e) => setSelectedExpense({ ...selectedExpense, identityNumber: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editAdditionalDetails">Additional Details</label>
              <textarea className="form-control" id="editAdditionalDetails" rows="3" value={selectedExpense.additionalDetails} onChange={(e) => setSelectedExpense({ ...selectedExpense, additionalDetails: e.target.value })}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="editAmount">Amount</label>
              <input type="number" className="form-control" id="editAmount" value={selectedExpense.amount} onChange={(e) => setSelectedExpense({ ...selectedExpense, amount: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editRecordedBy">Recorded By</label>
              <input type="text" className="form-control" id="editRecordedBy" value={selectedExpense.recordedBy} onChange={(e) => setSelectedExpense({ ...selectedExpense, recordedBy: e.target.value })} />
            </div>
          </form>
        )}
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
          <Button color="danger" onClick={() => handleDelete(selectedExpense)}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllAnimalExpenseByTypeReport;
