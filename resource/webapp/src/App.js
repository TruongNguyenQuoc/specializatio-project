import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Index from 'pages/Index/Index'
import Login from 'pages/Login/Login'
import Register from 'pages/Register/Register'
import Home from 'pages/Home/Home'

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user/:userId/boards" element={<Home />}></Route>
        </Routes>
    </BrowserRouter>
)

export default App
