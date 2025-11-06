import React, { useState,useEffect } from 'react'
import { userContext } from './userContext'
const StateUser = ({ children }) => {
 const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const id = localStorage.getItem("id")
    setIsLogin(!!id) 
  }, [])


  return (
    <userContext.Provider value={{isLogin,setIsLogin}} >
      {children}
    </userContext.Provider>

  )
}

export default StateUser