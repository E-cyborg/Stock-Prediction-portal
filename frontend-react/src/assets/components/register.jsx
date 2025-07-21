import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors,setError] = useState({});
  const [success, setSuccess] =useState(false);
  const [loading, setloading] =useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setloading(true);
    const userData = { username, email, password };
    console.log('User data:', userData);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/registration/', userData);
      console.log('Response data:', response.data);
      console.log('Registration successful');
      setSuccess(true)

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
    <div
      className="container d-flex align-items-center justify-content-center text-light"
      style={{ minHeight: 'calc(100vh - 115px)' }}
    >
      <div className="col-md-6">
        <div
          className="card bg-secondary text-light shadow p-5 custom-card-dark"
          style={{ borderRadius: '10px' }}
        >

          <h3 className="text-center mb-4">Create an Account</h3>
            {success && (
              <>
              <div class="alert alert-primary" role="alert">Registration successful</div>
              </>
            )}
          <form onSubmit={handleRegistration}>
            <div className="mb-3">
            
            


              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                placeholder="Username"
                style={{ borderRadius: '50px' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {errors.username && (
              <div className="text-danger">{errors.username[0]}</div>
            )}

            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control bg-dark text-light border-secondary"
                placeholder="Email Address"
                style={{ borderRadius: '50px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <div className="text-danger">{errors.email[0]}</div>
              )}

            </div>

            <div className="mb-5">
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                placeholder="Set Password"
                style={{ borderRadius: '50px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                Register
              </button>
            )}

           
            <hr />

            <div className="mt-3 d-flex justify-content-center">
              <p className="form-text" style={{ fontSize: '17px' }}>
                Already have an account?
                <Link to="/login" className="ms-2 text-info">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;




