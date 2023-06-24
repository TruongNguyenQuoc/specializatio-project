import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

import Workspaces from './Menus/Workspaces'
import Recents from './Menus/Recents'
import Starred from './Menus/Starred'
import Notification from './Menus/Notification'
import UserInfomation from './Menus/UserInfomation'
import NavbarLogo from 'images/d947df93bc055849898e.gif'
import './AppBar.scss'

export default function AppBar() {
    const navigate = useNavigate()
    let user = {}
    if (localStorage.getItem('userData') != null) {
        user = JSON.parse(localStorage.getItem('userData'))
    }

    const handleClickLogout = () => {
        localStorage.removeItem('userData')
        localStorage.removeItem('accessToken')
        navigate('/')
        window.location.reload()
    }

    return (
        <div className="header-container">
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to={`/user/${user && user.id}/boards`}>
                        <img src={NavbarLogo} alt="" />
                    </Link>
                </div>
                <div className="d-flex flex-row me-auto ms-1">
                    <Workspaces></Workspaces>
                    <Recents></Recents>
                    <Starred></Starred>
                </div>
                <div className="ms-auto d-flex">
                    <Form.Control type="text" placeholder="Tìm Kiếm" />
                    <div className="notification ms-2 me-2">
                        <Notification></Notification>
                    </div>
                    <div className="user-information ms-2 me-2">
                        <UserInfomation
                            user={user}
                            handleClickLogout={handleClickLogout}
                        ></UserInfomation>
                    </div>
                </div>
            </nav>
        </div>
    )
}
