/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../../StoreLogic/store';

export default function Orders() {
  // local state
  // const [orderDetails, setOrderDetails] = useState({});
  useEffect(async () => {
    const userId = 1;
    const response = await getOrderDetails(userId);
    console.log(response.data);
    // setOrderDetails(response);
  }, []);
  return (
    <>
      <p>OrderId: </p>
      <p>Date: </p>
      <p>Pick up from</p>
      <p>Pick up time: </p>
      <button type="button">ViewOrder</button>
      <hr />
      <Link to="/orderhistory">View past orders</Link>
    </>
  );
}
