import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AllAnimalSalesByTypeReport = () => {
  const defaultType = 'Goat';
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [animalSales, setAnimalSales] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      fetchAnimalSales(defaultType, startDate, endDate);
    }
  }, [startDate, endDate]);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchAnimalSales = async (type, startDate, endDate) => {
    try {
      const response = await fetch(`/api/animal-sales?type=${type}&startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch animal sales');
      }
      const data = await response.json();
      setAnimalSales(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = (sale) => {
    setSelectedSale(sale);
    toggleEditModal();
  };

  const handleDelete = async (sale) => {
    try {
      const response = await fetch(`/api/animal-sales/${sale._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete animal sale');
      }
      setAnimalSales(animalSales.filter((s) => s._id !== sale._id));
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
      // Handle error message
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Implement logic to save changes in the edit modal
      // Assuming selectedSale contains updated data
      const response = await fetch(`/api/animal-sales/${selectedSale._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedSale),
      });

      if (!response.ok) {
        throw new Error('Failed to update animal sale data');
      }

      // Assuming the response contains the updated sale data
      const updatedSale = await response.json();

      // Update the local state with the updated sale data
      const updatedAnimalSales = animalSales.map(sale =>
        sale._id === updatedSale._id ? updatedSale : sale
      );
      setAnimalSales(updatedAnimalSales);

      // Close the edit modal after successful update
      toggleEditModal();
    } catch (error) {
      console.error(error);
      // Handle error if failed to save changes
    }
  };

  return (
    <Container fluid>
      <h2 className="mt-4">All Animal Sales</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="mb-4">
        <label htmlFor="startDate" className="mr-3">Start Date: </label>
        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label htmlFor="endDate" className="ml-3 mr-3">End Date: </label>
        <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <Button className="ml-3" color="primary" onClick={() => fetchAnimalSales(defaultType, startDate, endDate)}>Filter</Button>
      </div>
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Sale Date</th>
              <th>Buyer Name</th>
              <th>Buyer Contact</th>
              <th>Sale Price</th>
              
              <th>Sales Number</th>
              <th>Notes</th>
              <th>Recorded By</th>
              <th>Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {animalSales.map((sale, index) => (
              <tr key={sale._id}>
                <td>{index + 1}</td>
                <td>{new Date(sale.saleDate).toLocaleDateString('en-US')}</td>
                <td>{sale.buyerName}</td>
                <td>{sale.buyerContact}</td>
                <td>{sale.salePrice}</td>
                
                <td>{sale.salesNumber}</td>
                <td>{sale.notes}</td>
                <td>{sale.recordedBy}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={() => handleEdit(sale)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={() => handleDelete(sale)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Animal Sale</ModalHeader>
        {selectedSale && (
          <form>
            <div className="form-group">
              <label htmlFor="editSaleDate">Sale Date</label>
              <input type="date" className="form-control" id="editSaleDate" value={selectedSale.saleDate} onChange={(e) => setSelectedSale({ ...selectedSale, saleDate: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editBuyerName">Buyer Name</label>
              <input type="text" className="form-control" id="editBuyerName" value={selectedSale.buyerName} onChange={(e) => setSelectedSale({ ...selectedSale, buyerName: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editBuyerContact">Buyer Contact</label>
              <input type="text" className="form-control" id="editBuyerContact" value={selectedSale.buyerContact} onChange={(e) => setSelectedSale({ ...selectedSale, buyerContact: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editSalePrice">Sale Price</label>
              <input type="number" className="form-control" id="editSalePrice" value={selectedSale.salePrice} onChange={(e) => setSelectedSale({ ...selectedSale, salePrice: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editRecordedBy">Recorded By</label>
              <input type="text" className="form-control" id="editRecordedBy" value={selectedSale.recordedBy} onChange={(e) => setSelectedSale({ ...selectedSale, recordedBy: e.target.value })} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="editSalesNumber">Sales Number</label>
              <input type="text" className="form-control" id="editSalesNumber" value={selectedSale.salesNumber} onChange={(e) => setSelectedSale({ ...selectedSale, salesNumber: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editNotes">Notes</label>
              <textarea className="form-control" id="editNotes" rows="3" value={selectedSale.notes} onChange={(e) => setSelectedSale({ ...selectedSale, notes: e.target.value })}></textarea>
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
          <Button color="danger" onClick={() => handleDelete(selectedSale)}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllAnimalSalesByTypeReport;
