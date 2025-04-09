function ServiceCard(props) {
	return (
		<div className="col-md-4">
			<div
				className="card h-100 shadow-sm"
				style={{
					borderRadius: "10px",
					transition: "transform 0.3s, box-shadow 0.3s",
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.transform = "scale(1.05)";
					e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.transform = "scale(1)";
					e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
				}}
			>
				<div className="card-body text-center">
					<h5
						className="card-title"
						style={{
							color: "#4D869C",
							fontWeight: "bold",
							marginBottom: "15px",
						}}
					>
						{props.title}
					</h5>
					<p
						className="card-text"
						style={{
							color: "#7AB2B2",
							fontSize: "14px",
							lineHeight: "1.6",
						}}
					>
						{props.description}
					</p>
				</div>
			</div>
		</div>
	);
}

export default ServiceCard;