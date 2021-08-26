import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../../StoreLogic/store';
import OrderDetails from './OrderDetails';
import { SocketContext, socket } from '../../context/Socket';

export default function Orders() {
  // local state
  // const [orderDetails, setOrderDetails] = useState({});
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    console.log('re-rendering');
    // fetch orders on page load
    const fetchData = async () => {
      const userId = 1;
      const response = await getOrderDetails(userId);
      console.log(response.data);
      // setOrderDetails(response);
    };
    fetchData();
    // ================================================= SOCKET MVP
    // For MVP Socket updates all user's app
    // Goal is to have socket only update the relavant user's app
    socket.on('ORDER-ACCEPTED', (message) => {
      console.log(message);
      fetchData();
    });
    // ================================================= SOCKET MVP
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
