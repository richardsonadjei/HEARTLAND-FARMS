import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AllAnimalsReport = () => {
  const defaultType = 'Pig';
  const [animalIdentities, setAnimalIdentities] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    fetchAnimalIdentities(defaultType);
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchAnimalIdentities = async (type) => {
    try {
      const response = await fetch(`/api/all-animal-by-type?type=${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch animal identities');
      }
      let data = await response.json();
      setAnimalIdentities(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = (animal) => {
    setSelectedAnimal(animal);
    toggleEditModal();
  };

  const handleDelete = async (animal) => {
    try {
      const response = await fetch(`/api/delete-animal-id/${animal._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete animal');
      }
      // Remove the deleted animal from the state
      setAnimalIdentities(animalIdentities.filter((a) => a._id !== animal._id));
      // Close the delete modal
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
      // Handle error message
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Implement logic to save changes in the edit modal
      const response = await fetch(`/api/update-animal-id/${selectedAnimal._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedAnimal), // Assuming selectedAnimal contains updated data
      });
      
      if (!response.ok) {
        throw new Error('Failed to update animal data');
      }
      
      // Assuming the response contains the updated animal data
      const updatedAnimal = await response.json();
      
      // Update the local state with the updated animal data
      const updatedAnimalIdentities = animalIdentities.map(animal =>
        animal._id === updatedAnimal._id ? updatedAnimal : animal
      );
      setAnimalIdentities(updatedAnimalIdentities);
  
      // Close the edit modal after successful update
      toggleEditModal();
    } catch (error) {
      console.error(error);
      // Handle error if failed to save changes
    }
  };

  return (
    <Container fluid>
      <h2 className="mt-4">All Animals</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Specie</th>
              <th>Breed</th>
              <th>Id Number</th>
              <th>Identity Tag</th>
              <th>Birth Date</th>
              <th>Current Age</th>
              <th>Gender</th>
              <th>Farm House Location</th>
              <th>Total</th>
              <th>Additional Details</th>
              <th>Recorded At</th>
              <th>Recorded By</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {animalIdentities.map((animal, index) => (
              <tr key={animal._id}>
                <td>{index + 1}</td>
                <td>{animal.type}</td>
                <td>{animal.specie}</td>
                <td>{animal.breed}</td>
                <td>{animal.identityNumber}</td>
                <td>{animal.identityTag}</td>
                <td>{new Date(animal.birthDate).toLocaleDateString('en-US')}</td>
                <td>{animal.currentAge}</td>
                <td>{animal.gender}</td>
                <td>{animal.farmHouseLocation}</td>
                <td>{animal.total}</td>
                <td>{animal.additionalDetails}</td>
                <td>{new Date(animal.createdAt).toLocaleString()}</td>
                <td>{animal.createdBy}</td>
                <td>{animal.isActive ? 'Yes' : 'No'}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={() => handleEdit(animal)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={() => { setSelectedAnimal(animal); toggleDeleteModal(); }} style={{ cursor: 'pointer', marginRight: '10px' }} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
          <tr>
  <td colSpan="16" style={{ fontWeight: 'bold', color: 'purple' }}>
    Total Animals: {animalIdentities.length}
  </td>
</tr>

          </tfoot>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Animal Identity</ModalHeader>
        {selectedAnimal && (
          <form>
            <div className="form-group">
              <label htmlFor="editType">Type</label>
              <input type="text" className="form-control" id="editType" value={selectedAnimal.type} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editSpecie">Specie</label>
              <input type="text" className="form-control" id="editSpecie" value={selectedAnimal.specie} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editBreed">Breed</label>
              <input type="text" className="form-control" id="editBreed" value={selectedAnimal.breed} onChange={(e) => setSelectedAnimal({ ...selectedAnimal, breed: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editIdentityNumber">Identity Number</label>
              <input type="text" className="form-control" id="editIdentityNumber" value={selectedAnimal.identityNumber} onChange={(e) => setSelectedAnimal({ ...selectedAnimal, identityNumber: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editIdentityTag">Identity Tag</label>
              <input type="text" className="form-control" id="editIdentityTag" value={selectedAnimal.identityTag} onChange={(e) => setSelectedAnimal({ ...selectedAnimal, identityTag: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editBirthDate">Birth Date</label>
              <input type="text" className="form-control" id="editBirthDate" value={selectedAnimal.birthDate} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editCurrentAge">Current Age</label>
              <input type="text" className="form-control" id="editCurrentAge" value={selectedAnimal.currentAge} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editGender">Gender</label>
              <input type="text" className="form-control" id="editGender" value={selectedAnimal.gender} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editFarmHouseLocation">Farm House Location</label>
              <input type="text" className="form-control" id="editFarmHouseLocation" value={selectedAnimal.farmHouseLocation} onChange={(e) => setSelectedAnimal({ ...selectedAnimal, farmHouseLocation: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editTotal">Total</label>
              <input type="number" className="form-control" id="editTotal" value={selectedAnimal.total} onChange={(e) => setSelectedAnimal({ ...selectedAnimal, total: parseInt(e.target.value) })} />
            </div>
            <div className="form-group">
              <label htmlFor="editAdditionalDetails">Additional Details</label>
              <textarea className="form-control" id="editAdditionalDetails" rows="3" value={selectedAnimal.additionalDetails} onChange={(e) => setSelectedAnimal({ ...selectedAnimal, additionalDetails: e.target.value })}></textarea>
            </div>
            <div className="form-group">
             
            <label htmlFor="editIsActive">Active</label>
            <select className="form-control" id="editIsActive" value={selectedAnimal.isActive} onChange={(e) => setSelectedAnimal({ ...selectedAnimal, isActive: e.target.value })}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </form>
      )}

        <ModalFooter>
          <Button color="primary" onClick={handleSaveChanges}>Save Changes</Button>
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this record?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(selectedAnimal)}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllAnimalsReport;
