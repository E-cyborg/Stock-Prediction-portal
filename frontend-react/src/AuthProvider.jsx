import React, { createContext } from 'react'
import { useContext,useState } from 'react'

const AuthContext=createContext()

const AuthProvider = ({ children }) => {
    const [isLogedin, setLogedIn] = useState(
        !!localStorage.getItem('accessToken')
    );
    
    return (
        <AuthContext.Provider value={{ isLogedin, setLogedIn }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider
export {AuthContext};