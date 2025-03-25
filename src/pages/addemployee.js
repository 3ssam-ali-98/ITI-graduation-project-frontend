import React, { useEffect, useRef } from 'react';
import Button from "../components/button"
import Input from "../components/inputs"
import { useState } from "react";
import { useHistory } from 'react-router-dom';
// import { useSelector} from 'react-redux';
import axios from "axios";
import Modal from '../components/modal';



function AddEmployee(){
    
    const formRef = useRef();
    const usersdata = JSON.parse(sessionStorage.getItem('usersdata')) || []
    const id = sessionStorage.getItem("id");
    // const businessname = useSelector((state) => state.user.user.businessName)
    const navigate = useHistory();
    const token = sessionStorage.getItem("token");
    const [successMsg, setSuccessMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    useEffect(() => {
        if(!id)
            navigate.push('/')
    }, [id, navigate])

    const [password, setPassword] = useState('')
    const [userdata, setUsrdat] = useState({
        irst_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        mobilenumber:'',
        // businessName: businessname,
        // id:id,
        type: 'Employee'
      });
 
    
    const [reppassword, setrepPassword] = useState('')

    const mailrgx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{3,}$/
    const passrgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const namergx = /^(?!\s)(?!.*\s{2,})[\S\s]{3,}$/;
    const mobilergx = /^(010|011|012|015)\d{8}$/
    const [invalmsg, setInvalmsg] = useState("");

   

    

    const checkinp = (e) => {

        const value = e.target.value;
        if (e.target.id === "mail")
        {
            const user = usersdata.find(user => user.email === value);
            if (user)
            {
                e.target.className = "form-control is-invalid"
                setInvalmsg("an emplyee with this email already exists")
            }
            else
            {
            if (mailrgx.test(value)) 
                {  
                e.target.className = "form-control is-valid"
                setUsrdat({
                    ...userdata,  
                    email: value,
                    // id: usersdata.length+1
                  })             
                } 
                else 
                {
                e.target.className = "form-control is-invalid"
                setInvalmsg("please enter a valid email")
                }
            }
        }
        else if (e.target.id === "first_name")
        {
            if (namergx.test(value)) 
            {  
            e.target.className = "form-control is-valid"
            setUsrdat({
                ...userdata,  
                first_name: value
                });
            } 
            else 
            {
            e.target.className = "form-control is-invalid"
            setInvalmsg("please enter a valid name")
            }
        }
        else if (e.target.id === "last_name")
        {
            if (namergx.test(value)) 
            {  
            e.target.className = "form-control is-valid"
            setUsrdat({
                ...userdata,  
                last_name: value
                });
            } 
            else 
            {
            e.target.className = "form-control is-invalid"
            setInvalmsg("please enter a valid name")
            }
        }
        else if (e.target.id === "name")
        {
            if (namergx.test(value)) 
            {  
            e.target.className = "form-control is-valid"
            setUsrdat({
                ...userdata,  
                username: value
              });
            } 
            else 
            {
            e.target.className = "form-control is-invalid"
            setInvalmsg("please enter a valid name")
            }
        } 
        else if (e.target.id === "mobile")
            {
                if (mobilergx.test(value)) 
                {  
                e.target.className = "form-control is-valid"
                setUsrdat({
                    ...userdata,  
                    mobilenumber: value
                  });
                } 
                else 
                {
                e.target.className = "form-control is-invalid"
                setInvalmsg("please enter a valid mobile number")
                }
            }  
        else if (e.target.id === "password")
        {
            if (passrgx.test(value))
            {  
            e.target.className = "form-control is-valid"
            } 
            else 
            {
            e.target.className = "form-control is-invalid"
            setInvalmsg("Password must be at least 8 characters, have lower and upper letters at least 1")
            }
        }
        else if (e.target.id === "passwordcon")
        {
            if ((password === reppassword) && (reppassword))
            {  
            e.target.className = "form-control is-valid"
            setUsrdat({
                ...userdata,  
                password: password
              });
            } 
            else 
            {
            e.target.className = "form-control is-invalid"
            setInvalmsg("Passwords don't match")
            }
        }
        // else if (e.target.id === "busname")
        // {
        //     if (namergx.test(value))
        //     {  
        //     e.target.className = "form-control is-valid"
        //     setUsrdat({
        //         ...userdata,  
        //         businessName: value
        //       });
        //     } 
        //     else 
        //     {
        //     e.target.className = "form-control is-invalid"
        //     setInvalmsg("please enter a valid Business name")
        //     }
        // }    
    }

    const resetval = (e) => {

        const value = e.target.value;
        
            if (value === "") 
            {
                e.target.className = "form-control"
            }     
    }

    const storeval = (e) => {

        const value = e.target.value;
        if (e.target.id === "password")
            {
                setPassword(value)
            } 
        else if (e.target.id === "passwordcon")  
            {
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
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setSuccessMsg(true);
                setErrorMsg('');
                setTimeout(() => {
                    navigate.push(`/employees`);
                }, 1000);  
            })
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
                    let errorMessages = ["Employee creation failed due to the following:"];
            

                    Object.keys(errors).forEach((key) => {
                        errorMessages.push(`- ${key}: ${errors[key].join(", ")}`);
                    });
            
                    setErrorMsg(errorMessages.join("\n"));
                }    
            });}
    }
    
    // const openmodal = () => {
    //     document.getElementById("modal").click();
    // }

    return(
        <>
        <div className="row p-3 m-5">
            <div className="col-lg-8 co-md-6 col-sm-12 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <form className="needs-validation m-5" noValidate  onSubmit={(e) => e.preventDefault()} ref={formRef}>
                            <div className="" >
                                <h1 style={{textAlign: "center"}}>Add Employee</h1>

                                {successMsg && (
                                <div className="alert alert-success text-center" role="alert">
                                    Employee Added successfully! Redirecting...
                                </div>
                                )}
                                {errorMsg && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {errorMsg.split("\n").map((line, index) => (
                                        <div key={index}>{line}</div>
                                    ))}
                                </div>
                                )}
                                {/* <Button bclr="success" title1="open modal" mar="15px" clck={openmodal}/> */}
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

                                <div className='d-flex justify-content-between gap-5'>
                                    <div>
                                        <Input idn="first_name" inlabl="First name" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval}/>
                                    </div>
                                    <div>
                                        <Input idn="last_name" inlabl="Last name" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval}/>
                                    </div>
                                </div>
                                
                                <Input idn="name" inlabl="Username" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval}/>
                                


                                <Input idn="mail" inlabl="E-mail" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval}/>

                                <Input idn="mobile" inlabl="Mobile number" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval}/>

                                <Input idn="password" inlabl="Password" intype="password" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={storeval}/>

                                <Input idn="passwordcon" inlabl="Confirm Password" intype="password" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={storeval}/>

                                <div className='d-flex justify-content-around'>
                                    <Button bclr="success" title1="Add Employee" mar="15px" clck={valall}/>
                                    <Button bclr="primary" title1="Go Back" clck={() => navigate.push(`/clients`)} />
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