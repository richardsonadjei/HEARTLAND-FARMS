import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { BsPlusCircle, BsFillTrashFill } from 'react-icons/bs';

const NewBirdBatchModal = ({ isOpen, toggleModal, createBatch }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [batchData, setBatchData] = useState({
    type: '',
    breed: '',
    birthDate: '',
    batchDetails: [],
    farmHouseLocation: '',
    additionalDetails: '',
    recordedBy: currentUser ? currentUser.userName : '',
  });

  const [typeOptions, setTypeOptions] = useState([]);
  const [farmHouseLocationOptions, setFarmHouseLocationOptions] = useState([]);
  const [genderOptions] = useState([
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]);
  const [healthStatusOptions] = useState([
    { value: 'Healthy', label: 'Healthy' },
    { value: 'Sick', label: 'Sick' },
    { value: 'Recovered', label: 'Recovered' }
  ]);

  useEffect(() => {
    fetchBirdTypes();
    fetchFarmHouseLocations();
  }, []);

  const fetchBirdTypes = async () => {
    try {
      const response = await fetch('/api/all-birds-types');
      if (!response.ok) {
        throw new Error('Failed to fetch bird types');
      }
      const birdTypes = await response.json();
      const options = birdTypes.map((type) => ({ value: type.name , label: type.name }));
      setTypeOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchFarmHouseLocations = async () => {
    try {
      const response = await fetch('/api/all-bird-farm-sections');
      if (!response.ok) {
        throw new Error('Failed to fetch farm sections');
      }
      const sections = await response.json();
      const options = sections.map((section) => ({ value: section.sectionName, label: section.sectionName }));
      setFarmHouseLocationOptions(options);
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

  const handleBatchDetailChange = (index, name, value) => {
    const newBatchDetails = [...batchData.batchDetails];
    newBatchDetails[index] = { ...newBatchDetails[index], [name]: value };
    setBatchData({ ...batchData, batchDetails: newBatchDetails });
  };

  const handleAddBatchDetail = () => {
    setBatchData({
      ...batchData,
      batchDetails: [...batchData.batchDetails, { gender: '', healthStatus: '', quantity: 0 }]
    });
  };

  const handleRemoveBatchDetail = (index) => {
    const newBatchDetails = batchData.batchDetails.filter((_, i) => i !== index);
    setBatchData({ ...batchData, batchDetails: newBatchDetails });
  };

  const handleCreateBatch = async () => {
    try {
      const response = await fetch('/api/birdBatches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchData),
      });
      if (!response.ok) {
        throw new Error('Failed to create bird batch');
      }
      // Clear form data and close the modal
      setBatchData({
        type: '',
        breed: '',
        birthDate: '',
        batchDetails: [],
        farmHouseLocation: '',
        additionalDetails: '',
        recordedBy: currentUser ? currentUser.userName : '',
      });
      toggleModal();
      // Alert user upon successful creation
      window.alert('Bird batch created successfully');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Create New Bird Batch</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="type">Type</Label>
          <Select
            id="type"
            options={typeOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'type')}
            value={typeOptions.find(option => option.value === batchData.type)}
            isSearchable
            placeholder="Select Type"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="breed">Breed</Label>
          <Input type="text" id="breed" name="breed" value={batchData.breed} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="birthDate">Birth Date</Label>
          <Input type="date" id="birthDate" name="birthDate" value={batchData.birthDate} onChange={handleInputChange} required />
        </FormGroup>
        {batchData.batchDetails.map((detail, index) => (
          <div key={index} className="batch-detail">
            <FormGroup>
              <Label for={`gender-${index}`}>Gender</Label>
              <Select
                id={`gender-${index}`}
                options={genderOptions}
                onChange={(selectedOption) => handleBatchDetailChange(index, 'gender', selectedOption.value)}
                value={genderOptions.find(option => option.value === detail.gender)}
                isSearchable
                placeholder="Select Gender"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for={`healthStatus-${index}`}>Health Status</Label>
              <Select
                id={`healthStatus-${index}`}
                options={healthStatusOptions}
                onChange={(selectedOption) => handleBatchDetailChange(index, 'healthStatus', selectedOption.value)}
                value={healthStatusOptions.find(option => option.value === detail.healthStatus)}
                isSearchable
                placeholder="Select Health Status"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for={`quantity-${index}`}>Quantity</Label>
              <Input
                type="number"
                id={`quantity-${index}`}
                name="quantity"
                value={detail.quantity}
                onChange={(e) => handleBatchDetailChange(index, 'quantity', e.target.value)}
                required
              />
            </FormGroup>
            {index !== 0 && (
              <BsFillTrashFill
                color="red"
                size={20}
                onClick={() => handleRemoveBatchDetail(index)}
                style={{ cursor: 'pointer', marginLeft: '5px' }}
              />
            )}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BsPlusCircle
            color="blue"
            size={20}
            onClick={handleAddBatchDetail}
            style={{ cursor: 'pointer', marginRight: '5px' }}
          />
          <span style={{ fontSize: '16px', cursor: 'pointer' }}>Add Batch Detail</span>
        </div>
        <FormGroup>
          <Label for="farmHouseLocation">Farm House Location</Label>
          <Select
            id="farmHouseLocation"
            options={farmHouseLocationOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'farmHouseLocation')}
            value={farmHouseLocationOptions.find(option => option.value === batchData.farmHouseLocation)}
            isSearchable
            placeholder="Select Farm House Location"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="additionalDetails">Additional Details</Label>
          <Input type="textarea" id="additionalDetails" name="additionalDetails" value={batchData.additionalDetails} onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="recordedBy">Recorded By</Label>
          <Input type="text" id="recordedBy" name="recordedBy" value={batchData.recordedBy} onChange={handleInputChange} readOnly />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleCreateBatch}>Create</Button>
        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewBirdBatchModal;
