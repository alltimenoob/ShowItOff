import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Register from './authentication/register.tsx'
import Login from './authentication/login.tsx'
import ErrorPage from './error/index.tsx'
import Home from './home/index.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route element={<PrivateRoutes/>}>
          <Route path='/home' element={<Home/>}></Route>
        </Route>
        <Route path='*' element={<ErrorPage/>}></Route>
      </Routes>
    </BrowserRouter>
  
)
