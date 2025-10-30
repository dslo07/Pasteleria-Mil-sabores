import React, { useState,useEffect } from 'react'
import { userContext } from './userContext'
const StateUser = ({ children }) => {
  const id = localStorage.getItem("id")
  const [isLogin,setIsLogin] = useState(false)

  useEffect(()=>{
    
    if(id){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[id])



  return (
    <userContext.Provider value={{isLogin,setIsLogin}} >
      {children}
    </userContext.Provider>

  )
}

export default StateUser