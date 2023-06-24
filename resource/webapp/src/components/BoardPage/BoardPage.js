import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import AddNewBoard from 'components/Common/AddNewBoard'
import BoardLogo from 'images/boards.svg'
import APIService from 'api/ApiService'
import { USER_DATA } from 'ultil/constants'
import './BoardPage.scss'

function BoardPage() {
    const navigate = useNavigate()
    const account = JSON.parse(localStorage.getItem(USER_DATA))

    const onSaveBoard = (values) => {
        const newBoard = {
            ...values,
            destroy: false,
            accountId: account.id,
        }
        APIService.saveBoard(newBoard).then((result) => {
            const { status, data } = result
            if (status === 200) {
                navigate(`/board/${data.data.id}`)
            }
            if (status === 403) {
                navigate('/login')
            }
        })
    }

    let listBoard = []

    APIService.getBoardByAccount(account.id).then((result) => {
        const { status, data } = result
        if (status === 200) {
            listBoard = data.data
        }
        if (status === 403) {
            navigate('/login')
        }
    })

    return (
        <div className="home-container">
            <Container>
                <Row>
                    <Col className="col-lg-3">
                        <div className="home-left-sidebar-container">
                            <ul className="board-list">
                                <div className="sidebar-content d-flex">
                                    <div className="content-title">
                                        <span>Danh Sách Bảng</span>
                                    </div>
                                    <AddNewBoard
                                        onSaveBoard={onSaveBoard}
                                    ></AddNewBoard>
                                </div>
                                <li className="boards-item mb-1">
                                    <Link
                                        href={'/'}
                                        className="boards-item-link"
                                    >
                                        <div className="boards-image">
                                            <img
                                                src={BoardLogo}
                                                alt="board logo"
                                            />
                                        </div>
                                        <span>Board</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col className="col-lg-9">
                        <div className="all-boards">
                            <div className="board-page">
                                <h3 className="board-page-header">
                                    Bảng của bạn
                                </h3>
                                <div className="board-page-section">
                                    <ul className="board-page-section-list p-0">
                                        {listBoard.toString() !==
                                        [].toString() ? (
                                            listBoard.map((board, index) => (
                                                <li
                                                    key={index}
                                                    className="boards-page-section-list-item"
                                                >
                                                    <Link
                                                        to={`/board/${board.id}`}
                                                        className="board-title"
                                                    >
                                                        <div className="board-title-detail">
                                                            <span className="board-title-detail-name">
                                                                {board.title}
                                                            </span>
                                                            <div className="board-tile-detail-sub-container"></div>
                                                        </div>
                                                    </Link>
                                                    <div className="board-bottom u-clearfix"></div>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="boards-page-section-list-item">
                                                <div className="board-tile mod-add">
                                                    <span>
                                                        Create new board
                                                    </span>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BoardPage
