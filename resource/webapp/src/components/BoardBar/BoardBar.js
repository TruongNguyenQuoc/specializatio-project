/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

import APIService from 'api/ApiService'
import { saveContentAfterEnter, selectAllText } from 'ultil/contentEditable'
import './BoardBar.scss'

export default function BoardBard(props) {
    const { propBoard } = props
    const [board, setBoard] = useState({})
    const [headerTitle, setHeaderTitle] = useState('')
    const [length, setLength] = useState(0)

    useEffect(() => {
        setBoard(propBoard)
        setHeaderTitle(propBoard.title)
        console.log(propBoard.title)
    }, [propBoard])

    useEffect(() => {
        // setLength(propBoard.title.length)
        // setHeaderTitle(propBoard.title)

        console.log(board)
    }, [board])

    const handleChangeAndSize = (event) => {
        setHeaderTitle(event.target.value)
        var numberOfCharacters = event.target.value.length
        event.target.style.width = numberOfCharacters + 2 + 'ch'
    }

    const handleBlurBoardTitle = () => {
        const newBoard = {
            ...board,
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
