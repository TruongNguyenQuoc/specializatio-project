import React from 'react'

import Home from 'components/Home/Home'
import './App.scss'

function App() {
    const url = 'http://localhost:8181/api/boards/id/1'

    return (
        <div className="trello-master">
            <Home></Home>
        </div>
    )
}

export default App
