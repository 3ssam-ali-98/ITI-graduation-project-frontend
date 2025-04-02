import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useHistory();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const paymentId = urlParams.get("paymentId");
        const payerID = urlParams.get("PayerID");

        if (paymentId && payerID) {
            axios.post("http://localhost:8000/execute-payment/", {
                paymentId,
                PayerID: payerID
            }).then(() => {
                navigate.push("/dashboard");
            }).catch(() => {
                navigate.push("/payment-failed");
            });
        }
    }, [location, navigate]);

    return <h2>Processing Payment...</h2>;
};

export default PaymentSuccess;
