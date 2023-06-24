import React from 'react'

import AppBar from 'components/AppBar/AppBar'
import BoardPage from 'components/BoardPage/BoardPage'
import './Home.scss'

function Home() {
    return (
        <div className="home">
            <div className="surface">
                <AppBar></AppBar>
                <BoardPage></BoardPage>
            </div>
        </div>
    )
}

export default Home
