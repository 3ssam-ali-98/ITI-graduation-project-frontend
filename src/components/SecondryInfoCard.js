import { Link } from "react-router-dom";


function SecondryInfoCard({ cardHeader, cardNumber, cardPercentage, cardIcon }) {
	return (
		<div className="col-lg-6 col-md-12 col-6 mb-4">
			<div className="card">
				<div className="card-body">
					<div className="card-title d-flex align-items-start justify-content-between">
						<div className="avatar flex-shrink-0">
							<img src={cardIcon} alt="chart success" className="rounded" width="40" height="40" />
						</div>
					</div>
					<span className="fw-semibold d-block mb-1">{ cardHeader }</span>
					<h3 className="card-title mb-2">${ cardNumber }</h3>
					<small className="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> +{ cardPercentage }%</small>
				</div>
			</div>
		</div>

	);
}

export default SecondryInfoCard;
