import React, { useRef, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/button';
import Modal from '../components/modal';
import Input from '../components/inputs';


function EditClient() {
	const formRef = useRef();
	const {client_id } = useParams();
	const history = useHistory();
	const [client, setClient] = useState({ name: '', email: '', phone: '', address: '', notes: '' });
	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState(false);
	const [errorMsg2, setErrorMsg2] = useState('');
	const token = sessionStorage.getItem("token");
	const id = sessionStorage.getItem("id");
	
		useEffect(() => {
				if(!id)
					history.push('/')
			}, [id, history])


	useEffect(() => {
		axios.get(`http://127.0.0.1:8000/clients/${client_id}/`,{
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => setClient(res.data))
			.catch(err => console.error("Error fetching client:", err));
	}, [client_id, token]);

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
				address: client.address,
				notes: client.notes
			},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
				.then((response) => {setSuccessMsg(true);
                	setErrorMsg2('');
					setTimeout(() => {
						history.push(`/clients`);
					}, 1000);})
				.catch(error => {
					if (error.response && error.response.status === 401) 
					{
						document.getElementById("modal").click();
						sessionStorage.removeItem("token");
						sessionStorage.removeItem("id");
						sessionStorage.removeItem("role");
						sessionStorage.removeItem("name");
					} 
					else if (error.response?.data)
					{
						const errors = error.response.data;
						let errorMessages = ["Client edit failed due to the following:"];
				
	
						Object.keys(errors).forEach((key) => {
							errorMessages.push(`- ${key}: ${errors[key].join(", ")}`);
						});
				
						setErrorMsg2(errorMessages.join("\n"));
					}    
				});
		// }
	};

	return (
		<> 
		<div className="row p-3 m-5">
			<div className="col-lg-8 co-md-6 col-sm-12 mx-auto">
				<div className="card">
					<div className="card-body">
						<form className="needs-validation m-5" noValidate ref={formRef}
							onSubmit={(e) => e.preventDefault()}>
							<h1 className="text-center">Edit Client</h1>
							{successMsg && (
                                <div className="alert alert-success text-center" role="alert">
                                    Client edited successfully! Redirecting...
                                </div>
                                )}
                                {errorMsg2 && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {errorMsg2.split("\n").map((line, index) => (
                                        <div key={index}>{line}</div>
                                    ))}
                                </div>
                                )}
								<Modal
                                    id="modal"
									target="session-modal"
                                    hidden={true} 
                                    modal_title={"Session expired!"} 
                                    modal_message={"Your login Session has expired, please login again"} 
                                    modal_accept_text={"Go To Login"} 
                                    modal_accept={() => history.push('/login')} 
                                    modal_close={() => history.push('/login')} 
                                />
							{['name', 'email', 'phone', 'address', 'notes'].map(field => (
								<Input key={field} idn={field} inlabl={field.charAt(0).toUpperCase() + field.slice(1)}
									intype="text" valmsg="Looking good" invalmsg={errorMsg} blurfun={validateInput}
									initval={client[field]} chgfun={(e) => setClient({ ...client, [field]: e.target.value })} />
							))}
							<div className='d-flex justify-content-around'>
								<Button bclr="success" title1="Edit client" mar="15px" clck={submitEdit} />
								<Button bclr="primary" title1="Go Back" clck={() => history.push(`/clients`)} />
							</div>
						</form>
					</div>
                </div>
            </div>
        </div>
		</>
	);
}

export default EditClient;



