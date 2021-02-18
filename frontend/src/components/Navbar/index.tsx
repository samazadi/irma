import { Navbar as BsNavbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./index.scss";

const Navbar = () => {
    return (
        <div className="navbar-wrapper">
            <BsNavbar expand="lg" variant="dark">
                <BsNavbar.Brand></BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="mx-3 nav-link" to="/">Home</Link>
                        <Link className="mx-3 nav-link" to="/search">Search</Link>
                        <Link className="mx-3 nav-link" to="/returns">Returns</Link>
                        <Link className="mx-3 nav-link" to="/donate">Donate</Link>
                        <Link className="mx-3 nav-link" to="/reports">Reports</Link>
                    </Nav>
                </BsNavbar.Collapse>
            </BsNavbar>
        </div>
    )
}

export default Navbar;