import React, { useState, useEffect, useContext } from 'react'
import { Form } from 'react-bootstrap'

import { saveContentAfterEnter, selectAllText } from 'ultil/contentEditable'
import { BoardContext } from 'pages/Board/Board'
import APIService from 'api/ApiService'
import './BoardBar.scss'

export default function BoardBard() {
    const { board } = useContext(BoardContext)
    const [boardIndex, setBoardIndex] = useState({})
    const [headerTitle, setHeaderTitle] = useState('')
    const [length, setLength] = useState(0)

    useEffect(() => {
        setBoardIndex(board)
    }, [board])

    useEffect(() => {
        if (JSON.stringify(boardIndex) !== JSON.stringify({})) {
            setHeaderTitle(boardIndex.title)
            setLength(boardIndex.title.length)
        }
    }, [boardIndex])

    const handleChangeAndSize = (event) => {
        setHeaderTitle(event.target.value)
        var numberOfCharacters = event.target.value.length
        event.target.style.width = numberOfCharacters + 2 + 'ch'
    }

    const handleBlurBoardTitle = () => {
        const newBoard = {
            ...boardIndex,
            title: headerTitle,
        }
        APIService.saveBoard(newBoard)
    }

    return (
        <nav className="board-header">
            <div className="header-content">
                <span className="header-right">
                    <div className="header-title">
                        <Form.Control
                            type="text"
                            className="board-name-input"
                            value={headerTitle}
                            onChange={handleChangeAndSize}
                            onBlur={handleBlurBoardTitle}
                            onClick={selectAllText}
                            onKeyDown={saveContentAfterEnter}
                            spellCheck={false}
                            onMouseDown={(event) => event.preventDefault()}
                            style={{ width: length + 2 + 'ch' }}
                        ></Form.Control>
                    </div>
                    <div className="header-workspace"></div>
                </span>
                <span className="header-left">
                    <div className="header-title"></div>
                    <div className="header-workspace"></div>
                </span>
            </div>
        </nav>
    )
}
