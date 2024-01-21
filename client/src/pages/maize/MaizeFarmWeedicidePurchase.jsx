import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const MaizeFarmWeedicidePurchase = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    batchNumber: null,
    date: '',
    amountSpent: '',
    recordedBy: currentUser ? currentUser.userName : '',
  });

  const [message, setMessage] = useState(null);
  const [maizeSeasons, setMaizeSeasons] = useState([]);

  useEffect(() => {
    // Fetch maize seasons to populate the dropdown
    const fetchMaizeSeasons = async () => {
      try {
        const response = await fetch('/api/all-maize-seasons');
        if (!response.ok) {
          throw new Error('Error fetching maize seasons');
        }

        const data = await response.json();
        setMaizeSeasons(data.maizeSeasons);
      } catch (error) {
        console.error(error);
        // Handle error fetching maize seasons
      }
    };

    fetchMaizeSeasons();
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

      const response = await fetch('/api/record-maize-weedicide-purchase', {
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
      setMessage('Maize weedicide purchase recorded successfully');

      // Clear the message after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setMessage(null);

        // Navigate the user to /maize-getting-started
        window.location.href = '/maize-getting-started';
      }, 3000);
    } catch (error) {
      console.error('Error recording maize weedicide purchase:', error);

      // Set error message
      setMessage(`Error recording maize weedicide purchase: ${error.message}`);

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
          <h2 className="mb-4 text-center">Purchase Maize Weedicide</h2>
          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
              {message}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="date">Date:</Label>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="amountSpent">Amount Spent:</Label>
                  <Input
                    type="number"
                    name="amountSpent"
                    id="amountSpent"
                    value={formData.amountSpent}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchNumber">Season Number:</Label>
                  <Select
                    name="batchNumber"
                    id="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleBatchNumberChange}
                    options={maizeSeasons.map((season) => ({
                      value: season.batchNumber,
                      label: season.batchNumber,
                    }))}
                    isSearchable
                    placeholder="Select Season Number"
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="recordedBy">Recorded By:</Label>
                  <Input
                    type="text"
                    name="recordedBy"
                    id="recordedBy"
                    value={formData.recordedBy}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit">Record Weedicide Purchase</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MaizeFarmWeedicidePurchase;
