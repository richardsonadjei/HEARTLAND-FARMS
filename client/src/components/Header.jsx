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
      <Link className="navbar-brand text-black custom-logo" to="/">
  <img src="../../public/images/logo-white.png" alt="Logo" className="logo" />
  <span className="brand-text">HeartLand Farms</span>
</Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-black" aria-current="page" to="/">
                Home
              </Link>
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
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle text-black"
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
