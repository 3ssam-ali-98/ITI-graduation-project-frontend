import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-4 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>Providing top-notch management solutions tailored for your needs.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/privacy" className="text-white">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-white">Terms of Service</Link></li>
                            <li><Link to="/contact" className="text-white">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <div className="d-flex justify-content-center gap-3">
                            <a href="https://facebook.com" className="text-white">
                                <i className="bi bi-facebook fs-3"></i>
                            </a>
                            <a href="https://twitter.com" className="text-white">
                                <i className="bi bi-twitter fs-3"></i>
                            </a>
                            <a href="https://instagram.com" className="text-white">
                                <i className="bi bi-instagram fs-3"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="bg-light" />
                <p className="mb-0">&copy; {new Date().getFullYear()} Management App. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;