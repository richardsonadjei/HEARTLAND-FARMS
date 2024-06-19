import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllExpenseCategories = () => {
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/get-all-bird-expense-categories');
      if (!response.ok) {
        throw new Error('Failed to fetch expense categories');
      }
      const data = await response.json();
      // Sort the data alphabetically by name
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      setExpenseCategories(sortedData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setEditedName(category.name);
    setEditedDescription(category.description);
    toggleModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/delete-bird-expense-category/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete expense category');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/update-bird-expense-category/${selectedCategory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedName, description: editedDescription }),
      });
      if (!response.ok) {
        throw new Error('Failed to update expense category');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <h1>All Expense Categories</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenseCategories.map((category, index) => (
            <tr key={category._id}>
              <th scope="row">{index + 1}</th>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }} onClick={() => handleEdit(category)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(category._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Expense Category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="editedName">Name</Label>
              <Input
                type="text"
                id="editedName"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
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

export default AllExpenseCategories;
