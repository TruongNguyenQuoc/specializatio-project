import { React, useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faXmark,
    faChalkboard,
    faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons'

import UploadCover from 'components/UploadCover/UploadCover'
import './QuickEditCard.scss'

export default function QuickEditCard(props) {
    const {
        card,
        cardTittle,
        saveCardTittle,
        toggleEditCard,
        handleQuickEditCardFalse,
    } = props

    const [newCardTittle, setNewCardTittle] = useState('')
    const [showUploadCover, setShowUploadCover] = useState(false)
    const newCardTittleRef = useRef(null)

    useEffect(() => {
        setNewCardTittle(cardTittle)
    }, [cardTittle])

    const changeCardTitle = (event) => setNewCardTittle(event.target.value)

    const handleSaveCardTittle = () => {
        const newCard = {
            ...card,
            title: newCardTittle,
        }
        saveCardTittle(newCard)
        handleQuickEditCardFalse()
    }

    const handleShowEditCarAndHideQuickEditCard = () => {
        toggleEditCard()
        handleQuickEditCardFalse()
    }

    const toggleShowUploadCover = () => {
        setShowUploadCover(!showUploadCover)
    }

    return (
        <>
            <div className="quick-card-editor">
                <span
                    className="quick-card-editor-close-icon"
                    onClick={handleQuickEditCardFalse}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </span>
                <div className="quick-card-editor-card">
                    <div className="card-quick-edit">
                        <div className="card-details">
                            <textarea
                                className="card-edit-title"
                                ref={newCardTittleRef}
                                value={newCardTittle}
                                select={true}
                                onChange={changeCardTitle}
                            ></textarea>
                        </div>
                    </div>
                    <input
                        className="nch-button btn-primary"
                        type="submit"
                        onClick={handleSaveCardTittle}
                        value={'Save'}
                    ></input>
                    <div className="quick-card-editor-buttons fade-in">
                        <div className="quick-card-editor-buttons-item">
                            <span className="icon-sm">
                                <FontAwesomeIcon icon={faChalkboard} />
                            </span>
                            <span
                                className="quick-card-editor-buttons-item-text"
                                onClick={handleShowEditCarAndHideQuickEditCard}
                            >
                                Open Card
                            </span>
                        </div>
                        <div className="quick-card-editor-buttons-item fade-in">
                            <span className="icon-sm">
                                <FontAwesomeIcon icon={faWindowMaximize} />
                            </span>
                            <span
                                className="quick-card-editor-buttons-item-text"
                                onClick={toggleShowUploadCover}
                            >
                                Change Cover
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {showUploadCover && (
                <UploadCover
                    card={card}
                    toggleShowUploadCover={toggleShowUploadCover}
                ></UploadCover>
            )}
        </>
    )
}
