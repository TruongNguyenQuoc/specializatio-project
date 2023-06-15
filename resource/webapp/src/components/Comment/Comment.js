import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'

import './Comment.scss'

export default function Comment(props) {
    return (
        <div className="window-module">
            <div className="descripition-title">
                <span className="icon-description icon-lg">
                    <FontAwesomeIcon icon={faComments} />
                </span>
                <h3>Comment</h3>
            </div>
            <div className="new-comment"></div>
        </div>
    )
}
