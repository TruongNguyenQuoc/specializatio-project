import Navbar from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

function Recents() {
    return (
        <Navbar>
            <NavDropdown title="Recents" className="menus recents">
                <NavDropdown.Item></NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    )
}

export default Recents
