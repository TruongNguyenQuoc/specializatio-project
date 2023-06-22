import NavDropdown from 'react-bootstrap/NavDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavBarCustom = (props) => {
    const { title, navDescription, navItem } = props

    return (
        <NavDropdown title={title} className="tab-item" id="basic-nav-dropdown">
            <div className="tab-details">
                {navDescription && <h3>{navDescription}</h3>}
                <div className="nav-group">
                    {navItem.map((item) => (
                        <NavDropdown.Item key={item.id} className="nav-link">
                            <div className="nav-container">
                                <div className="nav-icon">
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                    ></FontAwesomeIcon>
                                </div>
                                <p className="nav-tittle">{item.title}</p>
                            </div>
                            <div className="nav-description">
                                <p>{item.description}</p>
                            </div>
                        </NavDropdown.Item>
                    ))}
                </div>
            </div>
        </NavDropdown>
    )
}

export default NavBarCustom
