import { React, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import './UploadCover.scss'

export default function UploadCover(props) {
    const { card, toggleShowUploadCover } = props

    const [cover, setCover] = useState('')

    useEffect(() => {
        setCover(card.cover)
    }, [card.cover])

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
                    <h4 className="cover-content-title">Attachments</h4>
                    <div className="cover-content-overplay">
                        {cover != null && (
                            <img className="image" src={cover} alt={cover} />
                        )}
                    </div>
                    <div className="over-content-upload">
                        <input id="file" type="file" accept="image/*"></input>
                        <label for="file" className="button-upload">
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
