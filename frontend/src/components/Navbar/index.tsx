import { Navbar as BsNavbar, Nav } from 'react-bootstrap';
import "./index.scss";

const Navbar = () => {
    return (
        <div className="navbar-wrapper">
            <BsNavbar expand="lg" variant="dark">
                <BsNavbar.Brand href="#home"></BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="mx-3" href="#home">Home</Nav.Link>
                        <Nav.Link className="mx-3" href="#link">Search</Nav.Link>
                        <Nav.Link className="mx-3" href="#link">Returns</Nav.Link>
                        <Nav.Link className="mx-3" href="#link">Donate</Nav.Link>
                        <Nav.Link className="mx-3" href="#link">Reports</Nav.Link>
                    </Nav>
                </BsNavbar.Collapse>
            </BsNavbar>
        </div>
    )
}

export default Navbar;