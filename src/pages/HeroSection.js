import HeroPic from '../assets/Free-web-apps-scaled.jpg';

function HeroSection() {
	return (
		<section
			className="py-5 text-center text-white"
			id="hero-section"
			style={{
				backgroundImage: `url(${HeroPic})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: "70vh",
				width: "100%",
				margin: 0,
				padding: 0,
				backgroundColor: "rgba(0, 0, 0, 0.6)",
				backgroundBlendMode: "overlay",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div className="container py-5">
				<h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
					Manage Your Business with Ease
				</h1>
				<p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
					A powerful management tool for businesses of all sizes.
				</p>
				<a
					href="/register"
					className="btn btn-primary btn-lg"
					style={{
						backgroundColor: "#007bff",
						border: "none",
						padding: "0.75rem 1.5rem",
						fontSize: "1rem",
						borderRadius: "0.5rem",
					}}
				>
					Get Started
				</a>
			</div>
		</section>
	);
}

export default HeroSection;