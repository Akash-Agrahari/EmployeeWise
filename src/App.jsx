import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Landing from './pages/Landing'

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path='/' element={<Login />} /> {/*Index Page */}
        <Route path='/Landing' element={<Landing />} /> {/* DashBoard  */}
      </Routes>
    </BrowserRouter>
  )
}

export default App