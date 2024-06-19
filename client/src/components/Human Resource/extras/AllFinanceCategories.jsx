import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';


const FinanceCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchCategories = async () => {
    try {
      // Fetch all finance categories from backend API
      const response = await fetch('/api/finance-categories');
      if (!response.ok) {
        throw new Error('Failed to fetch finance categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching finance categories:', error.message);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setName(category.name);
    setDescription(category.description);
    toggleEditModal();
  };

  const handleSaveChanges = async () => {
    try {
      // Update the selected category with new data
      const updatedCategory = { ...selectedCategory, name, description };
      const response = await fetch(`/api/finance-categories/${selectedCategory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
      });
      if (!response.ok) {
        throw new Error('Failed to update finance category');
      }
      // Update the local state with the updated category data
      const updatedCategories = categories.map((cat) =>
        cat._id === updatedCategory._id ? updatedCategory : cat
      );
      setCategories(updatedCategories);
      // Close the edit modal after successful update
      toggleEditModal();
    } catch (error) {
      console.error('Error updating finance category:', error.message);
    }
  };

  const handleDelete = async (category) => {
    try {
      // Delete the selected category
      const response = await fetch(`/api/finance-categories/${category._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete finance category');
      }
      // Remove the deleted category from the local state
      setCategories(categories.filter((cat) => cat._id !== category._id));
      // Close the delete modal
      toggleDeleteModal();
    } catch (error) {
      console.error('Error deleting finance category:', error.message);
    }
  };

  return (
    <Container fluid>
      <h2 className="mt-4">Finance Categories</h2>
      <table className="table table-bordered table-striped mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <RiPencilLine
                  color="blue"
                  size={24}
                  onClick={() => handleEdit(category)}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                />
                <RiDeleteBinLine
                  color="red"
                  size={24}
                  onClick={() => {
                    setSelectedCategory(category);
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
        <ModalHeader toggle={toggleEditModal}>Edit Finance Category</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="editName">Name</label>
            <input
              type="text"
              className="form-control"
              id="editName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editDescription">Description</label>
            <input
              type="text"
              className="form-control"
              id="editDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
        <ModalHeader toggle={toggleDeleteModal}>Delete Finance Category</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this finance category?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(selectedCategory)}>
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

export default FinanceCategories;
