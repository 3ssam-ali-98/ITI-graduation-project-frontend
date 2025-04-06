import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BusinessDetail = () => {
    const { id } = useParams(); // الحصول على id من URL
    const [business, setBusiness] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/businessdetail/${id}/`);
                setBusiness(response.data.business);
                setEmployees(response.data.employees);
                setTasks(response.data.tasks);
                setClients(response.data.clients);
            } catch (err) {
                setError('Error fetching business details');
            } finally {
                setLoading(false);
            }
        };
        fetchBusinessDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    };

    const thStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        backgroundColor: '#f4f4f4',
    };

    const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Business Details</h1>
            {business && (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Business Name</th>
                            <th style={thStyle}>Owner</th>
                            <th style={thStyle}>Premium Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={tdStyle}>{business.name}</td>
                            <td style={tdStyle}>
                                {business.owner.first_name} {business.owner.last_name}
                            </td>
                            <td style={tdStyle}>{business.is_premium ? "Yes" : "No"}</td>
                        </tr>
                    </tbody>
                </table>
            )}

            <h3>Employees</h3>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Employee Name</th>
                        <th style={thStyle}>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td style={tdStyle}>
                                {employee.first_name} {employee.last_name}
                            </td>
                            <td style={tdStyle}>{employee.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Clients</h3>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Client Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td style={tdStyle}>{client.name}</td>
                            <td style={tdStyle}>{client.email}</td>
                            <td style={tdStyle}>{client.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Tasks</h3>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Task Name</th>
                        <th style={thStyle}>Priority</th>
                        <th style={thStyle}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td style={tdStyle}>{task.name}</td>
                            <td style={tdStyle}>{task.priority}</td>
                            <td style={tdStyle}>{task.completed ? "Completed" : "Pending"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BusinessDetail;
