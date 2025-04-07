import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('businesses');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = activeTab === 'users' ? 'http://localhost:8000/admin-users/' : 'http://localhost:8000/business/';
        const res = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setData(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="container-fluid">
      <div className="row" >
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-4" style={{ borderRadius: '20px', border: '1px solid #ccc', backgroundColor: '#f8f9fa' }}>
          <h4 className="mb-4">Admin Panel</h4>
          <div className="nav flex-column nav-pills">
          <button
              className={`nav-link text-start ${activeTab === 'businesses' ? 'active' : ''}`}
              onClick={() => setActiveTab('businesses')}
            >
              Businesses
            </button>
            <button
              className={`nav-link text-start ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h3 className="mb-4 text-capitalize">{activeTab}</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  {activeTab === 'users' ? (
                    <>
                      {/* <th>ID</th> */}
                      <th>Name</th>
                      <th>Email</th>
                      <th>Business</th>
                      <th>Role</th>
                      <th>Is Premium</th>
                    </>
                  ) : (
                    <>
                      {/* <th>ID</th> */}
                      <th>Business Name</th>
                      <th>Owner</th>
                      <th>Is Premium</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">No data found</td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id}>
                      {activeTab === 'users' ? (
                        <>
                        {/* <td>{item.id}</td> */}
                        <td>{item.first_name} {item.last_name}</td>
                        <td>{item.email}</td>
                        <td><Link to={`/business/${item.business}`}>
                            {item.business_name}
                        </Link></td>
                        <td>{item.user_type}</td>
                        <td>{item.business_premuim ? '✅' : '❌'}</td>
                          
                        </>
                      ) : (
                        <>
                          {/* <td>{item.id}</td> */}
                          <td><Link to={`/business/${item.id}`}>
                            {item.name}
                        </Link></td>
                          <td>{item.owner_name}</td>
                          <td>{item.is_premium ? '✅' : '❌'}</td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
