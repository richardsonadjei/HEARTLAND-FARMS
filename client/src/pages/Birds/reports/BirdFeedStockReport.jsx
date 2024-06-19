import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const BirdFeedStock = () => {
  const [birdFeedStocks, setBirdFeedStocks] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedFeedStock, setSelectedFeedStock] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedQuantity, setEditedQuantity] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/feedStock');
      if (!response.ok) {
        throw new Error('Failed to fetch bird feed stocks');
      }
      const data = await response.json();
      setBirdFeedStocks(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (feedStock) => {
    setSelectedFeedStock(feedStock);
    setEditedName(feedStock.feedName);
    setEditedQuantity(feedStock.quantity);
    toggleModal();
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/feedStock/${selectedFeedStock._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedName: editedName, quantity: editedQuantity }),
      });
      if (!response.ok) {
        throw new Error('Failed to update bird feed stock');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/feedStock/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete bird feed stock');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <h1>All Bird Feed Stocks</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {birdFeedStocks.map((feedStock, index) => (
            <tr key={feedStock._id}>
              <th scope="row">{index + 1}</th>
              <td>{feedStock.feedName}</td>
              <td>{feedStock.quantity}</td>
              <td>
                <RiEdit2Line
                  size={20}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                  onClick={() => handleEdit(feedStock)}
                />
                <RiDeleteBin6Line
                  size={20}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(feedStock._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Bird Feed Stock</ModalHeader>
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
              <Label for="editedQuantity">Quantity</Label>
              <Input
                type="number"
                id="editedQuantity"
                value={editedQuantity}
                onChange={(e) => setEditedQuantity(e.target.value)}
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

export default BirdFeedStock;
