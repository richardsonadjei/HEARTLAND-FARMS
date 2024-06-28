import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'; // Adjust imports as per your UI library
import { useSelector } from 'react-redux';

const AllUsers = () => {
  const { currentUser } = useSelector((state) => state.user); // Assuming you have currentUser state in Redux

  const [users, setUsers] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedUserName, setEditedUserName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [editedRole, setEditedRole] = useState([]);
  const [editedCategories, setEditedCategories] = useState([]);

  const [allCategories, setAllCategories] = useState([
    'birds',
    'animal',
    'crop',
    'hatchery',
  ]); // Array of all possible categories

  const [filterCategory, setFilterCategory] = useState('all'); // State for filtering by category

  useEffect(() => {
    fetchData();
  }, [filterCategory]); // Refetch data when filterCategory changes

  const fetchData = async () => {
    try {
      let url = '/api/users';
      if (filterCategory !== 'all') {
        url += `?category=${filterCategory}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const toggleEditModal = () => {
    setModalEdit(!modalEdit);
  };

  const toggleDeleteModal = () => {
    setModalDelete(!modalDelete);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedFirstName(user.firstName);
    setEditedLastName(user.lastName);
    setEditedUserName(user.userName);
    setEditedEmail(user.email);
    setEditedPhoneNumber(user.phoneNumber);
    setEditedRole(user.role); // Set role from user object
    setEditedCategories(user.categories); // Set categories from user object
    toggleEditModal();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/${selectedUser._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      toggleDeleteModal();
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: editedFirstName,
          lastName: editedLastName,
          userName: editedUserName,
          email: editedEmail,
          phoneNumber: editedPhoneNumber,
          role: editedRole, // Send edited role array
          categories: editedCategories, // Send edited categories array
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      toggleEditModal();
      fetchData();
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    const categories = selectedOptions.map(option => option.value);
    setEditedCategories(categories);
  };

  const handleRoleChange = (selectedOptions) => {
    const roles = selectedOptions.map(option => option.value);
    setEditedRole(roles);
  };

  return (
    <Container>
      <h1 style={{ textAlign: 'center', color: 'blue' }}>All Users</h1>

      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role.join(', ')}</td> {/* Display roles as comma-separated */}
              <td>{user.categories.join(', ')}</td> {/* Display categories as comma-separated */}
              <td>
                <RiEdit2Line
                  size={20}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                  onClick={() => handleEdit(user)}
                />
                {currentUser.role === 'admin' && (
                  <RiDeleteBin6Line
                    size={20}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedUser(user);
                      toggleDeleteModal();
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalEdit} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit User</ModalHeader>
        <ModalBody>
          <label>First Name</label>
          <input
            type="text"
            value={editedFirstName}
            onChange={(e) => setEditedFirstName(e.target.value)}
            className="form-control"
          />
          <label>Last Name</label>
          <input
            type="text"
            value={editedLastName}
            onChange={(e) => setEditedLastName(e.target.value)}
            className="form-control"
          />
          <label>User Name</label>
          <input
            type="text"
            value={editedUserName}
            onChange={(e) => setEditedUserName(e.target.value)}
            className="form-control"
          />
          <label>Email</label>
          <input
            type="email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            className="form-control"
          />
          <label>Phone Number</label>
          <input
            type="text"
            value={editedPhoneNumber}
            onChange={(e) => setEditedPhoneNumber(e.target.value)}
            className="form-control"
          />
          <label>Role</label>
          <select
            value={editedRole}
            onChange={(e) => handleRoleChange(Array.from(e.target.selectedOptions))}
            multiple
            className="form-control"
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
            <option value="finance">Finance</option>
            <option value="human-resource">Human Resource</option>
          </select>
          <label>Categories</label>
          <select
            value={editedCategories}
            onChange={(e) => handleCategoryChange(Array.from(e.target.selectedOptions))}
            multiple
            className="form-control"
          >
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveEdit}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={toggleEditModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this user?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>{' '}
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllUsers;
