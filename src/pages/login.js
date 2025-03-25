import React, { useRef } from 'react';
import Button from "../components/button"
import Input from "../components/inputs"
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loggedUser } from '../redux/actions/loggeduseraction';
// import { Userid } from '../redux/actions/loggeduseraction';
import { Link } from 'react-router-dom';
import axios from "axios";


function Login() {

	const [showPassword, setShowPassword] = useState(false);
	const [email, setemail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch();
	const [invalmsg, setInvalmsg] = useState("");
	const formRef = useRef();
	const mailrgx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{3,}$/
	const navigate = useHistory();
	const checkinp = (e) => {
		const { id, value } = e.target;
		const isValid = id === "mail" ? mailrgx.test(value) : value.length >= 8;
		e.target.className = isValid ? "form-control" : "form-control is-invalid";
		isValid ? (id === "mail" ? setemail(value) : setPassword(value)) : setInvalmsg(`Please enter a valid ${id}`);
	};

	const resetval = (e) => {
		const value = e.target.value;
		if (value === "") {
			e.target.className = "form-control"
		}
	}

	const valall = () => {
		const formElements = formRef.current.elements;
		for (let element of formElements) {
			checkinp({ target: element })
		}
		axios.post('http://localhost:8000/login/', { email, password })
			.then(response => {
				const userData = {
					role: response.data.user_type,
					name: response.data.user_name,
					id: response.data.user_id,
				};
				console.log("Dispatching user to Redux:", userData);
				dispatch(loggedUser(userData));
				console.log("Dispatched user, navigating to home...");
				localStorage.setItem("username", response.data.user_name);
				navigate.push('/');
			})
			.catch(error => {
				console.error('Login failed:', error.response?.data || error.message);
			});
	}

	return (
		<>
			<div className="row p-3 m-5">
				<div className="col-lg-8 co-md-6 col-sm-12 mx-auto">
					<div className="card">
						<div className="card-body">
							<form className="needs-validation m-5" noValidate onSubmit={(e) => e.preventDefault()} ref={formRef}>
								<div className="" >
									<h1 style={{ textAlign: "center" }}>Login</h1>

									<Input idn="mail" inlabl="E-mail" intype="text" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />


									<Input idn="password" inlabl="Password" intype={showPassword ? "text" : "password"} invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} />
									<div className='d-flex mb-3'>
										<input type='checkbox' onChange={() => setShowPassword((prev) => !prev)} />
										<p className='mb-0' style={{ marginLeft: "10px" }}>Show Password</p>
									</div>

									<Button bclr="primary" title1="login" mar="15px" wid="100%" clck={valall} valmsg="success" invalmsg="Please check the errors" />
									<p>Don't have an account? sign up <Link to={'/register'}>here</Link></p>
									{/* <Button bclr="success" title1="Register" wid="100%" clck={changepage}/> */}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)

}

export default Login
