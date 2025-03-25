import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/button';
import Input from '../components/inputs';
import Modal from '../components/modal';



function EditProfile() {
    const formRef = useRef();
    // const { bussiness_id, client_id } = useParams();
    const history = useHistory();
    const [user, setUser] = useState({ first_name: '', last_name:'', username:'', email: '', mobile_phone: '', business_name: ''});
    const [errorMsg, setErrorMsg] = useState("");
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");
    const role = sessionStorage.getItem("role");
    const [errorMsg2, setErrorMsg2] = useState('');
    const [successMsg, setSuccessMsg] = useState(false);
    
        useEffect(() => {
                if(!id)
                    history.push('/')
            }, [id, history])



    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/users/${id}/`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setUser(res.data))
            .catch(err => console.error("Error fetching client:", err));
    }, [id, token]);

    const validateInput = (e) => {
        const { id, value } = e.target;
        let valid = false;

        const validators = {
            first_name: /^(?!\s)(?!.*\s{2,})[\S\s]{3,}$/,
            last_name: /^(?!\s)(?!.*\s{2,})[\S\s]{3,}$/,
            username: /^(?!\s)(?!.*\s{2,})[\S\s]{3,}$/,
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            mobile_phone: /^(010|011|012|015)\d{8}$/,
            business_name: /^(?!\s)(?!.*\s{2,})[\S\s]{3,}$/,
        };

        valid = validators[id]?.test(value);
        e.target.className = `form-control ${valid ? 'is-valid' : 'is-invalid'}`;
        setErrorMsg(valid ? "" : `Invalid ${id}`);
        setUser({ ...user, [id]: value });
    };

    const submitEdit = () => {
        // if (!Object.values(client).some(value => !value)) {
            axios.patch(`http://127.0.0.1:8000/users/${id}/`,{
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                mobile_phone: user.mobile_phone,
                business_name: user.business_name,
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response =>{
                    setErrorMsg2("");
                    setSuccessMsg(true);
                    setTimeout(() => {
                    history.push(`/profile`);
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
                    else if (error.response?.data) {
                        const errors = error.response.data;
                        let errorMessages = ["Profile edit failed due to the following:"];
                
    
                        Object.keys(errors).forEach((key) => {
                            if (Array.isArray(errors[key])) {
                                errorMessages.push(`- ${key.replace("_", " ")}: ${errors[key].join(", ")}`);
                            } else {
                                errorMessages.push(`- ${key.replace("_", " ")}: ${errors[key]}`);
                            }
                        });
                
                        setErrorMsg2(errorMessages.join("\n"));
                        console.log(errorMessages.join("\n"));
                    } else {
                        setErrorMsg2("Registration failed. Please try again.");
                    }});
    };

    return (
        <>
        <div className="row p-3 m-5">
			<div className="col-lg-8 co-md-6 col-sm-12 mx-auto">
				<div className="card">
					<div className="card-body">
        <form className="needs-validation m-5" noValidate ref={formRef}
            onSubmit={(e) => e.preventDefault()}>
            <h1 className="text-center">Edit Profile</h1>
            {errorMsg2 && (<div className="alert alert-danger text-center" role="alert">
                    {errorMsg2.split("\n").map((line, index) => (
                        <div key={index}>{line}</div>
                    ))}
                </div>
                )}
            {successMsg && (
            <div className="alert alert-success text-center" role="alert">
                Data changed successfully!
            </div>
            )}
            <Modal
                id="modal"
                hidden={true} 
                target="session-modal"
                modal_title={"Session expired!"} 
                modal_message={"Your login Session has expired, please login again"} 
                modal_accept_text={"Go To Login"} 
                modal_accept={() => history.push('/login')} 
                modal_close={() => history.push('/login')} 
            />
            <div className='d-flex justify-content-between gap-5'>
                {['first_name','last_name'].map(field => (
                    <Input key={field} idn={field} inlabl={field.charAt(0).toUpperCase() + field.slice(1)}
                        intype="text" valmsg="Looking good" invalmsg={errorMsg} blurfun={validateInput}
                        initval={user[field]} chgfun={(e) => setUser({ ...user, [field]: e.target.value })} />
                ))}
            </div>
            {['username', 'email', 'mobile_phone', 'business_name']
            .filter(field => field !== "business_name" || role === "Business Owner").map(field => (
                <Input key={field} idn={field} inlabl={field.charAt(0).toUpperCase() + field.slice(1)}
                    intype="text" valmsg="Looking good" invalmsg={errorMsg} blurfun={validateInput}
                    initval={user[field]} chgfun={(e) => setUser({ ...user, [field]: e.target.value })} 
                    disabled={field === "email"}/>
            ))}
            <div className='d-flex justify-content-around'>
                <Button bclr="success" title1="save" mar="15px" clck={submitEdit} />
                <Button bclr="primary" title1="Go Back" clck={() => history.push(`/profile`)} />
            </div>
        </form>
        </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default EditProfile;



