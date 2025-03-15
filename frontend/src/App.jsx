import { useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import DashBoard from './Pages/DashBoard'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
function App() {
  const username = localStorage.getItem('LoggedInUser');
  return (
    <>
    <Navbar/>

    <Routes>
       <Route path="/" element={<Home />} />
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path={`/${username}/dashboard`} element={<DashBoard />} />
    </Routes>
    <ToastContainer/>
    
    </>
  )
}

export default App
