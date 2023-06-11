import React from 'react'

import AppBar from 'components/AppBar/AppBar'
import BoardBard from 'components/BoardBar/BoardBar'
import BoardColumn from 'components/BoardColumn/BoardColumn'
import './App.scss'

function Home() {
    const url = 'http://localhost:8181/api/boards/id/1'

    return (
        <div className="trello-master">
            <AppBar></AppBar>
            <BoardBard url={url}></BoardBard>
            <BoardColumn url={url}></BoardColumn>
        </div>
    )
}

export default Home
