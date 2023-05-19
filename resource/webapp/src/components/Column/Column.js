import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Row, Col, Form, Dropdown, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { cloneDeep } from 'lodash'

import Card from 'components/Card/Card'
import ConfirmRemoveColumn from 'components/Common/ConfirmRemoveColumn'
import { saveContentAfterEnter, selectAllText } from 'ultil/contentEditable'
import { ACTION_REMOVE_CONFIRM, EVENT_KEYDOWN_ENTER } from 'ultil/constants'
import './Column.scss'

export default function Column(props) {
    const { column, onCardDrop, onUpdateColumn } = props
    const cards = column.cards

    const [showConfirmRemove, setShowConfirmRemove] = useState(false)
    const toggleRemoveColumn = () => setShowConfirmRemove(!showConfirmRemove)

    const [columnTitle, setColumnTitle] = useState('')
    const [activeForm, setActiveForm] = useState(false)
    const [newCardTitle, setNewCardTitle] = useState('')

    const handleChangeColumnTitle = (event) =>
        setColumnTitle(event.target.value)

    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])

    const onActionConfirm = (type) => {
        if (type === ACTION_REMOVE_CONFIRM) {
            const newColumn = {
                ...column,
                destroy: true,
            }
            onUpdateColumn(newColumn)
        }
        toggleRemoveColumn()
    }

    const handleBlurColumnTitle = () => {
        const newColumn = {
            ...column,
            title: columnTitle,
        }
        onUpdateColumn(newColumn)
    }

    const newCardInputRef = useRef(null)
    useEffect(() => {
        if (newCardInputRef.current && newCardInputRef) {
            newCardInputRef.current.focus()
        }
    }, [activeForm])

    const toggleOpenNewCard = () => setActiveForm(!activeForm)

    const changeCardTitle = (event) => setNewCardTitle(event.target.value)

    const addNewCard = () => {
        if (!newCardTitle) {
            newCardInputRef.current.focus()
            return
        }

        let newColumn = cloneDeep(column)
        const newCards = [...column.cards]

        const newCardToAdd = {
            id: newCards[newCards.length - 1].cardOrder + 1,
            title: newCardTitle.trim(),
            cover: null,
            cardOrder: newCards[newCards.length - 1].cardOrder + 1,
            destroy: false,
            boardId: column.boardId,
            columnId: column.id,
        }

        newColumn.cards.push(newCardToAdd)
        onUpdateColumn(newColumn)
        //set value input newCardTitle
        setNewCardTitle('')
        toggleOpenNewCard()
    }

    return (
        <div className="board-wrapper-with-margins board-wrapper">
            <div className="card-content">
                <Row className="card-header column-drag-handle">
                    <Col xs="10">
                        <div className="card-header-title">
                            <Form.Control
                                type="text"
                                className="input-editable card-header-input"
                                value={columnTitle}
                                onChange={handleChangeColumnTitle}
                                onBlur={handleBlurColumnTitle}
                                onKeyDown={saveContentAfterEnter}
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={selectAllText}
                                spellCheck={false}
                            ></Form.Control>
                        </div>
                    </Col>
                    <Col xs="2">
                        <Dropdown>
                            <Dropdown.Toggle
                                id="dropdown-basic"
                                size="sm"
                                className="dropdown-btn"
                            >
                                <span>...</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <div className="dropdown-title">
                                    <span>List actions</span>
                                </div>
                                <Dropdown.Item>Add card...</Dropdown.Item>
                                <Dropdown.Item>Move list...</Dropdown.Item>
                                <Dropdown.Item onClick={toggleRemoveColumn}>
                                    Remove list...
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Move all cards in this list...
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                <div className="card-list">
                    <Container
                        groupName="columns-group"
                        onDrop={(dropResult) =>
                            onCardDrop(column.id, dropResult)
                        }
                        getChildPayload={(index) => cards[index]}
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: 'card-drop-preview',
                        }}
                        dropPlaceholderAnimationDuration={200}
                    >
                        {cards.map((card, index) => (
                            <Draggable key={index}>
                                <Card card={card}></Card>
                            </Draggable>
                        ))}
                    </Container>
                    {activeForm && (
                        <div className="add-new-card-area">
                            <Form.Control
                                as="textarea"
                                placeholder="Enter list title..."
                                rows="3"
                                size="sm"
                                className="enter-new-card__input"
                                ref={newCardInputRef}
                                value={newCardTitle}
                                onChange={changeCardTitle}
                                onKeyDown={(even) =>
                                    even.key === EVENT_KEYDOWN_ENTER &&
                                    addNewCard()
                                }
                            ></Form.Control>
                        </div>
                    )}
                </div>

                <div className="card-footer">
                    {activeForm && (
                        <div className="add-new-card-area">
                            <div className="enter-control">
                                <Button
                                    variant="primary"
                                    className="enter-control__button"
                                    onClick={addNewCard}
                                >
                                    Add card
                                </Button>
                                <span
                                    className="enter-control__icon"
                                    onClick={toggleOpenNewCard}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </div>
                        </div>
                    )}
                    {!activeForm && (
                        <div className="open-card" onClick={toggleOpenNewCard}>
                            <span className="icon-add">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                ></FontAwesomeIcon>
                            </span>
                            <span>Add another card</span>
                        </div>
                    )}
                </div>
            </div>
            <>
                <ConfirmRemoveColumn
                    show={showConfirmRemove}
                    onAction={onActionConfirm}
                    title="Remove column"
                    content={`Are you sure you want to remove <strong>${column.title}</strong>! </ br> All related cards will also be remove.`}
                ></ConfirmRemoveColumn>
            </>
        </div>
    )
}
