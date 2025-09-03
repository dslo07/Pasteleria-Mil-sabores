import React, { useState } from 'react'
import { userContext } from './userContext'

const StateUser = ({ children }) => {
  const [isLogin,setIsLogin] = useState(true)
  return (
    <userContext.Provider value={{isLogin}} >
      {children}
    </userContext.Provider>

  )
}

export default StateUser