function AboutUs() {
	return (
		<section
			className="py-5 text-center"
			style={{
				backgroundColor: "#CDE8E5",
				padding: "3rem 1rem",
			}}
			id="about"
		>
			<div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
				<h2
					style={{
						color: "#4D869C",
						fontSize: "2rem",
						fontWeight: "bold",
						marginBottom: "1rem",
					}}
				>
					About Us
				</h2>
				<p
					style={{
						color: "#7AB2B2",
						fontSize: "1.2rem",
						lineHeight: "1.8",
					}}
				>
					We are committed to providing the best management solutions for businesses. Our team is dedicated to delivering innovative, efficient, and reliable services to help you achieve your goals.
				</p>
			</div>
		</section>
	);
}

export default AboutUs;