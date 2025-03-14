import { useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import YourWork from './Pages/YourWork'
import Signup from './Pages/Signup'
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
       <Route path='/yourwork' element={<YourWork/>} />
       <Route path={`/${username}/yourwork`} element={<YourWork />} />
    </Routes>
    <ToastContainer/>
    
    </>
  )
}

export default App
