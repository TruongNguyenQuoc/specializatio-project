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
        cardTittle,
        description,
        toggleEditCard,
        saveCardTittle,
        saveCardDescription,
    } = props
    const [value, setValue] = useState('')
    const [newCardTittle, setNewCardTittle] = useState('')
    const [toggleNewDesciption, setToggleNewDesciption] = useState(false)
    const refDescription = useRef(null)

    useEffect(() => {
        setNewCardTittle(cardTittle)
    }, [cardTittle])

    useEffect(() => {
        setValue(description)
    }, [description])

    const changeCardTitle = (event) => setNewCardTittle(event.target.value)

    const handleBlurCardTitle = () => {
        const newCard = {
            ...card,
            title: newCardTittle,
        }
        saveCardTittle(newCard)
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
                    <button className="icon-close" onClick={toggleEditCard}>
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
                                    value={newCardTittle}
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
                                    {description != null && (
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
                                                description == null && (
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
                                                description != null && (
                                                    <div
                                                        className="description-fake-text-area"
                                                        onClick={
                                                            toggleChangeDescription
                                                        }
                                                    >
                                                        {HTMLReactParser(
                                                            description
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
