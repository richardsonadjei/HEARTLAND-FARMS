import React from 'react';

const About = () => {
  return (
    <div className="welcome-content">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 align-self-center">
            <h1>Digitizing agriculture.</h1>
            <p>We craft farm management software that empowers and enriches farmers, promoting eco-friendly agriculture for a sustainable planet.</p>
            <div className="row" style={{ marginLeft: '5px' }}>
              <a className="btn-primary-line col-md-5 col-sm-12 download" href="https://play.google.com/store/apps/dev?id=6016224474518534712" style={{ background: 'green', color: 'white', marginTop: '10px' }}>Download for Android &nbsp;<i className="fa fa-android" style={{ fontSize: '1.5em' }}></i></a>
              <div className="col-md-1 col-sm-12"></div>
              <a className="btn-primary-line col-md-5 col-sm-12 download" href="https://apps.apple.com/us/developer/bivatec-ltd/id1695438250" style={{ width: 'auto', height: 'auto', background: '#FFAB00', color: 'white', border: '1px solid orange', marginTop: '10px' }}>Download for iPhone &nbsp;<i className="fa fa-apple" style={{ fontSize: '1.5em' }}></i></a>
            </div>
          </div>
          <div className="offset-lg-1 col-lg-5 col-md-12 col-sm-12 col-xs-12 align-self-center">
            <div className="apps">
              <div className="container-fluid">
                <div className="row">
                  {/* App icons */}
                  <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                    <a href="https://www.bivatec.com/apps/farmers-wallet" className="app-item">
                      <div className="icon">
                        <img className="img-fluid lazy" alt="" src="https://www.bivatec.com/assets/images/icons/apps/farmers_wallet_new_1.png" style={{ display: 'inline-block' }} />
                      </div>
                    </a>
                  </div>
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

export default About;
