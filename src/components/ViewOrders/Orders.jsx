/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../../StoreLogic/store';
import OrderDetails from './OrderDetails';

export default function Orders() {
  // local state
  // const [orderDetails, setOrderDetails] = useState({});
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    // fetch orders on page load
    (async () => {
      const userId = 1;
      const response = await getOrderDetails(userId);
      console.log(response.data);
      // setOrderDetails(response);
    })();
  }, []);

  return (
    <>
      <p>OrderId: </p>
      <p>Date: </p>
      <p>Pick up from</p>
      <p>Pick up time: </p>
      <button type="button" onClick={() => { setShowOrderDetails(true); }}>ViewOrder</button>
      {/* MODAL COMPONENT IS SHOWN WHEN THE viewOrder btn is clicked */}
      {showOrderDetails && <OrderDetails />}
      <hr />
      <Link to="/orderhistory">View past orders</Link>
    </>
  );
}
