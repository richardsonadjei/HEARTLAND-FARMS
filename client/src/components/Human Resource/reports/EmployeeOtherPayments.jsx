import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you are using React Router for routing
import Table from 'react-bootstrap/Table'; // Assuming you use Bootstrap for styling
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const OtherPaymentsForEmployee = () => {
  const { employeeId } = useParams(); // Fetch employeeId from URL params
  const [payments, setPayments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetchPaymentsForEmployee();
  }, []);

  const fetchPaymentsForEmployee = async () => {
    try {
      const response = await fetch(`/api/other-payments/employee/${employeeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch payments for employee');
      }
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error.message);
      // Handle error fetching payments
    }
  };

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setShowEditModal(true);
  };

  const handleDelete = (payment) => {
    setSelectedPayment(payment);
    setShowDeleteModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  // Placeholder functions for edit and delete actions
  const handleSaveChanges = async (payment) => {
    try {
      // Implement logic to save changes
      console.log('Saving changes for payment:', payment);
      setShowEditModal(false);
      // Optionally, fetch payments again after edit
      fetchPaymentsForEmployee();
    } catch (error) {
      console.error('Error saving changes:', error.message);
      // Handle error saving changes
    }
  };

  const handleDeletePayment = async (payment) => {
    try {
      // Implement logic to delete payment
      console.log('Deleting payment:', payment);
      setShowDeleteModal(false);
      // Optionally, fetch payments again after delete
      fetchPaymentsForEmployee();
    } catch (error) {
      console.error('Error deleting payment:', error.message);
      // Handle error deleting payment
    }
  };

  return (
    <div className="container mt-4">
      <h2>Other Payments for Employee</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.category}</td>
              <td>{payment.amount}</td>
              <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
              <td>{payment.description}</td>
              <td>
                <Button variant="outline-primary" onClick={() => handleEdit(payment)}>
                  <RiPencilLine /> Edit
                </Button>{' '}
                <Button variant="outline-danger" onClick={() => handleDelete(payment)}>
                  <RiDeleteBinLine /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add form or component to edit payment details */}
          {/* Example: <EditPaymentForm payment={selectedPayment} onSave={handleSaveChanges} /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveChanges(selectedPayment)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this payment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeletePayment(selectedPayment)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OtherPaymentsForEmployee;
