import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Modal from "../components/modal";
import { useDispatch} from 'react-redux';
import { loggedUser } from '../redux/actions/loggeduseraction';




const PaymentResult = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const message = params.get("message");
    const navigate = useHistory();
    const dispatch = useDispatch();


    useEffect(() => {
            document.getElementById("payment-result").click()
            dispatch(loggedUser(''))
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("role");
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("is_premium");
    }, []);

    return (
        <Modal id="payment-result"
            location="centered"
            target="payment"
            hidden={true} 
            color="primary"
            modal_title={status} 
            modal_message={`${message} Please login again!`}
            modal_accept_text={"Go to login"}
            modal_accept={() => navigate.push('/login')}/>
    );

    
};

export default PaymentResult;
