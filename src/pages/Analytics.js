import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const token = sessionStorage.getItem("token");

        // Check if token exists in sessionStorage
        console.log("Token retrieved:", token); // Logging for debugging

        if (!token) {
            setError("You must be logged in to access analytics.");
            setLoading(false);
            return;
        }

        // Manually decode the JWT token
        try {
            const payload = token.split(".")[1]; // Get the payload part of the JWT
            const decodedToken = JSON.parse(atob(payload)); // Decode the base64 payload
            const currentTime = Date.now() / 1000; // current time in seconds

            if (decodedToken.exp < currentTime) {
                // Token has expired
                sessionStorage.removeItem("token");
                setError("Your session has expired. Please log in again.");
                setLoading(false);
                return;
            }

            // Proceed with the API request if token is valid
            axios.get("/api/tasks-analytics/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setAnalyticsData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching analytics:", error.response || error);
                setError("Failed to fetch analytics.");
                setLoading(false);
            });

        } catch (error) {
            setError("Invalid token. Please log in again.");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading analytics...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!analyticsData || Object.keys(analyticsData).length === 0) {
        return <div>No analytics data available at the moment.</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Task Analytics</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3">
                        <h5>Tasks Created This Month</h5>
                        <p>{analyticsData.tasks_created_this_month}</p>
                        <p>Change: {analyticsData.created_tasks_percentage_change}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3">
                        <h5>Tasks Completed This Month</h5>
                        <p>{analyticsData.tasks_completed_this_month}</p>
                        <p>Change: {analyticsData.completed_tasks_percentage_change}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3">
                        <h5>Top Employee (Completed Tasks)</h5>
                        <p>{analyticsData.top_employee_completed || "N/A"}</p>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card p-3">
                        <h5>Completed Within Deadline</h5>
                        <p>{analyticsData.completed_within_deadline}</p>
                        <p>Change: {analyticsData.completed_within_deadline_percentage_change}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3">
                        <h5>Completed After Deadline</h5>
                        <p>{analyticsData.completed_after_deadline}</p>
                        <p>Change: {analyticsData.completed_after_deadline_percentage_change}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3">
                        <h5>Top Employee (Assigned Tasks)</h5>
                        <p>{analyticsData.top_employee_assigned || "N/A"}</p>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card p-3">
                        <h5>Top Employee (Uncompleted Tasks)</h5>
                        <p>{analyticsData.top_employee_uncompleted || "N/A"}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3">
                        <h5>Not Completed Tasks</h5>
                        <ul>
                            {analyticsData.notcompleted_tasks.length > 0 ? (
                                analyticsData.notcompleted_tasks.map((task, index) => (
                                    <li key={index}>
                                        {task.name} (Deadline: {new Date(task.deadline).toLocaleDateString()}, Assigned to: {task.assigned_to__username})
                                    </li>
                                ))
                            ) : (
                                <li>No tasks found.</li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3">
                        <h5>Overdue Tasks</h5>
                        <ul>
                            {analyticsData.overdue_tasks.length > 0 ? (
                                analyticsData.overdue_tasks.map((task, index) => (
                                    <li key={index}>
                                        {task.name} (Deadline: {new Date(task.deadline).toLocaleDateString()}, Assigned to: {task.assigned_to__username})
                                    </li>
                                ))
                            ) : (
                                <li>No overdue tasks.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
