import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const RegisterPartner = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [nextOfKin, setNextOfKin] = useState('');
  const [partnershipDate, setPartnershipDate] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          nextOfKin,
          partnershipDate,
          additionalInformation,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to register partner');
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Redirect after 1 second
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Register New Partner</h1>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">Partner registered successfully. Redirecting...</p>}
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="nextOfKin">Next of Kin</Label>
                  <Input
                    type="textarea"
                    id="nextOfKin"
                    value={nextOfKin}
                    onChange={(e) => setNextOfKin(e.target.value)}
                    required
                    placeholder="Enter Next Of Kin's Name, Contact And Address If Any"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="partnershipDate">Partnership Date</Label>
                  <Input
                    type="date"
                    id="partnershipDate"
                    value={partnershipDate}
                    onChange={(e) => setPartnershipDate(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="additionalInformation">Additional Information</Label>
                  <Input
                    type="textarea"
                    id="additionalInformation"
                    value={additionalInformation}
                    onChange={(e) => setAdditionalInformation(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" color="primary">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPartner;
