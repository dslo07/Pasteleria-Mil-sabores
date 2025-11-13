import React, { useState,useEffect } from 'react'
import { userContext } from './userContext'
import { isTokenExpired } from '../../hooks/useValidated'

const StateUser = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token && !isTokenExpired(token)) {
      setIsLogin(true)
    }  
  }, [])

  return (
    <userContext.Provider value={{isLogin,setIsLogin}} >
      {children}
    </userContext.Provider>

  )
}

export default StateUser