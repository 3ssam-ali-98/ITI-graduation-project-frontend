import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";


function PremiumPage() {
	const history = useHistory();
	const token = sessionStorage.getItem("token");
	const handleUpgrade = async () => {

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/payment/",
					{},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			if (response.data.approval_url) {
				window.location.href = response.data.approval_url;
			}
		} catch (error) {
			console.error("Payment error:", error);
		}
	};

	return (
		<div className="container mt-5">
			<h1 className="text-center text-primary">🌟 Go Premium</h1>
			<p className="text-center fs-5 text-muted">Upgrade to premium and unlock powerful features tailored for you!</p>

			<div className="row mt-4">
				<div className="col-md-6">
					<h3 className="text-success">Premium Benefits</h3>
					<ul className="list-group list-group-flush">
						<li className="list-group-item bg-light">✔ Get email notifications when an employee is assigned a task</li>
						<li className="list-group-item bg-light">✔ Advanced task analysis and performance insights</li>
						<li className="list-group-item bg-light">✔ Priority support and dedicated assistance</li>
						<li className="list-group-item bg-light">✔ Access to premium reports and dashboards</li>
					</ul>
				</div>
				<div className="col-md-6">
					<h3 className="text-success">Pricing</h3>
					<div className="card p-4 shadow-lg border-0">
						<h4 className="text-center text-primary">$9.99/month</h4>
						<p className="text-center text-muted">Cancel anytime. No hidden fees.</p>
						<div className="text-center">
							<button className="btn btn-outline-primary btn-sm">Learn More</button>
						</div>
					</div>
				</div>
			</div>

			<div className="text-center mt-5">
				<h3 className="text-success">💳 Payment Method</h3>
				<button className="btn btn-success me-3 px-4 py-2" onClick={handleUpgrade}>Pay with PayPal</button>
				{/* Uncomment below for additional payment options */}
				{/* <button className="btn btn-primary px-4 py-2" onClick={() => alert("Redirecting to Stripe...")}>Pay with Credit Card</button> */}
			</div>

			<div className="text-center mt-4">
				<button className="btn btn-secondary px-4 py-2" onClick={() => history.push('/')}>⬅ Go Back</button>
			</div>
		</div>
	);
}

export default PremiumPage;
