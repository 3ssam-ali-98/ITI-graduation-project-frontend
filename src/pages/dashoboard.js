// import MovieCard from "../components/MovieCardCP";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PrimaryInfoCard from "../components/PrimaryInfoCard";
import SecondryInfoCard from "../components/SecondryInfoCard";
import clockIcon from "../assets/clock-icon.png"
import walletIcon from "../assets/wallet-icon.png"
import DashboardCard2 from "../components/DashboardCard2";
import DashboardCard3 from "../components/DashboardCard3";
import DashboardCard4 from "../components/DashboardCard4";

function Dashboard() {
	return (
		<>
		<div className="container">

			<div className="row mt-5">
				<PrimaryInfoCard />
					<div className="col-lg-4 col-md-4 order-1">
						<div className="row">
							<SecondryInfoCard cardHeader="Profit" cardNumber="12,628" cardPercentage="72.34" cardIcon={clockIcon} />
							<SecondryInfoCard cardHeader="Sales" cardNumber="4,679" cardPercentage="28.42" cardIcon={walletIcon} />
						</div>
					</div>
				
			</div>

			<div className="row mb-5">
				<DashboardCard2 totalOrders="8,258" totalSales="42.82" cardNumber1="82.5" cardNumber2="23.8" cardNumber3="849" cardNumber4="99" />
				<DashboardCard3 cardNumber1="234.21" cardNumber2="443.99" cardNumber3="87.11" cardNumber4="121.5" />
				<DashboardCard4 cardNumber="84,686k" cardPercent="68.2" />
			</div>

		</div>
			{/* <div className="row">
				<nav aria-label="Page navigation">
					<ul className="pagination">

						<li className="page-item">
							<Link className="page-link" to={``}>1</Link>
						</li>
						<li className="page-item">
							<Link className="page-link" to="">2</Link>
						</li>
						<li className="page-item active">
							<Link className="page-link" to="">3</Link>
						</li>
						<li className="page-item">
							<Link className="page-link" to="">4</Link>
						</li>
						<li className="page-item">
							<Link className="page-link" to="">5</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className="row">
				{
					moviesList.map((movie) => {
						return (
							<MovieCard
								title={movie.title}
								text={movie.overview}
								src={imgBaseURL + movie.poster_path}
								path={`/movie/${movie.id}`} />
						)

					})
				}
			</div> */}
		</>
	);
}
export default Dashboard;
