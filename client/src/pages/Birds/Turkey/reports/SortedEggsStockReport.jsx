import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const BirdSortedEggsStockReport = () => {
  const defaultType = 'Turkey';
  const [sortedEggStock, setSortedEggStock] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEggStock, setSelectedEggStock] = useState(null);

  useEffect(() => {
    fetchSortedEggStock();
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchSortedEggStock = async () => {
    try {
      const response = await fetch(`/api/sorted-eggs-stock/${defaultType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sorted egg stock');
      }
      const data = await response.json();
      setSortedEggStock(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = (eggStock) => {
    setSelectedEggStock(eggStock);
    toggleEditModal();
  };

  const handleDelete = async (eggStock) => {
    try {
      const response = await fetch(`/api/delete-sorted-egg-stock/${eggStock._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete egg stock');
      }
      setSortedEggStock(null);
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/update-sorted-egg-stock/${selectedEggStock._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedEggStock),
      });

      if (!response.ok) {
        throw new Error('Failed to update egg stock');
      }

      const updatedEggStock = await response.json();
      setSortedEggStock(updatedEggStock);
      toggleEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalCrates = () => {
    return Object.values(sortedEggStock.sizes).reduce((total, stock) => total + stock.crates, 0);
  };

  const calculateTotalLoose = () => {
    return Object.values(sortedEggStock.sizes).reduce((total, stock) => total + stock.loose, 0);
  };

  return (
    <Container fluid>
      <h2 className="mt-4">Sorted Eggs Stock Report</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {sortedEggStock ? (
        <div className="table-responsive">
          <Table bordered striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Size</th>
                <th>Crates</th>
                <th>Loose</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(sortedEggStock.sizes).map(([size, stock], index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{size}</td>
                  <td>{stock.crates}</td>
                  <td>{stock.loose}</td>
                  <td>
                    <RiPencilLine color="blue" size={24} onClick={() => handleEdit(sortedEggStock)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <RiDeleteBinLine color="red" size={24} onClick={() => { setSelectedEggStock(sortedEggStock); toggleDeleteModal(); }} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="mt-4">
            <h5>Totals</h5>
            <Table bordered striped>
              <tbody>
                <tr>
                  <td>Total Crates</td>
                  <td>{calculateTotalCrates()}</td>
                </tr>
                <tr>
                  <td>Total Loose</td>
                  <td>{calculateTotalLoose()}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <p>No sorted egg stock available</p>
      )}

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Sorted Egg Stock</ModalHeader>
        {selectedEggStock && (
          <ModalBody>
            {/* Edit form fields for sorted egg stock */}
            {/* Example: */}
            <div className="form-group">
              <label>Type</label>
              <input
                type="text"
                className="form-control"
                value={selectedEggStock.type}
                onChange={(e) => setSelectedEggStock({ ...selectedEggStock, type: e.target.value })}
                disabled
              />
            </div>
            {/* Add fields for size, crates, loose as necessary */}
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
          Are you sure you want to delete this sorted egg stock?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(selectedEggStock)}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default BirdSortedEggsStockReport;
