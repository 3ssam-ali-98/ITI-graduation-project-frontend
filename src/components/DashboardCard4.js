// import paypalIcon from "../assets/paypal.png"
// import walletIcon from "../assets/wallet-icon.png"
// import clockIcon from "../assets/clock-icon.png"
// import ccIcon from "../assets/cc.png"


function DashboardCard4({ cardNumber, cardPercent }) {
	return (
		<div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
			<div className="card">
				<div className="card-body">
					<div className="d-flex justify-content-between flex-sm-row flex-column gap-3" style={{position: "relative"}}>
						<div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
							<div className="card-title">
								<h5 className="text-nowrap mb-2">Year Report</h5>
								<span className="badge text-bg-warning rounded-pill">Year 2024</span>
							</div>

							<div className="mt-sm-auto">
								<small className="text-success text-nowrap fw-semibold"><i className="bx bx-chevron-up"></i> {cardPercent}%</small>
								<h3 className="mb-0">${cardNumber}</h3>
							</div>
						</div>

						<div className="resize-triggers"><div className="expand-trigger"><div style={{width: "290px", height: "117px"}}></div></div><div className="contract-trigger"></div></div></div>
				</div>
			</div>
		</div>
	);
}

export default DashboardCard4;
