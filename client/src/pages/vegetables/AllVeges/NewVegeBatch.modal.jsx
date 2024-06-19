import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';

const NewVegeBatchModal = ({ isOpen, toggleModal, createBatch }) => {
  const [batchData, setBatchData] = useState({
    type: '',
    variety: '',
    additionalDetails: '',
  });
  const [vegetableOptions, setVegetableOptions] = useState([]);

  useEffect(() => {
    fetchVegetableOptions();
  }, []);

  const fetchVegetableOptions = async () => {
    try {
      const response = await fetch('/api/all-vegetables');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetables');
      }
      const vegetables = await response.json();
      const options = vegetables.map((vegetable) => ({ value: vegetable.name, label: vegetable.name }));
      setVegetableOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (selectedOption) => {
    setBatchData({ ...batchData, type: selectedOption.value });
  };

  const handleVarietyChange = (e) => {
    setBatchData({ ...batchData, variety: e.target.value });
  };

  const handleDetailsChange = (e) => {
    setBatchData({ ...batchData, additionalDetails: e.target.value });
  };

  const handleCreateBatch = async () => {
    try {
      const response = await fetch('/api/create-vegetable-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchData),
      });
      if (!response.ok) {
        throw new Error('Failed to create vegetable batch');
      }
      // Clear form data and close the modal
      setBatchData({ type: '', variety: '', additionalDetails: '' });
      toggleModal();
      // Alert user upon successful creation
      window.alert('Vegetable batch created successfully');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Create New Vegetable Batch</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="type">Vegetable Type</Label>
          <Select
            id="type"
            options={vegetableOptions}
            onChange={handleInputChange}
            value={{ value: batchData.type, label: batchData.type }}
            isSearchable
            placeholder="Select Vegetable Type"
          />
        </FormGroup>
        {/* Conditional rendering of variety input */}
        {batchData.type !== 'All-Vegetables' && (
          <FormGroup>
            <Label for="variety">Variety</Label>
            <Input
              type="text"
              id="variety"
              value={batchData.variety}
              onChange={handleVarietyChange}
              placeholder="Enter Variety"
            />
          </FormGroup>
        )}
        <FormGroup>
          <Label for="additionalDetails">Additional Details</Label>
          <textarea
            id="additionalDetails"
            value={batchData.additionalDetails}
            onChange={handleDetailsChange}
            className="form-control"
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleCreateBatch}>Create</Button>
        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewVegeBatchModal;
