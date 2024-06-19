import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AllGreenPepperOtherActivitiesRecords = () => {
  const [activitiesRecords, setActivitiesRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    fetchActivitiesRecords();
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchActivitiesRecords = async () => {
    try {
      const response = await fetch('/api/all-green-pepper-other-activities-records');
      if (!response.ok) {
        throw new Error('Failed to fetch activities records');
      }
      const data = await response.json();
      setActivitiesRecords(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      // Make API call to update the selected record with the edited data
      const response = await fetch(`/api/vege-other-activities-records/${selectedRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedRecord)
      });

      if (!response.ok) {
        throw new Error('Failed to update record');
      }

      // Close the edit modal
      toggleEditModal();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleDelete = async () => {
    try {
      // Make API call to delete the selected record
      const response = await fetch(`/api/vege-other-activities-records/${selectedRecord._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete record');
      }

      // Close the delete modal and remove the deleted record from the list
      toggleDeleteModal();
      setActivitiesRecords(activitiesRecords.filter(record => record._id !== selectedRecord._id));
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <Container>
      <h2 className="mt-4">All Green Pepper Other Activities Records</h2>
      <div className="table-responsive">
        <Table striped>
          <thead>
            <tr>
              <th>Batch Number</th>
              <th>Activity Details</th>
              <th>Activity Date</th>
              <th>Additional Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activitiesRecords.map(record => (
              <tr key={record._id}>
                <td>{record.batchNumber}</td>
                <td>{record.activityDetails}</td>
                <td>{new Date(record.activityDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{record.additionalDetails}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={() => { setSelectedRecord(record); toggleEditModal(); }} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={() => { setSelectedRecord(record); toggleDeleteModal(); }} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Record</ModalHeader>
        <ModalBody>
          {selectedRecord && (
            <Form>
              <FormGroup>
                <Label for="activityDetails">Activity Details</Label>
                <Input
                  type="text"
                  id="activityDetails"
                  value={selectedRecord.activityDetails}
                  onChange={(e) => setSelectedRecord({ ...selectedRecord, activityDetails: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="activityDate">Activity Date</Label>
                <Input
                  type="date"
                  id="activityDate"
                  value={selectedRecord.activityDate}
                  onChange={(e) => setSelectedRecord({ ...selectedRecord, activityDate: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="additionalDetails">Additional Details</Label>
                <Input
                  type="textarea"
                  id="additionalDetails"
                  value={selectedRecord.additionalDetails}
                  onChange={(e) => setSelectedRecord({ ...selectedRecord, additionalDetails: e.target.value })}
                />
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEdit}>Save Changes</Button>
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
          <Button color="danger" onClick={handleDelete}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllGreenPepperOtherActivitiesRecords;
