import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isEmpty } from 'lodash'
import {
    Container as ContainerBootstrap,
    Row,
    Col,
    Form,
    Button,
} from 'react-bootstrap'

import { flushSync } from 'react-dom'
import { Container, Draggable } from 'react-smooth-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import Column from 'components/Column/Column'
import ErrorBoard from 'components/ErrorBoard/ErrorBoard'
import APIService from 'api/ApiService'
import { applyDrag } from 'ultil/dragDrop'
import { EVENT_KEYDOWN_ENTER } from 'ultil/constants'
import 'bootstrap/dist/css/bootstrap.min.css'
import './BoardColumn.scss'

export default function BoardColumn(props) {
    const url = props.url
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [activeForm, setActiveForm] = useState(false)
    const [newColumnTitle, setNewColumnTitle] = useState('')

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setBoard(response.data.data)
                setColumns(response.data.data.columns)
            })
            .catch(() => {
                return ErrorBoard()
            })
    }, [url])

    const newColumnInputRef = useRef(null)
    useEffect(() => {
        if (newColumnInputRef.current && newColumnInputRef) {
            newColumnInputRef.current.focus()
        }
    }, [activeForm])

    if (isEmpty(board)) {
        return ErrorBoard()
    }

    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)
        newColumns.map((column, index) => (column.columnOrder = index + 1))
        let newBoard = { ...board }
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)

        const addIndex = dropResult.addedIndex + 1
        const removeIndex = dropResult.removedIndex + 1

        APIService.getColumnByOrderColumn(addIndex).then((result) => {
            const { status, data } = result
            if (status === 200) {
                data.data.columnOrder = removeIndex
                APIService.saveColumn(JSON.stringify(data.data))
            }
        })

        APIService.getColumnByOrderColumn(removeIndex).then((result) => {
            const { status, data } = result
            if (status === 200) {
                data.data.columnOrder = addIndex
                APIService.saveColumn(JSON.stringify(data.data))
            }
        })
    }

    const onCardDrop = (columnId, dropResult) => {
        if (
            dropResult.removedIndex !== null ||
            dropResult.addedIndex !== null
        ) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find(
                (column) => column.id === columnId
            )
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cards.map(
                (card, index) => (card.cardOrder = index + 1)
            )

            flushSync(() => setColumns(newColumns))
            const addIndex = dropResult.addedIndex + 1
            if (dropResult.addedIndex !== null) {
                const cardAdded = dropResult.payload
                cardAdded.columnId = currentColumn.id
                cardAdded.cardOrder = addIndex
                APIService.saveCard(cardAdded)
            }
        }
    }

    const changeColumnTitle = (event) => setNewColumnTitle(event.target.value)

    const toggleOpenNewColumn = () => setActiveForm(!activeForm)

    const addNewColumn = async () => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus()
            return
        }

        const newColumns = [...columns]

        const newCardToAdd = {
            title: newColumnTitle.trim(),
            columnOrder: newColumns[newColumns.length - 1].columnOrder + 1,
            destroy: false,
            board: null,
            cards: [],
            boardId: board.id,
        }
        newColumns.push(newCardToAdd)
        let newBoard = { ...board }
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
        APIService.saveColumn(JSON.stringify(newCardToAdd))

        //set value input newColumnTitle
        setNewColumnTitle('')
        toggleOpenNewColumn()
    }

    const onUpdateColumn = (newTitleColumnUpdate) => {
        let newColumns = [...columns]
        const columnIndexUpdate = newColumns.findIndex(
            (index) => index.id === newTitleColumnUpdate.id
        )

        if (newTitleColumnUpdate.destroy) {
            APIService.saveColumn(newTitleColumnUpdate)
            newColumns.splice(columnIndexUpdate, 1)
        } else {
            APIService.saveColumn(newTitleColumnUpdate)
            newColumns.splice(columnIndexUpdate, 1, newTitleColumnUpdate)
        }

        let newBoard = { ...board }
        newBoard.columns = newColumns

        flushSync(() => setColumns(newColumns))
        setBoard(newBoard)
    }

    return (
        <div className="board-content">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={(index) => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview',
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index}>
                        <Column
                            column={column}
                            onCardDrop={onCardDrop}
                            onUpdateColumn={onUpdateColumn}
                        ></Column>
                    </Draggable>
                ))}
            </Container>
            <ContainerBootstrap className="container-new-column">
                {!activeForm && (
                    <Row>
                        <Col
                            className="add-new-column"
                            onClick={toggleOpenNewColumn}
                        >
                            <span className="icon-add">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                ></FontAwesomeIcon>
                            </span>
                            <span>Add another list</span>
                        </Col>
                    </Row>
                )}
                {activeForm && (
                    <Row>
                        <Col sm={12} className="enter-new-column">
                            <Form.Control
                                type="text"
                                placeholder="Enter list title..."
                                className="enter-new-column__input"
                                ref={newColumnInputRef}
                                value={newColumnTitle}
                                onChange={changeColumnTitle}
                                onKeyDown={(even) =>
                                    even.key === EVENT_KEYDOWN_ENTER &&
                                    addNewColumn()
                                }
                            ></Form.Control>
                            <div className="enter-control">
                                <Button
                                    variant="primary"
                                    className="enter-control__button"
                                    onClick={addNewColumn}
                                >
                                    Add column
                                </Button>
                                <span
                                    className="enter-control__icon"
                                    onClick={toggleOpenNewColumn}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </div>
                        </Col>
                    </Row>
                )}
            </ContainerBootstrap>
        </div>
    )
}
