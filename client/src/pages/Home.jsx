import React from 'react';
import { useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userCategories = currentUser && currentUser.categories ? currentUser.categories : [];

  const appItems = [
    { category: ['crop'], href: '/cash-cropsHome-page', iconSrc: '/cashcrops.jpg', description: 'Cash Crops Home Page' },
    { category: ['crop'], href: '/vegesHome-page', iconSrc: '/veges.jpg', description: 'Vegetables Home Page' },
    { category: ['animal'], href: '/animals-home-page', iconSrc: '/animals.jpg', description: 'Animals Home Page' },
    { category: ['birds'], href: '/birds-home', iconSrc: '/birds.jpg', description: 'Birds Home Page' },
    { category: ['hatchery'], href: '/hatchery-home-page', iconSrc: '/hatchery.jpg', description: 'Hatchery Home Page' },
    // Add more app items as needed
  ];

  return (
    <div className="welcome-content">
      <div className="welcome-background"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 align-self-center text-center">
            <h1>MultiPurpose Farms</h1>
            <p>Aim: To Be The Best Farm In Volta Region</p>
          </div>
          <div className="offset-lg-1 col-lg-5 col-md-12 col-sm-12 col-xs-12 align-self-center">
            <div className="apps">
              <div className="container-fluid">
                <div className="row">
                  {appItems.map((app, index) => (
                    // Check if there's an overlap between user's categories and the app's categories
                    app.category.some(cat => userCategories.includes(cat)) && (
                      <div key={index} className="col-lg-2 col-md-2 col-sm-2 col-2 mx-2">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id={`tooltip-${index}`}>{app.description}</Tooltip>}
                        >
                          <a href={app.href} className="app-item">
                            <div className="icon mb-3" style={{ borderRadius: '10px' }}>
                              <img className="img-fluid lazy" alt="" src={app.iconSrc} style={{ borderRadius: 'inherit' }} />
                            </div>
                          </a>
                        </OverlayTrigger>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
