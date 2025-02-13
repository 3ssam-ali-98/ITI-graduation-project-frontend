import React, { useRef } from 'react';
import Button from "../components/button"
import Input from "../components/inputs"
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



function Editclient(){
    const location = useLocation();
    const clientindex = location.state.index;
    const formRef = useRef();
    const bussiness_id = useParams().bussiness_id;
    const { id } = useParams();
    const history = useHistory();


    const [inpname, setinpname] = useState('');
    const [inpmail, setinpmail] = useState('');
    const [inpphone, setinpphone] = useState('');
    const [inpaddress, setinpaddress] = useState('');
    const [inpnotes, setinpnotes] = useState('');

    const [client, setclient] = useState({
        name: '',
        email: '',
        notes: '',
        phone: '',
        address:''
      });
    
    const [clients, setclients] = useState([]);
    useEffect(() => {
        axios.get("https://retoolapi.dev/JjUxYA/clients")
        .then((responce) => {
            setclients(responce.data)
            setinpname(responce.data[clientindex]?.name)
            setinpmail(responce.data[clientindex]?.email)
            setinpphone(responce.data[clientindex]?.phone)
            setinpaddress(responce.data[clientindex]?.address)
            setinpnotes(responce.data[clientindex]?.notes)
            setclient({  
                name: responce.data[clientindex]?.name,
                price: responce.data[clientindex]?.price,
                category: responce.data[clientindex]?.category,
                description: responce.data[clientindex]?.description,
                quantaty: responce.data[clientindex]?.quantaty,
              })
        })
        .catch((err) => console.log(err))
    }, [clientindex])

    const mailrgx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{3,}$/
    const phone_adrress_rgx = /^^[1-9]\d*$/;
    const namergx = /^[A-Za-z]{3,}$/;
    const notesrgx = /^(?!\s)(?!.*\s{2,})[\S\s]{15,}$/
    const [invalmsg, setInvalmsg] = useState("");

    // const navigate = useHistory();

    


    const checkinp = (e) => {

        const value = e.target.value;
        if (e.target.id === "name")
        {
            if (clients.filter((_, index) => index !== parseInt((clientindex))).some(client => client.name.toLowerCase() === value.toLowerCase()))
            {
                e.target.className = "form-control is-invalid"
                setInvalmsg("client already exists")
            }
            else
            {
                if (namergx.test(value)) 
                {  
                e.target.className = "form-control is-valid"
                setclient({
                    ...client,  
                    name: value,
                  })             
                } 
                else 
                {
                e.target.className = "form-control is-invalid"
                setInvalmsg("please enter a valid name")
                }
            }
        }
        else if (e.target.id === "mail")
        {
            if (mailrgx.test(value)) 
            {  
            e.target.className = "form-control is-valid"
            setclient({
                ...client,  
                email: value
              });
            } 
            else 
            {
            e.target.className = "form-control is-invalid"
            setInvalmsg("please enter a valid email")
            }
        }  
        else if (e.target.id === "phone")
        {
            if (phone_adrress_rgx.test(value))
            {  
            e.target.className = "form-control is-valid"
            setclient({
                ...client,  
                phone: value
              });
            } 
            else 
            {
            e.target.className = "form-control is-invalid"
            setInvalmsg("Please enter a valid Phone number")
            }
        }
        else if (e.target.id === "address")
        {
            if (phone_adrress_rgx.test(value))
            {  
            e.target.className = "form-control is-valid"
            setclient({
                ...client,  
                address: value
              });
            } 
            else 
            {
            e.target.className = "form-control is-invalid"
            setInvalmsg("Please enter a valid address")
            }
        }
        else if (e.target.id === "notes")
        {
            if (notesrgx.test(value))
            {  
            e.target.className = "form-control is-valid"
            setclient({
                ...client,  
                notes: value
              });
            } 
            else 
            {
            e.target.className = "form-control is-invalid"
            setInvalmsg("notes and comments must be at least 15 characters")
            }
        }    
    }

    const resetval = (e) => {

        const value = e.target.value;

        if (e.target.id === "name")
            {
                setinpname(value)
            }
            else if (e.target.id === "mail")
            {
                setinpmail(value)
            }
            else if (e.target.id === "phone")
            {
                setinpphone(value)
            }
            else if (e.target.id === "address")   
            {
                setinpaddress(value)
            } 
            else if (e.target.id === "notes")   
            {
                setinpnotes(value)
            } 
        
            if (value === "") 
            {
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

            axios.put(`https://retoolapi.dev/JjUxYA/clients/${id}`, client)
            .then((response) => {console.log('Product added:', response.data)
                
                history.push(`/${bussiness_id}/clients`)
                })
                .catch((err) => console.log('Error editing product:', err)) 
          }

    }
    
    // const changepage = () => {
    //     navigate.push('/login');
    // }

    return(
        <>
            <form className="needs-validation m-5" noValidate style={{width: '25%', border: "1px solid black", padding: "20px", borderRadius: '10px'}} onSubmit={(e) => e.preventDefault()} ref={formRef}>
                <div className="" >
                    <h1 style={{textAlign: "center"}}>Add client</h1>
                    
                    <Input idn="name" inlabl="Name" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} initval={inpname} />
                

                    <Input idn="mail" inlabl="E-mail" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} initval={inpmail} />


                    <Input idn="phone" inlabl="Phone number" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} initval={inpphone} chgfun={resetval} />

                    <Input idn="address" inlabl="Address" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp}  initval={inpaddress} chgfun={resetval} />

                    <Input idn="notes" inlabl="Comments & notes" intype="text" valmsg="looking good" invalmsg={invalmsg} blurfun={checkinp} chgfun={resetval} initval={inpnotes} />


                    <div className='d-flex justify-content-around' >
                        <Button bclr="success" title1="Edit client" mar="15px" clck={valall}/>
                        <Button bclr="primary" title1="Go Back" clck={() => history.push(`/${bussiness_id}/clients`)}/>
                        {/* <Button bclr="primary" title1="login" clck={changepage}/> */}
                    </div>
                </div>
            </form>
        </>
    )

    

}

export default Editclient