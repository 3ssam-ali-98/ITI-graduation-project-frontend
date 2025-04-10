import React, { useRef } from 'react';
import Button from "../components/button"
import Input from "../components/inputs"
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
// import { useParams } from 'react-router-dom';
import Modal from '../components/modal';


function Addclient() {
	const formRef = useRef();
	// const usersdata = JSON.parse(sessionStorage.getItem('usersdata')) || []
	// const bussiness_id = useParams().bussiness_id;
	const history = useHistory();
	const token = sessionStorage.getItem("token");
	const [successMsg, setSuccessMsg] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const id = sessionStorage.getItem("id");

	useEffect(() => {
			if(!id)
				history.push('/')
		}, [id, history])

	// const [clients, setclients] = useState([]);
	// useEffect(() => {
	// 	axios.get("http://127.0.0.1:8000/clients/", {
	// 		headers: {
	// 			Authorization: `Bearer ${token}`
	// 		}
	// 	})

	// 		.then((responce) => setclients(responce.data))
	// 		.catch((err) => console.log(err))
	// },)

	const [client, setclient] = useState({
		name: '',
		email: '',
		notes: '',
		phone: '',
		address: ''
	});

	const mailrgx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{3,}$/
	const phone_adrress_rgx = /^(010|011|012|015)\d{8}$/;
	const namergx = /^[A-Za-z]{3,}$/;
	const notesrgx = /^(?!\s)(?!.*\s{2,})[\S\s]{5,}$/
	const [invalmsg, setInvalmsg] = useState("");

	const checkinp = (e) => {
		const { id, value } = e.target;
		const validations = {
			name: {
				regex: namergx,
				error: "please enter a valid name",
				// extraCheck: () => clients.some(client => client.name.toLowerCase() === value.toLowerCase()),
				// extraError: "client already exists"
			},
			mail: { regex: mailrgx, error: "please enter a valid email" },
			phone: { regex: phone_adrress_rgx, error: "Please enter a valid Phone number" },
			address: { regex: notesrgx, error: "Please enter a valid address" },
			notes: { regex: notesrgx, error: "notes and comments must be at least 15 characters" }
		};

		const validation = validations[id];
		if (validation) {
			if (validation.extraCheck && validation.extraCheck()) {
				e.target.className = "form-control is-invalid";
				setInvalmsg(validation.extraError);
			} else if (validation.regex.test(value)) {
				e.target.className = "form-control is-valid";
				setclient({ ...client, [id === "mail" ? "email" : id]: value });
			} else {
				e.target.className = "form-control is-invalid";
				setInvalmsg(validation.error);
			}
		}
	};

	const resetval = (e) => {

		const value = e.target.value;

		if (value === "") {
			e.target.className = "form-control"
		}
	}

	// const storeval = (e) => {

	//     const value = e.target.value;
	//     if (e.target.id === "password")
	//         {
	//             setPassword(value)
	//         } 
	//     else if (e.target.id === "passwordcon")  
	//         {
	//             setrepPassword(value)
	//         }      
	// }

	const valall = () => {
		const formElements = formRef.current.elements;
		let formHasError = false;

		for (let element of formElements) {
			const e =
			{
				target: element
			}
			checkinp(e)

			if (element.className.includes('is-invalid')) {
				formHasError = true;
			}
		}
		if (!formHasError) {

			axios.post('http://127.0.0.1:8000/clients/',
				{
					name: client.name,
					email: client.email,
					phone: client.phone,
					address: client.address,
					notes: client.notes,

				},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
				.then((response) => {
					// setclients((prevProducts) => [...prevProducts, response.data]);
					setSuccessMsg(true);
                	setErrorMsg('');
					setTimeout(() => {
						history.push(`/clients`);
					}, 1000);
				})
				.catch((error => {
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
						let errorMessages = ["Client creation failed due to the following:"];
				
	
						Object.keys(errors).forEach((key) => {
							errorMessages.push(`- ${key}: ${errors[key].join(", ")}`);
						});
				
						setErrorMsg(errorMessages.join("\n"));
					}    
				}));

		}

	}

	// const changepage = () => {
	//     navigate.push('/login');
	// }

	return (
		<>
			<div className="row p-3 m-5">
				<div className="col-lg-8 co-md-6 col-sm-12 mx-auto">
					<div className="card">
						<div className="card-body">
							<form className="needs-validation m-5" noValidate onSubmit={(e) => e.preventDefault()} ref={formRef}>
								<div className="" >
									<h1 style={{ textAlign: "center" }}>Add client</h1>
									
									{successMsg && (
                                <div className="alert alert-success text-center" role="alert">
                                    Client Added successfully! Redirecting...
                                </div>
                                )}
                                {errorMsg && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {errorMsg.split("\n").map((line, index) => (
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
									<Input
										idn="name"
										inlabl="Name"
										intype="text"
										valmsg="looking good"
										invalmsg={invalmsg}
										blurfun={checkinp}
										chgfun={resetval}
									/>

									<Input
										idn="mail"
										inlabl="E-mail"
										intype="text"
										valmsg="looking good"
										invalmsg={invalmsg}
										blurfun={checkinp}
										chgfun={resetval}
									/>

									<Input
										idn="phone"
										inlabl="Phone number"
										intype="text"
										valmsg="looking good"
										invalmsg={invalmsg}
										blurfun={checkinp}
									/>

									<Input idn="address" inlabl="Address" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} />

									<Input idn="notes" inlabl="Comments & notes" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />

									<div className='d-flex justify-content-around' >
										<Button bclr="success" title1="Add client" mar="15px" clck={valall} />
										<Button bclr="primary" title1="Go Back" clck={() => history.push(`/clients`)} />
										{/* <Button bclr="primary" title1="login" clck={changepage}/> */}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)

}

export default Addclient