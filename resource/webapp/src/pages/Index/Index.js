import React from 'react'
import { Link } from 'react-router-dom'

import './Index.scss'

function Index() {
    return (
        <div className="app-root">
            <h1>Index</h1>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>
        </div>
    )
}

export default Index
