import Navbar from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'

function UserInfomation(props) {
    const { user, handleClickLogout } = props

    return (
        <Navbar>
            <NavDropdown
                title={<img src={user.avatar} className="userAvatar" alt="" />}
                className="menus information-navbar"
            >
                <div className="information-title">
                    <div className="account-menu">
                        <h2>Tài Khoản</h2>
                        <div className="account-detail">
                            <div className="detail-image me-2">
                                <img
                                    src={user.avatar}
                                    className="userAvatar"
                                    alt=""
                                />
                            </div>
                            <div className="detail-username">
                                <div>{user.fullName}</div>
                                <div>{user.username}</div>
                            </div>
                        </div>
                        <div className="user-line"></div>
                        <h2>Thông Tin Tài Khoản</h2>
                        <div className="account-profile">
                            <div className="profile">
                                <Link href={'/'}>Chỉnh sửa tài khoản</Link>
                            </div>
                            <div className="user-line"></div>
                        </div>
                        <div
                            className="account-logout"
                            onClick={handleClickLogout}
                        >
                            <div className="profile">
                                <span>Đăng xuất</span>
                            </div>
                        </div>
                    </div>
                </div>
            </NavDropdown>
        </Navbar>
    )
}

export default UserInfomation
