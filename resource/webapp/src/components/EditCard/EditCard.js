import { React, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChalkboard,
    faXmark,
    faBars,
} from '@fortawesome/free-solid-svg-icons'
import ReactQuill from 'react-quill'
import HTMLReactParser from 'html-react-parser'

import 'react-quill/dist/quill.snow.css'
import './EditCard.scss'

export default function EditCard(props) {
    const {
        card,
        cardTitle,
        cardDescription,
        toggleShowEditCard,
        saveCardTitle,
        saveCardDescription,
    } = props
    const [value, setValue] = useState('')
    const [newCardTitle, setNewCardTitle] = useState('')
    const [toggleNewDesciption, setToggleNewDesciption] = useState(false)
    const refDescription = useRef(null)

    useEffect(() => {
        setNewCardTitle(cardTitle)
    }, [cardTitle])

    useEffect(() => {
        setValue(cardDescription)
    }, [cardDescription])

    const changeCardTitle = (event) => setNewCardTitle(event.target.value)

    const handleBlurCardTitle = () => {
        const newCard = {
            ...card,
            title: newCardTitle,
        }
        saveCardTitle(newCard)
    }

    const toggleChangeDescription = () => {
        setToggleNewDesciption(!toggleNewDesciption)
    }

    useEffect(() => {
        if (refDescription.current && refDescription) {
            refDescription.current.focus()
        }
    }, [toggleNewDesciption])

    const handleSaveDescription = () => {
        const newCard = {
            ...card,
            description: value,
        }
        saveCardDescription(newCard)
        toggleChangeDescription()
    }

    return (
        <div className="window-overlay">
            <div className="window">
                <div className="window-wrapper">
                    <button className="icon-close" onClick={toggleShowEditCard}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div className="card-detail-window">
                        <div className="card-detail-header">
                            <span className="card-header-icon icon-lg">
                                <FontAwesomeIcon icon={faChalkboard} />
                            </span>
                            <div className="card-header-title">
                                <textarea
                                    className="card-header-title-input"
                                    value={newCardTitle}
                                    onChange={changeCardTitle}
                                    onBlur={handleBlurCardTitle}
                                ></textarea>
                            </div>
                        </div>
                        <div className="card-detail-col">
                            <div className="card-detail-description">
                                <div className="descripition-title">
                                    <span className="icon-description icon-lg">
                                        <FontAwesomeIcon icon={faBars} />
                                    </span>
                                    <h3>Description</h3>
                                    {cardDescription != null && (
                                        <div className="editable">
                                            <div
                                                className="nch-button edit-button"
                                                onClick={
                                                    toggleChangeDescription
                                                }
                                            >
                                                Edit
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="gutter">
                                    <div style={{ display: 'block' }}>
                                        <div className="description-content">
                                            {!toggleNewDesciption &&
                                                cardDescription == null && (
                                                    <div
                                                        className="description-fake-text-area"
                                                        onClick={
                                                            toggleChangeDescription
                                                        }
                                                    >
                                                        Add a more detailed
                                                        description…
                                                    </div>
                                                )}
                                            {!toggleNewDesciption &&
                                                cardDescription != null && (
                                                    <div
                                                        style={{
                                                            color: '#b6c2cf',
                                                        }}
                                                        onClick={
                                                            toggleChangeDescription
                                                        }
                                                    >
                                                        {HTMLReactParser(
                                                            cardDescription
                                                        )}
                                                    </div>
                                                )}
                                            {toggleNewDesciption && (
                                                <div className="description-edit">
                                                    <div className="description-editor">
                                                        <ReactQuill
                                                            ref={refDescription}
                                                            theme="snow"
                                                            value={value}
                                                            onChange={setValue}
                                                        />
                                                    </div>
                                                    <div className="edit-controls">
                                                        <input
                                                            className="nch-button submit-edit btn-primary"
                                                            type="submit"
                                                            onClick={
                                                                handleSaveDescription
                                                            }
                                                            value={'Save'}
                                                        ></input>
                                                        <input
                                                            className="nch-button nch-button--subtle"
                                                            type="button"
                                                            onClick={
                                                                toggleChangeDescription
                                                            }
                                                            value={'Cancel'}
                                                        ></input>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
