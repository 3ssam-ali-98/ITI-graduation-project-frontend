import React, { useRef } from 'react';
import Button from "../components/button"
import Input from "../components/inputs"
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";



function Register() {

	const formRef = useRef();
	const usersdata = JSON.parse(sessionStorage.getItem('usersdata')) || []
	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState(false);
	const [password, setPassword] = useState('')
	const [userdata, setUsrdat] = useState({
		first_name: '',
		last_name: '',
		username: '',
		password: '',
		email: '',
		mobilenumber: '',
		businessName: '',
		id: '',
		type: 'Owner'
	});

	const [reppassword, setrepPassword] = useState('')

	const mailrgx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{3,}$/
	const passrgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const namergx = /^(?!\s)(?!.*\s{2,})[\S\s]{3,}$/;
	const mobilergx = /^(010|011|012|015)\d{8}$/
	const [invalmsg, setInvalmsg] = useState("");

	const navigate = useHistory();

	const checkinp = (e) => {
		const value = e.target.value;
		if (e.target.id === "mail") {
			const user = usersdata.find(user => user.email === value);
			if (user) {
				e.target.className = "form-control is-invalid"
				setInvalmsg("email already exists")
			}
			else {
				if (mailrgx.test(value)) {
					e.target.className = "form-control is-valid"
					setUsrdat({
						...userdata,
						email: value,
						id: usersdata.length + 1
					})
				}
				else {
					e.target.className = "form-control is-invalid"
					setInvalmsg("please enter a valid email")
				}
			}
		}
		else if (e.target.id === "first_name") {
			if (namergx.test(value)) {
				e.target.className = "form-control is-valid"
				setUsrdat({
					...userdata,
					first_name: value
				});
			}
			else {
				e.target.className = "form-control is-invalid"
				setInvalmsg("please enter a valid name")
			}
		}
		else if (e.target.id === "last_name") {
			if (namergx.test(value)) {
				e.target.className = "form-control is-valid"
				setUsrdat({
					...userdata,
					last_name: value
				});
			}
			else {
				e.target.className = "form-control is-invalid"
				setInvalmsg("please enter a valid name")
			}
		}
		else if (e.target.id === "name") {
			if (namergx.test(value)) {
				e.target.className = "form-control is-valid"
				setUsrdat({
					...userdata,
					username: value
				});
			}
			else {
				e.target.className = "form-control is-invalid"
				setInvalmsg("please enter a valid name")
			}
		}
		else if (e.target.id === "mobile") {
			if (mobilergx.test(value)) {
				e.target.className = "form-control is-valid"
				setUsrdat({
					...userdata,
					mobilenumber: value
				});
			}
			else {
				e.target.className = "form-control is-invalid"
				setInvalmsg("please enter a valid mobile number")
			}
		}
		else if (e.target.id === "password") {
			if (passrgx.test(value)) {
				e.target.className = "form-control is-valid"
			}
			else {
				e.target.className = "form-control is-invalid"
				setInvalmsg("Password must be at least 8 characters, have lower and upper letters at least 1")
			}
		}
		else if (e.target.id === "passwordcon") {
			if ((password === reppassword) && (reppassword)) {
				e.target.className = "form-control is-valid"
				setUsrdat({
					...userdata,
					password: password
				});
			}
			else {
				e.target.className = "form-control is-invalid"
				setInvalmsg("Passwords don't match")
			}
		}
		else if (e.target.id === "busname") {
			if (namergx.test(value)) {
				e.target.className = "form-control is-valid"
				setUsrdat({
					...userdata,
					businessName: value
				});
			}
			else {
				e.target.className = "form-control is-invalid"
				setInvalmsg("please enter a valid Business name")
			}
		}
	}

	const resetval = (e) => {
		const value = e.target.value;
		if (value === "") {
			e.target.className = "form-control"
		}
	}

	const storeval = (e) => {
		const value = e.target.value;
		if (e.target.id === "password") {
			setPassword(value)
		}
		else if (e.target.id === "passwordcon") {
			setrepPassword(value)
		}
	}

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
			axios.post('http://localhost:8000/users/', {
				first_name: userdata.first_name,
				last_name: userdata.last_name,
				username: userdata.username,
				email: userdata.email,
				password: userdata.password,
				business_name: userdata.businessName,
				mobile_phone: userdata.mobilenumber,
				user_type: "Business Owner"
			})
				.then(response => {
					setErrorMsg("");
					setSuccessMsg(true);
					setTimeout(() => {
						navigate.push('/login');
					}, 1000);

				})
				.catch(error => {
					console.error('Registration failed:', error.response?.data || error.message);
					if (error.response?.data) {
						const errors = error.response.data;
						let errorMessages = ["Registration failed due to the following:"];


						Object.keys(errors).forEach((key) => {
							errorMessages.push(`- ${key}: ${errors[key].join(", ")}`);
						});

						setErrorMsg(errorMessages.join("\n"));
					} else {
						setErrorMsg("Registration failed. Please try again.");
					}

				});
		}

	}

	// const changepage = () => {
	//     navigate.push('/login');
	// }

	return (
		<>
			<div className="row p-3 m-5">
				<div className="col-lg-8 col-md-6 col-sm-12 mx-auto">
					<div className="card shadow-lg border-0">
						<div className="card-body p-5">
							<form className="needs-validation" noValidate onSubmit={(e) => e.preventDefault()} ref={formRef}>
								<div className="text-center mb-4">
									<h1 className="display-5 fw-bold">Register</h1>
									<p className="text-muted">Create your account to get started</p>
								</div>

								{errorMsg && (
									<div className="alert alert-danger text-center" role="alert">
										{errorMsg.split("\n").map((line, index) => (
											<div key={index}>{line}</div>
										))}
									</div>
								)}
								{successMsg && (
									<div className="alert alert-success text-center" role="alert">
										Registered successfully! Redirecting...
									</div>
								)}

								<div className="row g-3">
									<div className="col-md-6">
										<Input idn="first_name" inlabl="First Name" intype="text" valmsg="Looking good!" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />
									</div>
									<div className="col-md-6">
										<Input idn="last_name" inlabl="Last Name" intype="text" valmsg="Looking good!" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />
									</div>
								</div>

								<div className="mb-3">
									<Input idn="name" inlabl="Username" intype="text" valmsg="Looking good!" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />
								</div>

								<div className="mb-3">
									<Input idn="mail" inlabl="E-mail" intype="email" valmsg="Looking good!" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />
								</div>

								<div className="mb-3">
									<Input idn="mobile" inlabl="Mobile Number" intype="text" valmsg="Looking good!" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />
								</div>

								<div className="row g-3">
									<div className="col-md-6">
										<Input idn="password" inlabl="Password" intype="password" valmsg="Looking good!" invalmsg={invalmsg} blurfun={checkinp} chgfun={storeval} />
									</div>
									<div className="col-md-6">
										<Input idn="passwordcon" inlabl="Confirm Password" intype="password" valmsg="Looking good!" invalmsg={invalmsg} blurfun={checkinp} chgfun={storeval} />
									</div>
								</div>

								<div className="mb-3">
									<Input idn="busname" inlabl="Business Name" intype="text" valmsg="Looking good!" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />
								</div>

								<div className="d-flex justify-content-center mt-4">
									<Button bclr="success" title1="Sign Up" mar="15px" clck={valall} />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)


}

export default Register