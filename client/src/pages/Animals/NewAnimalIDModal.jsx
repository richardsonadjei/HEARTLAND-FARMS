import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const NewAnimalIDModal = ({ isOpen, toggleModal, createBatch }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [batchData, setBatchData] = useState({
    type: '',
    specie: '',
    breed: '',
    identityTag: '',
    birthDate: '',
    gender: '',
    farmHouseLocation: '',
    total: 1,
    additionalDetails: '',
    recordedBy: currentUser ? currentUser.userName : '',
    date: '', // Added for expense details
    amount: '', // Added for expense details
  });
  const [identityTagOptions] = useState([
    { value: 'Red', label: 'Red' },
    { value: 'Blue', label: 'Blue' },
    { value: 'White', label: 'White' },
    { value: 'Orange', label: 'Orange' },
    { value: 'Green', label: 'Green' },
    { value: 'Yellow', label: 'Yellow' }
  ]);
  const [genderOptions] = useState([
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]);

  useEffect(() => {
    fetchAnimalTypes();
  }, []);

  const fetchAnimalTypes = async () => {
    try {
      const response = await fetch('/api/all-animal-types');
      if (!response.ok) {
        throw new Error('Failed to fetch animal types');
      }
      const animalTypes = await response.json();
      const options = animalTypes.map((animal) => ({ value: animal.name, label: animal.name }));
      setBatchData((prevBatchData) => ({
        ...prevBatchData,
        typeOptions: options
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBatchData({ ...batchData, [name]: value });
  };

  const handleSelectChange = (selectedOption, name) => {
    setBatchData({ ...batchData, [name]: selectedOption.value });
  };

  const handleCreateBatch = async () => {
    try {
      const response = await fetch('/api/create-animal-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchData),
      });
      if (!response.ok) {
        throw new Error('Failed to create animal batch');
      }
      // Clear form data and close the modal
      setBatchData({
        type: '',
        specie: '',
        breed: '',
        identityTag: '',
        birthDate: '',
        gender: '',
        farmHouseLocation: '',
        total: 1,
        additionalDetails: '',
        recordedBy: currentUser ? currentUser.userName : '',
        date: '', // Clear expense details
        amount: '', // Clear expense details
      });
      toggleModal();
      // Alert user upon successful creation
      window.alert('Animal batch created successfully');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Create New Animal ID</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="type">Type</Label>
          <Select
            id="type"
            options={batchData.typeOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'type')}
            value={{ value: batchData.type, label: batchData.type }}
            isSearchable
            placeholder="Select Type"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="specie">Specie</Label>
          <Input type="text" id="specie" name="specie" value={batchData.specie} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="breed">Breed</Label>
          <Input type="text" id="breed" name="breed" value={batchData.breed} onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="identityTag">Identity Tag</Label>
          <Select
            id="identityTag"
            options={identityTagOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'identityTag')}
            value={{ value: batchData.identityTag, label: batchData.identityTag }}
            isSearchable
            placeholder="Select Identity Tag"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="birthDate">Birth Date</Label>
          <Input type="date" id="birthDate" name="birthDate" value={batchData.birthDate} onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <Select
            id="gender"
            options={genderOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'gender')}
            value={{ value: batchData.gender, label: batchData.gender }}
            isSearchable
            placeholder="Select Gender"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="farmHouseLocation">Farm House Location</Label>
          <Input type="text" id="farmHouseLocation" name="farmHouseLocation" value={batchData.farmHouseLocation} onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="additionalDetails">Additional Details</Label>
          <Input type="textarea"
            id="additionalDetails"
            name="additionalDetails"
            value={batchData.additionalDetails}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="date">Expense Date</Label>
          <Input type="date" id="date" name="date" value={batchData.date} onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="amount">Amount</Label>
          <Input type="number" id="amount" name="amount" value={batchData.amount} onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="recordedBy">Recorded By</Label>
          <Input
            type="text"
            id="recordedBy"
            name="recordedBy"
            value={batchData.recordedBy}
            onChange={handleInputChange}
            readOnly
          />
        </FormGroup>
        {/* Additional fields for expense details */}
        
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleCreateBatch}>Create</Button>
        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewAnimalIDModal;
