import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const PurchaseFeed = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [feedOptions, setFeedOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);

  const [formData, setFormData] = useState({
    feedName: '',
    supplier: '',
    manufactureDate: '',
    expiryDate: '',
    weightPerBag: '',
    quantityPurchased: 0,
    costPerBag: 0,
    paymentMethod: '',
    bankTransactionDetails: {
      bankName: '',
      paidInBy: '',
      accountNumber: '',
      transactionId: ''
    },
    momoTransactionDetails: {
      recipientName: '',
      momoNumber: '',
      transactionId: ''
    },
    purchasedBy: currentUser ? currentUser.userName : '',
    totalWeight: 0,
    totalCost: 0,
    type: '',
    batchNumber: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchFeedOptions();
    fetchTypeOptions();
  }, []);

  useEffect(() => {
    if (formData.type) {
      fetchBatchNumberOptions(formData.type);
    }
  }, [formData.type]);

  const fetchFeedOptions = async () => {
    try {
      const response = await fetch('/api/feed-names');
      if (!response.ok) {
        throw new Error('Failed to fetch feed options');
      }
      const feeds = await response.json();
      const sortedFeeds = feeds.sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedFeeds.map((feed) => ({ value: feed.name, label: feed.name }));
      setFeedOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchTypeOptions = async () => {
    try {
      const response = await fetch('/api/all-birds-types');
      if (!response.ok) {
        throw new Error('Failed to fetch bird types');
      }
      const types = await response.json();
      const sortedTypes = types.sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedTypes.map((type) => ({ value: type.name, label: type.name }));
      setTypeOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchBatchNumberOptions = async (selectedType) => {
    try {
      const response = await fetch('/api/all-bird-batches');
      if (!response.ok) {
        throw new Error('Failed to fetch batch numbers');
      }
      const batches = await response.json();
      const filteredBatches = batches.filter(batch => batch.type === selectedType);
      const options = filteredBatches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber }));
      setBatchNumberOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption.value });
  };

  const handleInputChangeText = (e, field) => {
    if (field.includes('.')) {
      const [mainField, subField] = field.split('.');
      setFormData({
        ...formData,
        [mainField]: {
          ...formData[mainField],
          [subField]: e.target.value
        }
      });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { quantityPurchased, weightPerBag, costPerBag } = formData;
    const updatedFormData = {
      ...formData,
      totalWeight: quantityPurchased * parseFloat(weightPerBag),
      totalCost: costPerBag * quantityPurchased,
    };
    setFormData(updatedFormData);
    try {
      const response = await fetch('/api/purchase-feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
      if (!response.ok) {
        throw new Error('Failed to create feed purchase record');
      }
      setSuccessMessage('Feed purchase record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Purchase Feed</h1>
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="feedName">Feed Name</Label>
              <Select
                id="feedName"
                options={feedOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'feedName')}
                isSearchable
                placeholder="Select Feed Name"
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="supplier">Supplier</Label>
              <Input
                type="textarea"
                id="supplier"
                value={formData.supplier}
                onChange={(e) => handleInputChangeText(e, 'supplier')}
                placeholder='Please Enter The Supplier Name And Contact'
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="manufactureDate">Manufacture Date</Label>
              <Input
                type="date"
                id="manufactureDate"
                value={formData.manufactureDate}
                onChange={(e) => handleInputChangeText(e, 'manufactureDate')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="expiryDate">Expiry Date</Label>
              <Input
                type="date"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => handleInputChangeText(e, 'expiryDate')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="weightPerBag">Weight Per Bag (kg)</Label>
              <Input
                type="text"
                id="weightPerBag"
                value={formData.weightPerBag}
                onChange={(e) => handleInputChangeText(e, 'weightPerBag')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="quantityPurchased">Quantity Purchased</Label>
              <Input
                type="number"
                id="quantityPurchased"
                value={formData.quantityPurchased}
                onChange={(e) => handleInputChangeText(e, 'quantityPurchased')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="costPerBag">Cost Per Bag</Label>
              <Input
                type="number"
                id="costPerBag"
                value={formData.costPerBag}
                onChange={(e) => handleInputChangeText(e, 'costPerBag')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="paymentMethod">Payment Method</Label>
              <Input
                type="select"
                id="paymentMethod"
                value={formData.paymentMethod}
                onChange={(e) => handleInputChangeText(e, 'paymentMethod')}
                required
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Bank Transaction">Bank Transaction</option>
                <option value="Momo">Momo</option>
              </Input>
            </FormGroup>
          </Col>
          {formData.paymentMethod === 'Bank Transaction' && (
            <>
              <Col md={6}>
                <FormGroup>
                  <Label for="bankName">Bank Name</Label>
                  <Input
                    type="text"
                    id="bankName"
                    value={formData.bankTransactionDetails.bankName}
                    onChange={(e) => handleInputChangeText(e, 'bankTransactionDetails.bankName')}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="paidInBy">Paid In By</Label>
                  <Input
                    type="text"
                    id="paidInBy"
                    value={formData.bankTransactionDetails.paidInBy}
                    onChange={(e) => handleInputChangeText(e, 'bankTransactionDetails.paidInBy')}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="accountNumber">Account Number</Label>
                  <Input
                    type="text"
                    id="accountNumber"
                    value={formData.bankTransactionDetails.accountNumber}
                    onChange={(e) => handleInputChangeText(e, 'bankTransactionDetails.accountNumber')}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="transactionId">Transaction ID</Label>
                  <Input
                    type="text"
                    id="transactionId"
                    value={formData.bankTransactionDetails.transactionId}
                    onChange={(e) => handleInputChangeText(e, 'bankTransactionDetails.transactionId')}
                  />
                </FormGroup>
              </Col>
            </>
          )}
          {formData.paymentMethod === 'Momo' && (
            <>
              <Col md={6}>
                <FormGroup>
                  <Label for="recipientName">Recipient Name</Label>
                  <Input
                    type="text"
                    id="recipientName"
                    value={formData.momoTransactionDetails.recipientName}
                    onChange={(e) => handleInputChangeText(e, 'momoTransactionDetails.recipientName')}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="momoNumber">Momo Number</Label>
                  <Input
                    type="text"
                    id="momoNumber"
                    value={formData.momoTransactionDetails.momoNumber}
                    onChange={(e) => handleInputChangeText(e, 'momoTransactionDetails.momoNumber')}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="transactionId">Transaction ID</Label>
                  <Input
                    type="text"
                    id="transactionId"
                    value={formData.momoTransactionDetails.transactionId}
                    onChange={(e) => handleInputChangeText(e, 'momoTransactionDetails.transactionId')}
                  />
                </FormGroup>
              </Col>
            </>
          )}
          <Col md={6}>
            <FormGroup>
              <Label for="type">Bird Type</Label>
              <Select
                id="type"
                options={typeOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'type')}
                isSearchable
                placeholder="Select Type"
              />
            </FormGroup>
          </Col>
          {formData.type && formData.type !== 'All-Birds' && (
            <Col md={6}>
              <FormGroup>
                <Label for="batchNumber">Batch Number</Label>
                <Select
                  id="batchNumber"
                  options={batchNumberOptions}
                  onChange={(selectedOption) => handleInputChange(selectedOption, 'batchNumber')}
                  isSearchable
                  placeholder="Select Batch Number"
                />
              </FormGroup>
            </Col>
          )}
          <Col md={12}>
            <FormGroup>
              <Label for="purchasedBy">Purchased By</Label>
              <Input
                type="text"
                id="purchasedBy"
                value={formData.purchasedBy}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default PurchaseFeed;
