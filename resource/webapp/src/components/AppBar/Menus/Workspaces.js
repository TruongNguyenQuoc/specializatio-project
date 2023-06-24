import Navbar from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

function Workspaces() {
    return (
        <Navbar>
            <NavDropdown title="Workspaces" className="menus workspaces">
                <NavDropdown.Item></NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    )
}

export default Workspaces
