import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Dcard from "../components/Dcard";
import { useHistory } from 'react-router-dom';
import Modal from '../components/modal';

// import { useLocation } from "react-router-dom";


function ClientDetails() {
	const {client_id} = useParams();
	const [client, setClient] = useState(null);
	const [loading, setLoading] = useState(true);
	const token = sessionStorage.getItem("token");
	const navigate = useHistory();
	const id = sessionStorage.getItem("id");


	useEffect(() => {
			if(!id)
				navigate.push('/')
		}, [id, navigate])


	useEffect(() => {
		axios
			.get(`http://127.0.0.1:8000/clients/${client_id}/`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
			.then((response) => {
				setClient(response.data);
				setLoading(false);
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) 
					{
						document.getElementById("modal").click();
						sessionStorage.removeItem("token");
						sessionStorage.removeItem("id");
						sessionStorage.removeItem("role");
						sessionStorage.removeItem("name");
					}
				setLoading(false);
			});
	}, [client_id, token]);

	if (loading) {
		return <div>Loading Client details...</div>;
	}

	if (!client) {
		return <div>Client not found!</div>;
	}

	return (
		<div className="container my-5">
			<Modal
                                    id="modal"
									target="session-modal"
                                    hidden={true} 
                                    modal_title={"Session expired!"} 
                                    modal_message={"Your login Session has expired, please login again"} 
                                    modal_accept_text={"Go To Login"} 
                                    modal_accept={() => navigate.push('/login')} 
                                    modal_close={() => navigate.push('/login')} 
                                />
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
