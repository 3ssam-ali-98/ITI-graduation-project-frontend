import React, { useRef } from 'react';
import Button from "../components/button"
import Input from "../components/inputs"
import { useState } from "react";
import { useHistory } from 'react-router-dom';

function Register(){
    
    const formRef = useRef();
    const usersdata = JSON.parse(localStorage.getItem('usersdata')) || []

    const [password, setPassword] = useState('')
    const [userdata, setUsrdat] = useState({
        name: '',
        password: '',
        email: '',
        businessName: ''
      });
    
    const [reppassword, setrepPassword] = useState('')

    const mailrgx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{3,}$/
    const passrgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const namergx = /^[A-Za-z]{3,}$/;
    const [invalmsg, setInvalmsg] = useState("");

    const navigate = useHistory();

    

    const checkinp = (e) => {

        const value = e.target.value;
        if (e.target.id === "mail")
        {
            const user = usersdata.find(user => user.email === value);
            if (user)
            {
                e.target.className = "form-control is-invalid"
                setInvalmsg("email already exists")
            }
            else
            {
            if (mailrgx.test(value)) 
                {  
                e.target.className = "form-control is-valid"
                setUsrdat({
                    ...userdata,  
                    email: value
                  })             
                } 
                else 
                {
                e.target.className = "form-control is-invalid"
                setInvalmsg("please enter a valid email")
                }
            }
        }
        else if (e.target.id === "name")
        {
            if (namergx.test(value)) 
            {  
            e.target.className = "form-control is-valid"
            setUsrdat({
                ...userdata,  
                name: value
              });
            } 
            else 
            {
            e.target.className = "form-control is-invalid"
            setInvalmsg("please enter a valid name")
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
        else if (e.target.id === "busname")
        {
            if (namergx.test(value))
            {  
            e.target.className = "form-control is-valid"
            setUsrdat({
                ...userdata,  
                businessName: value
              });
            } 
            else 
            {
            e.target.className = "form-control is-invalid"
            setInvalmsg("please enter a valid Business name")
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
            navigate.push('/login'); 
            const newusersdata = [...usersdata, userdata] 
            localStorage.setItem('usersdata', JSON.stringify(newusersdata))  
          }

    }
    
    const changepage = () => {
        navigate.push('/login');
    }

    return(
        <>
            <form className="needs-validation m-5" novalidate style={{width: '25%', border: "1px solid black", padding: "20px", borderRadius: '10px'}} onSubmit={(e) => e.preventDefault()} ref={formRef}>
                <div className="" >
                    <h1 style={{textAlign: "center"}}>Register</h1>
                    
                    <Input idn="name" inlabl="Name" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval}/>
                    


                    <Input idn="mail" inlabl="E-mail" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval}/>


                    <Input idn="password" inlabl="Password" intype="password" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={storeval}/>

                    <Input idn="passwordcon" inlabl="Confirm Password" intype="password" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={storeval}/>

                    <Input idn="busname" inlabl="Business Name" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval}/>


                    <div className='d-flex' style={{justifyContent: 'space-between'}}>
                        <Button bclr="success" title1="Register" mar="15px" clck={valall}/>
                        <Button bclr="primary" title1="login" clck={changepage}/>
                    </div>
                </div>
            </form>
        </>
    )

    

}

export default Register