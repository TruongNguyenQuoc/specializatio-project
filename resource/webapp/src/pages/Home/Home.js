import React from 'react'

import Board from 'pages/Board/Board'

import './Home.scss'
function Home() {
    return (
        <div className="trello-master">
            <Board boardId={1}></Board>
        </div>
    )
}

export default Home
