import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/user/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [userName, setUserName] = useState(currentUser.userName);
  const [email, setEmail] = useState(currentUser.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const response = await fetch(`/api/user/update/${currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(updateUserSuccess(updatedUser));
        console.log('User profile updated:', updatedUser);
      } else {
        const errorData = await response.json();
        dispatch(updateUserFailure(errorData.message));
        console.error('Error updating user profile:', errorData);
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Profile</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <input
                type="text"
                className="form-control"
                id="role"
                name="role"
                value={currentUser.role}
                readOnly
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </form>
          <div className="mt-3">
            <button className="btn btn-danger me-2">Delete Account</button>
          </div>
          <button className="btn btn-secondary mt-3">Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
