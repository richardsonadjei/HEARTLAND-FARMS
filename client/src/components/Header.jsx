import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBell, FaUserCircle } from 'react-icons/fa';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const poultryResponse = await fetch('/api/birds-due-for-vaccination');
        const guineaFowlResponse = await fetch('/api/guinea-fowls-due-for-vaccination');
        const poultryData = await poultryResponse.json();
        const guineaFowlData = await guineaFowlResponse.json();

        const combinedNotifications = [
          ...poultryData.notifications.map(notification => ({ ...notification, category: 'poultry' })),
          ...guineaFowlData.notifications.map(notification => ({ ...notification, category: 'guineaFowl' })),
        ];

        setNotifications(combinedNotifications);
        setNotificationCount(combinedNotifications.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const filterNotificationsByCategory = (category) => {
    return notifications.filter((notification) => notification.category === category);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/home">
          HeartLand Farms
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-white"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Birds
              </Link>
              <div className="dropdown-menu" aria-labelledby="birdsDropdown">
                {(currentUser && (currentUser.category === 'poultry' || currentUser.category === 'all')) && (
                  <>
                    <Link className="dropdown-item" to="/poultry-dashboard">
                      Poultry
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="/guinea-fowl-getting-started">
                      Guinea Fowl
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="#">
                      Duck
                    </Link>
                    {/* Add more bird items as needed */}
                  </>
                )}
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-white"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Animal Farming
              </Link>
              <div className="dropdown-menu" aria-labelledby="animalFarmingDropdown">
                {(currentUser && (currentUser.category === 'goats' || currentUser.category === 'sheep' || currentUser.category === 'cattle' || currentUser.category === 'all')) && (
                  <>
                    <Link className="dropdown-item" to="/pig-farm-dashboard">
                      Pig Farm
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="/goats">
                      Goats
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="/sheep">
                      Sheep
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="/cattle">
                      Cattle
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="/rabbit">
                      Rabbit
                    </Link>
                    {/* Add more animal farming items as needed */}
                  </>
                )}
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-white"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Crop Farming
              </Link>
              <div className="dropdown-menu" aria-labelledby="cropFarmingDropdown">
                {(currentUser && (currentUser.category === 'cassava' || currentUser.category === 'maize' || currentUser.category === 'plantain' || currentUser.category === 'beans' || currentUser.category === 'all')) && (
                  <>
                    <Link className="dropdown-item" to="/cassava-farm">
                      Cassava
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="/maize-farm">
                      Maize
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="/plantain-farm">
                      Plantain
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="/soya-beans-farm">
                      Soya Beans
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="/vegetables-farm">
                      Vegetables
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="/cocoa-farm">
                      Cocoa
                    </Link>
                    {/* Add more crop farming items as needed */}
                  </>
                )}
              </div>
            </li>
          </ul>

          <div className="dropdown text-end mx-auto">
            <Link
              className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              to="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaBell size={24} />
              {notificationCount > 0 && <span className="badge bg-danger">{notificationCount}</span>}
            </Link>
            <ul className="dropdown-menu text-small">
              {/* Poultry Notifications */}
              <li>
                <span className="dropdown-item font-weight-bold" style={{ color: 'green' }}>Poultry Notifications</span>
                {filterNotificationsByCategory('poultry').map((notification, index) => (
                  <span key={index} className="dropdown-item" onClick={() =>
                    (window.location.href = `/record-vaccination?batchNumber=${notification.batchNumber}&breed=${notification.breed}&ageInDays=${notification.ageInDays}&vaccinationDue=${notification.vaccinationDue}`)
                  }>
                    <strong>Guinea Fowl</strong> with batch number {notification.batchNumber} is due for {notification.vaccinationDue} vaccination at {notification.ageInDays} days old.
                  </span>
                ))}
              </li>
              {/* Guinea-Fowl Notifications */}
              <li>
                <span className="dropdown-item font-weight-bold" style={{ color: 'blue' }}>Guinea Fowl Notifications</span>
                {filterNotificationsByCategory('guineaFowl').map((notification, index) => (
                  <span key={index} className="dropdown-item" onClick={() =>
                    (window.location.href = `/record-guinea-fowl-vaccination?batchNumber=${notification.batchNumber}&ageInDays=${notification.ageInDays}&vaccinationDue=${notification.vaccinationDue}`)
                  }>
                    <strong>Guinea Fowl</strong> with batch number {notification.batchNumber} is due for {notification.vaccinationDue} vaccination at {notification.ageInDays} days old.
                  </span>
                ))}
              </li>
              {/* Add more categories as needed */}
              {notifications.length === 0 && (
                <li>
                  <span className="dropdown-item">No notifications</span>
                </li>
              )}
            </ul>
          </div>

          <div className="dropdown text-end mx-auto">
            {currentUser ? (
              <Link
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle text-white"
                to="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentUser.userName}
                <FaUserCircle size={32} />
              </Link>
            ) : (
              <Link className="d-block link-body-emphasis text-decoration-none" to="/sign-in">
                Sign In
              </Link>
            )}
            <ul className="dropdown-menu text-small">
              <li>
                <Link className="dropdown-item" to="/sign-out">
                  Sign Out
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              {currentUser && currentUser.role === 'admin' && (
                <li>
                  <Link className="dropdown-item" to="/sign-up">
                    Create A New User
                  </Link>
                </li>
              )}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
