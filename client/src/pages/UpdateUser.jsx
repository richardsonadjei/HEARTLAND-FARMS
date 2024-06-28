import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { useSelector } from 'react-redux';

const UpdateUser = () => {
  const { currentUser } = useSelector((state) => state.user); // Get currentUser from Redux state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.userName); // Prefill username with current user's username
    }
  }, [currentUser]);

  const handleUpdateUser = async () => {
    try {
      const response = await fetch('/api/update-username-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update username and password');
      }

      // Determine the success message based on what was updated
      let successMessage = '';
      if (username && password) {
        successMessage = 'Username and password updated successfully';
      } else if (username) {
        successMessage = 'Username updated successfully';
      } else if (password) {
        successMessage = 'Password updated successfully';
      }

      // Show success message in popup alert
      window.alert(successMessage);

      // Redirect to sign-in page
      window.location.href = '/sign-in'; // Replace with your sign-in page URL

    } catch (error) {
      console.error('Error updating username and password:', error.message);
      window.alert('Failed to update username and password. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50">
        <h1 className="mt-5 mb-4 text-center">Update User</h1>
        <Form>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </FormGroup>
          <Button color="primary" block onClick={handleUpdateUser}>Update</Button>
        </Form>
      </div>
    </Container>
  );
};

export default UpdateUser;
