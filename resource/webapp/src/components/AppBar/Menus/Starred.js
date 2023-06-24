import Navbar from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

function Starred() {
    return (
        <Navbar>
            <NavDropdown title="Starred" className="menus starred">
                <NavDropdown.Item></NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    )
}

export default Starred
