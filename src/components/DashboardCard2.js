

function DashboardCard2({ }) {
	return (
		<div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
			<div className="card h-100">
				<div className="card-header d-flex align-items-center justify-content-between pb-0">
					<div className="card-title mb-0">
						<h5 className="m-0 me-2">Statistics</h5>
						<span className="badge badge-small text-bg-primary mb-2">42.82k Total Sales</span>
					</div>

				</div>
				<div className="card-body">
					<div className="d-flex justify-content-between align-items-center mb-3" style={{position: "relative"}}>
						<div className="d-flex flex-column align-items-center gap-1">
							<h2 className="mb-2 text-primary">8,258</h2>
							<span>Total Orders</span>
						</div>
						
					</div>
					<ul className="p-0 m-0">

						<li className="d-flex mb-4 pb-1">
							<div className="avatar flex-shrink-0 me-3">
								<span className="avatar-initial rounded text-bg-primary"><i className="bx bx-mobile-alt"></i></span>
							</div>
							<div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
								<div className="me-2">
									<h6 className="mb-0">Electronic</h6>
									<small className="text-muted">Mobile, Earbuds, TV</small>
								</div>
								<div className="user-progress">
									<small className="fw-semibold text-success">$82.5k</small>
								</div>
							</div>
						</li>

						<li className="d-flex mb-4 pb-1">
							<div className="avatar flex-shrink-0 me-3">
								<span className="avatar-initial rounded bg-label-success"><i className="bx bx-closet"></i></span>
							</div>
							<div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
								<div className="me-2">
									<h6 className="mb-0">Fashion</h6>
									<small className="text-muted">T-shirt, Jeans, Shoes</small>
								</div>
								<div className="user-progress">
									<small className="fw-semibold text-success">$23.8k</small>
								</div>
							</div>
						</li>

						<li className="d-flex mb-4 pb-1">
							<div className="avatar flex-shrink-0 me-3">
								<span className="avatar-initial rounded bg-label-info"><i className="bx bx-home-alt"></i></span>
							</div>
							<div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
								<div className="me-2">
									<h6 className="mb-0">Decor</h6>
									<small className="text-muted">Fine Art, Dining</small>
								</div>
								<div className="user-progress">
									<small className="fw-semibold text-success">$849k</small>
								</div>
							</div>
						</li>

						<li className="d-flex">
							<div className="avatar flex-shrink-0 me-3">
								<span className="avatar-initial rounded bg-label-secondary"><i className="bx bx-football"></i></span>
							</div>
							<div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
								<div className="me-2">
									<h6 className="mb-0">Sports</h6>
									<small className="text-muted">Football, Cricket Kit</small>
								</div>
								<div className="user-progress">
									<small className="fw-semibold text-success">$99</small>
								</div>
							</div>
						</li>

					</ul>
				</div>
			</div>
		</div>

	);
}

export default DashboardCard2;
