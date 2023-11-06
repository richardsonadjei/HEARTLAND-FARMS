import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">React-Bootstrap</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
            </li>
            
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/poultry">Poultry</Link></li>
                <li><Link className="dropdown-item" to="/guinea-fowl">Guinea Fowl</Link></li>
                <li><Link className="dropdown-item" to="/ducks">Ducks</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/guinea-fowl">Hatchery Services</Link></li>
                <li><Link className="dropdown-item" to="/pig-farm">PigFarm</Link></li>
                <li><Link className="dropdown-item" to="/goats">Goats</Link></li>
                <li><Link className="dropdown-item" to="/goats">Cattle</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/maize-farm">Maize Farm</Link></li>
                <li><Link className="dropdown-item" to="/cassava-farm">Cassava Farm</Link></li>
                <li><Link className="dropdown-item" to="/beans-farm">Beans Farm</Link></li>
                <li><Link className="dropdown-item" to="/plantain-farm">Plantain Farm</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/create-project">Create New Project</Link></li>
              </ul>
            </li>
          </ul>
          
          <div className="dropdown text-end mx-auto">
            <Link className="d-block link-body-emphasis text-decoration-none dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">
              User
              <i className="bi bi-person-circle" style={{ fontSize: '32px' }}></i>
            </Link>
            <ul className="dropdown-menu text-small" style={{}}>
              <li><Link className="dropdown-item" to="/sign-in">SignIn</Link></li>
              <li><Link className="dropdown-item" to="/sign-out">SignOut</Link></li>
              <li><Link className="dropdown-item" to="/sign-up">SignUp</Link></li>
              <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
