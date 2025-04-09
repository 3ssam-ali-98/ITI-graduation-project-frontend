import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="bg-dark text-white text-center py-5">
			<div className="container">
				<div className="row">
					<div className="col-md-4 mb-4">
						<h5 className="fw-bold">About Us</h5>
						<p className="small">Providing top-notch management solutions tailored for your needs.</p>
					</div>
					<div className="col-md-4 mb-4">
						<h5 className="fw-bold">Quick Links</h5>
						<ul className="list-unstyled">
							<li>
								<Link to="/privacy" className="text-white text-decoration-none hover-underline">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link to="/terms" className="text-white text-decoration-none hover-underline">
									Terms of Service
								</Link>
							</li>
							<li>
								<Link to="/contact" className="text-white text-decoration-none hover-underline">
									Contact Us
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-md-4 mb-4">
						<h5 className="fw-bold">Follow Us</h5>
						<div className="d-flex justify-content-center gap-4">
							<a href="https://facebook.com" className="text-white text-decoration-none hover-scale">
								<i className="bi bi-facebook fs-3"></i>
							</a>
							<a href="https://twitter.com" className="text-white text-decoration-none hover-scale">
								<i className="bi bi-twitter fs-3"></i>
							</a>
							<a href="https://instagram.com" className="text-white text-decoration-none hover-scale">
								<i className="bi bi-instagram fs-3"></i>
							</a>
						</div>
					</div>
				</div>
				<hr className="bg-light" />
				<p className="mb-0 small">&copy; {new Date().getFullYear()} Management App. All rights reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;