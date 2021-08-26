/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getPastOrderHistory } from '../../StoreLogic/store';

export default function OrderHistory() {
  // local state
  const [orderDetails, setOderDetails] = useState([]);
  useEffect(() => {
    (async () => {
      const userId = 1;
      const response = await getPastOrderHistory(userId);
      console.log(response.data);
    })();
  }, []);
  return (
    <>
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
