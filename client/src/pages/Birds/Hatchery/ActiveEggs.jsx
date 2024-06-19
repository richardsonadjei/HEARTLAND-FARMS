import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import HatchEggsModal from './HatchEggs.modal'; // Import the HatchEggsModal component

const AllActiveEggBatches = () => {
  const [activeBatches, setActiveBatches] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [editedBatch, setEditedBatch] = useState({});
  const [highlightedBatches, setHighlightedBatches] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/active-egg-batches');
      if (!response.ok) {
        throw new Error('Failed to fetch active batches');
      }
      const data = await response.json();
      setActiveBatches(data);
      highlightBatches(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (batch) => {
    setSelectedBatch(batch);
    setEditedBatch(batch);
    toggleModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/egg-batches/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete egg batch');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/egg-batches/${editedBatch._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedBatch)
      });
      if (!response.ok) {
        throw new Error('Failed to save egg batch');
      }
      fetchData();
      toggleModal();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRecordHatchedEggs = (batch) => {
    setSelectedBatch(batch);
    toggleModal();
  };

  const groupAndSortBatches = (batches) => {
    const groupedBatches = batches.reduce((acc, batch) => {
      if (!acc[batch.type]) {
        acc[batch.type] = [];
      }
      acc[batch.type].push(batch);
      return acc;
    }, {});

    Object.keys(groupedBatches).forEach(type => {
      groupedBatches[type].sort((a, b) => {
        const ageA = parseInt(a.currentAge);
        const ageB = parseInt(b.currentAge);
        return ageB - ageA; // Decreasing order
      });
    });

    return groupedBatches;
  };

  const highlightBatches = (batches) => {
    const today = new Date();
    const highlighted = batches.map(batch => {
      const expectedHatchDate = new Date(batch.expectedHatchDate);
      const diffInDays = (expectedHatchDate - today) / (1000 * 60 * 60 * 24);
  
      if (diffInDays >= 7) {
        return { ...batch, highlightColor: 'deep-blue' };
      } else if (diffInDays >= 3) {
        return { ...batch, highlightColor: 'deep-yellow' };
      } else if (diffInDays >= 0) {
        return { ...batch, highlightColor: 'deep-green' };
      } else {
        return { ...batch, highlightColor: 'deep-red' };
      }
    });
  
    setHighlightedBatches(highlighted);
  };

  const groupedBatches = groupAndSortBatches(activeBatches);

  return (
    <Container>
      <h1>All Active Egg Batches</h1>
      {Object.keys(groupedBatches).map(type => (
        <div key={type}>
         <h2 style={{ color: 'blue', textAlign: 'center' }}>{type}</h2>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Batch Number</th>
                <th>Breed</th> {/* Add breed column */}
                <th>Date Loaded</th>
                <th>Number of Eggs</th>
                <th>Incubator ID</th>
                <th>Expected Hatch Date</th>
                <th>Status</th>
                <th>Current Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedBatches[type].map((batch, index) => (
                <tr key={batch._id} className={highlightedBatches.find(b => b._id === batch._id)?.highlightColor}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {batch.status === 'due' || batch.status === 'overdue' ? (
                      <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleRecordHatchedEggs(batch)}>
                        {batch.batchNumber}
                      </span>
                    ) : (
                      batch.batchNumber
                    )}
                  </td>
                  <td>{batch.breed}</td> {/* Display breed */}
                  <td>{new Date(batch.dateLoaded).toLocaleDateString()}</td>
                  <td>{batch.numberOfEggs}</td>
                  <td>{batch.incubatorId}</td>
                  <td>{new Date(batch.expectedHatchDate).toLocaleDateString()}</td>
                  <td>{batch.status}</td>
                  <td>{batch.currentAge}</td>
                  <td>
                    <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }} onClick={() => handleEdit(batch)} />
                    <RiDeleteBin6Line size={20} style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(batch._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Total Eggs:</td>
                <td>{groupedBatches[type].reduce((acc, batch) => acc + batch.numberOfEggs, 0)}</td>
                <td colSpan="5"></td>
              </tr>
            </tfoot>
          </Table>
        </div>
      ))}

      {/* Modal for recording hatched eggs */}
      <HatchEggsModal
        isOpen={modal}
        toggleModal={toggleModal}
        batch={selectedBatch}
        onSave={() => {
          fetchData(); // Refresh data after saving
          setSelectedBatch(null); // Clear selected batch after saving
        }}
      />
    </Container>
  );
};

export default AllActiveEggBatches;
