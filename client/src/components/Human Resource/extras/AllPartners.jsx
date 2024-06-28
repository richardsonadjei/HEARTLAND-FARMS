import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
import { format } from 'date-fns';

const AllPartners = () => {
  const [partners, setPartners] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [nextOfKin, setNextOfKin] = useState('');
  const [partnershipDate, setPartnershipDate] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');

  useEffect(() => {
    fetchPartners();
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/partners');
      if (!response.ok) {
        throw new Error('Failed to fetch partners');
      }
      const data = await response.json();
      setPartners(data);
    } catch (error) {
      console.error('Error fetching partners:', error.message);
    }
  };

  const handleEdit = (partner) => {
    setSelectedPartner(partner);
    setFirstName(partner.firstName);
    setLastName(partner.lastName);
    setPhone(partner.phone);
    setNextOfKin(partner.nextOfKin);
    setPartnershipDate(partner.partnershipDate.split('T')[0]);
    setAdditionalInformation(partner.additionalInformation);
    toggleEditModal();
  };

  const handleSaveChanges = async () => {
    try {
      const updatedPartner = { ...selectedPartner, firstName, lastName, phone, nextOfKin, partnershipDate, additionalInformation };
      const response = await fetch(`/api/partners/${selectedPartner._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPartner),
      });
      if (!response.ok) {
        throw new Error('Failed to update partner');
      }
      const updatedPartners = partners.map((p) =>
        p._id === updatedPartner._id ? updatedPartner : p
      );
      setPartners(updatedPartners);
      toggleEditModal();
    } catch (error) {
      console.error('Error updating partner:', error.message);
    }
  };

  const handleDelete = async (partner) => {
    try {
      const response = await fetch(`/api/partners/${partner._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete partner');
      }
      setPartners(partners.filter((p) => p._id !== partner._id));
      toggleDeleteModal();
    } catch (error) {
      console.error('Error deleting partner:', error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'EEEE do MMMM yyyy'); // Format as Monday 7th June 2024
  };

  return (
    <Container fluid>
      <h2 className="mt-4">Partners</h2>
      <table className="table table-bordered table-striped mt-4">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Next of Kin</th>
            <th>Partnership Date</th>
            <th>Additional Information</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner) => (
            <tr key={partner._id}>
              <td>{partner.firstName}</td>
              <td>{partner.lastName}</td>
              <td>{partner.phone}</td>
              <td>{partner.nextOfKin}</td>
              <td>{formatDate(partner.partnershipDate)}</td>
              <td>{partner.additionalInformation}</td>
              <td>
                <RiPencilLine
                  color="blue"
                  size={24}
                  onClick={() => handleEdit(partner)}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                />
                <RiDeleteBinLine
                  color="red"
                  size={24}
                  onClick={() => {
                    setSelectedPartner(partner);
                    toggleDeleteModal();
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Partner</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="editFirstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="editFirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editLastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="editLastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editPhone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="editPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editNextOfKin">Next of Kin</label>
            <input
              type="text"
              className="form-control"
              id="editNextOfKin"
              value={nextOfKin}
              onChange={(e) => setNextOfKin(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editPartnershipDate">Partnership Date</label>
            <input
              type="date"
              className="form-control"
              id="editPartnershipDate"
              value={partnershipDate}
              onChange={(e) => setPartnershipDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editAdditionalInformation">Additional Information</label>
            <input
              type="textarea"
              className="form-control"
              id="editAdditionalInformation"
              value={additionalInformation}
              onChange={(e) => setAdditionalInformation(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>{' '}
          <Button color="secondary" onClick={toggleEditModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Delete Partner</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this partner?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(selectedPartner)}>
            Delete
          </Button>{' '}
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllPartners;
