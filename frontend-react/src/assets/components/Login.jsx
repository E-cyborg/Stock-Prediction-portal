import React, { useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';

  const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors,setError] = useState({});
  const [success, setSuccess] =useState(false);
  const [loading, setloading] =useState(false);
  const navigate =useNavigate();
  const {isLogedin,setLogedIn} =useContext(AuthContext)
  useEffect(() => {
    if (isLogedin) {
      navigate('/'); // lowercase "navigate", not "Navigate"
    }
  }, [isLogedin]); // Watch for changes to isLogedin



    const HandelLogin = async (e) => {
    e.preventDefault();
    setloading(true);
    const userData = { username, password };
    console.log('User data:', userData);

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData);
        console.log('Response data:', response.data);
        console.log('login successful');
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);

        setSuccess(true)
        setError({})
        setLogedIn(true)
        navigate('/')
      
    }
    catch (error) {
      if (error.response && error.response.data) {
        console.log('Validation Errors:', error.response.data);
        setError(error.response.data); // This line was missing
      } else {
        console.log('Unexpected Error:', error.message);
        setError({ message: error.message });
      }
  }
  finally{
    setloading(false);
  }

  };
  return (
    <>
    <div
        className="container d-flex align-items-center justify-content-center text-light"
        style={{ minHeight: 'calc(100vh - 115px)'}}
        >
        <div className="col-md-6">
            <div className="card bg-secondary text-light shadow p-5 custom-card-dark" style={{borderRadius:'10px'}}>
            <h3 className="text-center mb-4">Welcome back </h3>
            {success && (
              <>
              <div className="alert alert-primary" role="alert">Login successful</div>
              </>
            )}
            {errors.detail && (
                <div className="alert alert-danger" role="alert">
                    {errors.detail}
                </div>
                )}

                {errors.message && (
                <div className="alert alert-danger" role="alert">
                    {errors.message}
                </div>
                )}

            <form onSubmit={HandelLogin}>
                <div className="mb-3 mt-3">
                <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Enter email or Username"
                    style={{borderRadius:'50px'}}  
                    value={username}
                     onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
              <div className="text-danger">{errors.username[0]}</div>
                )}

                </div>
                <div className="mb-5">
                <input
                    type="password"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Enter password"
                    style={{borderRadius:'50px'}}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                 {errors.password && (
                <div className="text-danger">{errors.password[0]}</div>
              )}

                </div>
                {loading ? (
              <button
                type="submit"
                className="btn btn-outline-info w-100 d-block mx-auto"
                style={{ borderRadius: '50px' }}
                disabled
              >
                Please wait ...
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-outline-info w-100 d-block mx-auto"
                style={{ borderRadius: '50px' }}
              >
                Login
              </button>
            )}
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