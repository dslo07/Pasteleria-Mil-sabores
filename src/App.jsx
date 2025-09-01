import { useState } from 'react'
import Main from './pages/Main'
function App() {
  const [isLogin,setIsLogin] = useState(true)
  return (
    <>
      {
        isLogin ? <Main/> : "LOGEATE PAPA"
      }
    </>
  )
}

export default App
