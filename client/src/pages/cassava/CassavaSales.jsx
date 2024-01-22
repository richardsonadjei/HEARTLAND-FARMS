import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const SellCassava = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    batchNumber: null,
    saleDate: '',
    unitPricePerSack: '',
    quantityOfSacksSold: '',
    soldBy: currentUser ? currentUser.userName : '',
  });

  const [message, setMessage] = useState(null);
  const [cassavaSeasons, setCassavaSeasons] = useState([]);

  useEffect(() => {
    // Fetch cassava seasons to populate the dropdown
    const fetchCassavaSeasons = async () => {
      try {
        const response = await fetch('/api/all-cassava-seasons');
        if (!response.ok) {
          throw new Error('Error fetching cassava seasons');
        }

        const data = await response.json();
        setCassavaSeasons(data.cassavaSeasons);
      } catch (error) {
        console.error(error);
        // Handle error fetching cassava seasons
      }
    };

    fetchCassavaSeasons();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBatchNumberChange = (selectedOption) => {
    setFormData({
      ...formData,
      batchNumber: selectedOption,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform validation on the form fields here if needed

      const payload = {
        ...formData,
        // Ensure batchNumber is included in the payload
        batchNumber: formData.batchNumber.value,
      };

      const response = await fetch('/api/record-cassava-sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // Set success message
      setMessage('Cassava sale recorded successfully');

      // Clear the message after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setMessage(null);

        // Navigate the user to the desired page
        // You can modify this according to your application flow
        window.location.href = '/cassava-getting-started';
      }, 3000);
    } catch (error) {
      console.error('Error recording cassava sale:', error);

      // Set error message
      setMessage(`Error recording cassava sale: ${error.message}`);

      // Clear the error message after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setMessage(null);

        // Refresh the page
        window.location.reload();
      }, 4000);
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#d3d3d3' : 'white',
      color: state.isFocused ? 'black' : 'black',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h2 className="mb-4 text-center">Record Cassava Sale</h2>
          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
              {message}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="saleDate">Sale Date:</Label>
                  <Input
                    type="date"
                    name="saleDate"
                    id="saleDate"
                    value={formData.saleDate}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="unitPricePerSack">Unit Price Per Sack:</Label>
                  <Input
                    type="number"
                    name="unitPricePerSack"
                    id="unitPricePerSack"
                    value={formData.unitPricePerSack}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="quantityOfSacksSold">Quantity of Sacks Sold:</Label>
                  <Input
                    type="number"
                    name="quantityOfSacksSold"
                    id="quantityOfSacksSold"
                    value={formData.quantityOfSacksSold}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchNumber">Batch Number:</Label>
                  <Select
                    name="batchNumber"
                    id="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleBatchNumberChange}
                    options={cassavaSeasons.map((season) => ({
                      value: season.batchNumber,
                      label: season.batchNumber,
                    }))}
                    isSearchable
                    placeholder="Select Batch Number"
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="soldBy">Sold By:</Label>
                  <Input
                    type="text"
                    name="soldBy"
                    id="soldBy"
                    value={formData.soldBy}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit">Record Cassava Sale</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SellCassava;
