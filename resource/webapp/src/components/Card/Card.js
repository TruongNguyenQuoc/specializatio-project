import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import { BoardContext } from 'pages/Board/Board'
import './Card.scss'

export default function Card(props) {
    const { card } = props
    const { handleShowEditCard, handleShowQuickEditCard } =
        useContext(BoardContext)
    const showEditCard = false
    const showQuickEditCard = false
    const [activeCard, setActiveCard] = useState(false)
    const [cardTitle, setCardTitle] = useState('')
    const [cardDescription, setCardDescription] = useState('')
    const [cover, setCover] = useState(null)

    useEffect(() => {
        setCardTitle(card.title)
    }, [card.title])

    useEffect(() => {
        setCardDescription(card.description)
    }, [card.description])

    useEffect(() => {
        setCover(card.cover)
    }, [card.cover])

    const addClassName = () => {
        return `card-item ${activeCard ? 'active-card' : ''}`
    }

    const handleMouseOver = () => {
        setActiveCard(true)
    }

    const handleMouseOut = () => {
        setActiveCard(false)
    }

    const onEditCard = () => {
        handleShowEditCard(card, cardTitle, cardDescription, showEditCard)
    }

    const onQuickEditCard = () => {
        handleShowQuickEditCard(card, cardTitle, cover, showQuickEditCard)
    }

    return (
        <>
            <div
                className={addClassName()}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <span className="card-item-operation" onClick={onEditCard}>
                    <FontAwesomeIcon icon={faPen} />
                </span>
                {cover !== null && (
                    <div className="card-image" onClick={onQuickEditCard}>
                        <img src={cover} alt={cardTitle} />
                    </div>
                )}
                <div className="card-detail" onClick={onQuickEditCard}>
                    <span className="card-title">{cardTitle}</span>
                </div>
            </div>
        </>
    )
}
