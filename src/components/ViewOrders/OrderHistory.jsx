import React, { useEffect, useState } from 'react';
import { getPastOrderHistory, setOrderStatus } from '../../StoreLogic/store';
import { SocketContext, socket } from '../../context/Socket';

export default function OrderHistory() {
  // local state
  const [orderDetails, setOderDetails] = useState([]);

  useEffect(() => {
    console.log('re-rendering');
    const fetchData = async () => {
      const userId = 1;
      const response = await getPastOrderHistory(userId);
      setOderDetails(response.data);
      console.log(response.data);
    };
    fetchData();
    // ================================================= SOCKET MVP
    // For MVP Socket updates all user's app
    // Goal is to have socket only update the relavant user's app
    socket.on('ORDER-COMPLETE', (message) => {
      console.log(message);
      fetchData();
    });
    // ================================================= SOCKET MVP
  }, []);
  return (
    <>
      {orderDetails.map((order) => (
        <div>
          <p>
            Receipt Num:
            {order.orderTableData.receiptNum}
          </p>
          <p>
            date:
            {order.orderTableData.receiptNum}
          </p>
          <p>
            pick up from: Store
            {order.orderTableData.storeId}
          </p>
          <p>
            pick up time:
            {order.orderTableData.pickUpTime}
          </p>
          <p>
            Status:
            {order.orderTableData.orderStatus}
          </p>
        </div>
      ))}
      <h1>PAST ORDERS</h1>
      <div>
        <p>order id:</p>
        <p>date:</p>
        <p>pick up from:</p>
        <p>pick up time:</p>
        <p>Status(ex. complete)</p>
      </div>
      <hr />
      <div>
        <p>order id:</p>
        <p>date:</p>
        <p>pick up from:</p>
        <p>pick up time:</p>
        <p>Status(ex. complete)</p>
      </div>
    </>
  );
}
