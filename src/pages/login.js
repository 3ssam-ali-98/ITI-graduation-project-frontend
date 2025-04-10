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
	// const usersdata = JSON.parse(sessionStorage.getItem('usersdata')) || []
	const dispatch = useDispatch();
	const [invalmsg, setInvalmsg] = useState("");
	const [errorMsg, setErrorMsg] = useState('');

	const formRef = useRef();

	const mailrgx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{3,}$/

	const navigate = useHistory();

	const checkinp = (e) => {

		const value = e.target.value;
		if (e.target.id === "mail") {
			if (mailrgx.test(value)) {
				e.target.className = "form-control"
				setemail(value)
			}
			else {
				e.target.className = "form-control is-invalid"
				setInvalmsg("please enter a valid mail")
			}
		}
		else if (e.target.id === "password") {
			if (value.length >= 1) {
				e.target.className = "form-control"
				setPassword(value)
			}
			else {
				e.target.className = "form-control is-invalid"
				setInvalmsg("Please enter a valid password")
			}
		}
	}

	const resetval = (e) => {

		const value = e.target.value;

		if (value === "") {
			e.target.className = "form-control"
		}
	}

	const valall = () => {
		const formElements = formRef.current.elements;

		for (let element of formElements) {
			const e =
			{
				target: element
			}
			checkinp(e)
		}
		axios.post('http://localhost:8000/login/', {
			email: email,
			password: password,
		})
			.then(response => {
				console.log('User registered successfully:', response.data);
				dispatch(loggedUser({ role: response.data.user_type, name: response.data.user_name, id: response.data.user_id, is_premuim: response.data.is_premuim }))
				sessionStorage.setItem("token", response.data.token);
				sessionStorage.setItem("id", response.data.user_id);
				sessionStorage.setItem("role", response.data.user_type);
				sessionStorage.setItem("name", response.data.user_name);
				sessionStorage.setItem("is_premuim", response.data.is_premuim);
				navigate.push('/dashboard');
			})
			.catch(error => {
				console.error('login failed:', error.response?.data || error.message);
				setErrorMsg(error.response?.data?.error);
				console.log(error.response?.data.error)
				// if (error.response?.data) {

				//     Object.keys(errors).forEach((key) => {
				//         errorMessages.push(`- ${key}: ${errors[key].join(", ")}`);
				//     });

				//     setErrorMsg(errorMessages.join("\n"));
				// } else {
				//     setErrorMsg("Registration failed. Please try again.");
				// }
			});
		// dispatch(Userid(user.id))
	}



	// const changepage = () => {
	//     navigate.push('/register');
	//   }


	return (
		<>
			<div className="row p-3 m-5">
				<div className="col-lg-8 co-md-6 col-sm-12 mx-auto">
					<div className="card">
						<div className="card-body">
							<form className="needs-validation m-5" noValidate onSubmit={(e) => e.preventDefault()} ref={formRef}>
								<div className="" >
									<h1 style={{ textAlign: "center" }}>Login</h1>

									{errorMsg && (
										<div className="alert alert-danger text-center" role="alert">
											{errorMsg.split("\n").map((line, index) => (
												<div key={index}>{line}</div>
											))}
										</div>
									)}
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
