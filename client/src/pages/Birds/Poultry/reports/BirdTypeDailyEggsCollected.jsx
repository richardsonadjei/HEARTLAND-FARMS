import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const defaultType = 'Poultry';

const BirdTypeDailyEggsCollected = () => {
  const [eggsCollected, setEggsCollected] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEgg, setSelectedEgg] = useState(null);

  useEffect(() => {
    fetchEggsCollectedByType();
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchEggsCollectedByType = async () => {
    try {
      const response = await fetch(`/api/eggs-collected-today/${defaultType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch eggs collected for the specified type');
      }
      const data = await response.json();
      setEggsCollected(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = (egg) => {
    setSelectedEgg(egg);
    toggleEditModal();
  };

  const handleDelete = async (egg) => {
    try {
      const response = await fetch(`/api/delete-egg/${egg._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete egg');
      }
      setEggsCollected(eggsCollected.filter(item => item._id !== egg._id));
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/update-egg/${selectedEgg._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedEgg),
      });

      if (!response.ok) {
        throw new Error('Failed to update egg');
      }

      const updatedEgg = await response.json();
      setEggsCollected(eggsCollected.map(item => (item._id === updatedEgg._id ? updatedEgg : item)));
      toggleEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  const calculateSummary = (eggs, category) => {
    return eggs.filter(egg => egg.category === category).reduce((acc, egg) => {
      acc.totalCrates += egg.crates;
      acc.totalLoose += egg.loose;
      return acc;
    }, { totalCrates: 0, totalLoose: 0 });
  };

  const calculateSortedSummary = (eggs) => {
    const sizes = ['small', 'medium', 'large', 'extraLarge'];
    const summary = sizes.reduce((acc, size) => {
      acc[size] = { totalCrates: 0, totalLoose: 0 };
      return acc;
    }, {});

    eggs.filter(egg => egg.category === 'sorted').forEach(egg => {
      if (summary[egg.size]) {
        summary[egg.size].totalCrates += egg.crates;
        summary[egg.size].totalLoose += egg.loose;
      }
    });

    return summary;
  };

  const unsortedSummary = calculateSummary(eggsCollected, 'unsorted');
  const sortedSummary = calculateSortedSummary(eggsCollected);

  return (
    <Container fluid>
      <h2 className="mt-4">Eggs Collected Today ({defaultType})</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {eggsCollected.length > 0 ? (
        <div className="table-responsive">
          <Table bordered striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Farm Section</th>
                <th>Date</th>
                <th>Size</th>
                <th>Crates</th>
                <th>Loose</th>
                <th>Category</th>
                <th>Grading</th>
                <th>Recorded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {eggsCollected.map((egg, index) => (
                <tr key={egg._id}>
                  <td>{index + 1}</td>
                  <td>{egg.type}</td>
                  <td>{egg.farmSection}</td>
                  <td>{new Date(egg.date).toLocaleDateString()}</td>
                  <td>{egg.size}</td>
                  <td>{egg.crates}</td>
                  <td>{egg.loose}</td>
                  <td>{egg.category}</td>
                  <td>{egg.grading}</td>
                  <td>{egg.recordedBy}</td>
                  <td>
                    <RiPencilLine color="blue" size={24} onClick={() => handleEdit(egg)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <RiDeleteBinLine color="red" size={24} onClick={() => { setSelectedEgg(egg); toggleDeleteModal(); }} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>No eggs collected today for {defaultType}</p>
      )}

      {/* Summary table for unsorted eggs */}
      <h3 className="mt-4">Unsorted Eggs Summary</h3>
      <Table bordered striped>
        <thead>
          <tr>
            <th>Total Crates</th>
            <th>Total Loose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{unsortedSummary.totalCrates}</td>
            <td>{unsortedSummary.totalLoose}</td>
          </tr>
        </tbody>
      </Table>

      {/* Summary table for sorted eggs */}
      <h3 className="mt-4">Sorted Eggs Summary</h3>
      <Table bordered striped>
        <thead>
          <tr>
            <th>Size</th>
            <th>Total Crates</th>
            <th>Total Loose</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(sortedSummary).map(size => (
            <tr key={size}>
              <td>{size}</td>
              <td>{sortedSummary[size].totalCrates}</td>
              <td>{sortedSummary[size].totalLoose}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Egg Record</ModalHeader>
        {selectedEgg && (
          <ModalBody>
            {/* Edit form fields for egg record */}
            <div className="form-group">
              <label>Type</label>
              <input
                type="text"
                className="form-control"
                value={selectedEgg.type}
                onChange={(e) => setSelectedEgg({ ...selectedEgg, type: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Farm Section</label>
              <input
                type="text"
                className="form-control"
                value={selectedEgg.farmSection}
                onChange={(e) => setSelectedEgg({ ...selectedEgg, farmSection: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                value={new Date(selectedEgg.date).toISOString().substring(0, 10)}
                onChange={(e) => setSelectedEgg({ ...selectedEgg, date: new Date(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label>Size</label>
              <input
                type="text"
                className="form-control"
                value={selectedEgg.size}
                onChange={(e) => setSelectedEgg({ ...selectedEgg, size: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Crates</label>
              <input
                type="number"
                className="form-control"
                value={selectedEgg.crates}
                onChange={(e) => setSelectedEgg({ ...selectedEgg, crates: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Loose</label>
              <input
                type="number"
                className="form-control"
                value={selectedEgg.loose}
                onChange={(e) => setSelectedEgg({ ...selectedEgg, loose: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                value={selectedEgg.category}
                onChange={(e) => setSelectedEgg({ ...selectedEgg, category: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Grading</label>
              <input
                type="text"
                className="form-control"
                value={selectedEgg.grading}
                onChange={(e) => setSelectedEgg({ ...selectedEgg, grading: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Recorded By</label>
              <input
                type="text"
                className="form-control"
                value={selectedEgg.recordedBy}
                onChange={(e) => setSelectedEgg({ ...selectedEgg, recordedBy: e.target.value })}
              />
            </div>
          </ModalBody>
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
          Are you sure you want to delete this egg record?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(selectedEgg)}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default BirdTypeDailyEggsCollected;
