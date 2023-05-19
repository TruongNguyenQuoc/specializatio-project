import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import Card from 'components/Card/Card'
import './Column.scss'

export default function Column(props) {
    const { column, onCardDrop } = props
    const cards = column.cards

    return (
        <div className="board-wrapper-with-margins board-wrapper">
            <div className="card-content">
                <Row className="card-header column-drag-handle">
                    <Col>
                        <div className="card-header-title">
                            <h2 className="card-header-title__name">
                                {column.title}
                            </h2>
                            <div className="card-header-title__icon">
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        </div>
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
                </div>
                <div className="card-footer">
                    <div className="open-card">
                        <span className="icon-add">
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </span>
                        <span>Add another card</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
