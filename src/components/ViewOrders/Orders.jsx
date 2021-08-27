/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../../StoreLogic/store';
import OrderDetails from './OrderDetails';

export default function Orders() {
  // local state
  const [orderDetails, setOrderDetails] = useState([]);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const refOrderIndex = useRef(0);

  useEffect(() => {
    // fetch orders on page load
    (async () => {
      const userId = 1;
      const response = await getOrderDetails(userId);
      console.log(response.data);
      setOrderDetails(response.data);
    })();
  }, []);

  return (
    <>
      {orderDetails.map((entry, index) => (
        <div>
          <p>
            receipt Number:
            {entry.orderTableData.receiptNum}
          </p>
          <p>
            Date:
            {entry.orderTableData.createdAt}
          </p>
          <p>
            Pick up from:
            {entry.orderTableData.storeId}
          </p>
          <p>
            Pick up time:
            {entry.orderTableData.pickUpTime}
          </p>
          <button
            type="button"
            onClick={() => {
              refOrderIndex.current = index;
              setShowOrderDetails(true);
            }}
          >
            ViewOrder
          </button>
        </div>
      ))}
      {/* MODAL COMPONENT IS SHOWN WHEN THE viewOrder btn is clicked */}
      {showOrderDetails && <OrderDetails orderDetails={orderDetails[refOrderIndex.current]} />}
      <hr />
      <Link to="/orderhistory">View past orders</Link>
    </>
  );
}
