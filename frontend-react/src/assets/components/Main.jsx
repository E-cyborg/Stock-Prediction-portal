import React from 'react'
import { Link } from 'react-router-dom'
const Main = () => {
  return (
    <>
      <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: '87vh' }}>
        <div className='p-5 text-center m-3' style={{ backgroundColor: 'black', borderRadius: '10px' }}>
          <h1 className='text-white'>Stock prediction Portal</h1>
          <p style={{ color: 'gray' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sequi libero quasi ipsum ab obcaecati alias sint odio. Alias non consequuntur aperiam doloremque quos numquam quae itaque. Maxime, modi ad.
          </p>
          <Link to='/login' className="btn btn-info" type="button">Login</Link>
        </div>
      </div>
    </>
  )
}

export default Main
