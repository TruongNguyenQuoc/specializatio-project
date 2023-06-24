import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Index from 'pages/Index/Index'
import Home from 'pages/Home/Home'
import Board from 'pages/Board/Board'
import Login from 'pages/Login/Login'
import Register from 'pages/Register/Register'

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/board/:boardId" element={<Board />}></Route>
            <Route path="/user/:userId/boards" element={<Home />}></Route>
        </Routes>
    </BrowserRouter>
)

export default App
