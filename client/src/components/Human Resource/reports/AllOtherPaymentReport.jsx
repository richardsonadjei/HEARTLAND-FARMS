import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const ViewOtherPayments = () => {
  const [payments, setPayments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/other-payments');
      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }
      const data = await response.json();
      setPayments(data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching payments:', error.message);
      setErrorMessage('Failed to fetch payments');
    }
  };

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    toggleEditModal();
  };

  const handleDelete = async (payment) => {
    try {
      const response = await fetch(`/api/other-payments/${payment._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete payment');
      }
      // Remove the deleted payment from the state
      setPayments(payments.filter((p) => p._id !== payment._id));
      // Close the delete modal
      toggleDeleteModal();
    } catch (error) {
      console.error('Error deleting payment:', error.message);
      // Handle error message
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/other-payments/${selectedPayment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedPayment),
      });
      if (!response.ok) {
        throw new Error('Failed to update payment data');
      }
      const updatedPayment = await response.json();
      // Update the local state with the updated payment data
      const updatedPayments = payments.map((p) =>
        p._id === updatedPayment._id ? updatedPayment : p
      );
      setPayments(updatedPayments);
      // Close the edit modal after successful update
      toggleEditModal();
    } catch (error) {
      console.error('Error updating payment:', error.message);
      // Handle error if failed to save changes
    }
  };

  // Calculate total amount for each employee
  const calculateTotalAmountForEmployee = (employeeId) => {
    const filteredPayments = payments.filter((payment) => payment.employeeId === employeeId);
    return filteredPayments.reduce((total, payment) => total + payment.amount, 0);
  };

  // Get unique employee IDs
  const uniqueEmployeeIds = [...new Set(payments.map((payment) => payment.employeeId))];

  return (
    <div className="container mt-4">
     
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      
      {/* Display table for each employee */}
      {uniqueEmployeeIds.map((employeeId) => (
        <div key={employeeId} className="mb-4">
          <h4>Employee Name: {employeeId}</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments
                  .filter((payment) => payment.employeeId === employeeId)
                  .map((payment, index) => (
                    <tr key={payment._id}>
                      <td>{index + 1}</td>
                      <td>{payment.category}</td>
                      <td>{payment.amount}</td>
                      <td>{formatDate(payment.paymentDate)}</td>
                      <td>{payment.description}</td>
                      <td>
                        <RiPencilLine
                          color="blue"
                          size={24}
                          onClick={() => handleEdit(payment)}
                          style={{ cursor: 'pointer', marginRight: '10px' }}
                        />
                        <RiDeleteBinLine
                          color="red"
                          size={24}
                          onClick={() => {
                            setSelectedPayment(payment);
                            toggleDeleteModal();
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <p>Total Amount: {calculateTotalAmountForEmployee(employeeId)}</p>
        </div>
      ))}

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Payment</ModalHeader>
        {selectedPayment && (
          <ModalBody>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                value={selectedPayment.category}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                className="form-control"
                value={selectedPayment.amount}
                onChange={(e) =>
                  setSelectedPayment({ ...selectedPayment, amount: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Payment Date</label>
              <input
                type="date"
                className="form-control"
                value={selectedPayment.paymentDate.split('T')[0]}
                onChange={(e) =>
                  setSelectedPayment({ ...selectedPayment, paymentDate: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                value={selectedPayment.description}
                onChange={(e) =>
                  setSelectedPayment({ ...selectedPayment, description: e.target.value })
                }
              />
            </div>
          </ModalBody>
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

      {/* Delete Modal */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Delete Payment</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this payment?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(selectedPayment)}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ViewOtherPayments;
