import React, { useRef, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/button';
import Input from '../components/inputs';


function EditClient() {
	const formRef = useRef();
	const { bussiness_id, client_id } = useParams();
	const history = useHistory();
	const [client, setClient] = useState({ name: '', email: '', phone: '', address: '', notes: '' });
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		axios.get(`http://127.0.0.1:8000/clients/${client_id}/`)
			.then(res => setClient(res.data))
			.catch(err => console.error("Error fetching client:", err));
	}, [client_id]);

	const validateInput = (e) => {
		const { id, value } = e.target;
		let valid = false;

		const validators = {
			name: /^[A-Za-z ]{3,}$/,
			email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			phone: /^[1-9]\d*$/,
			address: /^.+$/,
			notes: /^.{15,}$/
		};

		valid = validators[id]?.test(value);
		e.target.className = `form-control ${valid ? 'is-valid' : 'is-invalid'}`;
		setErrorMsg(valid ? "" : `Invalid ${id}`);
		setClient({ ...client, [id]: value });
	};

	const submitEdit = () => {
		// if (!Object.values(client).some(value => !value)) {
			axios.patch(`http://127.0.0.1:8000/clients/${client_id}/`,{
				name: client.name,
                email: client.email,
                phone: client.phone,
			})
				.then(() => history.push(`/${bussiness_id}/clients`))
				.catch(err => console.error("Error updating client:", err));
		// }
	};

	return (
		<form className="needs-validation m-5" noValidate ref={formRef}
			style={{ width: '25%', border: "1px solid black", padding: "20px", borderRadius: '10px' }}
			onSubmit={(e) => e.preventDefault()}>
			<h1 className="text-center">Edit Client</h1>
			{['name', 'email', 'phone', 'address', 'notes'].map(field => (
				<Input key={field} idn={field} inlabl={field.charAt(0).toUpperCase() + field.slice(1)}
					intype="text" valmsg="Looking good" invalmsg={errorMsg} blurfun={validateInput}
					initval={client[field]} chgfun={(e) => setClient({ ...client, [field]: e.target.value })} />
			))}
			<div className='d-flex justify-content-around'>
				<Button bclr="success" title1="Edit client" mar="15px" clck={submitEdit} />
				<Button bclr="primary" title1="Go Back" clck={() => history.push(`/${bussiness_id}/clients`)} />
			</div>
		</form>
	);
}

export default EditClient;



