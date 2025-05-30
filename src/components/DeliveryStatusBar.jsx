import React from "react";
import DeliveryStatusBox from "./deliveryStatusBox/DeliveryStatusBox";

const DeliveryStatusBar = () => {
  return (
    <div className="delivery-status-container">
      {/* {deliveryStatuses.map((status, index) => (
        <DeliveryStatusBox
          key={index}
          productGroup={status.productGroup}
          nextDeliveryDate={status.nextDeliveryDate}
          status={status.status}
        />
      ))} */}
      <DeliveryStatusBox productGroup={"Frames"} nextDeliveryDate={"Week 24"}/>
      <DeliveryStatusBox productGroup={"External Doors"} nextDeliveryDate={"Week 24/25"}/>
      <DeliveryStatusBox productGroup={"Internal Doors"} nextDeliveryDate={"Week 25"}/>
      <DeliveryStatusBox productGroup={"Window Factory"} nextDeliveryDate={"Week 24"}/>
      <DeliveryStatusBox productGroup={"Project Doors"} subGroup={"Painted"} nextDeliveryDate={"Week 31"}/>
      <DeliveryStatusBox productGroup={"Project Doors"} subGroup={"Laminated / Veneered"} nextDeliveryDate={"Week 36"}/>
      <DeliveryStatusBox productGroup={"Akacija"} subGroup={"Forte and Pine Doors"} nextDeliveryDate={"Week 27"}/>
    </div>
  );
};

export default DeliveryStatusBar;
