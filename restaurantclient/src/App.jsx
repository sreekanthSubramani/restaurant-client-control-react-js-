import React from 'react'
import { ToastContainer } from 'react-toastify'

import EntryPage from '../src/Components/EntryPage/Entry'
import LoginPageComp from './Components/LoginPage/Loginpage'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
  <Routes>
      <Route path='/' Component={EntryPage}/>
      <Route path='/login' Component={LoginPageComp} />
  </Routes>
      <ToastContainer 
      position='top-right'
      autoClose={5000}
      rtl={false}
      theme='dark'
      draggable
      />
    </>
  )
}

export default App
