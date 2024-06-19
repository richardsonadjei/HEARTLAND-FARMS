import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllFeedNames = () => {
  const [feedNames, setFeedNames] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    fetchFeedNames();
  }, []);

  const fetchFeedNames = async () => {
    try {
      const response = await fetch('/api/feed-names');
      if (!response.ok) {
        throw new Error('Failed to fetch feed names');
      }
      const data = await response.json();
      setFeedNames(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (feed) => {
    setSelectedFeed(feed);
    setEditedName(feed.name);
    toggleModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/feed-names/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete feed name');
      }
      fetchFeedNames();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/feed-names/${selectedFeed._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedName }),
      });
      if (!response.ok) {
        throw new Error('Failed to update feed name');
      }
      toggleModal();
      window.location.reload();  // Refresh the page after successful save
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <h1>All Feed Names</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedNames.map((feed, index) => (
            <tr key={feed._id}>
              <th scope="row">{index + 1}</th>
              <td>{feed.name}</td>
              <td>
                <RiEdit2Line
                  size={20}
                  style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }}
                  onClick={() => handleEdit(feed)}
                />
                <RiDeleteBin6Line
                  size={20}
                  style={{ cursor: 'pointer', color: 'red' }}
                  onClick={() => handleDelete(feed._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Feed Name</ModalHeader>
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

export default AllFeedNames;
