import React, { useEffect, useState } from 'react'

import APIService from 'api/ApiService'
import EditCard from 'components/EditCard/EditCard'
import './Card.scss'

export default function Card(props) {
    const { card } = props
    const [showEditCard, setShowEditCard] = useState(false)
    const [cardTitle, setCardTitle] = useState('')
    const [description, serDescription] = useState('')

    useEffect(() => {
        setCardTitle(card.title)
    }, [card.title])

    useEffect(() => {
        serDescription(card.description)
    }, [card.description])

    const toggleEditCard = () => {
        setShowEditCard(!showEditCard)
    }

    const saveCard = (newCard) => {
        APIService.saveCard(newCard)
        setCardTitle(newCard.title)
    }

    const saveDescription = (newCard) => {
        APIService.saveCard(newCard)
        serDescription(newCard.description)
    }

    return (
        <>
            <div className="card-item" onClick={toggleEditCard}>
                {card.cover && (
                    <div className="card-image">
                        <img src={card.cover} alt={cardTitle} />
                    </div>
                )}
                <div className="card-detail">
                    <span className="card-title">{cardTitle}</span>
                </div>
            </div>
            {showEditCard && (
                <EditCard
                    card={card}
                    cardTitle={cardTitle}
                    description={description}
                    toggleEditCard={toggleEditCard}
                    saveCard={saveCard}
                    saveDescription={saveDescription}
                ></EditCard>
            )}
        </>
    )
}
