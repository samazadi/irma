import "./index.scss";

const Navbar = () => {
    return (
        <div className="navbar-wrapper">
            <nav className="navbar navbar-dark  navbar-expand-lg">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-3">
                                <a className="nav-link active" aria-current="page" href="www.google.com">Home</a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link" href="www.google.com">Reports</a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link" href="www.google.com">Rental</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;