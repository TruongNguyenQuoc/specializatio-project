import React from 'react'

import './Card.scss'

export default function Card(props) {
    const { card } = props

    return (
        <div className="card-item">
            {card.cover && (
                <div className="card-image">
                    <img src={card.cover} alt={card.title} />
                </div>
            )}
            <div className="card-detail">
                <span className="card-title">{card.title}</span>
            </div>
        </div>
    )
}
