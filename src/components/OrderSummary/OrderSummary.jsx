import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MenuContext } from '../../StoreLogic/store';

export default function OrderSummary({ pickuptime }) {
  const { store } = useContext(MenuContext);
  console.log(store.cart);
  return (
    <>
      <p>Order id:  </p>
      <p>
        Pick up from:
        {store.storeInfo.storeLocation}
      </p>
      <p>
        Pick up time:
        {pickuptime}
      </p>
      <p>
        Order status:
        {store.orderStatus}
      </p>
      {store.cart.map((item) => (
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
      ))}
      <Link to="/">BACK TO MENU</Link>
    </>
  );
}
