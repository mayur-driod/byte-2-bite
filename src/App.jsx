import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import Contact from './pages/Contact'

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/contact' element={<Contact/>} />
        </Routes>
    </>
  )
}

export default App
