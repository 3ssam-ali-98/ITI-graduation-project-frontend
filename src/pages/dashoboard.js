import PrimaryInfoCard from "../components/PrimaryInfoCard";
// import SecondryInfoCard from "../components/SecondryInfoCard";
// import clockIcon from "../assets/clock-icon.png"
// import walletIcon from "../assets/wallet-icon.png"
// import DashboardCard2 from "../components/DashboardCard2";
// import DashboardCard3 from "../components/DashboardCard3";
// import DashboardCard4 from "../components/DashboardCard4";
import { useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
// import axios from "axios";
import MyCard from "../components/MyCard";
import Pricing from "./Pricing";

function Dashboard() {


	const name = useSelector((state) => state.user.user.name)
  	// const id = useSelector((state) => state.user.user.id)
	// const state = useSelector((state) => state);
	const id = sessionStorage.getItem("id");
	const role = sessionStorage.getItem("role");
	const is_premium = sessionStorage.getItem("is_premuim") === "true";
	console.log(is_premium);
	const history = useHistory();
	
	
		useEffect(() => {
				if(!id)
					history.push('/')
			}, [id, history])

	// console.log(state);

	// useEffect(() => {
    //     axios.get("/api/task-insights/")
    //         .then((response) => {
    //             console.log("Task insights fetched:", response.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching task insights:", error);
    //         });
    // }, []);

	return (
		<>
			<div className="container">

				<div className="row mt-5 d-flex justify-content-center align-items-center">
					<PrimaryInfoCard ownerName={name} cardPercent="72" role={role} />
				</div>

				<h1 className="text-center mt-5 mb-4 display-4 text-primary">Business Analytics</h1>
				
				<div className="d-flex justify-content-center align-items-center">
					{is_premium ? (
						<div className="premium-card shadow-lg p-4 rounded">
							<MyCard />
						</div>
					) : (
						<div className="pricing-card shadow-sm p-4 rounded bg-light">
							<Pricing />
						</div>
					)}
				</div>

			</div>
		</>
	);
}
export default Dashboard;