import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const PurchaseFeed = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [feedCategories, setFeedCategories] = useState([]); // Added feedCategories state
  const [suppliers, setSuppliers] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    feedName: '',
    supplier: '',
    manufactureDate: '',
    expiryDate: '',
    quantityPurchased: '',
    weightPerBag: '',
    costPerBag: '',
    paymentMethod: '',
    bankName: '',
    paidInBy: '',
    accountNumber: '',
    bankTransactionId: '',
    recipientName: '',
    momoNumber: '',
    transactionID: '',
    category: '',
    description: '',
    feedCategory: '', // New: feed category field
    purchasedBy: currentUser ? currentUser.userName : '',
  });

  useEffect(() => {
    // Fetch categories from /api/all-categories
    fetch('/api/all-categories')
      .then(response => response.json())
      .then(data => setCategories(data.data))
      .catch(error => console.error('Error fetching categories:', error));

    // Fetch feed categories from /api/all-feed-categories
    fetch('/api/all-feed-category')
      .then(response => response.json())
      .then(data => setFeedCategories(data.data))
      .catch(error => console.error('Error fetching feed categories:', error));

    // Fetch suppliers from /api/suppliers
    fetch('/api/suppliers')
      .then(response => response.json())
      .then(data => setSuppliers(data.data))
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const {
      feedName,
      supplier,
      manufactureDate,
      expiryDate,
      quantityPurchased,
      weightPerBag,
      costPerBag,
      paymentMethod,
      bankName,
      paidInBy,
      accountNumber,
      bankTransactionId,
      recipientName,
      momoNumber,
      transactionID,
      category,
      description,
      feedCategory, // Include feedCategory
      purchasedBy,
    } = formData;
  
    // Check if required fields are not empty
    if (
      !feedName ||
      !quantityPurchased ||
      !weightPerBag ||
      !costPerBag ||
      !paymentMethod ||
      !purchasedBy
    ) {
      console.error('Required fields are missing');
      return;
    }
  
    // Construct the request body
    const requestBody = {
      feedName,
      supplier,
      manufactureDate,
      expiryDate,
      quantityPurchased,
      weightPerBag,
      costPerBag,
      paymentMethod,
      bankTransactionDetails: {
        bankName,
        paidInBy,
        accountNumber,
        transactionId: bankTransactionId,
      },
      momoTransactionDetails: {
        recipientName,
        momoNumber,
        transactionId: transactionID,
      },
      category,
      description,
      feedCategory,
      purchasedBy,
    };
  
    console.log('Request Body:', requestBody);
    // Use the formData state to send data to the server
    fetch('/api/feed-purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response as needed
        console.log('Form submission response:', data);
      })
      .catch(error => console.error('Error submitting form:', error));
  };
  
  
  return (
    <Container>
      <h2>Purchase Feed</h2>
      <Form onSubmit={handleSubmit}>
      <Row>
  <Col md={6}>
    <FormGroup>
      <Label for="feedName">Feed Name</Label>
      <Input
        type="text"
        name="feedName"
        id="feedName"
        value={formData.feedName}
        onChange={handleInputChange}
      />
    </FormGroup>
    
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="supplier">Supplier</Label>
      <Input
        type="select"
        name="supplier"
        id="supplier"
        value={formData.supplier}
        onChange={handleInputChange}
      >
        <option value="" disabled>Select Supplier</option>
        {suppliers.map(supplier => (
          <option key={supplier._id} value={supplier.SupplierName}>
            {supplier.SupplierName}
          </option>
        ))}
      </Input>
    </FormGroup>
  </Col>
</Row>
<Row>
  <Col md={6}>
    <FormGroup>
      <Label for="manufactureDate">Manufacture Date</Label>
      <Input
        type="date"
        name="manufactureDate"
        id="manufactureDate"
        value={formData.manufactureDate}
        onChange={handleInputChange}
      />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="expiryDate">Expiry Date</Label>
      <Input
        type="date"
        name="expiryDate"
        id="expiryDate"
        value={formData.expiryDate}
        onChange={handleInputChange}
      />
    </FormGroup>
  </Col>
</Row>

<Row>
  <Col md={6}>
    <FormGroup>
      <Label for="quantityPurchased">Quantity Purchased</Label>
      <Input
        type="number"
        name="quantityPurchased"
        id="quantityPurchased"
        value={formData.quantityPurchased}
        onChange={handleInputChange}
      />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="weightPerBag">Weight Per Bag</Label>
      <Input
        type="text"
        name="weightPerBag"
        id="weightPerBag"
        value={formData.weightPerBag}
        onChange={handleInputChange}
      />
    </FormGroup>
  </Col>
</Row>

<Row>
  <Col md={6}>
    <FormGroup>
      <Label for="costPerBag">Cost Per Bag</Label>
      <Input
        type="number"
        name="costPerBag"
        id="costPerBag"
        value={formData.costPerBag}
        onChange={handleInputChange}
      />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="paymentMethod">Payment Method</Label>
      <Input
        type="select"
        name="paymentMethod"
        id="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleInputChange}
      >
        <option value="" disabled>Select Payment Method</option>
        <option value="Cash">Cash</option>
        <option value="Bank Transaction">Bank Transaction</option>
        <option value="Momo">Momo</option>
      </Input>
    </FormGroup>
  </Col>
</Row>

{/* Bank Transaction Details */}
{formData.paymentMethod === 'Bank Transaction' && (
  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="bankName">Bank Name</Label>
        <Input
          type="text"
          name="bankName"
          id="bankName"
          value={formData.bankName}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="paidInBy">Paid In By</Label>
        <Input
          type="text"
          name="paidInBy"
          id="paidInBy"
          value={formData.paidInBy}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="accountNumber">Account Number</Label>
        <Input
          type="text"
          name="accountNumber"
          id="accountNumber"
          value={formData.accountNumber}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="bankTransactionId">Transaction ID</Label>
        <Input
          type="text"
          name="bankTransactionId"
          id="bankTransactionId"
          value={formData.bankTransactionId}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
  </Row>
)}

{/* Momo Transaction Details */}
{formData.paymentMethod=== 'Momo' && (
  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="recipientName">Recipient Name</Label>
        <Input
          type="text"
          name="recipientName"
          id="recipientName"
          value={formData.recipientName}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="momoNumber">Momo Number</Label>
        <Input
          type="text"
          name="momoNumber"
          id="momoNumber"
          value={formData.momoNumber}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="transactionID">Transaction ID</Label>
        <Input
          type="text"
          name="transactionID"
          id="transactionID"
          value={formData.transactionID}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
  </Row>
)}

{/* Expense Category */}
<Row>
  <Col md={6}>
    <FormGroup>
      <Label for="category">Expense Category</Label>
      <Input
        type="select"
        name="category"
        id="category"
        value={formData.category}
        onChange={handleInputChange}
      >
        <option value="" disabled>Select Category</option>
        {categories.map(category => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </Input>
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="description">Description</Label>
      <Input
        type="textarea"
        name="description"
        id="description"
        value={formData.description}
        onChange={handleInputChange}
      />
    </FormGroup>
  </Col>
  <Row>
  <Col md={6}>
    <FormGroup>
      <Label for="purchasedBy">Purchased By</Label>
      <input
        type="text"
        className="form-control"
        id="purchasedBy"
        name="purchasedBy"
        value={formData.purchasedBy}
        onChange={handleInputChange}
        readOnly
      />
    </FormGroup>
  </Col>
  <Col md={6}>
  <FormGroup>
              <Label for="feedCategory">Feed Category</Label>
              <Input
                type="select"
                name="feedCategory"
                id="feedCategory"
                value={formData.feedCategory}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select Feed Category</option>
                {feedCategories.map(feedCategory => (
                  <option key={feedCategory._id} value={feedCategory.name}>
                    {feedCategory.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
  </Col>
</Row>

</Row>

<Button color="primary" type="submit">Submit</Button>
</Form>
</Container>

  );
};

export default PurchaseFeed;
