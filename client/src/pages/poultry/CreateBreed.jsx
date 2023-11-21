
import React, { useState } from 'react';

const CreateBreed = () => {
  const [breedData, setBreedData] = useState({
    name: '',
    description: '',
    averageLifespan: '',
    averageEggsPerYear: '',
    colorVarieties: '',
    origin: '',
    size: '',
  });
  const [alertMessage, setAlertMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBreedData({ ...breedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/create-breed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(breedData),
      });
      if (response.ok) {
        setAlertMessage({ type: 'success', text: 'Poultry breed created successfully' });
        // Reset form after success
        setBreedData({
          name: '',
          description: '',
          averageLifespan: '',
          averageEggsPerYear: '',
          colorVarieties: '',
          origin: '',
          size: '',
        });
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/poultry-dashboard';
        }, 2000);
      } else {
        const errorData = await response.json();
        setAlertMessage({ type: 'error', text: errorData.message });
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage({ type: 'error', text: 'Internal server error' });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Poultry Breed</h2>
      {alertMessage && (
        <div className={`alert alert-${alertMessage.type} mt-3`} role="alert">
          {alertMessage.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Breed Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={breedData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={breedData.description}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="averageLifespan" className="form-label">
                Average Lifespan
              </label>
              <input
                type="text"
                className="form-control"
                id="averageLifespan"
                name="averageLifespan"
                value={breedData.averageLifespan}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="averageEggsPerYear" className="form-label">
                Average Eggs Per Year
              </label>
              <input
                type="text"
                className="form-control"
                id="averageEggsPerYear"
                name="averageEggsPerYear"
                value={breedData.averageEggsPerYear}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="colorVarieties" className="form-label">
                Color Varieties
              </label>
              <input
                type="text"
                className="form-control"
                id="colorVarieties"
                name="colorVarieties"
                value={breedData.colorVarieties}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="origin" className="form-label">
                Origin
              </label>
              <input
                type="text"
                className="form-control"
                id="origin"
                name="origin"
                value={breedData.origin}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="size" className="form-label">
                Size
              </label>
              <input
                type="text"
                className="form-control"
                id="size"
                name="size"
                value={breedData.size}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Breed
        </button>
      </form>
    </div>
  );
};

export default CreateBreed;