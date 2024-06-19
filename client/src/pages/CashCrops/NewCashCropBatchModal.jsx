import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';

const NewCashCropBatchModal = ({ isOpen, toggleModal, createBatch }) => {
  const [batchData, setBatchData] = useState({
    type: '',
    variety: '',
    additionalDetails: '',
  });
  const [cashCropOptions, setCashCropOptions] = useState([]);

  useEffect(() => {
    fetchCashCropOptions();
  }, []);

  const fetchCashCropOptions = async () => {
    try {
      const response = await fetch('/api/all-cashcrops');
      if (!response.ok) {
        throw new Error('Failed to fetch cash crops');
      }
      const cashCrops = await response.json();
      const options = cashCrops.map((cashCrop) => ({ value: cashCrop.name, label: cashCrop.name }));
      setCashCropOptions(options);
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
      const response = await fetch('/api/create-cashcrop-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchData),
      });
      if (!response.ok) {
        throw new Error('Failed to create cash crop batch');
      }
      // Clear form data and close the modal
      setBatchData({ type: '', variety: '', additionalDetails: '' });
      toggleModal();
      // Alert user upon successful creation
      window.alert('Cash crop batch created successfully');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Create New Cash Crop Batch</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="type">Cash Crop Type</Label>
          <Select
            id="type"
            options={cashCropOptions}
            onChange={handleInputChange}
            value={{ value: batchData.type, label: batchData.type }}
            isSearchable
            placeholder="Select Cash Crop Type"
          />
        </FormGroup>
        <FormGroup>
          <Label for="variety">Variety</Label>
          <input
            id="variety"
            type="text"
            value={batchData.variety}
            onChange={handleVarietyChange}
            className="form-control"
            placeholder="Enter Variety"
          />
        </FormGroup>
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

export default NewCashCropBatchModal;
