import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import APIService from 'api/ApiService'
import EditCard from 'components/EditCard/EditCard'
import QuickEditCard from 'components/QuickEditCard/QuickEditCard'
import './Card.scss'

export default function Card(props) {
    const { card } = props
    const [showEditCard, setShowEditCard] = useState(false)
    const [activeCard, setActiveCard] = useState(false)
    const [showQuickEditCard, setShowQuickEditCard] = useState(false)
    const [cardTittle, setCardTittle] = useState('')
    const [description, setDescription] = useState('')
    const [cover, setCover] = useState(null)

    useEffect(() => {
        setCardTittle(card.title)
    }, [card.title])

    useEffect(() => {
        setDescription(card.description)
    }, [card.description])

    useEffect(() => {
        setCover(card.cover)
    }, [card.cover])

    const toggleEditCard = () => {
        setShowEditCard(!showEditCard)
    }

    const saveCardTittle = (newCard) => {
        APIService.saveCard(newCard)
        setCardTittle(newCard.title)
    }

    const saveCardDescription = (newCard) => {
        APIService.saveCard(newCard)
        setDescription(newCard.description)
    }

    const saveCardCover = (newCard) => {
        APIService.saveCard(newCard)
        setCover(newCard.cover)
    }

    const uploadCover = (formData, imagePreview) => {
        setCover(imagePreview)
        APIService.upload(formData)
    }

    const addClassName = () => {
        return `card-item ${activeCard ? 'active-card' : ''}`
    }

    const handleMouseOver = () => {
        setActiveCard(true)
    }

    const handleMouseOut = () => {
        setActiveCard(false)
    }

    const handleQuickEditCard = () => {
        setShowQuickEditCard(!showQuickEditCard)
    }

    const handleQuickEditCardFalse = () => {
        setShowQuickEditCard(false)
    }

    return (
        <>
            <div
                className={addClassName()}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <span
                    className="card-item-operation"
                    onClick={handleQuickEditCard}
                >
                    <FontAwesomeIcon icon={faPen} />
                </span>
                {cover !== null && (
                    <div className="card-image" onClick={toggleEditCard}>
                        <img src={cover} alt={cardTittle} />
                    </div>
                )}
                <div className="card-detail" onClick={toggleEditCard}>
                    <span className="card-title">{cardTittle}</span>
                </div>
            </div>
            {showEditCard && (
                <EditCard
                    card={card}
                    cardTittle={cardTittle}
                    description={description}
                    toggleEditCard={toggleEditCard}
                    saveCardTittle={saveCardTittle}
                    saveCardDescription={saveCardDescription}
                ></EditCard>
            )}
            {showQuickEditCard && (
                <QuickEditCard
                    card={card}
                    cover={cover}
                    cardTittle={cardTittle}
                    saveCardTittle={saveCardTittle}
                    saveCardCover={saveCardCover}
                    toggleEditCard={toggleEditCard}
                    uploadCover={uploadCover}
                    handleQuickEditCardFalse={handleQuickEditCardFalse}
                ></QuickEditCard>
            )}
        </>
    )
}
