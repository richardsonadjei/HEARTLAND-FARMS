import React, { useState, } from 'react';
import { useSelector } from 'react-redux';

const CreateFarmSection = () => {


  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    sectionName: '',
    description: '',
    capacity: 0,
    lighting: {
      bulbType: '',
      bulbCount: 0,
      bulbWattage: 0,
    },
    layingPoints: {
      layingPointType: '',
      quantity: 0,
    },
    feeders: {
      feederType: '',
      quantity: 0,
    },
    drinkers: {
      drinkerType: '',
      quantity: 0,
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLightingChange = (e) => {
    setFormData({
      ...formData,
      lighting: {
        ...formData.lighting,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleLayingPointsChange = (e) => {
    setFormData({
      ...formData,
      layingPoints: {
        ...formData.layingPoints,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleFeedersChange = (e) => {
    setFormData({
      ...formData,
      feeders: {
        ...formData.feeders,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleDrinkersChange = (e) => {
    setFormData({
      ...formData,
      drinkers: {
        ...formData.drinkers,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server to create a new farm section
      const response = await fetch('/api/farm-sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed (e.g., show a success message)
      const data = await response.json();

      setSuccessMessage('Farm section created successfully');
      // Clear the form after successful submission
      setFormData({
        sectionName: '',
        description: '',
        capacity: 0,
        lighting: {
          bulbType: '',
          bulbCount: 0,
          bulbWattage: 0,
        },
        layingPoints: {
          layingPointType: '',
          quantity: 0,
        },
        feeders: {
          feederType: '',
          quantity: 0,
        },
        drinkers: {
          drinkerType: '',
          quantity: 0,
        },
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
      console.error('Error creating farm section:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Create New Farm Section</h2>
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="sectionName" className="form-label fw-bold text-primary">
                  Section Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sectionName"
                  name="sectionName"
                  value={formData.sectionName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-bold text-primary">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="capacity" className="form-label fw-bold text-primary">
                  Capacity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                />
              </div>
              {/* Lighting */}
<div className="mb-3">
  <label className="form-label fw-bold text-primary">Lighting</label>
  <div className="row">
  <div className="col-md-4">
  <label htmlFor="bulbType" className="form-label fw-bold">
    Bulb Type
  </label>
  <select
    className="form-select"
    id="bulbType"
    name="bulbType"
    value={formData.lighting.bulbType}
    onChange={handleLightingChange}
  >
    <option value="" disabled>Select Bulb Type</option>
    <option value="Heat Bulb">Heat Bulb</option>
    <option value="Regular Bulb">Regular Bulb</option>
  </select>
</div>
    <div className="col-md-4">
      <label htmlFor="bulbCount" className="form-label fw-bold">
        Bulb Count
      </label>
      <input
        type="number"
        className="form-control"
        id="bulbCount"
        placeholder="Bulb Count"
        name="bulbCount"
        value={formData.lighting.bulbCount}
        onChange={handleLightingChange}
      />
    </div>
    <div className="col-md-4">
      <label htmlFor="bulbWattage" className="form-label fw-bold">
        Bulb Wattage
      </label>
      <input
        type="number"
        className="form-control"
        id="bulbWattage"
        placeholder="Bulb Wattage"
        name="bulbWattage"
        value={formData.lighting.bulbWattage}
        onChange={handleLightingChange}
      />
    </div>
  </div>
</div>

              {/* Laying Points */}
<div className="mb-3">
  <label className="form-label fw-bold text-primary">Laying Points</label>
  <div className="row">
    <div className="col-md-6">
      <label htmlFor="layingPointType" className="form-label fw-bold">
        Laying Point Type
      </label>
      <input
        type="text"
        className="form-control"
        id="layingPointType"
        name="layingPointType"
        value={formData.layingPoints.layingPointType}
        onChange={handleLayingPointsChange}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="layingPointsQuantity" className="form-label fw-bold">
        Quantity
      </label>
      <input
        type="number"
        className="form-control"
        id="layingPointsQuantity"
        name="quantity"
        value={formData.layingPoints.quantity}
        onChange={handleLayingPointsChange}
      />
    </div>
  </div>
</div>

{/* Feeders */}
<div className="mb-3">
  <label className="form-label fw-bold text-primary">Feeders</label>
  <div className="row">
    <div className="col-md-6">
      <label htmlFor="feederType" className="form-label fw-bold">
        Feeder Type
      </label>
      <input
        type="text"
        className="form-control"
        id="feederType"
        name="feederType"
        value={formData.feeders.feederType}
        onChange={handleFeedersChange}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="feedersQuantity" className="form-label fw-bold">
        Quantity
      </label>
      <input
        type="number"
        className="form-control"
        id="feedersQuantity"
        name="quantity"
        value={formData.feeders.quantity}
        onChange={handleFeedersChange}
      />
    </div>
  </div>
</div>

{/* Drinkers */}
<div className="mb-3">
  <label className="form-label fw-bold text-primary">Drinkers</label>
  <div className="row">
    <div className="col-md-6">
      <label htmlFor="drinkerType" className="form-label fw-bold">
        Drinker Type
      </label>
      <input
        type="text"
        className="form-control"
        id="drinkerType"
        name="drinkerType"
        value={formData.drinkers.drinkerType}
        onChange={handleDrinkersChange}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="drinkersQuantity" className="form-label fw-bold">
        Quantity
      </label>
      <input
        type="number"
        className="form-control"
        id="drinkersQuantity"
        name="quantity"
        value={formData.drinkers.quantity}
        onChange={handleDrinkersChange}
      />
    </div>
  </div>
</div>

              <button type="submit" className="btn btn-primary">
                Create Farm Section
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFarmSection;
