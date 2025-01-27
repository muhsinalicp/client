import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Homepage/Home'
import SIgnUp from './components/signing/SIgnUp'
import Signin from './Signin'
import Addprod from './components/Homepage/Addprod'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SIgnUp />} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/addproduct" element={<Addprod/>}/>
    </Routes>
  )
}

export default App
