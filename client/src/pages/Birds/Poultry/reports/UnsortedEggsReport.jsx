import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const PoultryUnsortedEggsStockReport = () => {
  const defaultType = 'Poultry';
  const [unsortedEggStock, setUnsortedEggStock] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEggStock, setSelectedEggStock] = useState(null);

  useEffect(() => {
    fetchUnsortedEggStock();
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchUnsortedEggStock = async () => {
    try {
      const response = await fetch(`/api/unsorted-eggs-stock/${defaultType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch unsorted egg stock');
      }
      const data = await response.json();
      setUnsortedEggStock(data);
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
      const response = await fetch(`/api/delete-unsorted-egg-stock/${eggStock._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete egg stock');
      }
      setUnsortedEggStock(null);
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/update-unsorted-egg-stock/${selectedEggStock._id}`, {
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
      setUnsortedEggStock(updatedEggStock);
      toggleEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalCrates = () => {
    return unsortedEggStock ? unsortedEggStock.crates : 0;
  };

  const calculateTotalLoose = () => {
    return unsortedEggStock ? unsortedEggStock.loose : 0;
  };

  return (
    <Container fluid>
      <h2 className="mt-4">Poultry Unsorted Eggs Stock Report</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {unsortedEggStock ? (
        <div className="table-responsive">
          <Table bordered striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Crates</th>
                <th>Loose</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{unsortedEggStock.crates}</td>
                <td>{unsortedEggStock.loose}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={() => handleEdit(unsortedEggStock)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={() => { setSelectedEggStock(unsortedEggStock); toggleDeleteModal(); }} style={{ cursor: 'pointer', marginRight: '10px' }} />
                </td>
              </tr>
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
        <p>No unsorted egg stock available</p>
      )}

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Unsorted Egg Stock</ModalHeader>
        {selectedEggStock && (
          <ModalBody>
            {/* Edit form fields for unsorted egg stock */}
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
            {/* Add fields for crates, loose as necessary */}
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
          Are you sure you want to delete this unsorted egg stock?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(selectedEggStock)}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default PoultryUnsortedEggsStockReport;
