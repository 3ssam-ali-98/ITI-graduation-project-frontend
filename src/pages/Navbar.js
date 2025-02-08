import { useHistory } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

function Navbar() {
    const history = useHistory();
    return (
        <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#4D869C" }}>
            <div className="container">
                <HashLink className="navbar-brand text-white" smooth to="/">Management App</HashLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><HashLink className="nav-link text-white" smooth to="/#hero-section">Home</HashLink></li>
                        <li className="nav-item"><HashLink className="nav-link text-white" smooth to="/#services">Services</HashLink></li>
                        <li className="nav-item"><HashLink className="nav-link text-white" smooth to="/#about">About Us</HashLink></li>
                        <li className="nav-item"><HashLink className="nav-link text-white" smooth to="/#contact">Contact Us</HashLink></li>
                    </ul>
                    <div className="d-flex gap-2">
                    <button className="btn btn-light" onClick={() => history.push('/login')}>Login</button>
                    <button className="btn btn-primary" onClick={() => history.push('/register')}>Register</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
