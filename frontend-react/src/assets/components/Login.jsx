import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const HandelLogin =(e) =>{
        e.preventDefault();  
        console.log('its working...');
    }
  return (
    <>
    <div
        className="container d-flex align-items-center justify-content-center text-light"
        style={{ minHeight: 'calc(100vh - 115px)'}}
        >
        <div className="col-md-6">
            <div className="card bg-secondary text-light shadow p-5 custom-card-dark" style={{borderRadius:'10px'}}>
            <h3 className="text-center mb-4">Welcome back </h3>
            <form onSubmit={HandelLogin}>
                <div className="mb-3 mt-3">
                <input
                    type="email"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Enter email or Username"
                    style={{borderRadius:'50px'}}
                />
                </div>
                <div className="mb-5">
                <input
                    type="password"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Enter password"
                    style={{borderRadius:'50px'}}
                />
                </div>
                <button type="submit" className="btn btn-outline-info w-100"  style={{borderRadius:'50px'}}>
                Login
                </button>

                <hr/>
                
                <div  className="mt-3 d-flex justify-content-center">
                <h5 className='form-text' style={{fontSize:'17px'}}>Don't have an account? <Link to={'/register'} className="ms-2 text-info">Sign up</Link></h5>
                </div>
                <hr/>
            </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login