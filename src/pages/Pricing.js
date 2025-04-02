import React from "react";
import { useHistory } from "react-router-dom";

function Pricing() {
    const history = useHistory();

    return (
        <div className="container mt-5">

            {/* Pricing Section */}
            <div id="pricing" className="mt-5">
                <h2 className="text-center text-primary">Pricing</h2>
                <p className="text-center">Upgrade to premium and unlock powerful features!</p>

                <div className="d-flex justify-content-center">
                    <div className="card p-4 shadow" style={{ width: "20rem" }}>
                        <h4 className="text-center">$9.99/month</h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item">✔ Email notifications for assigned tasks</li>
                            <li className="list-group-item">✔ Advanced task analysis</li>
                            <li className="list-group-item">✔ Priority support</li>
                            <li className="list-group-item">✔ Access to premium reports</li>
                        </ul>
                        <button className="btn btn-warning w-100" onClick={() => history.push('/premium')}>
                            Go Premium
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
