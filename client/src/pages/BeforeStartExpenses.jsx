import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const BeforeStartExpenses = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amountSpent: '',
    recordedBy: currentUser ? currentUser.userName : '',
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform validation on the form fields here if needed

      const response = await fetch('/api/add-beforeStartExpenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // Set success message
      setMessage('Before Start Expense recorded successfully');

      // Clear the message after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setMessage(null);

        // Navigate the user to /before-start-expenses
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      console.error('Error recording Before Start Expense:', error);

      // Set error message
      setMessage(`Error recording Before Start Expense: ${error.message}`);

      // Clear the error message after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setMessage(null);

        // Refresh the page
        window.location.reload();
      }, 4000);
    }
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h2 className="mb-4 text-center">Record Before Start Expense</h2>
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
            <FormGroup>
              <Label for="description">Description:</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Row form>
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
            <Button type="submit">Record Before Start Expense</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BeforeStartExpenses;
