import React from 'react';
import './DeliveryStatusBox.css';
import formatDateToDDMMYYYY from '../../utils/formatDateToDDMMYYYY'

const DeliveryStatusBox = ({ productGroup, subGroup, nextDeliveryDate }) => {
  return (
    <div className="delivery-status-box">
      <h3>{productGroup}</h3>
      <p className='subgroup'>{subGroup}</p>
      <div className="delivery-info">
        <p className="next-delivery">{nextDeliveryDate}</p>
      </div>
    </div>
  );
};

export default DeliveryStatusBox; 