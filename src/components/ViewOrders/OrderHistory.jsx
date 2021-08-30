import React, { useEffect, useState } from 'react';
import { getPastOrderHistory } from '../../StoreLogic/store.js';
import { SocketContext, socket } from '../../context/Socket.jsx';
import OrderHistoryModal from './OrderHistoryModal.jsx';

export default function OrderHistory() {
  // local state
  const [orderDetails, setOderDetails] = useState([]);

  useEffect(() => {
    console.log('re-rendering');
    const fetchData = async () => {
      const userId = 1;
      const response = await getPastOrderHistory(userId);
      console.log(response.data);
      setOderDetails(response.data);
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
      <OrderHistoryModal orderDetails={orderDetails} />
      {/* {orderDetails.map(order => (
        <div>
          <p>
            order id:
            {order.orderTableData.receiptNum}
          </p>
          <p>
            date:
            {order.orderTableData.createdAt}
          </p>
          <p>
            pick up from:Store
            {order.orderTableData.storeId}
          </p>
          <p>
            pick up time:
            {order.orderTableData.pickUpTime}
          </p>
          <p>
            Order status:
            {order.orderTableData.orderStatus}
          </p>
        </div>
      ))} */}


    </>
  );
}
