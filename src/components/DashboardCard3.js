import paypalIcon from "../assets/paypal.png"
import walletIcon from "../assets/wallet-icon.png"
import clockIcon from "../assets/clock-icon.png"
import ccIcon from "../assets/cc.png"


function DashboardCard3({ }) {
	return (
		<div className="col-md-6 col-lg-4 mb-4">
			<div className="card">
				<div className="card-header d-flex align-items-center justify-content-between">
					<h5 className="card-title m-0 me-2">Transactions</h5>
				</div>
				<div className="card-body">
					<ul className="p-0 m-0">
						<li className="d-flex mb-4 pb-1">
							<div className="avatar flex-shrink-0 me-3">
								<img src={paypalIcon} alt="User" className="rounded" width="40" height="40" />
							</div>
							<div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
								<div className="me-2">
									<small className="text-muted d-block mb-1">Paypal</small>
									<h6 className="mb-0 text-muted">Send money</h6>
								</div>
								<div className="user-progress d-flex align-items-center gap-1">
									<h6 className="mb-0 text-success">+82.6</h6>
									<span className="text-muted">USD</span>
								</div>
							</div>
						</li>
						<li className="d-flex mb-4 pb-1">
							<div className="avatar flex-shrink-0 me-3">
								<img src={walletIcon} alt="User" className="rounded" width="40" height="40" />
							</div>
							<div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
								<div className="me-2">
									<small className="text-muted d-block mb-1">Wallet</small>
									<h6 className="mb-0 text-muted">Mac'D</h6>
								</div>
								<div className="user-progress d-flex align-items-center gap-1">
									<h6 className="mb-0 text-success">+270.69</h6>
									<span className="text-muted">USD</span>
								</div>
							</div>
						</li>
						<li className="d-flex mb-4 pb-1">
							<div className="avatar flex-shrink-0 me-3">
								<img src={clockIcon} alt="User" className="rounded" width="40" height="40" />
							</div>
							<div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
								<div className="me-2">
									<small className="text-muted d-block mb-1">Transfer</small>
									<h6 className="mb-0 text-muted">Refund</h6>
								</div>
								<div className="user-progress d-flex align-items-center gap-1">
									<h6 className="mb-0 text-success">+637.91</h6>
									<span className="text-muted">USD</span>
								</div>
							</div>
						</li>
						<li className="d-flex pb-1">
							<div className="avatar flex-shrink-0 me-3">
								<img src={ccIcon} alt="User" className="rounded" width="40" height="40" />
							</div>
							<div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
								<div className="me-2">
									<small className="text-muted d-block mb-1">Credit Card</small>
									<h6 className="mb-0 text-muted">Expneses</h6>
								</div>
								<div className="user-progress d-flex align-items-center gap-1">
									<h6 className="mb-0 text-danger">-838.71</h6>
									<span className="text-muted">USD</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>

	);
}

export default DashboardCard3;
