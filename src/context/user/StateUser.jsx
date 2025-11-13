import React, { useState,useEffect } from 'react'
import { userContext } from './userContext'
const StateUser = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token && token.length > 2) {
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