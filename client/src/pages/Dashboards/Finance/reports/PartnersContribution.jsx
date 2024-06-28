import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllPartnerContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [editedPartnerName, setEditedPartnerName] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/partner-contributions');
      if (!response.ok) {
        throw new Error('Failed to fetch partner contributions');
      }
      const data = await response.json();
      setContributions(data);
    } catch (error) {
      console.error(error.message);
      setError('Failed to fetch partner contributions. Please try again later.');
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    setEditedPartnerName('');
    setEditedAmount('');
    setEditedDescription('');
    setError(null);
  };

  const handleEdit = (contribution) => {
    setSelectedContribution(contribution);
    setEditedPartnerName(contribution.partnerName);
    setEditedAmount(contribution.amount);
    setEditedDescription(contribution.description);
    toggleModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/partner-contributions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete partner contribution');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
      setError('Failed to delete partner contribution. Please try again later.');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/partner-contributions/${selectedContribution._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ partnerName: editedPartnerName, amount: editedAmount, description: editedDescription }),
      });
      if (!response.ok) {
        throw new Error('Failed to update partner contribution');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
      setError('Failed to update partner contribution. Please try again later.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/(\d)(st|nd|rd|th)/, '$1$2');
  };

  // Sort contributions by date in descending order
  const sortedContributions = [...contributions].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate total contributions per partner and overall sum
  const partnerTotals = {};
  let overallTotal = 0;

  contributions.forEach(contribution => {
    contribution.contributions.forEach(item => {
      if (!partnerTotals[item.partnerName]) {
        partnerTotals[item.partnerName] = 0;
      }
      partnerTotals[item.partnerName] += item.amount;
      overallTotal += item.amount;
    });
  });

  return (
    <Container>
      <h1>All Partner Contributions</h1>
      {error && <p className="text-danger">{error}</p>}
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Partner Name</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedContributions.map((contribution, index) => (
            <React.Fragment key={contribution._id}>
              {contribution.contributions.map((item, subIndex) => (
                <tr key={item._id}>
                  {subIndex === 0 && (
                    <>
                      <th scope="row" rowSpan={contribution.contributions.length}>{index + 1}</th>
                      <td rowSpan={contribution.contributions.length}>{formatDate(contribution.date)}</td>
                    </>
                  )}
                  <td>{item.partnerName}</td>
                  <td>{item.amount}</td>
                  {subIndex === 0 && (
                    <>
                      <td rowSpan={contribution.contributions.length}>{contribution.description}</td>
                      <td rowSpan={contribution.contributions.length}>
                        <RiEdit2Line
                          size={20}
                          style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }}
                          onClick={() => handleEdit(contribution)}
                        />
                        <RiDeleteBin6Line
                          size={20}
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDelete(contribution._id)}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <h2>Summary</h2>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>Partner Name</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(partnerTotals).map(([partnerName, totalAmount], index) => (
            <tr key={index}>
              <td>{partnerName}</td>
              <td>{totalAmount}</td>
            </tr>
          ))}
          <tr>
            <td><strong>Overall Total</strong></td>
            <td><strong>{overallTotal}</strong></td>
          </tr>
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Partner Contribution</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="editedPartnerName">Partner Name</Label>
              <Input
                type="text"
                id="editedPartnerName"
                value={editedPartnerName}
                onChange={(e) => setEditedPartnerName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedAmount">Amount</Label>
              <Input
                type="number"
                id="editedAmount"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedDescription">Description</Label>
              <Input
                type="textarea"
                id="editedDescription"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllPartnerContributions;
