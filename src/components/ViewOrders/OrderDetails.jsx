import React from 'react';

export default function OrderDetails() {
  return (
    <>
      <h1>=========View order modal component=============</h1>
      <p>Order id: </p>
      <p>
        Pick up from:
      </p>
      <p>
        Pick up time:
      </p>
      <p>
        Order status:
      </p>
      {/* {store.cart.map((item) => (
        <div>
          <p>
            Item Name:
            {item.itemName}
          </p>
          <p>
            Item temp:
            {item.tempChoice}
          </p>
          <p>
            Item quantity:
            {item.quantity}
          </p>
        </div>
      ))} */}
    </>
  );
}
