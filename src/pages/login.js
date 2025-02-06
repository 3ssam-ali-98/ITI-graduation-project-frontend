import React, { useRef } from 'react';
import Button from "../components/button"
import Input from "../components/inputs"
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { loggedUser } from '../redux/actions/loggeduseraction';


function Login(){

    const [showPassword, setShowPassword] = useState(false);
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const usersdata = JSON.parse(localStorage.getItem('usersdata')) || []
    const dispatch = useDispatch();


    const formRef = useRef();

    const mailrgx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{3,}$/

    const navigate = useHistory();

    const checkinp = (e) => {

        const value = e.target.value;
        if (e.target.id === "mail")
        {
            if (mailrgx.test(value)) 
                {  
                e.target.className = "form-control is-valid"
                setemail(value)
                } 
                else 
                {
                e.target.className = "form-control is-invalid"
                }
        }
        else if (e.target.id === "password")
        {
            if (value.length >= 8) 
            {  
            e.target.className = "form-control is-valid"
            setPassword(value)
            } 
            else 
            {
            e.target.className = "form-control is-invalid"
            }
        }  
    }

    const resetval = (e) => {

        const value = e.target.value;
        
            if (value === "") 
            {
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
        const user = usersdata.find(user => user.email === email);
        if (user) 
        {
            if (user.password === password)
            {
            console.log('Login successful');
            dispatch(loggedUser(user.name))
            navigate.push('/');
            }
            else
            {
                console.log('wrong password');
            }

        } 
        else 
        {
            console.log('wrong email');
        }
    }

    const changepage = () => {
        navigate.push('/register');
      }
    

    return(
        <>
            <form className="needs-validation m-5" noValidate style={{width: '15%', border: "1px solid black", padding: "20px", borderRadius: '10px'}} onSubmit={(e) => e.preventDefault()} ref={formRef}>
                <div className="" >
                    <h1 style={{textAlign: "center"}}>Login</h1>
                    
                    <Input idn="mail" inlabl="E-mail" intype="text" valmsg="looking good" invalmsg="please enter a valid email" blurfun={checkinp} chgfun={resetval}/>


                    <Input idn="password" inlabl="Password" intype={showPassword ? "text" : "password"} valmsg="looking good" invalmsg="Password cannot be less than 8 characters" blurfun={checkinp} chgfun={resetval}/>
                    <div className='d-flex'>
                        <input type='checkbox'  onChange={() => setShowPassword((prev) => !prev)}/>
                        <p className='mb-0' style={{marginLeft: "10px"}}>Show Password</p>
                    </div>
                    
                    <Button bclr="primary" title1="login" mar="15px" wid="100%" clck={valall} valmsg="success" invalmsg="Please check the errors"/>
                    <Button bclr="success" title1="Register" wid="100%" clck={changepage}/>
                </div>
            </form>
        </>
    )

    

}

export default Login