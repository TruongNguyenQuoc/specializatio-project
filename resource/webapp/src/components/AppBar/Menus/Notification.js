import Navbar from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Notification() {
    return (
        <Navbar>
            <NavDropdown
                title={<FontAwesomeIcon icon={faBell} />}
                className="menus"
            >
                <div className="notification-title">
                    <h2>Notifications</h2>
                </div>
                <div className="notification-line"></div>
                <div
                    className="notification-list"
                    style={{ minHeight: '285px' }}
                >
                    <h3>Không có thông báo</h3>
                </div>
            </NavDropdown>
        </Navbar>
    )
}

export default Notification
