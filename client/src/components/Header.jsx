
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const userCategory = currentUser ? currentUser.category : '';

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">HeartLand Farms</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Farm Projects
              </Link>
              <ul className="dropdown-menu">
                {(userCategory === 'poultry' || userCategory === 'all') && (
                  <>
                    <li><Link className="dropdown-item" to="/poultry">Poultry</Link></li>
                    <li><Link className="dropdown-item" to="/guinea-fowl">Guinea Fowl</Link></li>
                    <li><Link className="dropdown-item" to="/ducks">Ducks</Link></li>
                    <li><Link className="dropdown-item" to="/turkey">Turkey</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                )}
                {(userCategory === 'hatchery' || userCategory === 'all') && (
                  <>
                    <li><Link className="dropdown-item" to="/guinea-fowl">Hatchery Services</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                )}
                {(userCategory === 'animal' || userCategory === 'all') && (
                  <>
                    <li><Link className="dropdown-item" to="/pig-farm">Pig</Link></li>
                    <li><Link className="dropdown-item" to="/goats">Goats</Link></li>
                    <li><Link className="dropdown-item" to="/cattle">Cattle</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/catfish">CatFish</Link></li>
                    <li><Link className="dropdown-item" to="/tilapia">Tilapia</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                )}
                {(userCategory === 'crop' || userCategory === 'all') && (
                  <>
                    <li><Link className="dropdown-item" to="/maize-farm">Maize</Link></li>
                    <li><Link className="dropdown-item" to="/cassava-farm">Cassava</Link></li>
                    <li><Link className="dropdown-item" to="/beans-farm">Beans</Link></li>
                    <li><Link className="dropdown-item" to="/plantain-farm">Plantain</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                )}
                {currentUser && currentUser.role !== 'employee' && currentUser.role !== 'manager' && (
                  <li><Link className="dropdown-item" to="/create-project">Create New Project</Link></li>
                )}
              </ul>
            </li>
          </ul>
          <div className="dropdown text-end mx-auto">
            {currentUser ? (
              <Link className="d-block link-body-emphasis text-decoration-none dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">
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
              <li><Link className="dropdown-item" to="/sign-out">Sign Out</Link></li>
              <li><hr className="dropdown-divider" /></li>
              {currentUser && currentUser.role === 'admin' && (
                <li><Link className="dropdown-item" to="/sign-up">Create A New User</Link></li>
              )}
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}