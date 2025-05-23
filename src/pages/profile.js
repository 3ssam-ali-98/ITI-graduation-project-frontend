import Button from "../components/button"
// import Input from "../components/inputs"
import { useHistory } from 'react-router-dom';
// import { useSelector} from 'react-redux';
import profileicon from "../assets/blank-profile.png" 
import axios from "axios";
import { useState, useEffect } from "react";
import Modal2 from "../components/modal2" 
import Modal from '../components/modal';



function Profile(){
    const history = useHistory();
    // const user = useSelector((state) => state.user.user)
    const [user, setUser] = useState({});
    console.log(user)
    const id = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");
    useEffect(() => {
                if(!id)
                    history.push('/')
            }, [id, history])
    

    useEffect(() => {
            axios
                .get(`http://127.0.0.1:8000/users/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                   if (error.response && error.response.status === 401) 
					{
						document.getElementById("modal").click();
						sessionStorage.removeItem("token");
						sessionStorage.removeItem("id");
						sessionStorage.removeItem("role");
						sessionStorage.removeItem("name");
					}
                });
            }, [id, token]);
    return(
        <>
        <div className="d-flex flex-column justify-content-center">
                <div className="d-flex flex-row align-content-center container mt-5 gap-5">
                    {/* <div>
                        <img src={profileicon} style={{height: "250px"}} alt=''></img>
                    </div> */}
                    <div>
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
                        <h1>User info</h1>
                        <hr></hr>
                        <div className="d-flex flex-row gap-5">
                            <p>First Name : {user.first_name}</p>
                            <p>Last Name : {user.last_name}</p>
                        </div>
                        <hr></hr>
                        <p>Username : {user.username}</p>
                        <hr></hr>
                        <p>E-mail : {user.email}</p>
                        <hr></hr>
                        <p>Password : ********</p>
                        <hr></hr>
                        <p>mobile number : {user.mobile_phone}</p>
                        <hr></hr>
                        <p>business Name : {user.business_name}</p>
                        <hr></hr>
                        <p>Role : {user.user_type}</p>
                        <div className="d-flex flex-row gap-5">
                            <Button bclr="primary" title1="Edit profile" clck={() => history.push(`/edit-profile`)}/>
                            {/* <Button bclr="warning" title1="Change Mobile Number" mar="15px" clck={() => history.push(`/edit-profile`)}/> */}
                            <Modal2/>
                        </div>        
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}

export default Profile