import { Link } from "react-router-dom";
import avatar from "../assets/man-with-laptop-light.png"


function PrimaryInfoCard({ ownerName, cardPercent, businessId }) {
	return (

		<div className="col-lg-8 mb-4 order-0">
			<div className="card">
				<div className="d-flex align-items-end row">
					<div className="col-sm-7">
						<div className="card-body">
							<h5 className="card-title text-primary">Congratulations { ownerName }! 🎉</h5>
							<p className="mb-4">
								You have done <span className="fw-bold">{ cardPercent }%</span> more sales today. Check your business analytics
							</p>
							<div className="gap-2 d-flex">
								<Link to={`/${businessId}/clients`} className="btn btn-sm btn-outline-primary">Manage Clients</Link>
								<Link to={`/${businessId}/tasks`} className="btn btn-sm btn-outline-primary">Manage Tasks</Link>
								<Link to={`/${businessId}/employees`} className="btn btn-sm btn-outline-primary">Manage Employees</Link>
							</div>
						</div>
					</div>
					<div className="col-sm-5 text-center text-sm-left">
						<div className="card-body pb-0 px-0 px-md-4">
							<img src={avatar} height="140" alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png" data-app-light-img="illustrations/man-with-laptop-light.png" />
						</div>
					</div>
				</div>
			</div>
		</div>

	);
}

export default PrimaryInfoCard;
