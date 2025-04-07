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
    <div className="card" style={{ width: '18rem' }}>
      <img src={analytics} className="card-img-top" alt="Tasks Analytics" style={{ height: 'auto', maxHeight: '200px', objectFit: 'cover', marginTop:'10px'}} />
      <div className="card-body">
        <h5 className="card-title">Tasks Analytics</h5>
        <p className="card-text">Get the latest updates on your Business.</p>
        <button onClick={handleNavigate} className="btn btn-primary">
          Go to Analytics
        </button>
      </div>
    </div>
  );
}

export default MyCard;
