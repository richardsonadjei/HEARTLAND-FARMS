import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userCategory = currentUser ? currentUser.category : '';

  return (
    <div className="welcome-content" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 align-self-center">
            <h1>Digitizing agriculture.</h1>
            <p>We craft farm management software that empowers and enriches farmers, promoting eco-friendly agriculture for a sustainable planet.</p>
          </div>
          <div className="offset-lg-1 col-lg-5 col-md-12 col-sm-12 col-xs-12 align-self-center">
            <div className="apps">
              <div className="container-fluid">
                <div className="row">
                  {/* App icons */}
                  {(userCategory === 'poultry' || userCategory === 'all') && (
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2 mx-2">
                      <a href="/poultry" className="app-item">
                        <div className="icon mb-3">
                          <img className="img-fluid lazy" alt="" src="https://www.bivatec.com/assets/images/icons/apps/my_poultry_manager_new_1.png" />
                        </div>
                      </a>
                    </div>
                  )}
                  {(userCategory === 'animal' || userCategory === 'all') && (
                    <>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2 mx-2">
                        <a href="#" className="app-item">
                          <div className="icon mb-3">
                            <img className="img-fluid lazy" alt="" src="https://www.bivatec.com/assets/images/icons/apps/my_piggery_manager_new_1.png" />
                          </div>
                        </a>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2 mx-2">
                        <a href="#" className="app-item">
                          <div className="icon mb-3">
                            <img className="img-fluid lazy" alt="" src="https://www.bivatec.com/assets/images/icons/apps/my_goat_manager_new_1.png" />
                          </div>
                        </a>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2 mx-2">
                        <a href="#" className="app-item">
                          <div className="icon mb-3">
                            <img className="img-fluid lazy" alt="" src="https://www.bivatec.com/assets/images/icons/apps/my_cattle_manager_new_1.png" />
                          </div>
                        </a>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2 mx-2">
                        <a href="#" className="app-item">
                          <div className="icon mb-3">
                            <img className="img-fluid lazy" alt="" src="https://www.bivatec.com/assets/images/icons/apps/my_sheep_manager.png" />
                          </div>
                        </a>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2 mx-2">
                        <a href="#" className="app-item">
                          <div className="icon mb-3">
                            <img className="img-fluid lazy" alt="" src="https://www.bivatec.com/assets/images/icons/apps/my_fish_manager_new_1.png" />
                          </div>
                        </a>
                      </div>
                    </>
                  )}
                  {(userCategory === 'crop' || userCategory === 'all') && (
                    <>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2 mx-2">
                        <a href="#" className="app-item">
                          <div className="icon mb-3">
                            <img className="img-fluid lazy" alt="" src="https://www.bivatec.com/assets/images/icons/apps/my_crop_manager_new_1.png" />
                          </div>
                        </a>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2 mx-2">
                        <a href="#" className="app-item">
                          <div className="icon mb-3">
                            <img className="img-fluid lazy" alt="" src="https://www.bivatec.com/assets/images/icons/apps/farmers_wallet_new_1.png" />
                          </div>
                        </a>
                      </div>
                    </>
                  )}
                  {/* Add other app icons similarly */}
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
