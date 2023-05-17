import React from "react"
import { Container, Draggable } from "react-smooth-dnd"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Card from "components/Card/Card"
import "./Column.scss"

export default function Column(props) {
    const { column } = props
    const cards = column.cards

    const onCardDrop = (dropResult) => {
        console.log(dropResult)
    }

    return (
        <div className="board-wrapper-with-margins board-wrapper">
            <div className="card-content">
                <div className="card-header column-drag-handle">
                    <h2 className="card-header-name">{column.title}</h2>
                </div>

                <div className="card-list">
                    <Container
                        // onDragStart={(e) => console.log("drag started", e)}
                        // onDragEnd={(e) => console.log("drag end", e)}
                        // onDragEnter={() => {
                        //     console.log("drag enter:", column.id)
                        // }}
                        // onDragLeave={() => {
                        //     console.log("drag leave:", column.id)
                        // }}
                        // onDropReady={(p) => console.log("Drop ready: ", p)}
                        groupName="columns-group"
                        onDrop={onCardDrop}
                        getChildPayload={(index) => cards[index]}
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: "card-drop-preview",
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
                        <span>Add a card</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
