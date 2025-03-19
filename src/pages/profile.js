import Button from "../components/button"
// import Input from "../components/inputs"
import { useHistory } from 'react-router-dom';
import { useSelector} from 'react-redux';
import profileicon from "../assets/blank-profile.png" 
import axios from "axios";
import { useState, useEffect } from "react";


function Profile(){
    const history = useHistory();
    // const user = useSelector((state) => state.user.user)
    const [user, setUser] = useState({});
    console.log(user)
    const id = useSelector((state) => state.user.user.id)
    useEffect(() => {
            axios
                .get(`http://127.0.0.1:8000/users/${id}/`)
                .then((response) => {
                    setUser(response.data);
                })
                .catch((err) => {
                    console.error("Error fetching client details:", err);
                });
            }, [id]);
    return(
        <>
        <div className="d-flex flex-column justify-content-center">
                <div className="d-flex flex-row align-content-center container mt-5 gap-5">
                    <div>
                        <img src={profileicon} style={{height: "250px"}} alt=''></img>
                    </div>
                    <div>
                        <h1>User info</h1>
                        <hr></hr>
                        <p>Name : {user.username}</p>
                        <hr></hr>
                        <p>E-mail : {user.email}</p>
                        <hr></hr>
                        <p>Password : {user.password}</p>
                        <hr></hr>
                        <p>mobile number : {user.mobile_phone}</p>
                        <hr></hr>
                        <p>business Name : {user.business_name}</p>
                        <hr></hr>
                        <p>Role : {user.user_type}</p>
                        <Button bclr="primary" title1="Edit profile" mar="15px" clck={() => history.push(`/edit-profile`)}/>
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}

export default Profile