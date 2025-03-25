import Input from './inputs'
import { useState } from "react";
import axios from "axios";

function Modal2(props) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
	const token = sessionStorage.getItem("token");
    const [errorMsg, setErrorMsg] = useState("");
    const [errorMsg2, setErrorMsg2] = useState("");
    const id = sessionStorage.getItem("id");
    const [successMsg, setSuccessMsg] = useState(false);
    

    const cleardata = () => {
        setCurrentPassword("");
        setNewPassword("");
        setRetypePassword("");
        setErrorMsg("");
        setErrorMsg2("");
        setSuccessMsg(false)
    }

    const validatePassword = async () => {
        try {
            const response = await axios.post("http://localhost:8000/validate-password/", {
                password: currentPassword,
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.valid) {
                setErrorMsg(""); // Clear errors
                document.getElementById("continueButton").setAttribute("data-bs-target", "#exampleModalToggle2");
                document.getElementById("continueButton").click();
            } else {
                setErrorMsg("Incorrect password. Please try again.");
            }
        } catch (error) {
            setErrorMsg("Incorrect password. Please try again.");
        }
    };

    const changePassword = async () => {

        if (newPassword !== retypePassword) {
            setErrorMsg2("Passwords do not match. Please try again.");
            return;
        }


        try {
            const response = await axios.patch(`http://localhost:8000/users/${id}/`, {
                password: newPassword,
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setSuccessMsg(true);
                    setTimeout(() => {
                        document.getElementById("closemodel").click();
                    }, 1000);
				setErrorMsg("");
                setErrorMsg2("");
			})
			.catch((err) => {
				
			});;

            if (response.data.valid) {
                setErrorMsg("");
                setErrorMsg2("");
                // document.getElementById("continueButton").setAttribute("data-bs-target", "#exampleModalToggle2");
                document.getElementById("closemodel").click(); // Programmatically click to show next modal
            } else {
                setErrorMsg("Incorrect password. Please try again.");
            }
        } catch (error) {
            setErrorMsg("Incorrect password. Please try again.");
        }
    };

	return (
		<>
			<div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Current password</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id='close'></button>
                        </div>
                        <div class="modal-body">
                            Please enter your current password to continue.
                        </div>
                        <div class="modal-body">
                            <Input idn="current_password" inlabl="Current password" intype="password" plchold="Enter your current password" chgfun={(e) => setCurrentPassword(e.target.value)} initval={currentPassword}/>
                            {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
                        </div>
                        <div class="modal-footer">
                            <button className="btn btn-primary" onClick={validatePassword}>Continue</button>
                            <button id="continueButton" class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" hidden>Open second modal</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">New password</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                </div>
                <div class="modal-body">
                    Please enter your new password to continue.
                </div>
                {successMsg && (
                    <div className="alert alert-success text-center" role="alert">
                       Passowrd changed successfully!
                    </div>
                    )}
                <div class="modal-body">
                    <Input idn="new_password" inlabl="New Password" intype="password" plchold="Enter your Desired New password" chgfun={(e) => setNewPassword(e.target.value)} initval={newPassword}/>
                </div>
                <div class="modal-body">
                    <Input idn="rep_new__password" inlabl="Retype New Password" intype="password" plchold="Retype your new password" chgfun={(e) => setRetypePassword(e.target.value)} initval={retypePassword}/>
                    {errorMsg2 && <p className="text-danger mt-2">{errorMsg2}</p>}
                </div>
                <div class="modal-footer">
                    
                    <button class="btn btn-primary" onClick={changePassword}>Chanage</button>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id='closemodel' hidden></button>
                </div>
                </div>
            </div>
            </div>
            <button class="btn btn-danger mb-3" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={cleardata}>Change password</button>
		</>
	)
}

export default Modal2