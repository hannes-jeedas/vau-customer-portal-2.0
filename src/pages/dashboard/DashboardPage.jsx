import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import OrderTable from "../../components/orderTable/OrderTable";
import DeliveryStatusBar from "../../components/DeliveryStatusBar";
import axios from "axios";
import { getWeekNumber } from "../../utils/dateFunctions";

const DashboardPage = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    axios
      .post("https://customer.vau.ee/v2/api.php", {
        username: storedUsername,
      })
      .then((response) => {
        setOrdersData(response.data.orders);
        setName(response.data.name);
      });
  }, []);

  return (
    <>
      <Navbar name={name} />
      <main className="main-content">
        <div className="upcoming-deliveries-container">
          <div className="header-week-container">
            <h3>Upcoming Deliveries</h3>
            <span className="current-week">Current Week: {getWeekNumber()}</span>
          </div>
          <span className="section-header-sub">
            Available Factory Delivery Times (Excludes Bookings)
          </span>
          <DeliveryStatusBar />
        </div>
        <div className="order-table-container">
          <>
            <div className="section-header-container">
              <h3 className="section-header-main">Orders & Delivery Info</h3>
              <span className="section-header-sub">
                Number of Orders: {ordersData.length}
              </span>
            </div>
          </>
          <OrderTable orders={ordersData} />
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
