import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Dcard from "../components/Dcard";
import { useLocation } from "react-router-dom";


function ClientDetails() {
	const {bussiness_id, client_id} = useParams();
	const [client, setClient] = useState(null);
	const [loading, setLoading] = useState(true);
	const token = localStorage.getItem("token");


	useEffect(() => {
		axios
			.get(`http://127.0.0.1:8000/clients/${client_id}/`,{
                headers: {
                    Authorization: `Token ${token}`
                }
            })
			.then((response) => {
				setClient(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching client details:", err);
				setLoading(false);
			});
	}, [client_id]);

	if (loading) {
		return <div>Loading Client details...</div>;
	}

	if (!client) {
		return <div>Client not found!</div>;
	}

	return (
		<div className="container my-5">
			<Dcard props={client}
				name={client.name}
				phone={client.phone}
				email={client.email}
				location={client.address}
				notes={client.notes}
			/>
		</div>
	);
}

export default ClientDetails;
