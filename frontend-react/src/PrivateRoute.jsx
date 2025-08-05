import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {isLogedin} = useContext(AuthContext)
  return isLogedin ?(
    children):(
        <Navigate to='/login'/>

  )
}

export default PrivateRoute