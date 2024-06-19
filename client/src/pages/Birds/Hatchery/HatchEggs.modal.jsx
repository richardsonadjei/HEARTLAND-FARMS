import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';

const HatchEggsModal = ({ isOpen, toggleModal, batch, onSave, type }) => {
  const [editedBatch, setEditedBatch] = useState({
    numberOfEggsHatched: '',
    hatchingDate: new Date().toISOString().substring(0, 10), // Initialize with current date
    notes: '',
    batchNumber: '', // Initialize empty
    numberOfEggs: 0, // Initialize with 0
    type: type || '', // Initialize with the provided type or empty string
  });

  // Update editedBatch when batch or type prop changes
  useEffect(() => {
    if (batch) {
      setEditedBatch({
        ...editedBatch,
        batchNumber: batch.batchNumber,
        numberOfEggs: batch.numberOfEggs,
        type: batch.type || '', // Update type when type prop changes
      });
    }
  }, [batch, type]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBatch({ ...editedBatch, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/hatched-eggs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBatch),
      });

      if (!response.ok) {
        throw new Error('Failed to record hatched eggs');
      }

      // Reset form fields
      setEditedBatch({
        numberOfEggsHatched: '',
        hatchingDate: new Date().toISOString().substring(0, 10), // Reset to current date
        notes: '',
        batchNumber: '', // Reset batchNumber
        numberOfEggs: 0, // Reset numberOfEggs
        type: type || '', // Reset type
      });

      // Trigger parent onSave callback (to refetch data or update UI)
      onSave();

      // Close the modal
      toggleModal();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Record Hatched Eggs for Batch {editedBatch.batchNumber}</ModalHeader>
      <ModalBody>
      <FormGroup>
          <Label for="type">Type</Label>
          <Input
            type="text"
            name="type"
            id="type"
            value={editedBatch.type}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="batchNumber">Batch Number</Label>
          <Input
            type="text"
            name="batchNumber"
            id="batchNumber"
            value={editedBatch.batchNumber}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="numberOfEggs">Number of Eggs Loaded</Label>
          <Input
            type="number"
            name="numberOfEggs"
            id="numberOfEggs"
            value={editedBatch.numberOfEggs}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="numberOfEggsHatched">Number of Eggs Hatched</Label>
          <Input
            type="number"
            name="numberOfEggsHatched"
            id="numberOfEggsHatched"
            value={editedBatch.numberOfEggsHatched}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="hatchingDate">Hatching Date</Label>
          <Input
            type="date"
            name="hatchingDate"
            id="hatchingDate"
            value={editedBatch.hatchingDate}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="notes">Notes</Label>
          <Input
            type="textarea"
            name="notes"
            id="notes"
            value={editedBatch.notes}
            onChange={handleInputChange}
          />
        </FormGroup>
       
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>Save</Button>{' '}
        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default HatchEggsModal;
