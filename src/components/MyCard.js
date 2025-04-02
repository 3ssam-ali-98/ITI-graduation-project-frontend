// BusinessAnalyticsCard.jsx
import React from 'react';
import { useHistory } from 'react-router-dom'; // or 'react-router' in older versions

function MyCard({ isPremium }) {
  const history = useHistory();

  const handlePremiumClick = () => {
    history.push('/Analytics');
  };

  return (
    <div>
      {/* <h2>Business Analytics</h2> */}
      {/* Display summary analytics here */}
      {!isPremium && <button onClick={handlePremiumClick}>Premium</button>}
    </div>
  );
}

export default MyCard;