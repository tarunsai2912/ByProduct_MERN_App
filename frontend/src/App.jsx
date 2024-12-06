import React, {useState} from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import AdminPage from './pages/AdminPage'
import QRPage from './pages/QRPage'

function App() {

  const [isCreate, setCreate] = useState(false)
  const [isLoginOpen, setLoginOpen] = useState(false)
  const [isRegisterOpen, setRegisterOpen] = useState(false)

  
  return (
    <div className='app' style={{backgroundColor: isLoginOpen || isRegisterOpen || isCreate ? '#000000' : '#FFFFFF'}}>
      <Routes>
        <Route path='/' element={<MenuPage isCreate={isCreate} setCreate={setCreate} isLoginOpen={isLoginOpen} setLoginOpen={setLoginOpen} isRegisterOpen={isRegisterOpen} setRegisterOpen={setRegisterOpen} />}></Route>
        <Route path='/admin' element={<AdminPage />}></Route>
        <Route path='/qr' element={<QRPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
