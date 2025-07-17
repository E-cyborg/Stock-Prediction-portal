import React from 'react';

const Header = () => {
  return (
    <>
      <style>
        {`
          .custom-shadow {
            box-shadow: 0 4px 8px rgb(86, 189, 214);
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Stock Prediction</a>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* This wrapper is required for toggle to work */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            <div className="d-flex gap-2">
              <button className="btn btn-outline-light" type="button">Login</button>
              <button className="btn btn-info custom-shadow" type="button">Sign In</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
