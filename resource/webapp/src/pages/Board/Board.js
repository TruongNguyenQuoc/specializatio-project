import { React, useEffect, useState, createContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import AppBar from 'components/AppBar/AppBar'
import BoardBard from 'components/BoardBar/BoardBar'
import BoardColumn from 'components/BoardColumn/BoardColumn'
import EditCard from 'components/EditCard/EditCard'
import QuickEditCard from 'components/QuickEditCard/QuickEditCard'
import * as actionType from 'ultil/constants'
import APIService from 'api/ApiService'

export const BoardContext = createContext({})

function Board() {
    const { boardId } = useParams()
    // const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'Boards | Trello'
    }, [])
    const [board, setBoard] = useState({})
    const [card, setCard] = useState({})
    const [cardTitle, setCardTitle] = useState('')
    const [cardDescription, setCardDescription] = useState('')
    const [cover, setCover] = useState(null)
    const [showEditCard, setShowEditCard] = useState(false)
    const [showQuickEditCard, setShowQuickEditCard] = useState(false)

    const logout = () => {
        // dispatch({ type: actionType.LOGOUT })
        navigate('/login')
        setBoard(null)
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem(actionType.ACCESS_TOKEN))
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
        if (boardId) {
            APIService.getBoardById(boardId).then((request) => {
                const { status, data } = request
                if (status === 200) {
                    setBoard(data.data)
                }
            })
        }
    }, [location])

    const handleShowEditCard = (card, cardTitle, cardDescription, value) => {
        setShowEditCard(!value)
        setCard(card)
        setCardTitle(cardTitle)
        setCardDescription(cardDescription)
    }

    const handleShowQuickEditCard = (card, cardTitle, cover, value) => {
        setShowQuickEditCard(!value)
        setCard(card)
        setCardTitle(cardTitle)
        setCover(cover)
    }

    const toggleShowEditCard = () => {
        setShowEditCard(!showEditCard)
    }

    const toggleShowQuickEditCard = () => {
        setShowQuickEditCard(!showQuickEditCard)
    }

    const saveCardTitle = (newCard) => {
        APIService.saveCard(newCard)
        setCardTitle(newCard.cardTitle)
    }

    const saveCardDescription = (newCard) => {
        APIService.saveCard(newCard)
        setCardDescription(newCard.description)
    }

    const saveCardCover = (newCard) => {
        APIService.saveCard(newCard)
        setCover(newCard.cover)
    }

    const uploadCover = (formData, imagePreview) => {
        setCover(imagePreview)
        APIService.upload(formData)
    }

    return (
        <div className="trello-master">
            <BoardContext.Provider
                value={{
                    board: board,
                    handleShowEditCard: handleShowEditCard,
                    handleShowQuickEditCard: handleShowQuickEditCard,
                }}
            >
                <AppBar></AppBar>
                <BoardBard></BoardBard>
                <BoardColumn></BoardColumn>
            </BoardContext.Provider>
            {showEditCard && (
                <EditCard
                    card={card}
                    cardTitle={cardTitle}
                    cardDescription={cardDescription}
                    toggleShowEditCard={toggleShowEditCard}
                    saveCardTitle={saveCardTitle}
                    saveCardDescription={saveCardDescription}
                ></EditCard>
            )}
            {showQuickEditCard && (
                <QuickEditCard
                    card={card}
                    cover={cover}
                    cardTitle={cardTitle}
                    saveCardTitle={saveCardTitle}
                    saveCardCover={saveCardCover}
                    uploadCover={uploadCover}
                    toggleShowEditCard={toggleShowEditCard}
                    toggleShowQuickEditCard={toggleShowQuickEditCard}
                ></QuickEditCard>
            )}
        </div>
    )
}

export default Board
