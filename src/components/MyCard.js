// // BusinessAnalyticsCard.jsx
// import React from 'react';
// import { useHistory } from 'react-router-dom'; // or 'react-router' in older versions

// function MyCard({ isPremium }) {
//   const history = useHistory();

//   const handlePremiumClick = () => {
//     history.push('/Analytics');
//   };

//   return (
//     <div>
//       {/* <h2>Business Analytics</h2> */}
//       {/* Display summary analytics here */}
//       {!isPremium && <button onClick={handlePremiumClick}>Premium</button>}
//     </div>
//   );
// }

// export default MyCard;

import React from 'react';
import { useHistory } from 'react-router-dom';
import analytics from '../assets/analytics.png';

function MyCard({ isPremium }) {
  const history = useHistory();

  const handleNavigate = () => {
    history.push('/Analytics');
  };

  return (
    <div className="card shadow-sm" style={{ width: '20rem', borderRadius: '10px', overflow: 'hidden', border: '1px solid #ddd' }}>
      <img 
        src={analytics} 
        className="card-img-top" 
        alt="Tasks Analytics" 
        style={{ height: 'auto', maxHeight: '200px', objectFit: 'cover', marginTop: '10px', borderBottom: '1px solid #ddd' }} 
      />
      <div className="card-body text-center">
        <h5 className="card-title" style={{ fontWeight: 'bold', color: '#333' }}>Tasks Analytics</h5>
        <p className="card-text" style={{ fontSize: '0.9rem', color: '#555' }}>
          Get the latest updates on your business performance and insights.
        </p>
        <button 
          onClick={handleNavigate} 
          className="btn btn-primary" 
          style={{ backgroundColor: '#007bff', borderColor: '#007bff', padding: '10px 20px', borderRadius: '5px' }}
        >
          Go to Analytics
        </button>
      </div>
    </div>
  );
}

export default MyCard;
