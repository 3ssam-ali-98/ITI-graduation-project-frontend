import React from "react";

function ContactUs() {
	return (
		<section className="py-5 text-center" style={{ backgroundColor: "#EEF7FF" }} id="contact">
			<div className="container">
				<h2 style={{ color: "#4D869C", fontWeight: "bold", marginBottom: "20px" }}>Contact Us</h2>
				<p style={{ color: "#7AB2B2", fontSize: "18px", marginBottom: "30px" }}>
					We'd love to hear from you! Reach out to us via email or phone.
				</p>
				<div style={{ marginBottom: "30px" }}>
					<p style={{ color: "#4D869C", fontSize: "16px", margin: "5px 0" }}>
						<strong>Email:</strong> support@managementapp.com
					</p>
					<p style={{ color: "#4D869C", fontSize: "16px", margin: "5px 0" }}>
						<strong>Phone:</strong> +123 456 7890
					</p>
				</div>
				<form style={{ maxWidth: "500px", margin: "0 auto", textAlign: "left" }}>
					<div style={{ marginBottom: "15px" }}>
						<label htmlFor="name" style={{ display: "block", marginBottom: "5px", color: "#4D869C" }}>
							Name
						</label>
						<input
							type="text"
							id="name"
							className="form-control"
							placeholder="Enter your name"
							style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
						/>
					</div>
					<div style={{ marginBottom: "15px" }}>
						<label htmlFor="email" style={{ display: "block", marginBottom: "5px", color: "#4D869C" }}>
							Email
						</label>
						<input
							type="email"
							id="email"
							className="form-control"
							placeholder="Enter your email"
							style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
						/>
					</div>
					<div style={{ marginBottom: "15px" }}>
						<label htmlFor="message" style={{ display: "block", marginBottom: "5px", color: "#4D869C" }}>
							Message
						</label>
						<textarea
							id="message"
							className="form-control"
							placeholder="Enter your message"
							rows="4"
							style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
						></textarea>
					</div>
					<button
						type="submit"
						className="btn btn-primary"
						style={{
							backgroundColor: "#4D869C",
							color: "#fff",
							padding: "10px 20px",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
						}}
					>
						Send Message
					</button>
				</form>
			</div>
		</section>
	);
}

export default ContactUs;