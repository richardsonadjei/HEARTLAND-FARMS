import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBell } from 'react-icons/fa';



export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const userCategory = currentUser ? currentUser.category : '';
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/birds-due-for-vaccination'); 
        const data = await response.json();
        setNotifications(data.notifications);
        setNotificationCount(data.notifications.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg  sticky-top">
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
             {/* Mega Component: Birds */}
        <li className="nav-item dropdown">
          <div
            className="nav-link dropdown-toggle text-white"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Birds
          </div>
          <div className="dropdown-menu mega-menu poultry-menu" aria-labelledby="birdsDropdown">
            {(userCategory === 'poultry' || userCategory === 'all') && (
              <>
                {/* ... (your existing poultry links) */}
                <hr className="dropdown-divider" />
                {/* New Poultry Menu Items */}
                <ul>
                  <li>
                    <a className="dropdown-item" href="/poultry-dashboard">
                      Poultry
                    </a>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/add-birds">
                      Add Stock
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/view-all-stock">
                      View All Stock
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/view-batches">
                      View Batches
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a className="dropdown-item" href="#">
                     Guinea Fowl
                    </a>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/purchase-feed">
                      View Stock
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/view-all-feed">
                     Vaccinate
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a className="dropdown-item" href="#">
                      Duck
                    </a>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/vaccinate-birds">
                      View Stock
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/view-vaccination-history">
                      Vaccination Birds
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a className="dropdown-item" href="#">
                      Turkey
                    </a>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/vaccinate-birds">
                      View Stock
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/view-vaccination-history">
                      Vaccinate Birds
                    </Link>
                  </li>
                </ul>
                <hr className="dropdown-divider" />
              </>
            )}
          </div>
        </li>
            {/* Mega Component: Animal Farming */}
            <li className="nav-item dropdown ">
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
                {(userCategory === 'goats' || userCategory === 'sheep' || userCategory === 'cattle' || userCategory === 'all') && (
                  <>
                    <Link className="dropdown-item" to="/goats">
                      Goats
                    </Link>
                    <Link className="dropdown-item" to="/sheep">
                      Sheep
                    </Link>
                    <Link className="dropdown-item" to="/cattle">
                      Cattle
                    </Link>
                    <hr className="dropdown-divider" />
                  </>
                )}
              </div>
            </li>
            {/* Mega Component: Crop Farming */}
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
                {(userCategory === 'cassava' || userCategory === 'maize' || userCategory === 'plantain' || userCategory === 'beans' || userCategory === 'all') && (
                  <>
                    <Link className="dropdown-item" to="/cassava-farm">
                      Cassava
                    </Link>
                    <Link className="dropdown-item" to="/maize-farm">
                      Maize
                    </Link>
                    <Link className="dropdown-item" to="/plantain-farm">
                      Plantain
                    </Link>
                    <Link className="dropdown-item" to="/beans-farm">
                      Beans
                    </Link>
                    <hr className="dropdown-divider" />
                  </>
                )}
              </div>
            </li>
          </ul>
          {/* Notifications Dropdown */}
          <div className="dropdown text-end mx-auto ">
            <Link
              className="d-block link-body-emphasis text-decoration-none dropdown-toggle "
              to="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-tooltip="View birds due for vaccination"
              data-bs-placement="bottom"
            >
              <FaBell size={24} />
              {notificationCount > 0 && <span className="badge bg-danger">{notificationCount}</span>}
            </Link>
            <ul className="dropdown-menu text-small">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <li key={index}>
                    <span
                      className="dropdown-item"
                      onClick={() =>
                        (window.location.href = `/record-vaccination?batchNumber=${notification.batchNumber}&breed=${notification.breed}&ageInDays=${notification.ageInDays}&vaccinationDue=${notification.vaccinationDue}`)
                      }
                    >
                      <div className="notification-item">
                        <strong>{notification.breed}</strong> with batch number {notification.batchNumber} is due for {notification.vaccinationDue} vaccination at {notification.ageInDays} days old.
                      </div>
                    </span>
                  </li>
                ))
              ) : (
                <li>
                  <span className="dropdown-item">No notifications</span>
                </li>
              )}
            </ul>
          </div>
          {/* User Dropdown */}
          <div className="dropdown text-end mx-auto ">
          {currentUser ? (
            <Link
              className="d-block link-body-emphasis text-decoration-none dropdown-toggle text-white"
              to="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {currentUser.userName}
              <i className="bi bi-person-circle" style={{ fontSize: '32px' }}></i>
            </Link>
          ) : (
            <Link className="d-block link-body-emphasis text-decoration-none" to="/sign-in">
              Sign In
            </Link>
          )}
          <ul className="dropdown-menu text-small">
            {/* Dropdown menu items */}
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
