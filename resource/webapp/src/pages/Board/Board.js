import { React, useEffect, useState } from 'react'

import AppBar from 'components/AppBar/AppBar'
import BoardBard from 'components/BoardBar/BoardBar'
import BoardColumn from 'components/BoardColumn/BoardColumn'

import APIService from 'api/ApiService'

function Board(props) {
    const { boardId } = props
    const [board, setBoard] = useState()
    useEffect(() => {
        document.title = 'Boards | Trello'
    }, [])

    useEffect(() => {
        APIService.getBoardById(boardId)
            .then((request) => {
                const { status, data } = request
                if (status === 200) {
                    setBoard(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [boardId])

    return (
        <div className="trello-master">
            <AppBar></AppBar>
            <BoardBard propBoard={board}></BoardBard>
            <BoardColumn propBoard={board}></BoardColumn>
        </div>
    )
}

export default Board
