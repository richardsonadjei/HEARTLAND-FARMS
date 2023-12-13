import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AllMedicationCategoryReport = () => {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/view-medication-categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch medication categories');
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const toggleModal = () => setModal(!modal);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setUpdatedName(category.name);
    setUpdatedDescription(category.description);
    toggleModal();
  };

  const handleUpdate = async () => {
    try {
        const response = await fetch(`/api/update-categories/${selectedCategory._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: updatedName,
              description: updatedDescription,
            }),
          });

      if (response.ok) {
        toggleModal();
        // Refresh categories after update
        const fetchData = async () => {
          try {
            const response = await fetch('/api/get-all-medication-categories');
            if (response.ok) {
              const data = await response.json();
              setCategories(data);
            } else {
              console.error('Failed to fetch medication categories');
            }
          } catch (error) {
            console.error(`Error: ${error.message}`);
          }
        };

        fetchData();
      } else {
        console.error('Failed to update category');
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (categoryId) => {
    // Confirm with the user before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/categories/${categoryId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Alert user after successful deletion
          alert('Category deleted successfully!');

          // Refresh categories after deletion
          const fetchData = async () => {
            try {
              const response = await fetch('/api/get-all-medication-categories');
              if (response.ok) {
                const data = await response.json();
                setCategories(data);
              } else {
                console.error('Failed to fetch medication categories');
              }
            } catch (error) {
              console.error(`Error: ${error.message}`);
            }
          };

          fetchData();
        } else {
          console.error('Failed to delete category');
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-white mb-4">All Medication Categories Report</h2>
          <Table responsive hover bordered className="shadow">
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
                    <span className="mr-2" onClick={() => handleEdit(category)}>
                      <FaEdit className="text-primary" />
                    </span>
                    <span onClick={() => handleDelete(category._id)}>
                      <FaTrashAlt className="text-danger" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {/* Update Category Modal */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllMedicationCategoryReport;
