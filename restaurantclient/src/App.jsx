import React from 'react'
import { ToastContainer } from 'react-toastify'
import EntryPage from '../src/Components/EntryPage/Entry'
import LoginPageComp from './Components/LoginPage/Loginpage'
import AllAddonViewables from './Components/ShowAllAddons/AllAddonViewables'
import ShowItemsAdded from './Components/ItemComponent/ShowAddedItems'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


function App() {

    const newQueryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={newQueryClient}>
  <Routes>
      <Route path='/' Component={EntryPage}/>
      <Route path='/login' Component={LoginPageComp} />
      <Route path='/items' Component={ShowItemsAdded} />
  </Routes>
      <ToastContainer 
      position='top-right'
      autoClose={5000}
      rtl={false}
      theme='dark'
      draggable
      />
      </QueryClientProvider>
    </>
  )
}

export default App
