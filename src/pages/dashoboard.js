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
import axios from "axios";
import MyCard from "../components/MyCard";

function Dashboard() {


	const name = useSelector((state) => state.user.user.name)
  	// const id = useSelector((state) => state.user.user.id)
	// const state = useSelector((state) => state);
	const id = sessionStorage.getItem("id");
	const role = sessionStorage.getItem("role");
	const history = useHistory();
	
	
		useEffect(() => {
				if(!id)
					history.push('/')
			}, [id, history])

	// console.log(state);

	useEffect(() => {
        axios.get("/api/task-insights/")
            .then((response) => {
                console.log("Task insights fetched:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching task insights:", error);
            });
    }, []);

	return (
		<>
		<div className="container">

			<div className="row mt-5">
				<PrimaryInfoCard ownerName={name} cardPercent="72" role={role} />
					<div className="col-lg-4 col-md-4 order-1">
					

						<div className="row">
							{/* <SecondryInfoCard cardHeader="Profit" cardNumber="12,628" cardPercentage="72.34" cardIcon={clockIcon} /> */}
							{/* <SecondryInfoCard cardHeader="Sales" cardNumber="4,679" cardPercentage="28.42" cardIcon={walletIcon} /> */}
						</div>
					</div>
					<MyCard />
			</div>


			{/* <div className="row mb-5">
				<DashboardCard2 totalOrders="8,258" totalSales="42.82" cardNumber1="82.5" cardNumber2="23.8" cardNumber3="849" cardNumber4="99" />
				<DashboardCard3 cardNumber1="234.21" cardNumber2="443.99" cardNumber3="87.11" cardNumber4="121.5" />
				<DashboardCard4 cardNumber="84,686k" cardPercent="68.2" />
			</div> */}

		</div>
		</>
	);
}
export default Dashboard;