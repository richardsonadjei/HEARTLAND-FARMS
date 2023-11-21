import React from 'react';
import { Link } from 'react-router-dom';

const StockTracking = () => {
  const cardData = [
  
    {
      id: 2,
      title: 'Receive New Day Old Chicks',
      image: '../../../public/images/dayold.jpeg',
      description: 'Receive New Batch Birds Into The Farm',
      link: '/create-poultry',
    },
    {
      id: 2,
      title: 'Update Existing Stock Of A Specific Batch',
      image: '../../../public/images/section.jpg',
      description: 'Take Stock Of Birds Available',
      link: '/add-birds',
    },
    {
      id: 2,
      title: 'Relocate Birds',
      image: '../../../public/images/relocation.jpeg',
      description: 'Relocate A Quantity of Birds From One Section To another',
      link: '/move-birds',
    },
    {
      id: 2,
      title: 'Take Stock',
      image: '../../../public/images/section.jpg',
      description: 'Take Stock Of Birds Available',
      link: '/product2',
    },
    // Add more card data as needed
  ];

  return (
    <div className="stock-tracking-container">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className="text-white">WELCOME TO THE STOCK TRACKING PAGE</h1>
        </div>
        {/* First Div: 2/3 width */}
        <div
          className="col-md-8 scrollable-content"
          style={{
            backgroundImage: 'url("https://example.com/background-image1.jpg")',
            backgroundSize: 'cover',
            overflowY: 'auto', // Make content scrollable
          }}
        >
          <div className="container">
            <div className="row">
              {cardData.map((card) => (
                <div key={card.id} className="col-md-6 mb-4">
                  <Link to={card.link} className="card-link" style={{ textDecoration: 'none' }}>
                    <div
                      className="card"
                      style={{
                        transition: 'transform 0.3s ease-in-out',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        width: '100%', // Set the width as needed
                        height: '100%', // Set the height as needed
                      }}
                    >
                      <img className="card-img-top" src={card.image} alt={card.title} />
                      <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text">{card.description}</p>
                     
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Div: 1/3 width */}
        <div
          className="col-md-4"
          style={{
            backgroundImage: 'url("https://example.com/background-image2.jpg")',
            backgroundSize: 'cover',
            minHeight: '100vh',
          }}
        >
          <h1>Notification And Task Area</h1>
        </div>
      </div>
    </div>
  );
};

export default StockTracking;
