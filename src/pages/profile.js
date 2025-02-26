import Button from "../components/button"
import Input from "../components/inputs"
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector} from 'react-redux';
import profileicon from "../assets/blank-profile.png" 


function Profile(){
    const history = useHistory();
    const user = useSelector((state) => state.user.user)


    return(
        <>
        <div className="d-flex flex-column justify-content-center">
                <div className="d-flex flex-row align-content-center container mt-5 gap-5">
                    <div>
                        <img src={profileicon} style={{height: "250px"}}></img>
                    </div>
                    <div>
                        <h1>User info</h1>
                        <hr></hr>
                        <p>Name : {user.name}</p>
                        <hr></hr>
                        <p>E-mail : {user.email}</p>
                        <hr></hr>
                        <p>Password : ********</p>
                        <hr></hr>
                        <p>mobile number : {user.mobilenumber}</p>
                        <hr></hr>
                        <p>business Name : {user.businessName}</p>
                        {/* <Button bclr="primary" title1="Edit profile" mar="15px" clck={() => history.push(`/edit-profile`)}/> */}
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}

export default Profile