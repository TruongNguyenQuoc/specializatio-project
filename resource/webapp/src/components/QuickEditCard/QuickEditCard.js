import { React, useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faXmark,
    faChalkboard,
    faTrash,
    faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons'

import UploadCover from 'components/UploadCover/UploadCover'
import './QuickEditCard.scss'

export default function QuickEditCard(props) {
    const {
        card,
        cardTitle,
        saveCardTitle,
        saveCardCover,
        toggleShowEditCard,
        toggleShowQuickEditCard,
        uploadCover,
        cover,
    } = props

    const [newCardTitle, setNewCardTitle] = useState('')
    const [showUploadCover, setShowUploadCover] = useState(false)
    const newCardTitleRef = useRef(null)

    useEffect(() => {
        setNewCardTitle(cardTitle)
    }, [cardTitle])

    const changeCardTitle = (event) => setNewCardTitle(event.target.value)

    const handleSaveCardTitle = () => {
        const newCard = {
            ...card,
            title: newCardTitle,
        }
        saveCardTitle(newCard)
        toggleShowQuickEditCard()
    }

    const handleShowEditCarAndHideQuickEditCard = () => {
        toggleShowEditCard()
        toggleShowQuickEditCard()
    }

    const toggleShowUploadCover = () => {
        setShowUploadCover(!showUploadCover)
    }

    return (
        <>
            <div className="quick-card-editor">
                <span
                    className="quick-card-editor-close-icon"
                    onClick={toggleShowQuickEditCard}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </span>
                <div className="quick-card-editor-card">
                    <div className="card-quick-edit">
                        <div className="card-quick-image">
                            {cover && <img src={cover} alt="cover" />}
                        </div>
                        <div className="card-details">
                            <textarea
                                className="card-edit-title"
                                ref={newCardTitleRef}
                                value={newCardTitle}
                                onChange={changeCardTitle}
                            ></textarea>
                        </div>
                    </div>
                    <input
                        className="nch-button btn-primary"
                        type="submit"
                        onClick={handleSaveCardTitle}
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
                                Mở Thẻ
                            </span>
                        </div>
                        <div className="quick-card-editor-buttons-item">
                            <span className="icon-sm">
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span
                                className="quick-card-editor-buttons-item-text"
                                onClick={handleShowEditCarAndHideQuickEditCard}
                            >
                                Xóa Thẻ
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
                                Thay Đổi Bìa
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {showUploadCover && (
                <UploadCover
                    card={card}
                    cover={cover}
                    uploadCover={uploadCover}
                    saveCardCover={saveCardCover}
                    toggleShowUploadCover={toggleShowUploadCover}
                ></UploadCover>
            )}
        </>
    )
}
