import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userCategory = currentUser ? currentUser.category : '';

  const appItems = [
    { category: ['poultry', 'all'], href: '/poultry', iconSrc: 'https://www.bivatec.com/assets/images/icons/apps/my_poultry_manager_new_1.png' },
    { category: ['poultry', 'all'], href: '/guinea-fowl-getting-started', iconSrc: '../../public/images/guinea-fowl-icon.png' },
    { category: ['animal', 'all'], href: '/pig-farm-dashboard', iconSrc: 'https://www.bivatec.com/assets/images/icons/apps/my_piggery_manager_new_1.png' },
    { category: ['animal', 'all'], href: '#', iconSrc: 'https://www.bivatec.com/assets/images/icons/apps/my_goat_manager_new_1.png' },
    { category: ['animal', 'all'], href: '#', iconSrc: 'https://www.bivatec.com/assets/images/icons/apps/my_cattle_manager_new_1.png' },
    { category: ['animal', 'all'], href: '#', iconSrc: 'https://www.bivatec.com/assets/images/icons/apps/my_sheep_manager.png' },
    { category: ['animal', 'all'], href: '#', iconSrc: 'https://www.bivatec.com/assets/images/icons/apps/my_fish_manager_new_1.png' },
    { category: ['crop', 'all'], href: '#', iconSrc: 'https://www.bivatec.com/assets/images/icons/apps/my_crop_manager_new_1.png' },
  ,
    { category: ['crop', 'all'], href: '/cassava-getting-started', iconSrc: '../../public/images/cassava tree.jpg' },
    { category: ['crop', 'all'], href: '/maize-getting-started', iconSrc: '../../public/images/maize.png' },
    { category: ['crop', 'all'], href: '/poultry', iconSrc: '../../public/images/Okro.png' },
    { category: ['crop', 'all'], href: '/guinea-fowl-getting-started', iconSrc: '../../public/images/Beans.png' },
    { category: ['crop', 'all'], href: '/guinea-fowl-getting-started', iconSrc: '../../public/images/green pepper.jpg' },
    { category: ['crop', 'all'], href: '/guinea-fowl-getting-started', iconSrc: '../../public/images/palm tree.jpg' },
    { category: ['crop', 'all'], href: '/guinea-fowl-getting-started', iconSrc: '../../public/images/plantain.jpg' },
    // Add more app items as needed
  ];

  return (
    <div className="welcome-content">
      <div className="welcome-background"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 align-self-center">
            <h1>Digitizing agriculture.</h1>
            <p>Your OneStop Software For All Your Agricultural Needs</p>
          </div>
          <div className="offset-lg-1 col-lg-5 col-md-12 col-sm-12 col-xs-12 align-self-center">
            <div className="apps">
              <div className="container-fluid">
                <div className="row">
                  {appItems.map((app, index) => (
                    <div key={index} className="col-lg-2 col-md-2 col-sm-2 col-2 mx-2">
                      {(app.category.includes(userCategory) || app.category.includes('all')) && (
                        <a href={app.href} className="app-item">
                          <div className="icon mb-3" style={{ borderRadius: '10px' }}>
                            <img className="img-fluid lazy" alt="" src={app.iconSrc} style={{ borderRadius: 'inherit' }} />
                          </div>
                        </a>
                      )}
                    </div>
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
