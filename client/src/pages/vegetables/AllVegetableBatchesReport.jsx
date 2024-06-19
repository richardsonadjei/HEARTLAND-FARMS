import { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { Button, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";

const AllVegetableBatches = () => {
    const [vegetableBatches, setVegetableBatches] = useState({});
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [editedBatchNumber, setEditedBatchNumber] = useState('');
    const [editedIsActive, setEditedIsActive] = useState('');
    const [editedAdditionalDetails, setEditedAdditionalDetails] = useState('');
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch('/api/all-batches');
        if (!response.ok) {
          throw new Error('Failed to fetch vegetable batches');
        }
        const data = await response.json();
        const batchesByType = {};
        data.forEach((batch) => {
          if (!batchesByType[batch.type]) {
            batchesByType[batch.type] = [];
          }
          batchesByType[batch.type].push(batch);
        });
        setVegetableBatches(batchesByType);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    const toggleEditModal = () => {
      setModalEdit(!modalEdit);
    };
  
    const toggleDeleteModal = () => {
      setModalDelete(!modalDelete);
    };
  
    const handleEdit = (batch) => {
      setSelectedBatch(batch);
      setEditedBatchNumber(batch.batchNumber);
      setEditedIsActive(batch.isActive ? 'Yes' : 'No');
      setEditedAdditionalDetails(batch.additionalDetails);
      toggleEditModal();
    };
  
    const handleDelete = async () => {
      try {
        const response = await fetch(`/api/batches/${selectedBatch._id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete batch');
        }
        toggleDeleteModal();
        fetchData();
      } catch (error) {
        console.error(error.message);
      }
    };
  
    const handleSaveEdit = async () => {
      try {
        const response = await fetch(`/api/batches/${selectedBatch._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            batchNumber: editedBatchNumber,
            isActive: editedIsActive === 'Yes',
            additionalDetails: editedAdditionalDetails,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to update batch');
        }
        toggleEditModal();
        fetchData();
      } catch (error) {
        console.error(error.message);
      }
    };

    
  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
    return (
      <Container>
        <h1 style={{ textAlign: 'center', color: 'blue' }}>All Vegetable Batches</h1>

        {Object.keys(vegetableBatches).map((type) => (
          <div key={type}>
            <h2 style={{ color: 'purple', fontWeight: 'bold' }}>{type}</h2>

            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Created At</th>
                  <th>Batch Number</th>
                  <th>Active</th>
                  <th>Additional Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vegetableBatches[type].map((batch, index) => (
                  <tr key={batch._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{formatDate(batch.createdAt)}</td>
                    <td>{batch.batchNumber}</td>
                    <td>{batch.isActive ? 'Yes' : 'No'}</td>
                    <td>{batch.additionalDetails}</td>
                    <td>
                      <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(batch)} />
                      <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => { setSelectedBatch(batch); toggleDeleteModal(); }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
        <Modal isOpen={modalEdit} toggle={toggleEditModal}>
          <ModalHeader toggle={toggleEditModal}>Edit Batch</ModalHeader>
          <ModalBody>
            <Form>
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
                <Label for="editedIsActive">Active</Label>
                <Input
                  type="select"
                  id="editedIsActive"
                  value={editedIsActive}
                  onChange={(e) => setEditedIsActive(e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="editedAdditionalDetails">Additional Details</Label>
                <Input
                  type="textarea"
                  id="editedAdditionalDetails"
                  value={editedAdditionalDetails}
                  onChange={(e) => setEditedAdditionalDetails(e.target.value)}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSaveEdit}>Save</Button>{' '}
            <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalDelete} toggle={toggleDeleteModal}>
          <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this batch?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDelete}>Delete</Button>{' '}
            <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  };
  
  export default AllVegetableBatches;
  