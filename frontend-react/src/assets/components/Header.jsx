import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
// import { useContext } from 'react';

const Header = () => {
  const {isLogedin,setLogedIn} =useContext(AuthContext)
  const handleLogout=()=>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    // isLogedin
    setLogedIn(false)
    Navigate('/login')
  }
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
          <Link className="navbar-brand" to="/">Stock Prediction</Link>
          
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
          {isLogedin ? (
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            ) : (
              <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                <div className="d-flex gap-2">
                  <Link to='/login' className="btn btn-outline-light" type="button">Login</Link>
                  <Link to='/register' className="btn btn-info custom-shadow" type="button">Sign In</Link>
                </div>
              </div>
            )}


          
        </div>
      </nav>
    </>
  );
};

export default Header;
