import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AllPoultryBatches = () => {
  const defaultType = 'Poultry';
  const [birdRecords, setBirdRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPoultry, setSelectedPoultry] = useState(null);

  useEffect(() => {
    fetchPoultryBatches();
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchPoultryBatches = async () => {
    try {
      const response = await fetch(`/api/bird-Batches/${defaultType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch poultry batches');
      }
      const { birdRecords } = await response.json();
      setBirdRecords(birdRecords);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = (poultry) => {
    setSelectedPoultry(poultry);
    toggleEditModal();
  };

  const handleDelete = async (poultry) => {
    try {
      const response = await fetch(`/api/delete-poultry/${poultry._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete poultry batch');
      }
      setBirdRecords(birdRecords.filter((p) => p._id !== poultry._id));
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/update-poultry/${selectedPoultry._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedPoultry),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update poultry batch');
      }
      
      const updatedPoultry = await response.json();
      
      const updatedBirdRecords = birdRecords.map(p =>
        p._id === updatedPoultry._id ? updatedPoultry : p
      );
      setBirdRecords(updatedBirdRecords);
  
      toggleEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid>
      <h2 className="mt-4">All Poultry Batches</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Batch Number</th>
              <th>Breed</th>
              <th>Birth Date</th>
              <th>Current Age</th>
              <th>Age-Category</th>
              <th>Batch Details</th>
              <th>Farm House Location</th>
              <th>Total</th>
              <th>Additional Details</th>
              <th>Recorded At</th>
              <th>Recorded By</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(birdRecords) && birdRecords.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.type}</td>
                <td>{record.
batchNumber}</td>
                <td>{record.breed}</td>
                <td>{new Date(record.birthDate).toLocaleDateString('en-US')}</td>
                <td>{record.currentAge}</td>
                <td>{record.
ageCategory}</td>
                <td>
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Gender</th>
        <th>Quantity</th>
        <th>Health Status</th>
      </tr>
    </thead>
    <tbody>
      {/* Mapping over the batchDetails to display all details */}
      {Array.isArray(record.batchDetails) && record.batchDetails.map((batch, i) => (
        <tr key={i}>
          <td>{batch.gender}</td>
          <td>{batch.quantity}</td>
          <td>{batch.healthStatus}</td>
        </tr>
      ))}
    </tbody>
  </table>
</td>


                <td>{record.farmHouseLocation}</td>
                <td>{record.totalQuantity}</td>
                <td>{record.additionalDetails}</td>
                <td>{new Date(record.createdAt).toLocaleString()}</td>
                <td>{record.recordedBy}</td>
                <td>{record.isActive ? 'Yes' : 'No'}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={() => handleEdit(record)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={() => { setSelectedPoultry(record); toggleDeleteModal(); }} style={{ cursor: 'pointer', marginRight: '10px' }} />
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>

{/* Summary Tables */}
<div className="mt-4">
  <h3>Summary</h3>
  <table className="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Summary</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td>Total Batches</td>
        <td>
          {/* Calculate total number of batches */}
          {birdRecords.length}
        </td>
      </tr>
      <tr>
        <td>Total Males</td>
        <td>
          {/* Calculate total number of males */}
          {birdRecords.reduce((total, record) => {
            return total + record.batchDetails.reduce((acc, batch) => {
              return acc + (batch.gender === 'male' ? batch.quantity : 0);
            }, 0);
          }, 0)}
        </td>
      </tr>
      <tr>
        <td>Total Females</td>
        <td>
          {/* Calculate total number of females */}
          {birdRecords.reduce((total, record) => {
            return total + record.batchDetails.reduce((acc, batch) => {
              return acc + (batch.gender === 'female' ? batch.quantity : 0);
            }, 0);
          }, 0)}
        </td>
      </tr>
      <tr>
        <td>Total Birds</td>
        <td>
          {/* Calculate total number of birds */}
          {birdRecords.reduce((total, record) => {
            return total + record.batchDetails.reduce((acc, batch) => acc + batch.quantity, 0);
          }, 0)}
        </td>
      </tr>
     
    </tbody>
  </table>
</div>

 
      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Poultry Batch</ModalHeader>
        {selectedPoultry && (
          <form>
            {/* Edit form fields */}
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
          Are you sure you want to delete this poultry batch?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(selectedPoultry)}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllPoultryBatches;
