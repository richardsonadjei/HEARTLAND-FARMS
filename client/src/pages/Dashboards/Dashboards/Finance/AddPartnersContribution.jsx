import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const AddPartnerContribution = () => {
  const [partnerOptions, setPartnerOptions] = useState([]);
  const [formData, setFormData] = useState({
    contributions: [{ partnerName: '', amount: 0 }],
    date: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPartnerOptions();
  }, []);

  const fetchPartnerOptions = async () => {
    try {
      const response = await fetch('/api/partners');
      if (!response.ok) {
        throw new Error('Failed to fetch partners');
      }
      const partners = await response.json();
      const options = partners.map((partner) => ({
        value: `${partner.firstName} ${partner.lastName}`,
        label: `${partner.firstName} ${partner.lastName}`,
      }));
      setPartnerOptions(options);
    } catch (error) {
      console.error('Error fetching partners:', error.message);
    }
  };

  const handleInputChange = (selectedOption, index) => {
    const updatedContributions = [...formData.contributions];
    updatedContributions[index].partnerName = selectedOption.value;
    setFormData({ ...formData, contributions: updatedContributions });
  };

  const handleAmountChange = (e, index) => {
    const updatedContributions = [...formData.contributions];
    updatedContributions[index].amount = parseFloat(e.target.value);
    setFormData({ ...formData, contributions: updatedContributions });
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, date: e.target.value });
  };

  const handleAddContribution = () => {
    const newContribution = { partnerName: '', amount: 0 };
    setFormData({ ...formData, contributions: [...formData.contributions, newContribution] });
  };

  const handleRemoveContribution = (index) => {
    const updatedContributions = [...formData.contributions];
    updatedContributions.splice(index, 1);
    setFormData({ ...formData, contributions: updatedContributions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/partner-contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create partner contribution record');
      }
      setSuccessMessage('Partner contribution record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.href = '/accounts';
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
      <h1 className="mt-5 mb-4">Add Partner Contribution</h1>
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
       
        {formData.contributions.map((contribution, index) => (
          <div key={`contribution-${index}`} className="mb-3">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Partner</Label>
                  <Select
                    options={partnerOptions}
                    onChange={(selectedOption) => handleInputChange(selectedOption, index)}
                    value={partnerOptions.find((option) => option.value === contribution.partnerName)}
                    isSearchable
                    placeholder="Select Partner"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={contribution.amount}
                    onChange={(e) => handleAmountChange(e, index)}
                    placeholder="Enter Amount"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button
                  color="link"
                  onClick={() => handleRemoveContribution(index)}
                  className="p-0 text-danger ml-2"
                  title="Remove Contribution"
                >
                  <FaMinusCircle size={20} />
                </Button>
              </Col>
            </Row>
          </div>
        ))}
        <Button color="link" onClick={handleAddContribution} className="p-0 text-primary">
          <FaPlusCircle size={20} /> Add Partner's Contribution
        </Button>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleDateChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddPartnerContribution;
