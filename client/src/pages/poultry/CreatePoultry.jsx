import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CreatePoultry = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    quantity: 0,
    breed: '',
    color: '',
    createdBy: currentUser ? currentUser.userName : '',
    arrivalDate: '',
    age: '',
    farmSection: '',
  });

  const [breeds, setBreeds] = useState([]);
  const [farmSections, setFarmSections] = useState([]);

  useEffect(() => {
    // Fetch farm sections when the component mounts
    const fetchFarmSections = async () => {
      try {
        const response = await fetch('/api/all-sections');
        const data = await response.json();
        setFarmSections(data);
      } catch (error) {
        console.error('Error fetching farm sections:', error);
      }
    };

    // Fetch breeds when the component mounts
    const fetchBreeds = async () => {
      try {
        const response = await fetch('/api/all-breeds');
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    fetchFarmSections();
    fetchBreeds();
  }, []);

  useEffect(() => {
    // Calculate age when the component mounts or arrivalDate changes
    calculateAge();
  }, [formData.arrivalDate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Calculate age whenever arrivalDate changes
    if (e.target.name === 'arrivalDate') {
      calculateAge();
    }
  };

  const calculateAge = () => {
    const currentDate = new Date();
    const arrivalDate = new Date(formData.arrivalDate);

    const ageInMilliseconds = currentDate - arrivalDate;
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    const ageInMonths = Math.floor(ageInDays / 30);

    // Set the age property in the format "X months Y days"
    setFormData((prevFormData) => ({
      ...prevFormData,
      age: `${ageInMonths} months ${ageInDays % 30} days`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server to create a new batch of poultry
      const response = await fetch('/api/create-birds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed (e.g., show a success message)
      const data = await response.json();

      setSuccessMessage('Batch created successfully');
      // Clear the form after successful submission
      setFormData({
        quantity: 0,
        breed: '',
        color: '',
        createdBy: currentUser ? currentUser.userName : '',
        arrivalDate: '',
        age: '',
        farmSection: '',
      });
      // Hide success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);

      // Redirect to /poultry-dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = '/poultry-dashboard';
      }, 2000);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error creating batch:', error);
      setErrorMessage('Error creating batch');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Create New Poultry Batch</h2>
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="breed" className="form-label">
                      Breed
                    </label>
                    <select
                      className="form-select"
                      id="breed"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Breed
                      </option>
                      {breeds.map((breed) => (
                        <option key={breed._id} value={breed.name}>
                          {breed.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="color" className="form-label">
                      Color
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="createdBy" className="form-label">
                      Created By
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="createdBy"
                      name="createdBy"
                      value={formData.createdBy}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="arrivalDate" className="form-label">
                      Arrival Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="arrivalDate"
                      name="arrivalDate"
                      value={formData.arrivalDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                      Age
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="age"
                      name="age"
                      value={formData.age}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="farmSection" className="form-label">
              Farm Section
            </label>
            <select
  className="form-select"
  id="farmSection"
  name="farmSection"
  value={formData.farmSection}
  onChange={handleChange}
>
  <option value="" disabled>
    Select Farm Section
  </option>
  {farmSections.map((section) => (
    <option key={section._id} value={section.sectionName}>
      {section.sectionName}
    </option>
  ))}
</select>

          </div>
        </div>
      </div>
              {/* Add other input fields similarly */}
              <button type="submit" className="btn btn-primary">
                Create Batch
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoultry;
