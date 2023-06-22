import { React, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import './UploadCover.scss'

export default function UploadCover(props) {
    const { card, cover, uploadCover, saveCardCover, toggleShowUploadCover } =
        props
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(() => {
        setImagePreview(cover)
    }, [cover])

    const handleUploadCover = (e) => {
        e.preventDefault()
        let file = e.target.files[0]
        const formData = new FormData()
        formData.append('imageFile', file)
        formData.append('cardId', card.id)
        setImagePreview(URL.createObjectURL(file))
        uploadCover(formData, URL.createObjectURL(file))
    }

    const handleDeleteCover = () => {
        setImagePreview(null)
        const newCard = {
            ...card,
            cover: null,
        }
        saveCardCover(newCard)
    }

    return (
        <div className="pop-over">
            <div className="pop-over-header">
                <span className="pop-over-header-title">Cover</span>
                <span
                    className="pop-over-header-close-btn icon-sm"
                    onClick={toggleShowUploadCover}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>
            <div>
                <div className="pop-over-content">
                    <div className="cover-content">
                        <h4 className="cover-content-title">Attachments</h4>
                        {cover !== null && (
                            <span
                                className="cover-content-delete"
                                onClick={handleDeleteCover}
                            >
                                Delete
                            </span>
                        )}
                    </div>
                    <div className="cover-content-overplay">
                        {cover !== null && (
                            <img
                                className="image"
                                src={
                                    imagePreview !== null ? imagePreview : cover
                                }
                                alt={cover}
                            />
                        )}
                    </div>
                    <div className="over-content-upload">
                        <input
                            id="file"
                            type="file"
                            accept="image/*"
                            onChange={handleUploadCover}
                        ></input>
                        <label htmlFor="file" className="button-upload">
                            Upload a cover image
                        </label>
                        <div className="over-content-footer">
                            By using images from Unsplash, you agree to their
                            <span> license </span>
                            and
                            <span> Terms of Service</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
