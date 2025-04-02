import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";


function PremiumPage() {
    const history = useHistory();
    const token = sessionStorage.getItem("token");
    console.log(token)


    const handleUpgrade = async () => {
        try { 
            const response = await axios.post(
                "http://127.0.0.1:8000/payment/", 
                {},
                {
                    headers: { 
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            if (response.data.approval_url) {
                window.location.href = response.data.approval_url;
            }
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary">Go Premium</h1>
            <p className="text-center">Upgrade to premium and unlock powerful features!</p>

            <div className="row mt-4">
                <div className="col-md-6">
                    <h3>Premium Benefits</h3>
                    <ul className="list-group">
                        <li className="list-group-item">✔ Get email notifications when an employee is assigned a task</li>
                        <li className="list-group-item">✔ Advanced task analysis and performance insights</li>
                        <li className="list-group-item">✔ Priority support and dedicated assistance</li>
                        <li className="list-group-item">✔ Access to premium reports and dashboards</li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3>Pricing</h3>
                    <div className="card p-3 shadow">
                        <h4 className="text-center">$9.99/month</h4>
                        <p className="text-center">Cancel anytime.</p>
                    </div>
                </div>
            </div>

            <div className="text-center mt-4">
                <h3>Payment Method</h3>
                <button className="btn btn-success me-2" onClick={handleUpgrade}>Pay with PayPal</button>
                
                {/* <button className="btn btn-primary" onClick={() => alert("Redirecting to Stripe...")}>Pay with Credit Card</button> */}
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={() => history.push('/')}>Go Back</button>
            </div>
        </div>
    );
}

export default PremiumPage;
