// import MovieCard from "../components/MovieCardCP";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PrimaryInfoCard from "../components/PrimaryInfoCard";
import SecondryInfoCard from "../components/SecondryInfoCard";
import clockIcon from "../assets/clock-icon.png"
import walletIcon from "../assets/wallet-icon.png"
import DashboardCard2 from "../components/DashboardCard2";
import DashboardCard3 from "../components/DashboardCard3";
import DashboardCard4 from "../components/DashboardCard4";
import { useSelector} from 'react-redux';

function Dashboard() {

	const name = useSelector((state) => state.user.name)
    const id = useSelector((state) => state.user.id)
	return (
		<>
		<div className="container">

			<div className="row mt-5">
				<PrimaryInfoCard ownerName={name} cardPercent="72" businessId={id} />
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
		</>
	);
}
export default Dashboard;
