import { useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Project from './Pages/Project'
import DashBoard from './Pages/DashBoard';
import DisplayProject from './Pages/DisplayProject'
import GlobalPortfolio from './Pages/GlobalPortfolio'
import Cluster from './Pages/Cluster'
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
       <Route path="/:username/dashboard" element={<DashBoard />} />
       <Route path='/project/:projectName' element={<Project />} />
       <Route path='/documentation/:projectName' element={<DisplayProject/>}/>
       <Route path='/GlobalPortfolio/projects' element={<GlobalPortfolio/>}/>
       <Route path='/cluster' element={<Cluster/>}/>


    </Routes>
    <ToastContainer
  position="top-center"
  autoClose={1000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnFocusLoss={false}
  draggable
  pauseOnHover
/>
    
    </>
  )
}

export default App
