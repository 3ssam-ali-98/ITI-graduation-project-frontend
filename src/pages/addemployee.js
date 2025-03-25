import React, { useEffect, useRef } from 'react';
import Button from "../components/button"
import Input from "../components/inputs"
import { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";



function AddEmployee() {

	const formRef = useRef();
	const usersdata = JSON.parse(localStorage.getItem('usersdata')) || []
	const id = useSelector((state) => state.user.user.id)
	const businessname = useSelector((state) => state.user.user.businessName)
	const navigate = useHistory();
	const { bussiness_id } = useParams();
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (!id)
			navigate.push('/login')
	}, [id])

	const [password, setPassword] = useState('')
	const [userdata, setUsrdata] = useState({
		irst_name: '',
		last_name: '',
		username: '',
		password: '',
		email: '',
		mobilenumber: '',
		businessName: businessname,
		id: id,
		type: 'Employee'
	});


	const [reppassword, setrepPassword] = useState('')

	const mailrgx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{3,}$/
	const passrgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const namergx = /^(?!\s)(?!.*\s{2,})[\S\s]{3,}$/;
	const mobilergx = /^(010|011|012|015)\d{8}$/
	const [invalmsg, setInvalmsg] = useState("");

	const checkinp = (e) => {
		const { id, value } = e.target;
		const setValid = (field, val) => {
			e.target.className = "form-control is-valid";
			setUsrdata({ ...userdata, [field]: val });
		};
		const setInvalid = (msg) => {
			e.target.className = "form-control is-invalid";
			setInvalmsg(msg);
		};

		switch (id) {
			case "mail":
				usersdata.find(user => user.email === value)
					? setInvalid("an employee with this email already exists")
					: mailrgx.test(value)
						? setValid("email", value)
						: setInvalid("please enter a valid email");
				break;
			case "first_name":
			case "last_name":
			case "name":
				namergx.test(value)
					? setValid(id === "name" ? "username" : id, value)
					: setInvalid("please enter a valid name");
				break;
			case "mobile":
				mobilergx.test(value)
					? setValid("mobilenumber", value)
					: setInvalid("please enter a valid mobile number");
				break;
			case "password":
				passrgx.test(value)
					? e.target.className = "form-control is-valid"
					: setInvalid("Password must be at least 8 characters, have lower and upper letters at least 1");
				break;
			case "passwordcon":
				(password === reppassword && reppassword)
					? setValid("password", password)
					: setInvalid("Passwords don't match");
				break;
			default:
				break;
		}
	};

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
			axios.post('http://localhost:8000/employees/', {
				first_name: userdata.first_name,
				last_name: userdata.last_name,
				username: userdata.username,
				email: userdata.email,
				password: userdata.password,
				mobile_phone: userdata.mobilenumber,
				user_type: "Employee"
			},
			{
				headers: {
					Authorization: `Token ${token}`
				}
			})
			.then(response => {
				navigate.push(`/${businessname}/employees`);  
			})
			.catch(error => {
				console.error('Registration failed:', error.response?.data || error.message);
			});
			for (let element of formElements) {
				const e = { target: element }
				e.target.value = ""
			}
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
									<h1 style={{ textAlign: "center" }}>Add Employee</h1>

									<div className='d-flex justify-content-between gap-5'>
										<div>
											<Input idn="first_name" inlabl="First name" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />
										</div>
										<div>
											<Input idn="last_name" inlabl="Last name" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />
										</div>
									</div>

									<Input idn="name" inlabl="Username" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />

									<Input idn="mail" inlabl="E-mail" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />

									<Input idn="mobile" inlabl="Mobile number" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />

									<Input idn="password" inlabl="Password" intype="password" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={storeval} />

									<Input idn="passwordcon" inlabl="Confirm Password" intype="password" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={storeval} />

									<div className='d-flex' style={{ justifyContent: 'center' }}>
										<Button bclr="success" title1="Add Employee" mar="15px" clck={valall} />
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

export default AddEmployee