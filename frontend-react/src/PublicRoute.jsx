import React,{useContext} from 'react'

import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
    const {isLogedin} = useContext(AuthContext)
  return isLogedin ?(
    
        <Navigate to='/dashbord'/>):(children

  )
}

export default PublicRoute