import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import { format } from 'date-fns';

const AllAssets = () => {
  const [assets, setAssets] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedAcquisitionDate, setEditedAcquisitionDate] = useState('');
  const [editedValue, setEditedValue] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-assets-purchases');
      if (!response.ok) {
        throw new Error('Failed to fetch assets');
      }
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error(error.message);
      setError('Failed to fetch assets. Please try again later.');
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    setEditedName('');
    setEditedDescription('');
    setEditedAcquisitionDate('');
    setEditedValue('');
    setError(null);
  };

  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setEditedName(asset.name);
    setEditedDescription(asset.description || '');
    setEditedAcquisitionDate(asset.acquisitionDate ? new Date(asset.acquisitionDate).toISOString().split('T')[0] : '');
    setEditedValue(asset.value);
    toggleModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/assets/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete asset');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
      setError('Failed to delete asset. Please try again later.');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/assets/${selectedAsset._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedName,
          description: editedDescription,
          acquisitionDate: editedAcquisitionDate,
          value: editedValue,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update asset');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
      setError('Failed to update asset. Please try again later.');
    }
  };

  return (
    <Container>
      <h1>All Assets</h1>
      {error && <p className="text-danger">{error}</p>}
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            
            <th>Name</th>
            <th>Acquisition Date</th>
            <th>Description</th>
        
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset._id}>
              <th scope="row">{index + 1}</th>
              <td>{asset.name}</td>
              <td>{format(new Date(asset.acquisitionDate), 'EEEE, do MMMM yyyy')}</td>
              <td>{asset.description}</td>
          
              <td>{asset.value}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(asset)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => handleDelete(asset._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Asset</ModalHeader>
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
            <FormGroup>
              <Label for="editedAcquisitionDate">Acquisition Date</Label>
              <Input
                type="date"
                id="editedAcquisitionDate"
                value={editedAcquisitionDate}
                onChange={(e) => setEditedAcquisitionDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedValue">Value</Label>
              <Input
                type="number"
                id="editedValue"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
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

export default AllAssets;
