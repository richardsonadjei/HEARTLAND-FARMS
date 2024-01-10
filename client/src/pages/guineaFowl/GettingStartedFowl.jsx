import React, { useState, useEffect } from 'react';

const GuineaFowl = () => {
  const [sortedEggStock, setSortedEggStock] = useState({});
  const [unsortedEggStock, setUnsortedEggStock] = useState({});
  const [birdQuantitySum, setBirdQuantitySum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sorted egg stock
        const sortedEggResponse = await fetch('/api/current-sorted-guineaFowl-egg-stock');
        const sortedEggData = await sortedEggResponse.json();
        setSortedEggStock(sortedEggData);
  
        // Fetch unsorted egg stock
        const unsortedEggResponse = await fetch('/api/current-unsorted-guineaFowl-egg-stock');
        const unsortedEggData = await unsortedEggResponse.json();
        setUnsortedEggStock(unsortedEggData);
  
       // Fetch sum of bird quantities from all-guinea-fowl
const birdQuantityResponse = await fetch('/api/all-guinea-fowl');
const birdQuantityData = await birdQuantityResponse.json();



if (Array.isArray(birdQuantityData) && birdQuantityData.length > 0) {
  // Check the structure of the array
  const batchData = birdQuantityData[0].data || birdQuantityData;

  // Sum up the quantity from each batch
  const sum = batchData.reduce((total, batch) => total + batch.quantity, 0);
  setBirdQuantitySum(sum);
} else {
  console.error('Error: Invalid response from bird quantity endpoint.');
}

  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};
  
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    background: `url("../../../public/images/Guinea-fowl-bg.jpg") no-repeat center center fixed`,
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    padding: '20px',
  };

  const cardsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '20px',
  };

  const cardStyle = {
    flex: '1',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '300px', // Optional: Set a maximum width for each card
    animation: 'fadeInUp 1s ease-out', // Add fadeInUp animation
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow effect
    opacity: '0.9', // Add transparency
  };

  const sortedEggCardStyle = {
    ...cardStyle,
    background: 'linear-gradient(to bottom right, #87CEEB, #4682B4)',
    fontSize: '1rem', 
     // Gradient for sorted eggs
  };

  const unsortedEggCardStyle = {
    ...cardStyle,
    background: 'lightgreen',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center',
    color: 'black', 
    fontSize: '1.5rem', // Center the content vertically
  };

  const birdQuantityCardStyle = {
    ...cardStyle,
    background: 'lightcoral',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign:'center',
    justifyContent: 'center',
    fontSize: '2.5rem', // Increase font size
    fontWeight: 'bold', // Bold text
    color: 'darkred', // Change font color
  };

  return (
    <div style={containerStyle}>
      <h1 className="text-uppercase">Guinea Fowl Management </h1>
      <h2>Guinea Fowl Management And Record Keeping System</h2>

      <div style={cardsContainerStyle}>
        {/* Sorted Egg Stock Card */}
        <div style={sortedEggCardStyle}>
          <h3>Sorted Egg Stock</h3>
          <p style={{ color: 'navy' }}>Small Crates: {sortedEggStock?.data?.sizesInCrates?.small}</p>
          <p style={{ color: 'royalblue' }}>Medium Crates: {sortedEggStock?.data?.sizesInCrates?.medium}</p>
          <p style={{ color: 'blue' }}>Large Crates: {sortedEggStock?.data?.sizesInCrates?.large}</p>
          <p style={{ color: 'white' }}>Extra Large Crates: {sortedEggStock?.data?.sizesInCrates?.extraLarge}</p>
        </div>

        {/* Unsorted Egg Stock Card */}
        <div style={unsortedEggCardStyle}>
  <h3>Unsorted Egg Stock</h3>
  <p style={{ textAlign: 'center' }}>Crates: {unsortedEggStock?.data?.currentStockInCrates?.crates}</p>
  <p style={{ textAlign: 'center' }}>Loose: {unsortedEggStock?.data?.currentStockInCrates?.loose}</p>
</div>

        {/* Bird Quantity Sum Card */}
        <div style={birdQuantityCardStyle}>
          <h3>Total Birds In The Farm</h3>
          <p>{birdQuantitySum}</p>
        </div>
      </div>

      <div className="button-group mt-4">
        <a href="/guinea-fowl-dashboard" className="btn btn-primary" style={{ fontSize: '1.5rem' }}>
          Get Started
        </a>
      </div>
    </div>
  );
};

export default GuineaFowl;
